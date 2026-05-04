'use client';

import React, { useEffect } from 'react';

interface Props {
  onComplete: () => void;
  duration?: number;
}

export default function BSOD({ onComplete, duration = 4000 }: Props) {
  useEffect(() => {
    const id = setTimeout(onComplete, duration);
    return () => clearTimeout(id);
  }, [onComplete, duration]);

  return (
    <div className="bsod">
      <div className="bsod-inner">
        <p>A problem has been detected and Shagga has been shut down to prevent damage to ur computer.</p>
        <p style={{ fontWeight: 'bold' }}>SHAGGA_OVERLOAD_DETECTED</p>
        <p>If this is the first time you&apos;ve seen this Stop error screen, restart ur computer. If this screen appears again, follow these steps:</p>
        <p>Stop bein such a top shagga, mate. The system can&apos;t handle it.</p>

        <p style={{ marginTop: 18 }}>Technical information:</p>
        <p>*** STOP: 0x000000FA (0xC000ABCD, 0xDEADBEEF, 0xCAFEBABE, 0x000B33R)</p>
        <p>*** SHAGGAOS.SYS — Address F00DBEEF base at F0000000</p>

        <p style={{ marginTop: 18 }}>Beginning dump of physical shagga...</p>
        <p>Physical shagga dump complete.</p>
        <p>Contact ur system administrator (it&apos;s u, ur the admin).</p>

        <p style={{ marginTop: 22 }}>
          rebooting in a sec mate<span className="bsod-blink">_</span>
        </p>
      </div>
    </div>
  );
}
