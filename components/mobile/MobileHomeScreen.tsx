'use client';
import React, { useRef, useState, useCallback } from 'react';
import { MOBILE_APPS, PAGE_COUNT, type MobileAppKind } from './appRegistry';

interface Props {
  onLaunch: (kind: MobileAppKind) => void;
}

const SWIPE_THRESHOLD = 60;

export const MobileHomeScreen: React.FC<Props> = ({ onLaunch }) => {
  const [page, setPage] = useState(0);
  const startXRef = useRef<number | null>(null);
  const pageOffsetRef = useRef(0);
  const [transientOffset, setTransientOffset] = useState(0);

  const dockApps = MOBILE_APPS.filter((a) => a.page === 'dock');
  const pages: Array<typeof MOBILE_APPS> = [];
  for (let p = 0; p < PAGE_COUNT; p++) {
    pages.push(MOBILE_APPS.filter((a) => a.page === p));
  }

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    pageOffsetRef.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const dx = e.touches[0].clientX - startXRef.current;
    pageOffsetRef.current = dx;
    setTransientOffset(dx);
  }, []);

  const onTouchEnd = useCallback(() => {
    const dx = pageOffsetRef.current;
    startXRef.current = null;
    pageOffsetRef.current = 0;
    setTransientOffset(0);
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0 && page < PAGE_COUNT - 1) setPage(page + 1);
    else if (dx > 0 && page > 0) setPage(page - 1);
  }, [page]);

  return (
    <div
      className="ios-home"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pages container — translate by page * -100% + transient drag */}
      <div
        className="ios-home-pages"
        style={{
          transform: `translateX(calc(${-page * 100}% + ${transientOffset}px))`,
          transition: transientOffset === 0 ? 'transform 280ms cubic-bezier(0.2,0.8,0.2,1)' : 'none',
        }}
      >
        {pages.map((apps, i) => (
          <div key={i} className="ios-home-page">
            <div className="ios-home-grid">
              {apps.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.kind}
                    className="ios-app-button"
                    onClick={() => onLaunch(app.kind)}
                    aria-label={`Open ${app.name}`}
                  >
                    <span className="ios-app-icon"><Icon /></span>
                    <span className="ios-app-label">{app.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Page indicator dots */}
      <div className="ios-home-dots">
        {pages.map((_, i) => (
          <span key={i} className={`ios-home-dot ${i === page ? 'ios-home-dot-active' : ''}`} />
        ))}
      </div>

      {/* Dock */}
      <div className="ios-home-dock">
        <div className="ios-home-dock-bg" />
        <div className="ios-home-dock-row">
          {dockApps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.kind}
                className="ios-app-button ios-app-button-dock"
                onClick={() => onLaunch(app.kind)}
                aria-label={`Open ${app.name}`}
              >
                <span className="ios-app-icon"><Icon /></span>
                <span className="ios-app-label">{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
