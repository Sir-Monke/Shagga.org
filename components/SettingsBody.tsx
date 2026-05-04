'use client';

import React from 'react';

export interface ShaggaSettings {
  popupsEnabled: boolean;
  spawnRate: 'slow' | 'normal' | 'fast';
  bsodEnabled: boolean;
  clippyEnabled: boolean;
}

export const DEFAULT_SETTINGS: ShaggaSettings = {
  popupsEnabled: true,
  spawnRate: 'normal',
  bsodEnabled: true,
  clippyEnabled: true,
};

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
            onClick={() => onChange({ popupsEnabled: false, bsodEnabled: false, clippyEnabled: false, spawnRate: 'normal' })}
            onMouseDown={(e) => e.stopPropagation()}
          >
            🔇 Quiet Mode (disable everything)
          </button>
          <button
            className="settings-btn settings-btn-chaos"
            onClick={() => onChange({ popupsEnabled: true, bsodEnabled: true, clippyEnabled: true, spawnRate: 'fast' })}
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
          settings save automatically. cheers legend.
        </div>
      </div>
    </div>
  );
}
