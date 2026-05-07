'use client';
import React, { useEffect, useState } from 'react';

interface Settings {
  wallpaper: 'classic' | 'lake';
  sounds: boolean;
  showNotifications: boolean;
  homeIndicatorAutoHide: boolean;
}

const DEFAULTS: Settings = {
  wallpaper: 'classic',
  sounds: true,
  showNotifications: true,
  homeIndicatorAutoHide: true,
};

const STORAGE_KEY = 'shagga-mobile-settings';

export function loadSettings(): Settings {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

export function saveSettings(s: Settings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    window.dispatchEvent(new CustomEvent('shagga:settings', { detail: s }));
  } catch {
    /* quota or similar — silently ignore */
  }
}

export const AppSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => { setSettings(loadSettings()); }, []);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    saveSettings(next);
  };

  const Toggle: React.FC<{ value: boolean; onChange: (v: boolean) => void }> = ({ value, onChange }) => (
    <button
      className={`mob-toggle ${value ? 'mob-toggle-on' : ''}`}
      onClick={() => onChange(!value)}
      aria-pressed={value}
    >
      <span className="mob-toggle-thumb" />
    </button>
  );

  return (
    <div className="mob-settings">
      <div className="mob-settings-section">
        <div className="mob-settings-section-title">WALLPAPER</div>
        <div className="mob-settings-list">
          {(['classic', 'lake'] as const).map((w) => (
            <button
              key={w}
              className="mob-settings-row"
              onClick={() => update('wallpaper', w)}
            >
              <span className="mob-settings-row-label">{w === 'classic' ? 'Classic Black' : 'Blue Marble'}</span>
              {settings.wallpaper === w && <span className="mob-settings-row-check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="mob-settings-section">
        <div className="mob-settings-section-title">GENERAL</div>
        <div className="mob-settings-list">
          <div className="mob-settings-row">
            <span className="mob-settings-row-label">System Sounds</span>
            <Toggle value={settings.sounds} onChange={(v) => update('sounds', v)} />
          </div>
          <div className="mob-settings-row">
            <span className="mob-settings-row-label">Notifications</span>
            <Toggle value={settings.showNotifications} onChange={(v) => update('showNotifications', v)} />
          </div>
          <div className="mob-settings-row">
            <span className="mob-settings-row-label">Auto-hide Home Indicator</span>
            <Toggle value={settings.homeIndicatorAutoHide} onChange={(v) => update('homeIndicatorAutoHide', v)} />
          </div>
        </div>
      </div>

      <div className="mob-settings-section">
        <div className="mob-settings-section-title">ABOUT</div>
        <div className="mob-settings-list">
          <div className="mob-settings-row">
            <span className="mob-settings-row-label">Version</span>
            <span className="mob-settings-row-value">1.0.0</span>
          </div>
          <div className="mob-settings-row">
            <span className="mob-settings-row-label">Made by</span>
            <span className="mob-settings-row-value">Sir Monke</span>
          </div>
          <div className="mob-settings-row">
            <span className="mob-settings-row-label">Open laptop version</span>
            <span className="mob-settings-row-value">try shagga.org on a laptop</span>
          </div>
        </div>
      </div>

      <p className="mob-settings-footer">
        the laptop version is a full Windows XP. trust.
      </p>
    </div>
  );
};
