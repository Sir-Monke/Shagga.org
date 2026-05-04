'use client';

import React, { useEffect, useState } from 'react';

interface FallingItem {
  id: number;
  x: number;
  delay: number;
  duration: number;
  emoji: string;
}

const RAIN_EMOJI = ['🦘', '🍖', '🪶', '🍺', '🌭', '🤙', '🐊', '🥩', '🌶️'];

interface Props {
  onClose: () => void;
}

export default function RaveMode({ onClose }: Props) {
  const [items, setItems] = useState<FallingItem[]>([]);

  useEffect(() => {
    const next: FallingItem[] = [];
    for (let i = 0; i < 60; i++) {
      next.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
        emoji: RAIN_EMOJI[Math.floor(Math.random() * RAIN_EMOJI.length)],
      });
    }
    setItems(next);
  }, []);

  return (
    <div className="rave">
      <div className="rave-bg" />
      {items.map((it) => (
        <div
          key={it.id}
          className="rave-fall"
          style={{
            left: `${it.x}%`,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.duration}s`,
          }}
        >
          {it.emoji}
        </div>
      ))}
      <div className="rave-text">SHAGGA MODE ENGAGED</div>
      <button className="rave-close" onClick={onClose}>turn off the lights</button>
    </div>
  );
}
