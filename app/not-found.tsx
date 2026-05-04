import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found • shagga.org',
};

const REASONS = [
  'this page is cooked, mate',
  "she's gone walkabout",
  'this page is on smoko',
  'page not found. probably at the pub',
  'this page yeeted itself into the void',
  'page has gone to bunnings, brb',
];

export default function NotFound() {
  // Pick a reason deterministically per request (no hydration mismatch).
  const reason = REASONS[Math.floor(Math.random() * REASONS.length)];

  return (
    <div className="errpage-root">
      <div className="errpage-window">
        <div className="errpage-titlebar">
          <span className="errpage-title">⚠ Error - shagga.exe</span>
          <Link href="/" className="errpage-close" aria-label="close">✕</Link>
        </div>
        <div className="errpage-body">
          <div className="errpage-icon" aria-hidden>⚠</div>
          <div className="errpage-content">
            <h1 className="errpage-heading">404 — Page Not Found</h1>
            <p className="errpage-msg">{reason}</p>
            <p className="errpage-sub">
              The page you&apos;re looking for doesn&apos;t exist. Maybe check the spelling,
              or maybe ask your nan. She&apos;ll know.
            </p>
            <div className="errpage-actions">
              <Link href="/" className="errpage-btn errpage-btn-primary">OK</Link>
              <Link href="/" className="errpage-btn">Take me back to shagga.org</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
