// ============================================================
// MOBILE APP ICONS — v2 polished
// 60×60 viewBox, 13.5px radius. Depth via multi-stop gradients,
// curved gloss highlight, plus a 1px outer dark stroke and
// 1px inner light stroke for separation against any background.
// ============================================================

import React from 'react';

const SIZE = 60;
const R = 13.5;

const Gloss: React.FC<{ opacity?: number }> = ({ opacity = 0.28 }) => (
  <>
    <path
      d={`M 0,${R} Q 0,0 ${R},0 L ${SIZE - R},0 Q ${SIZE},0 ${SIZE},${R} L ${SIZE},${SIZE / 2} Q ${SIZE / 2},${SIZE * 0.42} 0,${SIZE / 2} Z`}
      fill="white"
      opacity={opacity}
    />
    <ellipse cx={SIZE / 2} cy={SIZE * 0.13} rx={SIZE * 0.42} ry={SIZE * 0.12} fill="white" opacity={opacity * 0.55} />
  </>
);

interface IconBaseProps {
  bg: React.ReactNode;
  children: React.ReactNode;
  glossOpacity?: number;
  uid: string;
}

const IconBase: React.FC<IconBaseProps> = ({ bg, children, glossOpacity, uid }) => (
  <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <defs>
      <clipPath id={`clip-${uid}`}>
        <rect width={SIZE} height={SIZE} rx={R} ry={R} />
      </clipPath>
    </defs>
    <g clipPath={`url(#clip-${uid})`}>
      {bg}
      {children}
      <Gloss opacity={glossOpacity} />
    </g>
    <rect width={SIZE} height={SIZE} rx={R} ry={R} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />
    <rect x="0.5" y="0.5" width={SIZE - 1} height={SIZE - 1} rx={R - 0.5} ry={R - 0.5} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
  </svg>
);

const grad = (id: string, stops: Array<[number, string]>) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    {stops.map(([off, col]) => <stop key={off} offset={`${off}%`} stopColor={col} />)}
  </linearGradient>
);

// =================== Default-style apps ===================

