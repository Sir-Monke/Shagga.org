'use client';

import React, { useState } from 'react';
import { galleryList, SHAGGA_IMAGES } from './imageManifest';

export default function GalleryBody() {
  const images = galleryList();
  const [zoomed, setZoomed] = useState<string | null>(null);

  if (SHAGGA_IMAGES.usePlaceholder) {
    return (
      <div className="xp-content" style={{ padding: 0 }}>
        <div className="gallery-empty">
          <div className="gallery-empty-icon">🖼️</div>
          <div className="gallery-empty-title">Shagga Gallery</div>
          <div className="gallery-empty-msg">
            Drop your gallery images into <code>/public/images/gallery/</code>
            <br />
            named <code>1.jpg, 2.jpg, ... 40.jpg</code>
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
          <span>Shagga Gallery</span>
          <span className="gallery-count">{images.length} items</span>
        </div>
        <div className="gallery-grid">
          {images.map((src, i) => (
            <button
              key={i}
              className="gallery-item"
              onClick={() => setZoomed(src)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
        {zoomed && (
          <div
            className="gallery-zoom"
            onClick={() => setZoomed(null)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomed} alt="zoomed" />
            <button className="gallery-zoom-close" onClick={() => setZoomed(null)}>✕</button>
          </div>
        )}
      </div>
    </div>
  );
}
