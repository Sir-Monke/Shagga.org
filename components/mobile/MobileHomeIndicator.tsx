'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Props {
  onHome: () => void;          // tap pill = go home
  theme?: 'dark' | 'light';     // pill colour adapts to current background
  autoHide?: boolean;           // can be disabled via Settings
}

const VISIBLE_DURATION_MS = 4000;
const FADE_DURATION_MS = 800;
const HOT_ZONE_HEIGHT = 28;     // bottom strip that detects summon-touches
const HOT_ZONE_WIDTH  = 220;    // centred — only the home button area

export const MobileHomeIndicator: React.FC<Props> = ({ onHome, theme = 'light', autoHide = true }) => {
  const [opacity, setOpacity] = useState(1);
  const fadeTimerRef = useRef<number | null>(null);

  // Summon: touch (or click) anywhere in the bottom hot zone re-shows the pill.
  // Mark interaction = reset the fade timer & bring the pill back to full opacity.
  const markInteraction = useCallback(() => {
    setOpacity(1);
    if (fadeTimerRef.current !== null) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    if (autoHide) {
      fadeTimerRef.current = window.setTimeout(() => {
        setOpacity(0);
      }, VISIBLE_DURATION_MS);
    }
  }, [autoHide]);

  // First mount: start the fade timer
  useEffect(() => {
    markInteraction();
    return () => {
      if (fadeTimerRef.current !== null) window.clearTimeout(fadeTimerRef.current);
    };
  }, [markInteraction]);

  // If autoHide changes (Settings toggle), respect it
  useEffect(() => {
    if (!autoHide) {
      setOpacity(1);
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    } else {
      markInteraction();
    }
  }, [autoHide, markInteraction]);

  // Hot-zone touch handler: any touchstart in the bottom strip wakes the pill.
  // We do NOT consume the event for movement — scrolling content doesn't reach
  // the bottom HOT_ZONE_HEIGHT pixels because that zone is reserved for the
  // home indicator. So no false positives from scrolling/tapping.
  const handleHotZoneTouch = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    markInteraction();
    // We deliberately don't preventDefault — let any further taps go through.
  }, [markInteraction]);

  // Tap on the pill itself = go home
  const handlePillTap = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
    markInteraction();
    onHome();
  }, [onHome, markInteraction]);

  return (
    <>
      {/* Hot-zone (sits BELOW pill in z-index, only catches touches that miss the pill) */}
      <div
        className="ios-home-hotzone"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: HOT_ZONE_WIDTH,
          height: HOT_ZONE_HEIGHT,
          zIndex: 90,
          // No background — invisible. Just a touch target.
        }}
        onTouchStart={handleHotZoneTouch}
        onClick={handleHotZoneTouch}
        aria-hidden
      />

      {/* The pill itself — frosted glass, always rendered, opacity-driven hide */}
      <button
        className={`ios-home-pill ios-home-pill-${theme}`}
        onClick={handlePillTap}
        onTouchStart={handlePillTap}
        aria-label="Home"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 8,
          transform: 'translateX(-50%)',
          width: 134,
          height: 5,
          borderRadius: 3,
          zIndex: 100,
          opacity,
          transition: `opacity ${FADE_DURATION_MS}ms ease-out`,
          pointerEvents: opacity > 0.05 ? 'auto' : 'none',
        }}
      />
    </>
  );
};
