'use client';

import React, { useEffect, useState } from 'react';

interface PCInfo {
  os: string;
  userAgent: string;
  language: string;
  screen: string;
  cores: number | string;
  memory: string;
}

const SKULL = `
       _____
      /     \\
     | () () |
      \\  ^  /
       |||||
       |||||
`;

export default function ShaggaHackerBody() {
  const [info, setInfo] = useState<PCInfo | null>(null);

  useEffect(() => {
    const nav: any = navigator;
    setInfo({
      os: nav.platform || 'Unknown',
      userAgent: nav.userAgent || 'Unknown',
      language: nav.language || 'en',
      screen: `${window.screen.width} x ${window.screen.height}`,
      cores: nav.hardwareConcurrency ?? '?',
      memory: nav.deviceMemory ? `${nav.deviceMemory} GB` : 'redacted',
    });
  }, []);

  return (
    <div className="xp-content" style={{ padding: 0, background: '#000' }}>
      <div className="shagga-hacker-block">
        <pre className="ascii-skull">{SKULL}</pre>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span className="label">[ HACKA SHAGGA SEES U ]</span>
        </div>
        {info && (
          <div>
            <div><span className="label">{'> os         :'}</span> <span className="value">{info.os}</span></div>
            <div><span className="label">{'> language   :'}</span> <span className="value">{info.language}</span></div>
            <div><span className="label">{'> screen     :'}</span> <span className="value">{info.screen}</span></div>
            <div><span className="label">{'> cpu cores  :'}</span> <span className="value">{info.cores}</span></div>
            <div><span className="label">{'> ram        :'}</span> <span className="value">{info.memory}</span></div>
            <div style={{ marginTop: 6 }}>
              <span className="label">{'> agent      :'}</span>{' '}
              <span className="value">{info.userAgent}</span>
            </div>
            <div style={{ marginTop: 10 }}>
              <span className="label">{'> shagga.exe is watching'}</span>
              <span className="blink-cursor" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
