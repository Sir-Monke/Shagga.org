'use client';

import React, { useEffect, useState } from 'react';

const NAMES = [
  'John', 'Noah', 'Oliver', 'Elijah', 'James',
  'William', 'Benjamin', 'Lucas', 'Henry', 'Jamal',
  'Mason', 'Michael', 'Ethan', 'Tyrone', 'Alex',
  'Kevin', 'Tom', 'Suli', 'Sam', 'Max',
];

const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function ShaggaAreaBody({ imageSrc }: { imageSrc: string }) {
  const [location, setLocation] = useState('your suburb');
  const [name] = useState(() => random(NAMES));
  const [distance] = useState(() => Math.floor(Math.random() * 50) + 1);

  useEffect(() => {
    let cancelled = false;
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d?.city) setLocation(`${d.city}, ${d.region ?? d.country_name ?? ''}`.replace(/,\s*$/, ''));
      })
      .catch(() => {
        /* keep default */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="shagga-area-block">
        <div className="pulse-banner">⚠ TOP SHAGGA SPOTTED NEARBY ⚠</div>
        <div className="photo">
          <img src={imageSrc} alt="A top shagga" draggable={false} />
        </div>
        <div className="info">
          <strong>{name}</strong> is just <strong>{distance}m</strong> away
          <br />
          in <strong>{location}</strong>
        </div>
      </div>
    </div>
  );
}
