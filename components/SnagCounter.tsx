'use client';

import React, { useEffect, useState } from 'react';

export default function SnagCounter() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    // Days since "last snag" — picks a session-stable random number 0-7 on mount
    setDays(Math.floor(Math.random() * 8));
  }, []);

  const concerning = days >= 4;

  return (
    <div className="snag-widget">
      <div className="snag-widget-title">⚠ DAYS SINCE LAST SNAG</div>
      <div className={`snag-widget-num${concerning ? ' concerning' : ''}`}>{days}</div>
      <div className="snag-widget-sub">
        {days === 0 && 'legend behaviour'}
        {days === 1 && "you'll live"}
        {days === 2 && 'getting risky'}
        {days === 3 && 'ur gettin desperate'}
        {days === 4 && 'concerning, mate'}
        {days === 5 && 'critical levels'}
        {days === 6 && 'alert authorities'}
        {days >= 7 && 'how are u still alive'}
      </div>
    </div>
  );
}
