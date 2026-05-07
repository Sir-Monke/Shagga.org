'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';

type Tab = 'world' | 'alarm' | 'stopwatch' | 'timer';

export const AppClock: React.FC = () => {
  const [tab, setTab] = useState<Tab>('world');
  return (
    <div className="clock-app">
      <div className="clock-content">
        {tab === 'world' && <WorldClock />}
        {tab === 'alarm' && <Alarm />}
        {tab === 'stopwatch' && <Stopwatch />}
        {tab === 'timer' && <Timer />}
      </div>
      <div className="clock-tabbar">
        <button className={tab==='world'?'clock-tab clock-tab-active':'clock-tab'} onClick={() => setTab('world')}>🌍<br /><span>World</span></button>
        <button className={tab==='alarm'?'clock-tab clock-tab-active':'clock-tab'} onClick={() => setTab('alarm')}>⏰<br /><span>Alarm</span></button>
        <button className={tab==='stopwatch'?'clock-tab clock-tab-active':'clock-tab'} onClick={() => setTab('stopwatch')}>⏱<br /><span>Stopwatch</span></button>
        <button className={tab==='timer'?'clock-tab clock-tab-active':'clock-tab'} onClick={() => setTab('timer')}>⏲<br /><span>Timer</span></button>
      </div>
    </div>
  );
};

// ---------- World Clock ----------
const CITIES = [
  { name: 'Liverpool',  tz: 'Europe/London' },
  { name: 'New York',   tz: 'America/New_York' },
  { name: 'Tokyo',      tz: 'Asia/Tokyo' },
  { name: 'Sydney',     tz: 'Australia/Sydney' },
  { name: 'Cheltenham', tz: 'Europe/London' },
];

const WorldClock: React.FC = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  return (
    <div className="clock-world">
      {CITIES.map((c) => {
        const t = new Date(now.toLocaleString('en-US', { timeZone: c.tz }));
        const local = new Date();
        const diff = Math.round((t.getHours() - local.getHours() + 24) % 24);
        const hh = String(t.getHours()).padStart(2, '0');
        const mm = String(t.getMinutes()).padStart(2, '0');
        return (
          <div key={c.name} className="clock-world-row">
            <div>
              <div className="clock-world-label">{diff === 0 ? 'Today' : `${diff > 12 ? diff - 24 : diff}h difference`}</div>
              <div className="clock-world-name">{c.name}</div>
            </div>
            <div className="clock-world-time">{hh}:{mm}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Alarm ----------
const Alarm: React.FC = () => (
  <div className="clock-alarm">
    <div className="clock-alarm-row">
      <span className="clock-alarm-time">07:30</span>
      <span className="clock-alarm-label">Weekdays · be a legend</span>
      <span className="clock-toggle clock-toggle-on" />
    </div>
    <div className="clock-alarm-row">
      <span className="clock-alarm-time" style={{ opacity: 0.5 }}>09:00</span>
      <span className="clock-alarm-label" style={{ opacity: 0.5 }}>Saturday · gentler</span>
      <span className="clock-toggle" />
    </div>
    <div className="clock-alarm-row">
      <span className="clock-alarm-time" style={{ opacity: 0.5 }}>23:00</span>
      <span className="clock-alarm-label" style={{ opacity: 0.5 }}>actually go to sleep</span>
      <span className="clock-toggle" />
    </div>
    <p className="clock-alarm-note">tap a row to edit (not implemented — this is a comedy site)</p>
  </div>
);

// ---------- Stopwatch ----------
const Stopwatch: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // ms
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef<number>(0);
  const baseRef = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const tick = () => {
      setElapsed(baseRef.current + (Date.now() - startRef.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const start = () => { startRef.current = Date.now(); setRunning(true); };
  const stop  = () => { baseRef.current = elapsed; setRunning(false); };
  const reset = () => { setElapsed(0); baseRef.current = 0; setLaps([]); setRunning(false); };
  const lap   = () => setLaps((l) => [elapsed, ...l]);

  return (
    <div className="clock-stopwatch">
      <div className="clock-sw-display">{fmtMs(elapsed)}</div>
      <div className="clock-sw-controls">
        {!running ? (
          <>
            <button className="clock-sw-btn" onClick={reset} disabled={elapsed === 0}>Reset</button>
            <button className="clock-sw-btn clock-sw-btn-start" onClick={start}>Start</button>
          </>
        ) : (
          <>
            <button className="clock-sw-btn" onClick={lap}>Lap</button>
            <button className="clock-sw-btn clock-sw-btn-stop" onClick={stop}>Stop</button>
          </>
        )}
      </div>
      <div className="clock-sw-laps">
        {laps.map((t, i) => (
          <div key={i} className="clock-sw-lap">
            <span>Lap {laps.length - i}</span>
            <span>{fmtMs(t - (laps[i + 1] ?? 0))}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- Timer ----------
const Timer: React.FC = () => {
  const [hh, setHh] = useState(0); const [mm, setMm] = useState(5); const [ss, setSs] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const total = hh * 3600 + mm * 60 + ss;

  useEffect(() => {
    if (!running || remaining === null) return;
    if (remaining <= 0) { setRunning(false); return; }
    const t = window.setTimeout(() => setRemaining((r) => (r ?? 0) - 1), 1000);
    return () => window.clearTimeout(t);
  }, [running, remaining]);

  const start = () => {
    if (total <= 0) return;
    if (remaining === null || remaining === 0) setRemaining(total);
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setRemaining(null); };

  return (
    <div className="clock-timer">
      {remaining === null ? (
        <div className="clock-timer-pickers">
          <Picker label="hours" value={hh} max={23} onChange={setHh} />
          <Picker label="min"   value={mm} max={59} onChange={setMm} />
          <Picker label="sec"   value={ss} max={59} onChange={setSs} />
        </div>
      ) : (
        <div className="clock-timer-display">{fmtSecs(remaining)}</div>
      )}
      <div className="clock-sw-controls">
        {remaining === null ? (
          <button className="clock-sw-btn clock-sw-btn-start" onClick={start} disabled={total === 0}>Start</button>
        ) : !running ? (
          <>
            <button className="clock-sw-btn" onClick={reset}>Cancel</button>
            <button className="clock-sw-btn clock-sw-btn-start" onClick={start}>{remaining === 0 ? 'Restart' : 'Resume'}</button>
          </>
        ) : (
          <>
            <button className="clock-sw-btn" onClick={reset}>Cancel</button>
            <button className="clock-sw-btn clock-sw-btn-stop" onClick={pause}>Pause</button>
          </>
        )}
      </div>
    </div>
  );
};

const Picker: React.FC<{ label: string; value: number; max: number; onChange: (n: number) => void }> = ({ label, value, max, onChange }) => (
  <div className="clock-picker">
    <button onClick={() => onChange(Math.min(max, value + 1))}>▲</button>
    <span className="clock-picker-num">{String(value).padStart(2, '0')}</span>
    <span className="clock-picker-label">{label}</span>
    <button onClick={() => onChange(Math.max(0, value - 1))}>▼</button>
  </div>
);

function fmtMs(ms: number): string {
  const t = Math.floor(ms / 10);
  const cs = t % 100;
  const s = Math.floor(t / 100) % 60;
  const m = Math.floor(t / 6000);
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`;
}
function fmtSecs(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
