'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { galleryList, SHAGGA_IMAGES } from './imageManifest';

export default function GalleryBody() {
  const images = galleryList();
  const [zoomedIdx, setZoomedIdx] = useState<number | null>(null);

  const close = useCallback(() => setZoomedIdx(null), []);
  const prev = useCallback(() => setZoomedIdx((i) => i == null ? null : (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setZoomedIdx((i) => i == null ? null : (i + 1) % images.length), [images.length]);

  // Keyboard navigation for zoomed view
  useEffect(() => {
    if (zoomedIdx == null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomedIdx, close, prev, next]);

  if (SHAGGA_IMAGES.usePlaceholder) {
    return (
      <div className="xp-content" style={{ padding: 0 }}>
        <div className="gallery-empty">
          <div className="gallery-empty-icon">🖼️</div>
          <div className="gallery-empty-title">Shagga Gallery</div>
          <div className="gallery-empty-msg">
            Drop your gallery images into <code>/public/images/gallery/</code>
            <br />
            named <code>1.jpg, 2.jpg, ...</code>
            <br /><br />
            Then in <code>components/imageManifest.ts</code> set <code>usePlaceholder: false</code>
            and they&apos;ll show up here in a grid.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="gallery-block">
        <div className="gallery-toolbar">
          <span className="gallery-count">{images.length} items</span>
        </div>
        <div className="gallery-grid">
          {images.map((src, i) => (
            <button
              key={i}
              className="gallery-item"
              onClick={() => setZoomedIdx(i)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
        {zoomedIdx != null && (
          <div
            className="gallery-zoom"
            onClick={close}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[zoomedIdx]}
              alt={`Image ${zoomedIdx + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="gallery-zoom-btn gallery-zoom-prev"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="previous"
            >‹</button>
            <button
              className="gallery-zoom-btn gallery-zoom-next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="next"
            >›</button>
            <div className="gallery-zoom-counter">{zoomedIdx + 1} / {images.length}</div>
            <a
              className="gallery-zoom-download"
              href={images[zoomedIdx]}
              download
              onClick={(e) => e.stopPropagation()}
              title="Download"
            >⤓</a>
            <button className="gallery-zoom-close" onClick={close} aria-label="close">✕</button>
          </div>
        )}
      </div>
    </div>
  );
}
