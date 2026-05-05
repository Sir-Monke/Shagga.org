'use client';

import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'shagga-last-greggs';

export default function SnagCounter() {
  // Stored ISO timestamp of last greggs visit
  const [lastVisit, setLastVisit] = useState<number | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());
  const [showMenu, setShowMenu] = useState(false);

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const t = parseInt(raw, 10);
        if (!isNaN(t)) setLastVisit(t);
      } else {
        // First visit: seed it 1-5 days ago so the widget isn't boring
        const seed = Date.now() - (1 + Math.random() * 4) * 86400000;
        localStorage.setItem(STORAGE_KEY, String(seed));
        setLastVisit(seed);
      }
    } catch {}
  }, []);

  // Tick every minute so the counter updates if it crosses midnight
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const days = lastVisit == null ? 0 : Math.floor((now - lastVisit) / 86400000);
  const concerning = days >= 4;

  const reset = () => {
    const t = Date.now();
    try { localStorage.setItem(STORAGE_KEY, String(t)); } catch {}
    setLastVisit(t);
    setShowMenu(false);
  };

  const setDaysAgo = (n: number) => {
    const t = Date.now() - n * 86400000;
    try { localStorage.setItem(STORAGE_KEY, String(t)); } catch {}
    setLastVisit(t);
    setShowMenu(false);
  };

  let sub = '';
  if (days === 0) sub = 'sausage roll secured';
  else if (days === 1) sub = "you'll cope";
  else if (days === 2) sub = 'getting twitchy';
  else if (days === 3) sub = 'craving has begun';
  else if (days === 4) sub = 'concerning, mate';
  else if (days === 5) sub = 'how are u functioning';
  else if (days === 6) sub = 'situation: dire';
  else sub = 'go to greggs immediately';

  return (
    <div className="snag-widget" onClick={(e) => { e.stopPropagation(); setShowMenu((v) => !v); }}>
      <div className="snag-widget-title">⚠ DAYS SINCE LAST GREGGS</div>
      <div className={`snag-widget-num${concerning ? ' concerning' : ''}`}>{days}</div>
      <div className="snag-widget-sub">{sub}</div>
      {showMenu && (
        <div className="snag-widget-menu" onClick={(e) => e.stopPropagation()}>
          <button className="snag-menu-btn primary" onClick={reset}>Just had one — reset</button>
          <button className="snag-menu-btn" onClick={() => setDaysAgo(1)}>It was yesterday</button>
          <button className="snag-menu-btn" onClick={() => setDaysAgo(7)}>It was last week</button>
          <button className="snag-menu-btn" onClick={() => setShowMenu(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
