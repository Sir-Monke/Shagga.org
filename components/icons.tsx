import React from 'react';

const sizeFor = (n?: number) => n ?? 16;

export const NotepadIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="1.5" width="10" height="13" fill="#ffffff" stroke="#000" strokeWidth="0.6" />
      <rect x="2.5" y="1.5" width="10" height="2.2" fill="#316ac5" />
      <line x1="4" y1="6"  x2="11" y2="6"  stroke="#316ac5" strokeWidth="0.6" />
      <line x1="4" y1="8"  x2="11" y2="8"  stroke="#316ac5" strokeWidth="0.6" />
      <line x1="4" y1="10" x2="11" y2="10" stroke="#316ac5" strokeWidth="0.6" />
      <line x1="4" y1="12" x2="9"  y2="12" stroke="#316ac5" strokeWidth="0.6" />
    </svg>
  );
};

export const NotepadIconLarge = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M 9 5 L 33 5 L 39 11 L 39 43 L 9 43 Z" fill="#fff" stroke="#000" strokeWidth="1" strokeLinejoin="round" />
    <path d="M 33 5 L 33 11 L 39 11 Z" fill="#dcdcdc" stroke="#000" strokeWidth="1" strokeLinejoin="round" />
    <line x1="13" y1="18" x2="34" y2="18" stroke="#316ac5" strokeWidth="1" />
    <line x1="13" y1="22" x2="34" y2="22" stroke="#316ac5" strokeWidth="1" />
    <line x1="13" y1="26" x2="34" y2="26" stroke="#316ac5" strokeWidth="1" />
    <line x1="13" y1="30" x2="34" y2="30" stroke="#316ac5" strokeWidth="1" />
    <line x1="13" y1="34" x2="28" y2="34" stroke="#316ac5" strokeWidth="1" />
  </svg>
);

export const PhotoIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="2.5" width="13" height="11" fill="#fff" stroke="#000" strokeWidth="0.6" />
      <rect x="1.5" y="2.5" width="13" height="1.6" fill="#316ac5" />
      <circle cx="11" cy="6" r="1" fill="#ffd54f" />
      <path d="M 3 12 L 6 8 L 9 11 L 11 9 L 13 12 Z" fill="#5a9b3c" />
    </svg>
  );
};

export const MoneyIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="3.5" width="13" height="9" fill="#aed581" stroke="#000" strokeWidth="0.6" />
      <circle cx="8" cy="8" r="2.5" fill="#fff" stroke="#000" strokeWidth="0.5" />
      <text x="8" y="10" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#000">£</text>
    </svg>
  );
};

export const SkullIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8 1.5 C 4.5 1.5 2.5 4 2.5 7 L 2.5 10 L 4 12 L 4 14 L 6 14 L 6 12.5 L 10 12.5 L 10 14 L 12 14 L 12 12 L 13.5 10 L 13.5 7 C 13.5 4 11.5 1.5 8 1.5 Z" fill="#fff" stroke="#000" strokeWidth="0.6" />
      <circle cx="6" cy="7.5" r="1.2" fill="#000" />
      <circle cx="10" cy="7.5" r="1.2" fill="#000" />
      <path d="M 7 10 L 7 11.5 M 9 10 L 9 11.5 M 8 10 L 8 11.8" stroke="#000" strokeWidth="0.5" />
    </svg>
  );
};

export const NortonIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.5" fill="#ffd633" stroke="#cc8800" strokeWidth="1" />
      <text x="8" y="11" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000">⊙</text>
    </svg>
  );
};

export const LimewireIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="8" cy="8" rx="5.5" ry="6.5" fill="#a3d943" stroke="#5d8a1a" strokeWidth="1" transform="rotate(-15 8 8)" />
    </svg>
  );
};

export const MsnIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M 1 8 L 4 4 L 8 6 L 12 4 L 15 8 L 12 12 L 8 10 L 4 12 Z" fill="#33aaff" stroke="#0066cc" strokeWidth="0.5" />
    </svg>
  );
};

export const StarIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8 1 L 10 6 L 15 6.5 L 11 10 L 12 15 L 8 12.5 L 4 15 L 5 10 L 1 6.5 L 6 6 Z" fill="#ffd633" stroke="#cc8800" strokeWidth="0.6" />
    </svg>
  );
};

export const UpdateIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.5" fill="#4584e1" stroke="#003ca6" strokeWidth="0.6" />
      <path d="M 5 8 L 7 10 L 11 6" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const EmailIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="3.5" width="13" height="9" fill="#fff" stroke="#000" strokeWidth="0.6" />
      <path d="M 1.5 3.5 L 8 8.5 L 14.5 3.5" fill="none" stroke="#000" strokeWidth="0.6" />
    </svg>
  );
};

export const CalculatorIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1.5" width="12" height="13" fill="#ece9d8" stroke="#000" strokeWidth="0.6" />
      <rect x="3" y="3" width="10" height="3" fill="#aaffaa" />
      <rect x="3" y="7"  width="2" height="2" fill="#fff" stroke="#888" strokeWidth="0.4" />
      <rect x="6" y="7"  width="2" height="2" fill="#fff" stroke="#888" strokeWidth="0.4" />
      <rect x="9" y="7"  width="2" height="2" fill="#fff" stroke="#888" strokeWidth="0.4" />
      <rect x="3" y="10" width="2" height="2" fill="#fff" stroke="#888" strokeWidth="0.4" />
      <rect x="6" y="10" width="2" height="2" fill="#fff" stroke="#888" strokeWidth="0.4" />
      <rect x="9" y="10" width="2" height="2" fill="#fc6" stroke="#888" strokeWidth="0.4" />
    </svg>
  );
};

