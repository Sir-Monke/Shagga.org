'use client';

import React, { useState } from 'react';

export default function VisitorBannerBody() {
  const [claimed, setClaimed] = useState(false);
  const visitorNum = 1_000_000 + Math.floor(Math.random() * 1000);

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="visitor-block">
        <div className="rainbow-strip" />
        <h2 className="visitor-headline">🎉 CONGRATULATIONS 🎉</h2>
        <p className="visitor-line">YOU ARE OUR</p>
        <div className="visitor-num">{visitorNum.toLocaleString()}TH</div>
        <p className="visitor-line">VISITOR!!!</p>
        <p className="visitor-line" style={{ fontSize: 12, marginTop: 6 }}>
          You have won an authentic Shagga™ thong!
        </p>
        {!claimed ? (
          <button
            className="visitor-btn"
            onClick={() => setClaimed(true)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            CLAIM PRIZE NOW! 🎁
          </button>
        ) : (
          <div className="visitor-claimed">
            <p style={{ color: '#cc0000', fontWeight: 'bold' }}>
              😈 just kidding mate, ur prize is 47 viruses
            </p>
            <p style={{ fontSize: 11 }}>(none real, ur fine)</p>
          </div>
        )}
        <div className="rainbow-strip" />
      </div>
    </div>
  );
}
