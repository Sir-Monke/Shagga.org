'use client';

import React, { useEffect, useState } from 'react';
import { ShaggaDesktop } from '@/components/ShaggaDesktop';
import { MobileOS } from '@/components/mobile/MobileOS';
import '@/components/mobile/mobile.css';

/**
 * /reviews route — same XP-vs-Mobile swap as the homepage, except both
 * sides auto-open the Reviews app:
 *   • Desktop XP → ShaggaDesktop autoOpen="shaggareviews", popups suppressed
 *   • Mobile     → MobileOS autoLaunch="reviews", starts unlocked (the visitor
 *                  has scanned a QR code; making them slide-to-unlock first
 *                  before seeing the review they came for is silly)
 */
export default function ReviewsRouteClient() {
  const [mode, setMode] = useState<'xp' | 'mobile' | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px) and (pointer: coarse)');
    const update = () => setMode(mq.matches ? 'mobile' : 'xp');
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (mode === null) {
    return <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9999 }} />;
  }
  if (mode === 'mobile') return <MobileOS autoLaunch="reviews" startUnlocked />;
  return <ShaggaDesktop autoOpen="shaggareviews" suppressPopups />;
}
