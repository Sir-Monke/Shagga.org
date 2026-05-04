'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for debugging — Vercel will pick this up in the function logs.
    console.error(error);
  }, [error]);

  return (
    <div className="errpage-root">
      <div className="errpage-window errpage-window-bad">
        <div className="errpage-titlebar errpage-titlebar-bad">
          <span className="errpage-title">⚠ shagga.exe has stopped responding</span>
          <button onClick={reset} className="errpage-close" aria-label="close">✕</button>
        </div>
        <div className="errpage-body">
          <div className="errpage-icon" aria-hidden>💀</div>
          <div className="errpage-content">
            <h1 className="errpage-heading">She&apos;s cooked, mate</h1>
            <p className="errpage-msg">
              Something went sideways. The shagga engine has thrown a wobbly.
            </p>
            <p className="errpage-sub">
              You can try again, head home, or just blame the maggies.
            </p>
            {error.digest && (
              <p className="errpage-digest">Error reference: {error.digest}</p>
            )}
            <div className="errpage-actions">
              <button onClick={reset} className="errpage-btn errpage-btn-primary">
                Try again
              </button>
              <Link href="/" className="errpage-btn">
                Back to shagga.org
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
