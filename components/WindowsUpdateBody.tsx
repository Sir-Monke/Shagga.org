'use client';

import React, { useState } from 'react';

export default function WindowsUpdateBody() {
  const [stage, setStage] = useState<'prompt' | 'installing' | 'failed'>('prompt');
  const [pct, setPct] = useState(0);

  function install() {
    setStage('installing');
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 7;
      if (p >= 99) {
        setPct(99);
        clearInterval(id);
        setTimeout(() => setStage('failed'), 1500);
      } else {
        setPct(p);
      }
    }, 250);
  }

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="update-block">
        <div className="update-header">
          <span className="update-icon">⚙</span>
          <div>
            <div style={{ fontWeight: 'bold' }}>ShaggaOS Critical Update</div>
            <div style={{ fontSize: 11, color: '#444' }}>Service Pack 3 — Required</div>
          </div>
        </div>

        {stage === 'prompt' && (
          <>
            <p>A critical update is available for your computer:</p>
            <ul style={{ paddingLeft: 18, margin: '6px 0', fontSize: 11 }}>
              <li>KB047289 — Adds new shaggas to the registry</li>
              <li>KB088234 — Fixes maggie swoop hitbox</li>
              <li>KB092001 — Includes 47 new snag emojis</li>
              <li>KB011001 — Removes ability to ever stop believing</li>
            </ul>
            <p style={{ color: '#cc0000' }}>Failure to install may result in becoming a nuffie.</p>
            <div className="update-actions">
              <button className="xp-btn" onClick={() => setStage('failed')}>Remind Me Later (rude)</button>
              <button className="xp-btn xp-btn-primary" onClick={install}>Install Now</button>
            </div>
          </>
        )}

        {stage === 'installing' && (
          <>
            <p>Installing update... DO NOT TURN OFF YOUR COMPUTER.</p>
            <div className="norton-progress" style={{ marginTop: 10 }}>
              <div className="norton-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <p style={{ marginTop: 8, fontSize: 11 }}>Step {Math.floor(pct / 12) + 1} of 8: {[
              'Downloading shagga drivers',
              'Replacing system32',
              'Installing extra magpies',
              'Calibrating the snag-o-meter',
              'Bricking the BIOS',
              'Embracing the chaos',
              'Phoning your nan',
              'Final touches',
            ][Math.min(7, Math.floor(pct / 12))]}...</p>
          </>
        )}

        {stage === 'failed' && (
          <>
            <p style={{ color: '#cc0000', fontWeight: 'bold' }}>Update failed.</p>
            <p>The update could not be installed because, well, ur computer just isnt shagga enough mate.</p>
            <p style={{ fontSize: 11, marginTop: 6 }}>Error code: 0xSHAGGA_FAIL_47</p>
          </>
        )}
      </div>
    </div>
  );
}
