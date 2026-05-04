'use client';

import React, { useEffect, useRef, useState } from 'react';

const TIPS = [
  "It looks like you're trying to be a top shagga. Want help, mate?",
  "Pro tip: never trust a magpie holdin a pen.",
  "Have you considered putting a snag on the barbie? It's about that time.",
  "I see you're opening a lot of windows. Like, a LOT. You good?",
  "Friendly reminder: it's bin night.",
  "Did u remember to drink some water today, mate? It's been a while.",
  "Pssst. The Konami code does something. (just sayin.)",
  "Right-click the desktop. Trust me. Big shagga energy.",
  "Click that .txt file on the desktop. It will change ur life or whatever.",
  "U look great today legend. Carry on.",
  "It looks like you're being a fat neek. Want me to convert u to a shagga?",
];

interface Props {
  onClose: () => void;
}

export default function Clippy({ onClose }: Props) {
  const [tip, setTip] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const initRef = useRef(false);

  // initial position once mounted
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    setPos({
      x: window.innerWidth - 180,
      y: window.innerHeight - 200,
    });
  }, []);

  // periodically show a new tip
  useEffect(() => {
    if (hidden) return;
    function showTip() {
      setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
      setTimeout(() => setTip(null), 9000);
    }
    const first = setTimeout(showTip, 4500);
    const id = setInterval(showTip, 22000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [hidden]);

  // dragging
  useEffect(() => {
    function move(e: MouseEvent | TouchEvent) {
      if (!dragging.current) return;
      const p = 'touches' in e ? e.touches[0] : e;
      if (!p) return;
      setPos({
        x: Math.min(window.innerWidth - 80, Math.max(0, p.clientX - dragOffset.current.x)),
        y: Math.min(window.innerHeight - 80, Math.max(0, p.clientY - dragOffset.current.y)),
      });
    }
    function up() { dragging.current = false; }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, []);

  function startDrag(e: React.MouseEvent | React.TouchEvent) {
    const p = 'touches' in e ? e.touches[0] : e;
    if (!p) return;
    dragging.current = true;
    dragOffset.current = { x: p.clientX - pos.x, y: p.clientY - pos.y };
  }

  if (hidden) return null;
  if (pos.x === 0 && pos.y === 0) return null;

  return (
    <div className="clippy-wrap" style={{ left: pos.x, top: pos.y }}>
      {tip && (
        <div className="clippy-bubble">
          <button className="clippy-close" onClick={() => { setHidden(true); onClose(); }} aria-label="dismiss">×</button>
          <p>{tip}</p>
          <div className="clippy-bubble-tail" />
        </div>
      )}
      <div className="clippy" onMouseDown={startDrag} onTouchStart={startDrag}>
        <svg viewBox="0 0 80 100" width="70" height="90" xmlns="http://www.w3.org/2000/svg">
          {/* paperclip body */}
          <path
            d="M 30 10 Q 22 10 22 22 L 22 70 Q 22 82 35 82 Q 47 82 47 70 L 47 30 Q 47 22 40 22 Q 33 22 33 30 L 33 60"
            fill="none" stroke="#888" strokeWidth="6" strokeLinecap="round"
          />
          <path
            d="M 30 10 Q 22 10 22 22 L 22 70 Q 22 82 35 82 Q 47 82 47 70 L 47 30 Q 47 22 40 22 Q 33 22 33 30 L 33 60"
            fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round"
          />
          {/* eyes */}
          <ellipse cx="28" cy="35" rx="4" ry="6" fill="white" stroke="#000" strokeWidth="1" />
          <ellipse cx="40" cy="35" rx="4" ry="6" fill="white" stroke="#000" strokeWidth="1" />
          <circle cx="28" cy="36" r="2" fill="#000" />
          <circle cx="40" cy="36" r="2" fill="#000" />
          {/* eyebrows (cocky) */}
          <path d="M 24 28 L 32 26" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 36 26 L 44 28" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
