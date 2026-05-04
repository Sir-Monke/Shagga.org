'use client';

import React from 'react';

export default function MobileBlock() {
  return (
    <div className="mobile-block">
      <div className="mobile-block-inner">
        <h1>:(</h1>
        <p>
          A problem has been detected and Shagga.org has been shut down to
          prevent damage to your dignity.
        </p>
        <p><strong>SHAGGA_DEVICE_TOO_SMOL</strong></p>

        <p>
          Listen mate, we love ya, but this site is for proper computers only.
          Get on a laptop or an iPad and try again. Phones aren&apos;t shagga
          enough.
        </p>

        <p>
          If this is the first time you&apos;ve seen this Stop error screen,
          stop being a fat neek and grab a real device.
        </p>

        <p className="hint">
          Technical information:
          <br />
          *** STOP: 0x000000FA (0xC000ABCD, 0xDEADBEEF, 0xCAFEBABE, 0x00000B33R)
          <br />
          *** SHAGGAOS.SYS — Address F00DBEEF base at F0000000
        </p>

        <p style={{ marginTop: 18 }}>
          Press any key to continue<span className="blink-text">_</span>
        </p>
        <p style={{ fontSize: 12, opacity: 0.7 }}>
          (you can&apos;t actually, you&apos;re on a phone)
        </p>
      </div>
    </div>
  );
}
