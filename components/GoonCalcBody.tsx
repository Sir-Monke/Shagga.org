'use client';

import React, { useState } from 'react';

export default function GoonCalcBody() {
  const [weight, setWeight] = useState('80');
  const w = parseFloat(weight) || 0;
  const goons = w > 0 ? Math.max(1, Math.round(w / 12)) : 0;
  const driveHome = goons > 0 ? Math.ceil(goons * 4.5) : 0;

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="goon-block">
        <div className="goon-header">🍷 GOON BAG CALCULATOR™</div>
        <label className="goon-row">
          <span>Your weight (kg):</span>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          />
        </label>
        <div className="goon-result">
          U can handle <strong>{goons}</strong> goon{goons !== 1 && 's'} before becoming a problem
        </div>
        <div className="goon-warn">
          Time before u can drive home: <strong>{driveHome} hours</strong>
          <br />
          (don&apos;t drive after goons. don&apos;t even walk. just lay down on the lino.)
        </div>
        <div className="goon-disclaimer">
          ⚠ not actual medical or legal advice. consult ur nan.
        </div>
      </div>
    </div>
  );
}
