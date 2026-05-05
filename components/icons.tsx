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
  // Original: a teal/cyan square with a flat aperture-style camera shape.
  // Avoids Instagram's signature warm-gradient pink/orange palette.
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gramG2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4fc3f7" />
          <stop offset="100%" stopColor="#1565c0" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="14" height="14" rx="3" fill="url(#gramG2)" />
      <polygon points="8,4 11.5,6 11.5,10 8,12 4.5,10 4.5,6" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.6" fill="#fff" />
    </svg>
  );
};

export const ShwitterIcon = ({ size }: { size?: number }) => {
  // Original: speech-bubble pair on a teal background.
  // No X glyph, no Twitter-blue.
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="14" height="14" rx="3" fill="#0e7e7e" />
      <path d="M 3 4 L 9 4 L 9 9 L 7 9 L 5 11 L 5 9 L 3 9 Z" fill="#fff" />
      <path d="M 7.5 6 L 13 6 L 13 11 L 11 11 L 9 13 L 9 11 L 7.5 11 Z" fill="#a5e6e6" />
    </svg>
  );
};

export const TubeIcon = ({ size }: { size?: number }) => {
  // Original: dark rounded rectangle (TV/monitor style) with a triangular play.
  // Color is purple instead of YouTube red, body shape is taller and stylized.
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="2" width="13" height="11" rx="2" fill="#5e35b1" />
      <rect x="1.5" y="2" width="13" height="2.5" fill="#3f1f80" />
      <circle cx="3.4" cy="3.25" r="0.45" fill="#ffea00" />
      <circle cx="4.6" cy="3.25" r="0.45" fill="#fb8c00" />
      <polygon points="6.5,6 11,8.5 6.5,11" fill="#fff" />
      <rect x="5" y="13.5" width="6" height="0.7" rx="0.3" fill="#3f1f80" />
    </svg>
  );
};

export const BookIcon = ({ size }: { size?: number }) => {
  // Original: orange rounded square with a stylized "S" — not Facebook's italic Georgia "f".
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="14" height="14" rx="3" fill="#ef6c00" />
      <path
        d="M 11 5 Q 11 4 9.5 4 L 6.5 4 Q 5 4 5 5.5 Q 5 7 6.5 7.5 L 9.5 8.5 Q 11 9 11 10.5 Q 11 12 9.5 12 L 6 12 Q 5 12 5 11"
        fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
};

export const SfyIcon = ({ size }: { size?: number }) => {
  // Original: deep purple circle with a stylized note silhouette.
  // No green-and-arcs Spotify motif.
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" fill="#6a1b9a" />
      <path d="M 7 4 L 11.5 3 L 11.5 9.5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="6" cy="10" rx="1.6" ry="1.2" fill="#fff" />
      <ellipse cx="10.3" cy="10.5" rx="1.4" ry="1" fill="#fff" />
      <line x1="7.6" y1="10" x2="7.6" y2="4.7" stroke="#fff" strokeWidth="0.8" />
      <line x1="11.7" y1="10.5" x2="11.7" y2="3.3" stroke="#fff" strokeWidth="0.8" />
    </svg>
  );
};

export const PaintIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="1.5" width="8" height="3.5" fill="#c0c0c0" stroke="#444" strokeWidth="0.5" rx="0.5" transform="rotate(45 10 3.25)" />
      <rect x="3" y="5" width="5" height="2.5" fill="#a05a2c" stroke="#3d1e0a" strokeWidth="0.5" transform="rotate(45 5.5 6.25)" />
      <path d="M 3 8 L 5.5 6 L 7 7.5 L 4 10 Z" fill="#fff200" stroke="#000" strokeWidth="0.5" />
      <path d="M 1.5 14.5 L 3 12 L 4.5 13.5 L 2 15 Z" fill="#fff200" stroke="#000" strokeWidth="0.5" />
      <path d="M 4 10 L 2 14" stroke="#cc6600" strokeWidth="0.4" />
    </svg>
  );
};

export const PaintIconLarge = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="4" width="22" height="9" fill="#c0c0c0" stroke="#444" strokeWidth="1" rx="1" transform="rotate(45 33 8.5)" />
    <rect x="11" y="14" width="14" height="6" fill="#a05a2c" stroke="#3d1e0a" strokeWidth="1" transform="rotate(45 18 17)" />
    <path d="M 11 24 L 17 18 L 21 22 L 14 28 Z" fill="#fff200" stroke="#000" strokeWidth="1" />
    <path d="M 4 44 L 10 36 L 14 40 L 7 46 Z" fill="#fff200" stroke="#000" strokeWidth="1" />
    <path d="M 13 28 L 6 41" stroke="#cc6600" strokeWidth="1.5" />
  </svg>
);

export const PencilToolIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="2" width="3" height="11" fill="#fff200" stroke="#444" strokeWidth="0.5" />
    <path d="M 3 13 L 4.5 16 L 6 13 Z" fill="#222" />
    <rect x="3" y="2" width="3" height="2" fill="#ec7777" />
    <rect x="3" y="4" width="3" height="0.4" fill="#888" />
  </svg>
);