export const PhoneIcon: React.FC = () => (
  <IconBase uid="phone" bg={
    <>
      <defs>{grad('phoneBg', [[0, '#a8f0a0'], [40, '#3ec74a'], [100, '#0a7016']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#phoneBg)" />
    </>
  }>
    {/* Centred phone receiver — bbox roughly -16..16 horizontal, -16..16 vertical, rotated -25° around 0,0 */}
    <g transform="translate(30 30) rotate(-25)">
      <path d="M -16,-14 Q -16,-17 -13,-17 L -8,-17 Q -5,-17 -4,-14 L -2,-9 Q -1,-6 -3,-4 L -7,-1 Q -2,7 6,9 L 9,5 Q 11,3 14,4 L 19,6 Q 22,7 22,10 L 22,15 Q 22,18 19,18 Q 4,18 -8,6 Q -16,-5 -16,-14 Z"
        fill="white" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" />
    </g>
  </IconBase>
);

export const MailIcon: React.FC = () => (
  <IconBase uid="mail" bg={
    <>
      <defs>{grad('mailBg', [[0, '#cae5ff'], [40, '#5ba3f0'], [100, '#1a4eb8']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#mailBg)" />
    </>
  }>
    <rect x="9" y="20" width="42" height="22" rx="2.5" fill="white" />
    <path d="M 11 22 L 30 35 L 49 22" fill="none" stroke="#2659a8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="9" y="20" width="42" height="2" fill="rgba(0,0,0,0.08)" />
  </IconBase>
);

export const SafariIcon: React.FC = () => (
  <IconBase uid="safari" bg={
    <>
      <defs>
        <radialGradient id="safariBg" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#dce8ff" />
          <stop offset="55%" stopColor="#3a8ce8" />
          <stop offset="100%" stopColor="#0e3680" />
        </radialGradient>
      </defs>
      <rect width={SIZE} height={SIZE} fill="url(#safariBg)" />
    </>
  }>
    <circle cx="30" cy="30" r="19" fill="white" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
    <circle cx="30" cy="30" r="14" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
      const a = (deg - 90) * Math.PI / 180;
      const r1 = 16, r2 = 18;
      return <line key={deg} x1={30 + r1 * Math.cos(a)} y1={30 + r1 * Math.sin(a)} x2={30 + r2 * Math.cos(a)} y2={30 + r2 * Math.sin(a)} stroke="#666" strokeWidth={deg % 90 === 0 ? 1 : 0.5} />;
    })}
    <path d="M 30,15 L 33.5,29 L 30,32 L 26.5,29 Z" fill="#d22020" />
    <path d="M 30,45 L 33.5,31 L 30,28 L 26.5,31 Z" fill="#f2f2f2" stroke="rgba(0,0,0,0.1)" strokeWidth="0.4" />
    <circle cx="30" cy="30" r="2" fill="#222" />
  </IconBase>
);

export const ShaggaFyIcon: React.FC = () => (
  <IconBase uid="shaggafy" bg={
    <>
      <defs>{grad('shaggafyBg', [[0, '#ffd76b'], [40, '#ff9a30'], [100, '#c25a00']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#shaggafyBg)" />
    </>
  }>
    <path d="M 22 14 Q 22 12 24 12 L 42 12 Q 44 12 44 14 L 44 19 Q 38 17 24 19 Z" fill="white" />
    <rect x="22" y="14" width="2.4" height="26" fill="white" />
    <rect x="42" y="14" width="2.4" height="22" fill="white" />
    <ellipse cx="20" cy="40" rx="6" ry="4.5" fill="white" transform="rotate(-12 20 40)" />
    <ellipse cx="40" cy="36" rx="6" ry="4.5" fill="white" transform="rotate(-12 40 36)" />
  </IconBase>
);

export const TextIcon: React.FC = () => (
  <IconBase uid="text" bg={
    <>
      <defs>{grad('textBg', [[0, '#a8f370'], [45, '#52c91a'], [100, '#1f6e00']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#textBg)" />
    </>
  }>
    <path d="M 12 18 Q 12 13 17 13 L 43 13 Q 48 13 48 18 L 48 33 Q 48 38 43 38 L 27 38 L 19 45 L 21 38 L 17 38 Q 12 38 12 33 Z"
      fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
    <circle cx="22" cy="26" r="2" fill="#3ea310" />
    <circle cx="30" cy="26" r="2" fill="#3ea310" />
    <circle cx="38" cy="26" r="2" fill="#3ea310" />
  </IconBase>
);

export const CalendarIcon: React.FC = () => {
  const day = new Date().getDate();
  const monthShort = new Date().toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  return (
    <IconBase uid="cal" bg={<rect width={SIZE} height={SIZE} fill="white" />} glossOpacity={0.18}>
      <defs>{grad('calHead', [[0, '#ee4040'], [100, '#a81818']])}</defs>
      <rect width={SIZE} height="16" fill="url(#calHead)" />
      <text x="30" y="11.5" textAnchor="middle" fill="white" fontFamily="Helvetica, Arial, sans-serif" fontSize="9" fontWeight="800" letterSpacing="0.5">{monthShort}</text>
      <text x="30" y="48" textAnchor="middle" fill="#1a1a1a" fontFamily="Helvetica, Arial, sans-serif" fontSize="30" fontWeight="200">{day}</text>
    </IconBase>
  );
};

export const PhotosIcon: React.FC = () => (
  <IconBase uid="photos" bg={<rect width={SIZE} height={SIZE} fill="white" />} glossOpacity={0.16}>
    <circle cx="30" cy="16" r="9" fill="#ffd54f" />
    <circle cx="42.5" cy="23" r="9" fill="#5cd166" />
    <circle cx="42.5" cy="37" r="9" fill="#5cb6ff" />
    <circle cx="30" cy="44" r="9" fill="#a574e0" />
    <circle cx="17.5" cy="37" r="9" fill="#ff7da3" />
    <circle cx="17.5" cy="23" r="9" fill="#ff9a47" />
    <circle cx="30" cy="30" r="6" fill="white" />
  </IconBase>
);

export const CameraIcon: React.FC = () => (
  <IconBase uid="cam" bg={
    <>
      <defs>{grad('camBg', [[0, '#a0a0a8'], [40, '#5a5a62'], [100, '#1a1a20']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#camBg)" />
    </>
  }>
    <rect x="9" y="20" width="42" height="26" rx="3" fill="#262630" stroke="#0a0a10" strokeWidth="0.5" />
    <rect x="22" y="16" width="14" height="6" rx="1.5" fill="#262630" />
    <defs>
      <radialGradient id="lensGrad" cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#5a8ed8" />
        <stop offset="60%" stopColor="#1a3f7c" />
        <stop offset="100%" stopColor="#000814" />
      </radialGradient>
    </defs>
    <circle cx="30" cy="33" r="11" fill="#0a0a14" stroke="#444" strokeWidth="1" />
    <circle cx="30" cy="33" r="9" fill="url(#lensGrad)" />
    <ellipse cx="27" cy="30" rx="3" ry="2" fill="rgba(255,255,255,0.55)" />
    <circle cx="32" cy="35" r="0.8" fill="rgba(255,255,255,0.4)" />
    <rect x="14" y="22" width="5" height="3" rx="0.5" fill="#fff" opacity="0.7" />
    <circle cx="44" cy="24" r="1.5" fill="#d22020" />
  </IconBase>
);

export const ShaggaTubeIcon: React.FC = () => (
  <IconBase uid="stube" bg={
    <>
      <defs>{grad('stubeBg', [[0, '#ff6464'], [50, '#d61a1a'], [100, '#7a0808']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#stubeBg)" />
    </>
  }>
    <rect x="9" y="14" width="42" height="32" rx="6" fill="white" />
    <polygon points="25,22 25,38 40,30" fill="#d61a1a" />
  </IconBase>
);

export const StocksIcon: React.FC = () => (
  <IconBase uid="stocks" bg={
    <>
      <defs>{grad('stocksBg', [[0, '#3a3a40'], [50, '#1a1a20'], [100, '#000']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#stocksBg)" />
    </>
  }>
    {[18, 26, 34, 42].map(y => <line key={y} x1="6" y1={y} x2="54" y2={y} stroke="#2a2a30" strokeWidth="0.4" />)}
    <path d="M 8,42 L 16,34 L 24,38 L 32,22 L 40,28 L 52,12 L 52,48 L 8,48 Z" fill="#5fd16f" opacity="0.18" />
    <polyline points="8,42 16,34 24,38 32,22 40,28 52,12" fill="none" stroke="#5fd16f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="52" cy="12" r="2" fill="#5fd16f" />
  </IconBase>
);

export const MapsIcon: React.FC = () => (
  <IconBase uid="maps" bg={<rect width={SIZE} height={SIZE} fill="#e8e0c8" />} glossOpacity={0.14}>
    <path d="M 6 14 L 22 8 L 38 14 L 54 8 L 54 50 L 38 56 L 22 50 L 6 56 Z" fill="#d8c890" />
    <line x1="22" y1="8" x2="22" y2="50" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
    <line x1="38" y1="14" x2="38" y2="56" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
    <path d="M 8 24 Q 22 20 38 28 Q 50 32 54 30" stroke="#ffffff" strokeWidth="2.5" fill="none" />
    <path d="M 8 24 Q 22 20 38 28 Q 50 32 54 30" stroke="#a8d088" strokeWidth="1.2" fill="none" />
    <path d="M 14 38 Q 26 36 36 42" stroke="#88a8d8" strokeWidth="2" fill="none" />
    <path d="M 30 18 Q 23.5 18 23.5 25 Q 23.5 31 30 41 Q 36.5 31 36.5 25 Q 36.5 18 30 18 Z" fill="#d22020" stroke="#7a0c0c" strokeWidth="0.7" />
    <circle cx="30" cy="25" r="2.5" fill="white" />
  </IconBase>
);

export const WeatherIcon: React.FC = () => (
  <IconBase uid="weather" bg={
    <>
      <defs>{grad('wxBg', [[0, '#9ad8ff'], [50, '#3a8eef'], [100, '#0e4090']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#wxBg)" />
    </>
  }>
    <defs>
      <radialGradient id="sunGrad">
        <stop offset="0%" stopColor="#fff8c0" />
        <stop offset="100%" stopColor="#ffc850" />
      </radialGradient>
    </defs>
    <g transform="translate(20 22)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
        const a = deg * Math.PI / 180;
        return <line key={deg} x1={Math.cos(a) * 10} y1={Math.sin(a) * 10} x2={Math.cos(a) * 14} y2={Math.sin(a) * 14} stroke="#fff58a" strokeWidth="1.6" strokeLinecap="round" />;
      })}
      <circle r="7" fill="url(#sunGrad)" />
    </g>
    <ellipse cx="36" cy="40" rx="18" ry="10" fill="white" />
    <ellipse cx="26" cy="36" rx="10" ry="7" fill="white" />
    <ellipse cx="44" cy="34" rx="8" ry="6" fill="white" />
  </IconBase>
);

export const ClockIcon: React.FC = () => (
  <IconBase uid="clock" bg={<rect width={SIZE} height={SIZE} fill="#0a0a0a" />} glossOpacity={0.22}>
    <circle cx="30" cy="30" r="22" fill="white" />
    <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.6" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i * 30 - 90) * Math.PI / 180;
      const isMain = i % 3 === 0;
      const r1 = isMain ? 16 : 18, r2 = 20;
      return <line key={i} x1={30 + r1 * Math.cos(a)} y1={30 + r1 * Math.sin(a)} x2={30 + r2 * Math.cos(a)} y2={30 + r2 * Math.sin(a)} stroke="#1a1a1a" strokeWidth={isMain ? 1.8 : 0.8} strokeLinecap="round" />;
    })}
    <line x1="30" y1="30" x2="38" y2="22" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="30" y1="30" x2="30" y2="14" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="30" y1="32" x2="30" y2="14" stroke="#ff9a00" strokeWidth="0.8" strokeLinecap="round" />
    <circle cx="30" cy="30" r="1.8" fill="#ff9a00" />
  </IconBase>
);

export const CalculatorIcon: React.FC = () => (
  <IconBase uid="calc" bg={<rect width={SIZE} height={SIZE} fill="#1a1a1a" />} glossOpacity={0.18}>
    <rect x="8" y="8" width="44" height="14" rx="1.5" fill="#3a3a3a" />
    <text x="48" y="19" textAnchor="end" fill="#ffe8a8" fontFamily="Helvetica" fontSize="11" fontWeight="700">42.0</text>
    {[0, 1, 2, 3].map(row =>
      [0, 1, 2, 3].map(col => (
        <rect key={`${row}-${col}`}
          x={9 + col * 11}
          y={26 + row * 7}
          width="9" height="5.5" rx="1"
          fill={col === 3 ? '#ff9a30' : row === 0 && col < 3 ? '#888' : '#5a5a5a'} />
      ))
    )}
  </IconBase>
);

export const NotesIcon: React.FC = () => (
  <IconBase uid="notes" bg={<rect width={SIZE} height={SIZE} fill="#fff8d8" />} glossOpacity={0.18}>
    <defs>{grad('noteHead', [[0, '#e8c66a'], [100, '#b08820']])}</defs>
    <rect width={SIZE} height="9" fill="url(#noteHead)" />
    {[12, 22, 32, 42].map(x => <circle key={x} cx={x} cy={4.5} r="1.4" fill="#5a3f00" />)}
    <line x1="9" y1="18" x2="51" y2="18" stroke="#cca044" strokeWidth="0.6" />
    <line x1="9" y1="26" x2="51" y2="26" stroke="#cca044" strokeWidth="0.6" />
    <line x1="9" y1="34" x2="51" y2="34" stroke="#cca044" strokeWidth="0.6" />
    <line x1="9" y1="42" x2="51" y2="42" stroke="#cca044" strokeWidth="0.6" />
    <line x1="9" y1="50" x2="51" y2="50" stroke="#cca044" strokeWidth="0.6" />
    <line x1="13.5" y1="11" x2="13.5" y2="55" stroke="#d8543a" strokeWidth="0.6" />
  </IconBase>
);

export const SettingsIcon: React.FC = () => (
  <IconBase uid="settings" bg={
    <>
      <defs>{grad('setBg', [[0, '#dadce0'], [50, '#9298a0'], [100, '#3a3e44']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#setBg)" />
    </>
  }>
    <defs>
      <radialGradient id="setGearGrad" cx="40%" cy="40%">
        <stop offset="0%" stopColor="#c0c4ca" />
        <stop offset="100%" stopColor="#5a5e64" />
      </radialGradient>
    </defs>
    <g transform="translate(30 30)">
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="-2.5" y="-21" width="5" height="6.5" rx="1" fill="#2a2c30"
          transform={`rotate(${i * 45})`} />
      ))}
      <circle r="14" fill="url(#setGearGrad)" stroke="#1a1c20" strokeWidth="0.7" />
      <circle r="5" fill="#2a2c30" />
      <circle r="2.5" fill="#5a5e64" />
    </g>
  </IconBase>
);

// =================== Shagga apps ===================

export const ShaggaReviewsIcon: React.FC = () => (
  <IconBase uid="reviews" bg={
    <>
      <defs>{grad('revBg', [[0, '#ffe680'], [45, '#ffb133'], [100, '#cc6800']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#revBg)" />
    </>
  }>
    <polygon points="30,11 35.5,24.5 50,25.5 39,34.5 42.5,48.5 30,40.5 17.5,48.5 21,34.5 10,25.5 24.5,24.5"
      fill="white" stroke="rgba(140,80,0,0.4)" strokeWidth="0.8" strokeLinejoin="round" />
    <polygon points="30,17 33.5,26.5 43,27 36,33 38.5,42 30,37.5 21.5,42 24,33 17,27 26.5,26.5"
      fill="none" stroke="rgba(255,200,80,0.4)" strokeWidth="0.5" />
  </IconBase>
);

export const ShwitterIcon: React.FC = () => (
  <IconBase uid="shwitter" bg={
    <>
      <defs>{grad('shwitterBg', [[0, '#5dbdf5'], [50, '#1da1f2'], [100, '#0a6cb0']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#shwitterBg)" />
    </>
  }>
    <path d="M 12 22 Q 12 14 20 14 L 40 14 Q 48 14 48 22 L 48 32 Q 48 40 40 40 L 28 40 L 18 47 L 20 40 Q 12 40 12 32 Z"
      fill="white" />
    <text x="30" y="32" textAnchor="middle" fill="#1da1f2" fontFamily="Georgia, serif" fontSize="20" fontWeight="700" fontStyle="italic">S</text>
  </IconBase>
);

export const ShaggaGramIcon: React.FC = () => (
  <IconBase uid="shgram" bg={
    <>
      <defs>
        <linearGradient id="igBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fee788" />
          <stop offset="20%" stopColor="#fcb045" />
          <stop offset="50%" stopColor="#dc3463" />
          <stop offset="80%" stopColor="#a020c0" />
          <stop offset="100%" stopColor="#3030a0" />
        </linearGradient>
      </defs>
      <rect width={SIZE} height={SIZE} fill="url(#igBg)" />
    </>
  }>
    <rect x="13" y="13" width="34" height="34" rx="9" fill="none" stroke="white" strokeWidth="3" />
    <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="3" />
    <circle cx="40.5" cy="19.5" r="2.2" fill="white" />
  </IconBase>
);

export const ShaggaBookIcon: React.FC = () => (
  <IconBase uid="shbook" bg={
    <>
      <defs>{grad('shbookBg', [[0, '#5b80c8'], [50, '#3b5998'], [100, '#1a3460']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#shbookBg)" />
    </>
  }>
    <text x="30" y="46" textAnchor="middle" fill="white" fontFamily="Helvetica, Arial, sans-serif" fontSize="42" fontWeight="900" fontStyle="italic">S</text>
  </IconBase>
);

export const PortfolioIcon: React.FC = () => (
  <IconBase uid="portfolio" bg={
    <>
      <defs>{grad('portfolioBg', [[0, '#3a3a3a'], [50, '#1a1a1a'], [100, '#000']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#portfolioBg)" />
    </>
  }>
    <rect x="11" y="22" width="38" height="26" rx="3" fill="#5a3a14" stroke="#3a2408" strokeWidth="0.6" />
    <rect x="13" y="24" width="34" height="22" rx="2" fill="#7c5022" />
    <rect x="22" y="14" width="16" height="8" rx="1.5" fill="none" stroke="#3a2408" strokeWidth="2.5" />
    <line x1="11" y1="33" x2="49" y2="33" stroke="#3a2408" strokeWidth="0.8" />
    <rect x="26" y="31" width="8" height="4" rx="0.5" fill="#d8c0a0" stroke="#5a3a14" strokeWidth="0.4" />
    <text x="30" y="44" textAnchor="middle" fill="#fff" fontFamily="Georgia, serif" fontSize="9" fontWeight="700" fontStyle="italic">SM</text>
  </IconBase>
);

export const GamesIcon: React.FC = () => (
  <IconBase uid="games" bg={
    <>
      <defs>{grad('gamesBg', [[0, '#c2407a'], [50, '#7c1a4f'], [100, '#3a0a26']])}</defs>
      <rect width={SIZE} height={SIZE} fill="url(#gamesBg)" />
    </>
  }>
    {/* Game controller silhouette */}
    <g transform="translate(30 32)">
      {/* Body */}
      <path d="M -20,-4 Q -20,-12 -12,-12 L 12,-12 Q 20,-12 20,-4 L 20,8 Q 20,14 14,14 L 8,14 L 4,8 L -4,8 L -8,14 L -14,14 Q -20,14 -20,8 Z"
        fill="white" stroke="rgba(0,0,0,0.15)" strokeWidth="0.6" />
      {/* D-pad */}
      <rect x="-13" y="-4" width="6" height="2" fill="#3a3a3a" />
      <rect x="-11" y="-6" width="2" height="6" fill="#3a3a3a" />
      {/* Buttons (right) */}
      <circle cx="9"  cy="-2" r="1.6" fill="#e63946" />
      <circle cx="13" cy="2"  r="1.6" fill="#fdc830" />
      <circle cx="9"  cy="6"  r="1.6" fill="#3a86ff" />
      <circle cx="5"  cy="2"  r="1.6" fill="#06d6a0" />
    </g>
  </IconBase>
);
