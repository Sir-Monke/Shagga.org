'use client';

import React, { useEffect, useState } from 'react';

const FILES = [
  { name: 'shagga_album_FULL_LEAK.zip',          size: '4.7 GB',   src: 'KazaaShagga99' },
  { name: 'how_to_be_top_shagga_TUTORIAL.mp4',   size: '1.2 GB',   src: 'top_legend_82' },
  { name: 'snags_on_the_barbie.mp3',             size: '2.3 MB',   src: 'BBQ_KING_4_REAL' },
  { name: 'magpie_swoop_compilation.avi',        size: '8.1 GB',   src: 'maggie_l0ver' },
  { name: 'NEVER_GONNA_GIVE_YOU_UP_NOT_A_RICK.mp3', size: '3.4 MB', src: 'totally_legit' },
];

export default function LimewireBody() {
  const [progress, setProgress] = useState(() => Array(FILES.length).fill(0).map(() => Math.random() * 30));
  const [hours, setHours] = useState(47);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) =>
        p.map((v) => Math.max(0, v + (Math.random() - 0.45) * 4))
      );
      setHours((h) => h + Math.floor(Math.random() * 5) - 1);
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="lime-block">
        <div className="lime-header">
          <span className="lime-logo">🍋</span>
          <span style={{ fontWeight: 'bold' }}>LimeShagga 4.18.8</span>
          <span style={{ marginLeft: 'auto', fontSize: 11 }}>Time remaining: <strong>{hours}h</strong></span>
        </div>
        <table className="lime-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Size</th>
              <th>Progress</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {FILES.map((f, i) => (
              <tr key={f.name}>
                <td>{f.name}</td>
                <td>{f.size}</td>
                <td>
                  <div className="lime-bar">
                    <div className="lime-bar-fill" style={{ width: `${Math.min(99, progress[i])}%` }} />
                  </div>
                  <span className="lime-pct">{Math.floor(progress[i])}%</span>
                </td>
                <td style={{ color: '#0066aa' }}>{f.src}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lime-warn">⚠ This file is definitely not a virus, mate. Send it.</div>
      </div>
    </div>
  );
}
