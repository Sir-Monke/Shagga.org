'use client';

import React, { useState } from 'react';

export function MyShaggaBody() {
  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="folder-block">
        <div className="folder-section">
          <div className="folder-section-title">Hard Disk Drives</div>
          <div className="folder-grid">
            <div className="folder-item">
              <div className="folder-icon" style={{ background: '#cccc99' }}>💾</div>
              <div>Local Disk (C:)</div>
              <div className="folder-meta">47.0 GB free of 47.0 GB</div>
            </div>
            <div className="folder-item">
              <div className="folder-icon" style={{ background: '#cccc99' }}>💾</div>
              <div>Shagga Drive (S:)</div>
              <div className="folder-meta">∞ snags free</div>
            </div>
          </div>
        </div>
        <div className="folder-section">
          <div className="folder-section-title">Devices with Removable Storage</div>
          <div className="folder-grid">
            <div className="folder-item">
              <div className="folder-icon">💿</div>
              <div>CD Drive (D:)</div>
              <div className="folder-meta">SHAGGA_GREATEST_HITS</div>
            </div>
            <div className="folder-item">
              <div className="folder-icon">📁</div>
              <div>Floppy (A:)</div>
              <div className="folder-meta">tax_returns_v3.bak</div>
            </div>
          </div>
        </div>
        <div className="folder-section">
          <div className="folder-section-title">System Info</div>
          <div style={{ padding: '6px 10px', fontSize: 11 }}>
            <div>OS: ShaggaOS Service Pack 47</div>
            <div>Processor: 2 × Snag™ @ 1.21 GHz</div>
            <div>Memory: 256 MB Goon</div>
            <div>Vibe: immaculate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecycleBinBody() {
  const [items, setItems] = useState([
    { name: 'evidence.zip',         size: '4.7 MB',  src: 'C:\\Users\\Owner\\Desktop' },
    { name: 'tax_return_2003.doc',  size: '12 KB',   src: 'C:\\Documents' },
    { name: 'sober_thoughts.txt',   size: '0 KB',    src: 'C:\\Users\\Owner' },
    { name: 'jess_phone_number.txt', size: '47 B',   src: 'C:\\Documents\\old' },
    { name: 'self_respect.dat',     size: '???',     src: 'C:\\Windows' },
    { name: 'IMG_0473.jpg',         size: '2.1 MB',  src: 'C:\\Users\\Owner\\Pictures' },
    { name: 'apology_to_nan.docx',  size: '88 KB',   src: 'C:\\Documents' },
  ]);

  function empty() {
    setItems([]);
  }

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="folder-block">
        <div style={{ padding: '6px 8px', borderBottom: '1px solid #aca899', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11 }}>{items.length} item(s)</span>
          {items.length > 0 && <button className="xp-btn" onClick={empty}>Empty Recycle Bin</button>}
        </div>
        {items.length === 0 ? (
          <div style={{ padding: 30, textAlign: 'center', fontSize: 12, color: '#666' }}>
            🗑️ The Recycle Bin is empty.<br />
            <span style={{ fontSize: 10 }}>(every shagga deserves a clean slate)</span>
          </div>
        ) : (
          <div style={{ padding: '4px 6px' }}>
            <table className="folder-table">
              <thead>
                <tr><th>Name</th><th>Original Location</th><th>Size</th></tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.name}>
                    <td>📄 {it.name}</td>
                    <td>{it.src}</td>
                    <td>{it.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function TaxReturnsBody() {
  const [count, setCount] = useState(0);

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div style={{ padding: 20, background: '#ece9d8', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <div style={{ fontSize: 48 }}>🚨</div>
        <h2 style={{ color: '#cc0000', textAlign: 'center', margin: 0 }}>ACCESS DENIED</h2>
        <p style={{ textAlign: 'center', fontSize: 12, maxWidth: 280, lineHeight: 1.5 }}>
          You do not have permission to view this folder, mate.
        </p>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#444', maxWidth: 280, lineHeight: 1.5 }}>
          Your IP address has been logged. {count > 0 && `(${count} time${count === 1 ? '' : 's'} now, mate.)`}<br />
          The ATO has been notified. {count >= 3 && '47 magpies have been dispatched.'}
        </p>
        <button
          className="xp-btn xp-btn-primary"
          onClick={() => setCount((c) => c + 1)}
          onMouseDown={(e) => e.stopPropagation()}
        >
          Try Again Anyway
        </button>
        {count >= 5 && (
          <p style={{ color: '#cc0000', fontWeight: 'bold', fontSize: 11, textAlign: 'center', marginTop: 8 }}>
            mate i swear to god if u click that button one more time
          </p>
        )}
      </div>
    </div>
  );
}
