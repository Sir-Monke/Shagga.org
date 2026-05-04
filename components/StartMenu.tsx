'use client';

import React from 'react';

export interface StartMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  bold?: boolean;
}

interface Props {
  open: boolean;
  leftItems: StartMenuItem[];
  rightItems: StartMenuItem[];
  onClose: () => void;
  onTurnOff: () => void;
  onLogOff: () => void;
}

export default function StartMenu({ open, leftItems, rightItems, onClose, onTurnOff, onLogOff }: Props) {
  if (!open) return null;

  return (
    <>
      <div className="start-overlay" onClick={onClose} />
      <div className="start-menu" onMouseDown={(e) => e.stopPropagation()}>
        <div className="start-menu-header">
          <div className="start-avatar">🦘</div>
          <div className="start-username">Shagga</div>
        </div>
        <div className="start-menu-body">
          <div className="start-col start-col-left">
            {leftItems.map((it) => (
              <button
                key={it.id}
                className={`start-item${it.bold ? ' start-item-bold' : ''}`}
                onClick={() => { onClose(); it.onClick(); }}
              >
                <span className="start-item-icon">{it.icon}</span>
                <span>{it.label}</span>
              </button>
            ))}
          </div>
          <div className="start-col start-col-right">
            {rightItems.map((it) => (
              <button
                key={it.id}
                className="start-item start-item-light"
                onClick={() => { onClose(); it.onClick(); }}
              >
                <span className="start-item-icon">{it.icon}</span>
                <span>{it.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="start-menu-footer">
          <button className="start-foot-btn" onClick={() => { onClose(); onLogOff(); }}>
            <span style={{ fontSize: 18 }}>🔒</span>
            <span>Log Off</span>
          </button>
          <button className="start-foot-btn" onClick={() => { onClose(); onTurnOff(); }}>
            <span style={{ fontSize: 18 }}>⏻</span>
            <span>Turn Off Computer</span>
          </button>
        </div>
      </div>
    </>
  );
}
