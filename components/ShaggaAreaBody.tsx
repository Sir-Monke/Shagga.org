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
    const controller = new AbortController();
    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        if (typeof d?.city !== 'string') return;
        const region = typeof d.region === 'string' ? d.region
          : typeof d.country_name === 'string' ? d.country_name
          : '';
        setLocation(`${d.city}, ${region}`.replace(/,\s*$/, ''));
      })
      .catch(() => {
        /* keep default */
      });
    return () => controller.abort();
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
