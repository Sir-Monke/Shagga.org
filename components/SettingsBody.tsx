'use client';

import React from 'react';

export type WallpaperId =
  | 'bliss' | 'sunset' | 'ocean' | 'galaxy' | 'forest'
  | 'noir' | 'pink' | 'matrix';

export interface ShaggaSettings {
  popupsEnabled: boolean;
  spawnRate: 'slow' | 'normal' | 'fast';
  bsodEnabled: boolean;
  clippyEnabled: boolean;
  wallpaper: WallpaperId;
}

export const DEFAULT_SETTINGS: ShaggaSettings = {
  popupsEnabled: true,
  spawnRate: 'normal',
  bsodEnabled: true,
  clippyEnabled: true,
  wallpaper: 'bliss',
};

const WALLPAPERS: { id: WallpaperId; name: string; preview: string }[] = [
  { id: 'bliss',  name: 'Bliss',         preview: 'linear-gradient(to bottom, #5392d6 0%, #6cb344 60%, #468a2c 100%)' },
  { id: 'sunset', name: 'Sunset',        preview: 'linear-gradient(to bottom, #ff7e5f 0%, #feb47b 50%, #ffd194 100%)' },
  { id: 'ocean',  name: 'Ocean',         preview: 'linear-gradient(to bottom, #2c5364 0%, #203a43 50%, #0f2027 100%)' },
  { id: 'galaxy', name: 'Galaxy',        preview: 'linear-gradient(to bottom, #1a0033 0%, #4a148c 50%, #1a0033 100%)' },
  { id: 'forest', name: 'Forest',        preview: 'linear-gradient(to bottom, #134e5e 0%, #71b280 100%)' },
  { id: 'noir',   name: 'Noir',          preview: 'linear-gradient(to bottom, #232526 0%, #414345 100%)' },
  { id: 'pink',   name: 'Bubblegum',     preview: 'linear-gradient(to bottom, #ff6e7f 0%, #bfe9ff 100%)' },
  { id: 'matrix', name: 'Matrix',        preview: 'linear-gradient(to bottom, #000 0%, #003b00 100%)' },
];

interface Props {
  settings: ShaggaSettings;
  onChange: (settings: ShaggaSettings) => void;
}

export default function SettingsBody({ settings, onChange }: Props) {
  const update = (patch: Partial<ShaggaSettings>) => onChange({ ...settings, ...patch });

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="settings-block">
        <div className="settings-banner">⚙ ShaggaOS Control Panel</div>

        <div className="settings-section">
          <div className="settings-section-title">Wallpaper</div>
          <div className="settings-wallpapers">
            {WALLPAPERS.map((w) => (
              <button
                key={w.id}
                className={`settings-wallpaper${settings.wallpaper === w.id ? ' active' : ''}`}
                onClick={() => update({ wallpaper: w.id })}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="settings-wallpaper-preview" style={{ background: w.preview }} />
                <div className="settings-wallpaper-name">{w.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Popup Spawning</div>
          <label className="settings-row">
            <input
              type="checkbox"
              checked={settings.popupsEnabled}
              onChange={(e) => update({ popupsEnabled: e.target.checked })}
              onMouseDown={(e) => e.stopPropagation()}
            />
            <span>Auto-spawn random popups</span>
          </label>
          <div className="settings-radio-group">
            <div className="settings-radio-label">Spawn rate:</div>
            {(['slow', 'normal', 'fast'] as const).map((rate) => (
              <label key={rate} className={`settings-radio${!settings.popupsEnabled ? ' disabled' : ''}`}>
                <input
                  type="radio"
                  name="rate"
                  checked={settings.spawnRate === rate}
                  disabled={!settings.popupsEnabled}
                  onChange={() => update({ spawnRate: rate })}
                  onMouseDown={(e) => e.stopPropagation()}
                />
                <span>{rate}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Other Chaos</div>
          <label className="settings-row">
            <input
              type="checkbox"
              checked={settings.bsodEnabled}
              onChange={(e) => update({ bsodEnabled: e.target.checked })}
              onMouseDown={(e) => e.stopPropagation()}
            />
            <span>Random Blue Screen of Shagga (every 4–8 mins)</span>
          </label>
          <label className="settings-row">
            <input
              type="checkbox"
              checked={settings.clippyEnabled}
              onChange={(e) => update({ clippyEnabled: e.target.checked })}
              onMouseDown={(e) => e.stopPropagation()}
            />
            <span>Show Clippy</span>
          </label>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Presets</div>
          <button
            className="settings-btn"
            onClick={() => onChange({ ...settings, popupsEnabled: false, bsodEnabled: false, clippyEnabled: false, spawnRate: 'normal' })}
            onMouseDown={(e) => e.stopPropagation()}
          >
            🔇 Quiet Mode (disable everything)
          </button>
          <button
            className="settings-btn settings-btn-chaos"
            onClick={() => onChange({ ...settings, popupsEnabled: true, bsodEnabled: true, clippyEnabled: true, spawnRate: 'fast' })}
            onMouseDown={(e) => e.stopPropagation()}
          >
            🌪️ CHAOS MODE
          </button>
          <button
            className="settings-btn"
            onClick={() => onChange(DEFAULT_SETTINGS)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            ↺ Reset to defaults
          </button>
        </div>

        <div className="settings-foot">
          settings save automatically.
        </div>
      </div>
    </div>
  );
}
