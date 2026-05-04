'use client';

import React from 'react';

export interface ContextMenuItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  bold?: boolean;
}

interface Props {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: Props) {
  return (
    <>
      <div className="ctx-overlay" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
      <div className="ctx-menu" style={{ left: x, top: y }} onMouseDown={(e) => e.stopPropagation()}>
        {items.map((it, i) =>
          it.divider ? (
            <div key={i} className="ctx-divider" />
          ) : (
            <button
              key={i}
              className={`ctx-item${it.disabled ? ' disabled' : ''}${it.bold ? ' bold' : ''}`}
              disabled={it.disabled}
              onClick={() => {
                if (!it.disabled && it.onClick) it.onClick();
                onClose();
              }}
            >
              {it.label}
            </button>
          )
        )}
      </div>
    </>
  );
}
