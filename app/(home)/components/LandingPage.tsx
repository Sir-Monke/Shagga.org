import React from 'react';
import Image from 'next/image';
import TopShaggaImage from '@/app/images/CenterImage.png';

export default function LandingPage() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full">
        <svg className="w-full" viewBox="0 0 250 90">
          <path fill="none" id="curve" d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68" />
          <text className="text-[8px] uppercase" style={{ fontWeight: 'bold', fill: 'white' }}>
            {
              [...Array(10)].map((_, i) => (
                <textPath key={i} startOffset={i * 20 + "%"} href="#curve">Gday Shagga</textPath>
              ))
            }
          </text>
        </svg>
      </div>
      <div className="flex justify-center items-center h-screen">
        <Image priority src={TopShaggaImage} alt="TOP-SHAGGA" />
      </div>
    </div>
  );
}
