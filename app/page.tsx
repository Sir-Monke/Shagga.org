'use client';

import React, { useEffect, useState } from 'react';
import { MobileOS } from '@/components/mobile/MobileOS';
import { ShaggaDesktop } from '@/components/ShaggaDesktop';
import '@/components/mobile/mobile.css';

export default function Home() {
  return <ShaggaSwap />;
}

/**
 * Decides at runtime whether to render the Windows XP desktop (laptop/desktop)
 * or the iPhone OS 1 mobile UI (phones). Detection: viewport ≤600px AND a
 * coarse pointer (touchscreen). This catches phones in portrait and never
 * matches tablets, never matches laptops at small width.
 *
 * On the server we render NOTHING — both UIs depend on viewport metrics that
 * aren't known until hydration. A single tick of black screen during boot
 * actually feels right (like an iPhone turning on).
 */
function ShaggaSwap() {
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
  if (mode === 'mobile') return <MobileOS />;
  return <ShaggaDesktop />;
}
