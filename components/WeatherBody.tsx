'use client';

import React, { useEffect, useState } from 'react';

const VERDICTS = [
  { emoji: '☀️', label: 'SCORCHER, MATE',    sub: '47°C in the shade' },
  { emoji: '🔥', label: 'BLOODY ROASTING',    sub: 'pavement could fry an egg' },
  { emoji: '☀️', label: 'STILL A SCORCHER',   sub: 'put on a hat ya galah' },
  { emoji: '🥵', label: 'COOKED OUT THERE',   sub: 'stay inside w/ the AC on' },
  { emoji: '🌞', label: "she's a hot one",    sub: 'classic aussie summer' },
  { emoji: '☀️', label: 'WARM-ISH',           sub: 'still a scorcher tho' },
];

export default function WeatherBody() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % VERDICTS.length), 3000);
    return () => clearInterval(id);
  }, []);
  const v = VERDICTS[idx];
  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="weather-block">
        <div className="weather-emoji">{v.emoji}</div>
        <div className="weather-label">{v.label}</div>
        <div className="weather-sub">{v.sub}</div>
        <div className="weather-forecast">
          <div>Tomorrow: <strong>scorcher</strong></div>
          <div>Day after: <strong>scorcher</strong></div>
          <div>This weekend: <strong>scorcher</strong></div>
          <div>Rest of life: <strong>scorcher</strong></div>
        </div>
      </div>
    </div>
  );
}
