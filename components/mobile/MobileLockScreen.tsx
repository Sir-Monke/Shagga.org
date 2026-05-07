'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';

interface Props {
  onUnlock: () => void;
  time: string;
  date: string;
}

export const MobileLockScreen: React.FC<Props> = ({ onUnlock, time, date }) => {
  const [dragX, setDragX] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef<number | null>(null);
  const trackWidthRef = useRef<number>(0);

  // Recompute track width on mount + resize
  useEffect(() => {
    const update = () => {
      if (trackRef.current) {
        trackWidthRef.current = trackRef.current.offsetWidth - 70; // minus knob width
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleStart = useCallback((clientX: number) => {
    startXRef.current = clientX - dragX;
  }, [dragX]);

  const handleMove = useCallback((clientX: number) => {
    if (startXRef.current === null) return;
    const next = clientX - startXRef.current;
    const max = trackWidthRef.current;
    setDragX(Math.max(0, Math.min(max, next)));
  }, []);

  const handleEnd = useCallback(() => {
    if (startXRef.current === null) return;
    startXRef.current = null;
    const max = trackWidthRef.current;
    if (dragX > max * 0.78) {
      // Crossed the threshold — unlock!
      setDragX(max);
      setTimeout(() => onUnlock(), 200);
    } else {
      // Snap back
      setDragX(0);
    }
  }, [dragX, onUnlock]);

  return (
    <div className="ios-lock">
      <div className="ios-lock-clock">
        <div className="ios-lock-time">{time}</div>
        <div className="ios-lock-date">{date}</div>
      </div>

      <div className="ios-lock-greeting">
        <p>welcome to shagga.org</p>
        <p className="ios-lock-greeting-sub">slide to unlock, legend</p>
      </div>

      <div className="ios-lock-slider">
        <div
          className="ios-lock-track"
          ref={trackRef}
        >
          <span className="ios-lock-track-text" style={{ opacity: 1 - dragX / Math.max(1, trackWidthRef.current * 0.7) }}>
            ▸ slide to unlock
          </span>
          <button
            className="ios-lock-knob"
            style={{ transform: `translateX(${dragX}px)` }}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => { if (startXRef.current !== null) handleMove(e.clientX); }}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            aria-label="Slide to unlock"
          >
            ▸
          </button>
        </div>
      </div>
    </div>
  );
};
