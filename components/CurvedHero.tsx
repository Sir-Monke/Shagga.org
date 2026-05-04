'use client';

import React from 'react';

export default function CurvedHero() {
  return (
    <>
      <svg className="hero-curved" viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shaggaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor="#fff200" />
            <stop offset="50%" stopColor="#ff9500" />
            <stop offset="100%" stopColor="#cc0033" />
          </linearGradient>
          <path
            id="shaggaCurve"
            // Wide upward arc
            d="M 60 240 Q 450 -40 840 240"
            fill="none"
          />
        </defs>
        <text>
          <textPath href="#shaggaCurve" startOffset="50%" textAnchor="middle">
            G&apos;day Shagga!
          </textPath>
        </text>
      </svg>
      <div className="hero-subtitle">welcome to shagga.org — population: u</div>
    </>
  );
}
