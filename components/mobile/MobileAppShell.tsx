'use client';
import React, { useEffect, useState } from 'react';
import type { MobileApp } from './appRegistry';

interface Props {
  app: MobileApp;
  onClose: () => void;
}

export const MobileAppShell: React.FC<Props> = ({ app, onClose }) => {
  const [animState, setAnimState] = useState<'enter' | 'idle'>('enter');

  useEffect(() => {
    const t = window.setTimeout(() => setAnimState('idle'), 20); // next tick
    return () => window.clearTimeout(t);
  }, []);

  const Body = app.Body;

  return (
    <div
      className={`ios-appshell ios-appshell-${animState} ios-appshell-nav-${app.navTheme ?? 'light'}`}
    >
      <div className="ios-appshell-navbar">
        <button className="ios-appshell-back" onClick={onClose} aria-label="Back to home">
          ‹
        </button>
        <h1 className="ios-appshell-title">{app.navTitle ?? app.name}</h1>
        <span className="ios-appshell-spacer" />
      </div>

      <div className="ios-appshell-body">
        <Body />
      </div>
    </div>
  );
};
