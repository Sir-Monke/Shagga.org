'use client';

import React, { useState } from 'react';

interface Props {
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  onOpen: () => void;
}

export default function DesktopIcon({ label, icon, x, y, onOpen }: Props) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`desktop-icon${selected ? ' selected' : ''}`}
      style={{ left: x, top: y }}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
      }}
      onDoubleClick={() => {
        onOpen();
        setSelected(false);
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        onOpen();
      }}
    >
      <div className="desktop-icon-img">{icon}</div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
}
