'use client';
import React, { useState, useMemo } from 'react';

const EVENTS: Record<string, string[]> = {
  // ISO YYYY-MM-DD
  [todayISO()]: ['nothing on. best day of the week.'],
};

function todayISO(): string {
  const d = new Date(); d.setHours(0,0,0,0);
  return d.toISOString().slice(0, 10);
}
function iso(d: Date): string { const c = new Date(d); c.setHours(0,0,0,0); return c.toISOString().slice(0, 10); }

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['M','T','W','T','F','S','S']; // British week-start: Monday

export const AppCalendar: React.FC = () => {
  const [month, setMonth] = useState(() => {
    const d = new Date(); d.setDate(1); d.setHours(0,0,0,0);
    return d;
  });
  const [selected, setSelected] = useState<Date>(() => new Date());
  const today = useMemo(() => new Date(), []);

  const grid = useMemo(() => {
    // Build the visible grid for `month`. British week-start Monday.
    const first = new Date(month);
    const dayOfWeek = (first.getDay() + 6) % 7; // 0 = Monday
    const startCell = new Date(first);
    startCell.setDate(first.getDate() - dayOfWeek);
    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(startCell); d.setDate(startCell.getDate() + i);
      cells.push(d);
    }
    return cells;
  }, [month]);

  const move = (delta: number) => {
    const next = new Date(month);
    next.setMonth(next.getMonth() + delta);
    setMonth(next);
  };

  const selectedKey = iso(selected);
  const events = EVENTS[selectedKey] ?? [];

  return (
    <div className="cal-app">
      <div className="cal-header">
        <button onClick={() => move(-1)} aria-label="Previous month">‹</button>
        <h2>{MONTHS[month.getMonth()]} {month.getFullYear()}</h2>
        <button onClick={() => move(1)} aria-label="Next month">›</button>
      </div>

      <div className="cal-weekdays">
        {WEEKDAYS.map((w, i) => <span key={i}>{w}</span>)}
      </div>

      <div className="cal-grid">
        {grid.map((d, i) => {
          const isOtherMonth = d.getMonth() !== month.getMonth();
          const isToday = d.toDateString() === today.toDateString();
          const isSelected = d.toDateString() === selected.toDateString();
          const hasEvent = !!EVENTS[iso(d)];
          return (
            <button
              key={i}
              className={[
                'cal-day',
                isOtherMonth ? 'cal-day-other' : '',
                isToday ? 'cal-day-today' : '',
                isSelected ? 'cal-day-selected' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => setSelected(d)}
            >
              <span>{d.getDate()}</span>
              {hasEvent && <span className="cal-day-dot" />}
            </button>
          );
        })}
      </div>

      <div className="cal-day-detail">
        <div className="cal-day-detail-head">
          {selected.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
        {events.length === 0 ? (
          <div className="cal-day-empty">No Events</div>
        ) : events.map((e, i) => (
          <div key={i} className="cal-event">
            <span className="cal-event-bar" />
            <div>
              <div className="cal-event-title">{e}</div>
              <div className="cal-event-time">All-day</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
