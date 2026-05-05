'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface TaskbarItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  active: boolean;
  minimized: boolean;
}

interface Props {
  items: TaskbarItem[];
  onTaskClick: (id: string) => void;
  onStartClick: () => void;
  startOpen: boolean;
  onShowDesktop?: () => void;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

type TrayPanel = null | 'calendar' | 'volume' | 'wifi' | 'battery';

const WIFI_NETWORKS = [
  { ssid: 'PrettyFlyForAWiFi',           bars: 4, secure: true,  connected: true,  note: 'connected' },
  { ssid: 'Margaret_Phone_(found_again)', bars: 2, secure: false, connected: false, note: 'open' },
  { ssid: 'Phil_Hotspot_5G',              bars: 3, secure: true,  connected: false, note: 'his car is the router somehow' },
  { ssid: 'TELL_MY_WIFI_LOVE_HER',        bars: 4, secure: true,  connected: false, note: 'secure' },
  { ssid: 'BT-WiFi-with-FON',             bars: 1, secure: true,  connected: false, note: 'secure (weak)' },
  { ssid: 'NSA_VAN_42',                    bars: 4, secure: true,  connected: false, note: 'secure' },
  { ssid: 'aldi-middle-aisle-public',      bars: 2, secure: false, connected: false, note: 'open · this week: kayaks' },
];

export default function Taskbar({ items, onTaskClick, onStartClick, startOpen, onShowDesktop }: Props) {
  const [now, setNow] = useState(() => new Date());
  const [panel, setPanel] = useState<TrayPanel>(null);
  const [calMonth, setCalMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const [battery, setBattery] = useState(47);
  const trayRef = useRef<HTMLDivElement>(null);

  // Persist volume + battery
  useEffect(() => {
    try {
      const v = localStorage.getItem('shagga-volume-tray');
      if (v != null) setVolume(parseInt(v, 10));
      const m = localStorage.getItem('shagga-muted');
      if (m === '1') setMuted(true);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('shagga-volume-tray', String(volume)); } catch {}
  }, [volume]);
  useEffect(() => {
    try { localStorage.setItem('shagga-muted', muted ? '1' : '0'); } catch {}
  }, [muted]);

  // Battery slowly decreases over time, never hits 0 (always between 5-50)
  useEffect(() => {
    const id = setInterval(() => {
      setBattery((b) => {
        if (Math.random() < 0.3) {
          const next = b - 1;
          return next < 5 ? 47 : next; // recharge to 47% when low (the running joke)
        }
        return b;
      });
    }, 90000);
    return () => clearInterval(id);
  }, []);

  // Tick the clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Click outside to close panel
  useEffect(() => {
    if (!panel) return;
    function onClick(e: MouseEvent) {
      if (trayRef.current && !trayRef.current.contains(e.target as Node)) {
        setPanel(null);
      }
    }
    const id = setTimeout(() => document.addEventListener('mousedown', onClick), 50);
    return () => {
      clearTimeout(id);
      document.removeEventListener('mousedown', onClick);
    };
  }, [panel]);

  const hh = now.getHours();
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ampm = hh >= 12 ? 'PM' : 'AM';
  const h12 = ((hh + 11) % 12) + 1;
  const time = `${h12}:${mm} ${ampm}`;
  const dateLabel = `${MONTHS[now.getMonth()].slice(0, 3)} ${now.getDate()}`;

  // Build calendar grid
  const firstDay = new Date(calMonth.year, calMonth.month, 1);
  const daysInMonth = new Date(calMonth.year, calMonth.month + 1, 0).getDate();
  const startWeekday = firstDay.getDay();
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(startWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  const isToday = (d: number | null) =>
    d != null &&
    calMonth.year === now.getFullYear() &&
    calMonth.month === now.getMonth() &&
    d === now.getDate();

  const togglePanel = (p: Exclude<TrayPanel, null>) =>
    setPanel((cur) => cur === p ? null : p);

  const volIcon = muted || volume === 0 ? '🔇' : volume < 33 ? '🔈' : volume < 66 ? '🔉' : '🔊';
  const wifiIcon = '📶';
  const battIcon = battery < 20 ? '🪫' : '🔋';

  return (
    <div className="xp-taskbar">
      <button
        className="xp-start"
        type="button"
        onClick={(e) => { e.stopPropagation(); onStartClick(); }}
        style={startOpen ? { filter: 'brightness(0.85)' } : undefined}
      >
        start
      </button>
      <div className="xp-taskbar-items">
        {items.map((item) => (
          <button
            key={item.id}
            className={`xp-task-item${item.active && !item.minimized ? ' active' : ''}`}
            onClick={() => onTaskClick(item.id)}
            type="button"
          >
            {item.icon && <span className="xp-task-icon">{item.icon}</span>}
            <span className="xp-task-item-text">{item.title}</span>
          </button>
        ))}
      </div>

      <div className="xp-tray" ref={trayRef}>
        <button
          className={`xp-tray-btn${panel === 'wifi' ? ' active' : ''}`}
          onClick={(e) => { e.stopPropagation(); togglePanel('wifi'); }}
          type="button"
          title="Network"
        >{wifiIcon}</button>
        <button
          className={`xp-tray-btn${panel === 'volume' ? ' active' : ''}`}
          onClick={(e) => { e.stopPropagation(); togglePanel('volume'); }}
          type="button"
          title="Volume"
        >{volIcon}</button>
        <button
          className={`xp-tray-btn${panel === 'battery' ? ' active' : ''}`}
          onClick={(e) => { e.stopPropagation(); togglePanel('battery'); }}
          type="button"
          title={`Battery: ${battery}%`}
        >{battIcon}</button>
        <button
          className={`xp-clock${panel === 'calendar' ? ' active' : ''}`}
          type="button"
          suppressHydrationWarning
          onClick={(e) => { e.stopPropagation(); togglePanel('calendar'); }}
          title="Click for calendar"
        >
          <span className="xp-clock-time">{time}</span>
          <span className="xp-clock-date">{dateLabel}</span>
        </button>
        {onShowDesktop && (
          <button
            className="xp-show-desktop"
            type="button"
            onClick={(e) => { e.stopPropagation(); onShowDesktop(); }}
            title="Show Desktop"
          />
        )}
      </div>

      {/* Calendar popover */}
      {panel === 'calendar' && (
        <div className="xp-tray-panel xp-calendar" onMouseDown={(e) => e.stopPropagation()}>
          <div className="xp-calendar-head">
            <button
              className="xp-cal-nav"
              onClick={() => setCalMonth((c) => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 })}
              type="button"
            >‹</button>
            <span className="xp-cal-title">{MONTHS[calMonth.month]} {calMonth.year}</span>
            <button
              className="xp-cal-nav"
              onClick={() => setCalMonth((c) => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 })}
              type="button"
            >›</button>
          </div>
          <div className="xp-calendar-grid">
            {DAYS.map((d) => <div key={d} className="xp-cal-day-head">{d}</div>)}
            {weeks.flat().map((d, i) => (
              <div
                key={i}
                className={`xp-cal-cell${d == null ? ' empty' : ''}${isToday(d) ? ' today' : ''}`}
              >{d ?? ''}</div>
            ))}
          </div>
          <div className="xp-calendar-foot">
            <button
              className="xp-cal-today"
              type="button"
              onClick={() => {
                const d = new Date();
                setCalMonth({ year: d.getFullYear(), month: d.getMonth() });
              }}
            >Today</button>
            <span className="xp-cal-fulldate">
              {now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      )}

      {/* Volume popup */}
      {panel === 'volume' && (
        <div className="xp-tray-panel xp-volume-panel" onMouseDown={(e) => e.stopPropagation()}>
          <div className="xp-vol-head">Volume</div>
          <div className="xp-vol-body">
            <button
              className="xp-vol-mute-btn"
              type="button"
              onClick={() => setMuted((m) => !m)}
            >{muted || volume === 0 ? '🔇' : volume < 33 ? '🔈' : volume < 66 ? '🔉' : '🔊'}</button>
            <input
              type="range"
              min={0}
              max={100}
              value={muted ? 0 : volume}
              onChange={(e) => { setVolume(parseInt(e.target.value, 10)); if (muted) setMuted(false); }}
              className="xp-vol-slider"
            />
            <span className="xp-vol-num">{muted ? 0 : volume}</span>
          </div>
          <div className="xp-vol-foot">
            {muted ? 'muted' : volume === 0 ? 'silent' : volume < 30 ? 'whispering' : volume < 70 ? 'normal vibes' : volume < 95 ? 'cooked' : 'unhinged'}
          </div>
        </div>
      )}

      {/* Wi-Fi popup */}
      {panel === 'wifi' && (
        <div className="xp-tray-panel xp-wifi-panel" onMouseDown={(e) => e.stopPropagation()}>
          <div className="xp-wifi-head">Wi-Fi networks</div>
          <div className="xp-wifi-list">
            {WIFI_NETWORKS.map((n) => (
              <div key={n.ssid} className={`xp-wifi-row${n.connected ? ' connected' : ''}`}>
                <span className={`xp-wifi-bars bars-${n.bars}`}>
                  <span /><span /><span /><span />
                </span>
                <div className="xp-wifi-info">
                  <div className="xp-wifi-ssid">{n.ssid}{n.secure && ' 🔒'}</div>
                  <div className="xp-wifi-note">{n.note}</div>
                </div>
                {n.connected ? (
                  <span className="xp-wifi-tag">Connected</span>
                ) : (
                  <button className="xp-wifi-connect" type="button" onClick={(e) => e.preventDefault()}>Connect</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Battery popup */}
      {panel === 'battery' && (
        <div className="xp-tray-panel xp-battery-panel" onMouseDown={(e) => e.stopPropagation()}>
          <div className="xp-batt-head">Power</div>
          <div className="xp-batt-big">
            <span className="xp-batt-icon" style={{ color: battery < 20 ? '#d32f2f' : '#2e7d32' }}>{battIcon}</span>
            <div className="xp-batt-pct">{battery}%</div>
          </div>
          <div className="xp-batt-bar">
            <div className="xp-batt-bar-fill" style={{ width: `${battery}%`, background: battery < 20 ? '#d32f2f' : '#4caf50' }} />
          </div>
          <div className="xp-batt-info">
            <div><span>Status</span><strong>{battery < 20 ? 'critical (lol)' : 'on battery'}</strong></div>
            <div><span>Time remaining</span><strong>{battery < 20 ? '2 minutes / 47 hours' : '47 hours / 2 minutes'}</strong></div>
            <div><span>Battery health</span><strong>cooked</strong></div>
            <div><span>Cycles</span><strong>{4128}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}
