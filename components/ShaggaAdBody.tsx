'use client';

import React, { useState } from 'react';

const ITEM_NAMES = [
  'Authentic Shagga Stubby Holder',
  'Genuine Shagga Thong (Single)',
  'Premium Shagga Bin Chicken',
  'Vintage Shagga VB Tinnie',
  'Limited Edition Shagga Snag',
  'Original Shagga Akubra (Used)',
  'Rare Shagga Ute Sticker',
  'Mystery Shagga Show Bag',
];

const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function ShaggaAdBody({ imageSrc }: { imageSrc: string }) {
  const [itemName] = useState(() => random(ITEM_NAMES));
  const [price] = useState(() => (Math.random() * 2 + 2).toFixed(2));
  const [bought, setBought] = useState(false);

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="shagga-price-block">
        <div className="product">
          <img src={imageSrc} alt={itemName} draggable={false} />
        </div>
        <div className="label">{itemName}</div>
        <div className="price">£{price}</div>
        <button
          className="buy-btn"
          onClick={() => setBought(true)}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {bought ? 'CHEERS MATE!' : 'BUY NOW'}
        </button>
      </div>
    </div>
  );
}