export const MineIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="9" r="5" fill="#000" />
      <line x1="8" y1="2" x2="8" y2="5" stroke="#000" strokeWidth="1" />
      <circle cx="8" cy="2" r="1" fill="#cc0000" />
      <circle cx="6" cy="7" r="1" fill="#fff" />
    </svg>
  );
};

export const IEIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <text x="8" y="13" textAnchor="middle" fontFamily="Times New Roman, serif" fontWeight="bold" fontSize="14" fill="#0066ff">e</text>
      <ellipse cx="8" cy="8" rx="6" ry="2.5" fill="none" stroke="#ffaa00" strokeWidth="0.8" transform="rotate(-20 8 8)" />
    </svg>
  );
};

export const RecycleIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M 3 5 L 13 5 L 12 14 L 4 14 Z" fill="#aac8e6" stroke="#000" strokeWidth="0.6" />
      <path d="M 5 3 L 11 3 L 11 5 L 5 5 Z" fill="#88aacc" stroke="#000" strokeWidth="0.6" />
      <line x1="6" y1="7" x2="6" y2="12" stroke="#fff" strokeWidth="0.6" />
      <line x1="8" y1="7" x2="8" y2="12" stroke="#fff" strokeWidth="0.6" />
      <line x1="10" y1="7" x2="10" y2="12" stroke="#fff" strokeWidth="0.6" />
    </svg>
  );
};

export const RecycleIconLarge = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M 8 14 L 40 14 L 36 44 L 12 44 Z" fill="#aac8e6" stroke="#000" strokeWidth="1" />
    <path d="M 14 6 L 34 6 L 34 14 L 14 14 Z" fill="#88aacc" stroke="#000" strokeWidth="1" />
    <line x1="18" y1="20" x2="18" y2="40" stroke="#fff" strokeWidth="1.2" />
    <line x1="24" y1="20" x2="24" y2="40" stroke="#fff" strokeWidth="1.2" />
    <line x1="30" y1="20" x2="30" y2="40" stroke="#fff" strokeWidth="1.2" />
    <path d="M 16 9 Q 24 4 32 9" fill="none" stroke="#000" strokeWidth="1" />
  </svg>
);

export const FolderIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M 4 12 L 18 12 L 22 16 L 44 16 L 44 40 L 4 40 Z" fill="#ffd966" stroke="#000" strokeWidth="1" strokeLinejoin="round" />
    <path d="M 4 16 L 44 16 L 44 40 L 4 40 Z" fill="#ffe699" stroke="#000" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

export const MyShaggaIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="40" height="28" fill="#ddd" stroke="#000" strokeWidth="1.2" rx="2" />
    <rect x="7" y="9" width="34" height="22" fill="#0a4ec5" />
    <rect x="14" y="36" width="20" height="3" fill="#bbb" stroke="#000" strokeWidth="1" />
    <rect x="6" y="39" width="36" height="4" fill="#999" stroke="#000" strokeWidth="1" rx="1" />
  </svg>
);

export const GameIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="14" width="40" height="22" fill="#666" stroke="#000" strokeWidth="1" rx="10" />
    <circle cx="14" cy="25" r="5" fill="#999" stroke="#333" strokeWidth="1" />
    <circle cx="34" cy="22" r="2.5" fill="#cc0000" />
    <circle cx="38" cy="28" r="2.5" fill="#0066cc" />
  </svg>
);

export const RunIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="14" height="10" fill="#fff" stroke="#000" strokeWidth="0.6" />
      <text x="2" y="11" fontFamily="Lucida Console, monospace" fontSize="6" fill="#000">{'>_'}</text>
    </svg>
  );
};

export const SettingsIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.5" fill="#c0c0c0" stroke="#444" strokeWidth="0.6" />
      <circle cx="8" cy="8" r="2.5" fill="#444" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <rect key={a} x="7" y="0.5" width="2" height="3" fill="#666"
            transform={`rotate(${a} 8 8)`} />
        );
      })}
    </svg>
  );
};

export const GramIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gramG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#feda77" />
          <stop offset="50%" stopColor="#f58529" />
          <stop offset="100%" stopColor="#dd2a7b" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="14" height="14" rx="3" fill="url(#gramG)" />
      <rect x="3.5" y="3.5" width="9" height="9" rx="2.5" fill="none" stroke="#fff" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2.5" fill="none" stroke="#fff" strokeWidth="1.2" />
      <circle cx="11.5" cy="4.5" r="0.6" fill="#fff" />
    </svg>
  );
};

export const ShwitterIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="#000" />
      <text x="3" y="12" fontFamily="Arial Black, sans-serif" fontSize="11" fontWeight="900" fill="#fff">𝕏</text>
    </svg>
  );
};

export const TubeIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="14" height="10" rx="2.5" fill="#ff0000" />
      <polygon points="6,5.5 11,8 6,10.5" fill="#fff" />
    </svg>
  );
};

export const BookIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="#1877f2" />
      <text x="5.5" y="13" fontFamily="Georgia, serif" fontSize="13" fontWeight="bold" fill="#fff" fontStyle="italic">f</text>
    </svg>
  );
};

export const SfyIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" fill="#1db954" />
      <path d="M 4 6 Q 8 4 12 6" stroke="#000" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 4.5 8.5 Q 8 7 11.5 8.5" stroke="#000" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 5 11 Q 8 10 11 11" stroke="#000" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  );
};
