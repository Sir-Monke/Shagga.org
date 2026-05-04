'use client';

import React, { useEffect, useState } from 'react';

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

export default function Taskbar({ items, onTaskClick, onStartClick, startOpen }: Props) {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      const d = new Date();
      const hh = d.getHours();
      const mm = d.getMinutes().toString().padStart(2, '0');
      const ampm = hh >= 12 ? 'PM' : 'AM';
      const h12 = ((hh + 11) % 12) + 1;
      setTime(`${h12}:${mm} ${ampm}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
      <div className="xp-clock" suppressHydrationWarning>{time}</div>
    </div>
  );
}