export const EraserToolIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="6.5" width="11" height="6" fill="#ff8fb5" stroke="#444" strokeWidth="0.5" rx="0.5" transform="rotate(-25 8 9.5)" />
    <rect x="2.5" y="6.5" width="4" height="6" fill="#e8688f" stroke="#444" strokeWidth="0.5" transform="rotate(-25 4.5 9.5)" />
    <line x1="6" y1="9.5" x2="13.5" y2="6" stroke="#444" strokeWidth="0.4" />
  </svg>
);

export const SunIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3.2" fill="#ffd54f" stroke="#cc8800" strokeWidth="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1="8" y1="1.5" x2="8" y2="3" stroke="#cc8800" strokeWidth="1" strokeLinecap="round" transform={`rotate(${a} 8 8)`} />
      ))}
    </svg>
  );
};

export const ChatIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M 1.5 3 L 11 3 L 11 9.5 L 6.5 9.5 L 4 12 L 4 9.5 L 1.5 9.5 Z" fill="#5b9bd5" stroke="#1f4e79" strokeWidth="0.6" strokeLinejoin="round" />
      <path d="M 5 6 L 11 6 L 14.5 6 L 14.5 11.5 L 12.5 11.5 L 12.5 13.5 L 10.5 11.5 L 7 11.5 L 7 9.5" fill="#92d050" stroke="#385723" strokeWidth="0.6" strokeLinejoin="round" />
    </svg>
  );
};

export const ChatIconLarge = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M 4 6 L 32 6 L 32 28 L 18 28 L 11 35 L 11 28 L 4 28 Z" fill="#5b9bd5" stroke="#1f4e79" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="11" cy="17" r="1.5" fill="#fff" />
    <circle cx="18" cy="17" r="1.5" fill="#fff" />
    <circle cx="25" cy="17" r="1.5" fill="#fff" />
    <path d="M 16 18 L 38 18 L 44 18 L 44 38 L 38 38 L 38 44 L 32 38 L 22 38 L 22 28" fill="#92d050" stroke="#385723" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

export const GoonIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M 4 2 L 12 2 L 11 7 C 11 9 9.5 10 8 10 C 6.5 10 5 9 5 7 Z" fill="#a4185a" stroke="#5a0c2e" strokeWidth="0.5" />
      <line x1="8" y1="10" x2="8" y2="14" stroke="#5a0c2e" strokeWidth="0.8" />
      <ellipse cx="8" cy="14" rx="2.6" ry="0.6" fill="#5a0c2e" />
    </svg>
  );
};

export const GalleryIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="3" width="11" height="9" fill="#fff" stroke="#000" strokeWidth="0.6" />
      <rect x="3.5" y="5" width="11" height="9" fill="#fff" stroke="#000" strokeWidth="0.6" />
      <circle cx="11.5" cy="8" r="0.9" fill="#ffd54f" />
      <path d="M 5 12 L 8 9 L 10 11 L 12 10 L 13.5 13 L 5 13 Z" fill="#5a9b3c" />
    </svg>
  );
};

export const WallpaperIcon = ({ size }: { size?: number }) => {
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="2.5" width="13" height="11" fill="#5392d6" stroke="#000" strokeWidth="0.5" />
      <ellipse cx="3" cy="11" rx="3" ry="1.5" fill="#6cb344" />
      <ellipse cx="13" cy="12" rx="4" ry="2" fill="#468a2c" />
      <circle cx="11.5" cy="5" r="1" fill="#ffd54f" />
      <ellipse cx="6" cy="4" rx="2" ry="0.6" fill="#fff" opacity="0.8" />
    </svg>
  );
};

export const ReviewIcon = ({ size }: { size?: number }) => {
  // Original star/clipboard hybrid — gold star on a notepad-shape
  const s = sizeFor(size);
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="12" height="13" rx="1.5" fill="#ffd54f" stroke="#a87a00" strokeWidth="0.6" />
      <rect x="2" y="2" width="12" height="2.5" fill="#a87a00" />
      <polygon
        points="8,5.5 9,7.7 11.4,7.9 9.6,9.5 10.1,11.8 8,10.7 5.9,11.8 6.4,9.5 4.6,7.9 7,7.7"
        fill="#fff" stroke="#5b3f00" strokeWidth="0.4" strokeLinejoin="round"
      />
    </svg>
  );
};

export const ReviewIconLarge = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="26" height="27" rx="2" fill="#ffd54f" stroke="#a87a00" strokeWidth="1.2" />
    <rect x="3" y="3" width="26" height="5" fill="#a87a00" />
    <circle cx="6" cy="5.5" r="0.7" fill="#ffd54f" />
    <circle cx="8.5" cy="5.5" r="0.7" fill="#ffd54f" />
    <polygon
      points="16,11 17.9,15.3 22.6,15.7 19,18.7 20.1,23.2 16,20.7 11.9,23.2 13,18.7 9.4,15.7 14.1,15.3"
      fill="#fff" stroke="#5b3f00" strokeWidth="0.7" strokeLinejoin="round"
    />
  </svg>
);
