'use client';

import React, { useState } from 'react';

export default function ChainEmailBody() {
  const [forwarded, setForwarded] = useState(0);
  const [danced, setDanced] = useState(false);

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="email-block">
        <div className="email-header">
          <div><strong>From:</strong> nigerian.prince.shagga@hotmail.com</div>
          <div><strong>To:</strong> &lt;you, mate&gt;</div>
          <div><strong>Subject:</strong> ⚠⚠⚠ FWD: FWD: FWD: READ THIS OR NAN DIES ⚠⚠⚠</div>
          <div><strong>Sent:</strong> Tuesday at 3am from a Nokia 3310</div>
        </div>

        <div className="email-body">
          <p style={{ color: 'red', fontWeight: 'bold' }}>‼ DO NOT IGNORE THIS EMAIL ‼</p>
          <p>This is a TRUE STORY mate. In 1997 a bloke named Bazza didn&apos;t forward
            this email. The next day a magpie pecked his eyebrow off.</p>
          <p>If you forward this to <strong>10 of ur shaggest mates</strong> within
            the next <span style={{ color: 'red', fontWeight: 'bold' }}>5 minutes</span>:</p>
          <ul>
            <li>✨ ur crush will text u tonight</li>
            <li>🍔 u will find $50 in an old jacket</li>
            <li>🦘 a kangaroo will give u a thumbs up</li>
          </ul>
          <p>If u DO NOT forward:</p>
          <ul>
            <li>💀 ur nan will pass on (rip nan)</li>
            <li>🌪 a maggie will swoop u every day for 7 years</li>
            <li>📵 ur phone will ONLY autocorrect to &quot;shagga&quot;</li>
          </ul>
          <p><em>this is REAL. it happend to my cousin&apos;s mate.</em></p>
          <p style={{ marginTop: 10, fontSize: 14, fontWeight: 'bold', color: '#0066aa' }}>
            ✿ ✿ ✿ FORWARD TO 10 SHAGGAS NOW ✿ ✿ ✿
          </p>
        </div>

        <div className="email-actions">
          <button
            className="xp-btn xp-btn-primary"
            onClick={() => setForwarded((f) => f + 1)}
          >
            Forward ({forwarded}/10)
          </button>
          <button
            className="xp-btn"
            onClick={() => setDanced(true)}
          >
            Refuse (RIP nan)
          </button>
        </div>

        {forwarded >= 10 && (
          <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bold', padding: 6 }}>
            🎉 nans saved. legend behaviour. 🎉
          </p>
        )}
        {danced && (
          <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', padding: 6 }}>
            ☠ nan informed. 1 maggie deployed to ur location. ☠
          </p>
        )}
      </div>
    </div>
  );
}
