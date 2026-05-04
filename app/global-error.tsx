'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: '#0028a8',
          color: '#fff',
          fontFamily: 'Lucida Console, Consolas, monospace',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: 720, width: '100%', lineHeight: 1.6, fontSize: 14 }}>
          <div style={{ textAlign: 'center', fontSize: 22, marginBottom: 24, fontWeight: 'bold' }}>
            BLUE SCREEN OF SHAGGA
          </div>
          <p>
            A fatal exception <strong>0x000000SHAG</strong> has occurred at <strong>0xCOOKED</strong>:0x4747SHAG.
            The current application will be terminated.
          </p>
          <p>
            *  The system has gone walkabout.
          </p>
          <p>
            *  If this is the first time you&apos;ve seen this Stop error screen,
            yell at a maggie and try again. If this screen appears again, follow these steps:
          </p>
          <ul>
            <li>Check that you&apos;re a top shagga, not a bottom one</li>
            <li>Have you tried turning your nan off and on again?</li>
            <li>Run a sausage sizzle to flush the system</li>
          </ul>
          {error.digest && (
            <p style={{ opacity: 0.7, marginTop: 24 }}>
              Technical details: {error.digest}
            </p>
          )}
          <p style={{ marginTop: 32, textAlign: 'center' }}>
            <button
              onClick={reset}
              style={{
                background: '#fff',
                color: '#0028a8',
                border: 'none',
                padding: '10px 24px',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Press any key to continue _
            </button>
          </p>
        </div>
      </body>
    </html>
  );
}
