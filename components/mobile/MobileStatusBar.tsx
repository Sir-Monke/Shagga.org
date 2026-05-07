'use client';
import React, { useEffect, useState } from 'react';

interface Props {
  theme?: 'dark' | 'light';   // dark = white text on black bg (default home/dock)
                                // light = inverted (some apps)
}

export const MobileStatusBar: React.FC<Props> = ({ theme = 'dark' }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      // 12-hour without AM/PM, like real iPhone OS 1 status bar
      const hh = h === 0 ? 12 : h > 12 ? h - 12 : h;
      setTime(`${hh}:${String(m).padStart(2, '0')}`);
    };
    update();
    const id = setInterval(update, 1000 * 30); // every 30s is enough for minute precision
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`ios-statusbar ios-statusbar-${theme}`}>
      <div className="ios-statusbar-left">
        {/* Signal bars */}
        <div className="ios-signal">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={`ios-signal-bar ios-signal-bar-${i}`} />
          ))}
        </div>
        <span className="ios-carrier">SHAGGA</span>
      </div>

      <div className="ios-statusbar-center">
        <span className="ios-time">{time || '\u00a0'}</span>
      </div>

      <div className="ios-statusbar-right">
        <span className="ios-battery-pct">100%</span>
        <span className="ios-battery">
          <span className="ios-battery-fill" />
        </span>
      </div>
    </div>
  );
};
