'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Magpie {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function MagpieGameBody() {
  const [score, setScore] = useState(0);
  const [magpies, setMagpies] = useState<Magpie[]>([]);
  const [time, setTime] = useState(30);
  const [running, setRunning] = useState(false);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function start() {
    setScore(0);
    setTime(30);
    setMagpies([]);
    setRunning(true);
  }

  // game timer
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // spawn magpies
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const c = containerRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      idRef.current += 1;
      setMagpies((m) => [
        ...m,
        {
          id: idRef.current,
          x: Math.random() * (rect.width - 50),
          y: Math.random() * (rect.height - 50),
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
        },
      ]);
    }, 700);
    return () => clearInterval(id);
  }, [running]);

  // animate
  useEffect(() => {
    if (!running) return;
    let raf: number;
    function frame() {
      const c = containerRef.current;
      if (!c) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const rect = c.getBoundingClientRect();
      setMagpies((mags) =>
        mags
          .map((m) => {
            let nx = m.x + m.vx;
            let ny = m.y + m.vy;
            let nvx = m.vx;
            let nvy = m.vy;
            if (nx < 0 || nx > rect.width - 50) nvx = -nvx;
            if (ny < 0 || ny > rect.height - 50) nvy = -nvy;
            return { ...m, x: nx, y: ny, vx: nvx, vy: nvy };
          })
          .slice(-15)
      );
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  function punt(id: number) {
    setScore((s) => s + 1);
    setMagpies((m) => m.filter((x) => x.id !== id));
  }

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="magpie-block">
        <div className="magpie-hud">
          <span>Score: <strong>{score}</strong></span>
          <span>Time: <strong>{time}s</strong></span>
          {!running && <button className="xp-btn xp-btn-primary" onClick={start}>{score > 0 ? 'Play Again' : 'PUNT EM'}</button>}
        </div>
        <div className="magpie-field" ref={containerRef}>
          {!running && score === 0 && (
            <div className="magpie-overlay">
              <h3>PUNT THE MAGPIE</h3>
              <p>maggies are swoopin. click em b4 they get u.</p>
              <p style={{ fontSize: 11 }}>30 seconds, all the punts u can land.</p>
            </div>
          )}
          {!running && score > 0 && (
            <div className="magpie-overlay">
              <h3>{score >= 20 ? '🏆 LEGEND' : score >= 10 ? '👍 not bad mate' : '😬 ur cooked'}</h3>
              <p>final score: <strong>{score}</strong> magpies punted</p>
            </div>
          )}
          {magpies.map((m) => (
            <button
              key={m.id}
              className="magpie"
              style={{ left: m.x, top: m.y }}
              onClick={() => punt(m.id)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => { e.stopPropagation(); punt(m.id); }}
            >
              🪶
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
