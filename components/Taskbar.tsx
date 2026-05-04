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
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

export default function Taskbar({ items, onTaskClick, onStartClick, startOpen }: Props) {
  const [now, setNow] = useState(() => new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [calMonth, setCalMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Click outside to close
  useEffect(() => {
    if (!showCalendar) return;
    function onClick(e: MouseEvent) {
      if (calRef.current && !calRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    }
    // Defer so the click that opened it doesn't close it
    const id = setTimeout(() => document.addEventListener('mousedown', onClick), 50);
    return () => {
      clearTimeout(id);
      document.removeEventListener('mousedown', onClick);
    };
  }, [showCalendar]);

  const hh = now.getHours();
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ampm = hh >= 12 ? 'PM' : 'AM';
  const h12 = ((hh + 11) % 12) + 1;
  const time = `${h12}:${mm} ${ampm}`;
  const dateLabel = `${MONTHS[now.getMonth()].slice(0, 3)} ${now.getDate()}`;

  // Calendar grid for selected month
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

      {/* System tray */}
      <div className="xp-tray">
        <span className="xp-tray-icon" title="Network: connected (apparently)">📶</span>
        <span className="xp-tray-icon" title="Volume">🔊</span>
        <span className="xp-tray-icon" title="Battery: 47%">🔋</span>
        <button
          className="xp-clock"
          type="button"
          suppressHydrationWarning
          onClick={(e) => { e.stopPropagation(); setShowCalendar((v) => !v); }}
          title="Click for calendar"
        >
          <span className="xp-clock-time">{time}</span>
          <span className="xp-clock-date">{dateLabel}</span>
        </button>
      </div>

      {/* Calendar popover */}
      {showCalendar && (
        <div ref={calRef} className="xp-calendar" onMouseDown={(e) => e.stopPropagation()}>
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
    </div>
  );
}
