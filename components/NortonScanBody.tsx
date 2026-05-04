'use client';

import React, { useEffect, useState } from 'react';

const SHAGGA_FILES = [
  'C:\\Windows\\System32\\shagga_core.dll',
  'C:\\Program Files\\Shagga\\snag.exe',
  'C:\\Users\\Owner\\Documents\\tax_returns_DO_NOT_OPEN.txt',
  'C:\\Users\\Owner\\AppData\\Roaming\\Shagga\\.cookies',
  'C:\\Windows\\Drivers\\maggie_swoop_v2.sys',
  'C:\\Program Files\\GoonBag\\cask.dat',
  'C:\\Users\\Owner\\Pictures\\thong_collection_007.jpg',
  'C:\\Windows\\System32\\BunningsSnag.exe',
  'C:\\ProgramData\\Shagga\\registry_breach.shg',
  'C:\\Users\\Owner\\Desktop\\evidence.zip',
];

export default function NortonScanBody() {
  const [scanned, setScanned] = useState(0);
  const [foundIdx, setFoundIdx] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const total = 9347;

  useEffect(() => {
    const id = setInterval(() => {
      setScanned((s) => {
        const next = Math.min(total, s + Math.floor(Math.random() * 200) + 50);
        if (next >= total) {
          setDone(true);
          clearInterval(id);
        }
        return next;
      });
      setFoundIdx((f) => {
        if (f.length >= SHAGGA_FILES.length) return f;
        if (Math.random() < 0.6) return [...f, f.length];
        return f;
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  const pct = Math.min(100, Math.floor((scanned / total) * 100));

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="norton-block">
        <div className="norton-header">
          <div className="norton-logo">⊙</div>
          <div>
            <div className="norton-title">Norton AntiShagga 2003</div>
            <div className="norton-sub">{done ? 'Scan complete!' : 'Scanning your computer...'}</div>
          </div>
        </div>
        <div className="norton-progress">
          <div className="norton-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="norton-stats">
          <span>Scanned: <strong>{scanned.toLocaleString()}</strong> / {total.toLocaleString()}</span>
          <span style={{ color: '#cc0000' }}>Threats: <strong>{foundIdx.length}</strong></span>
        </div>
        <div className="norton-list">
          {foundIdx.map((i) => (
            <div key={i} className="norton-list-item">
              <span style={{ color: '#cc0000' }}>⚠</span>
              <span>{SHAGGA_FILES[i]}</span>
              <span className="norton-tag">SHAGGA.GEN</span>
            </div>
          ))}
        </div>
        {done && (
          <div className="norton-actions">
            <button className="xp-btn">Quarantine</button>
            <button className="xp-btn xp-btn-primary">Embrace Shagga</button>
          </div>
        )}
      </div>
    </div>
  );
}
