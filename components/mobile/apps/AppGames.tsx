'use client';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';

// ============================================================
// GAMES — hub with Flappy Shagga + Mineshagga
// Both are self-contained, error-tolerant, and clean up after themselves.
// High scores persist in localStorage.
// ============================================================

type GameKey = 'flappy' | 'mines';

interface GameMeta {
  key: GameKey;
  name: string;
  blurb: string;
  emoji: string;
  bg: string;
}

const GAMES: GameMeta[] = [
  { key: 'flappy', name: 'Flappy Shagga', blurb: 'tap to flap. dodge the snags. one life.',           emoji: '🐦', bg: 'linear-gradient(135deg, #4ec0e6 0%, #2079a8 100%)' },
  { key: 'mines',  name: 'Mineshagga',    blurb: 'classic minesweeper. 9×9 grid. 10 magpies hiding.', emoji: '💣', bg: 'linear-gradient(135deg, #b0b0b0 0%, #4a4a4a 100%)' },
];

export const AppGames: React.FC = () => {
  const [active, setActive] = useState<GameKey | null>(null);

  if (active === 'flappy') return <FlappyShagga onExit={() => setActive(null)} />;
  if (active === 'mines')  return <Mineshagga  onExit={() => setActive(null)} />;

  return (
    <div className="games-hub">
      <h2 className="games-h">Games</h2>
      <p className="games-sub">no in-app purchases. no ads. just shagga.</p>
      <div className="games-grid">
        {GAMES.map((g) => (
          <button key={g.key} className="games-card" onClick={() => setActive(g.key)} style={{ background: g.bg }}>
            <div className="games-card-emoji">{g.emoji}</div>
            <div className="games-card-text">
              <div className="games-card-name">{g.name}</div>
              <div className="games-card-blurb">{g.blurb}</div>
            </div>
            <span className="games-card-arrow">›</span>
          </button>
        ))}
      </div>
      <p className="games-foot">more games coming when i can be bothered</p>
    </div>
  );
};

// ============================================================
// FLAPPY SHAGGA
// ============================================================
// Constants tuned for mobile playability — generous gap, slow-ish speed.
const FLAPPY = {
  gravity: 0.42,        // px / frame²
  flapVel: -7.4,
  pipeWidth: 60,
  pipeGap: 150,
  pipeSpeed: 2.2,
  birdX: 64,
  birdRadius: 16,
  pipeIntervalMs: 1500,
  hiKey: 'shagga-flappy-hi',
} as const;

interface FlappyState {
  birdY: number;
  birdVY: number;
  pipes: Array<{ x: number; gapY: number; passed: boolean }>;
  lastPipeAt: number;
  score: number;
  status: 'idle' | 'playing' | 'dead';
  width: number;
  height: number;
}

const FlappyShagga: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<FlappyState>({
    birdY: 0,
    birdVY: 0,
    pipes: [],
    lastPipeAt: 0,
    score: 0,
    status: 'idle',
    width: 360,
    height: 480,
  });
  const [, forceRender] = useReducer((n: number) => n + 1, 0);
  const [hi, setHi] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try { return Number(window.localStorage.getItem(FLAPPY.hiKey) ?? '0') || 0; } catch { return 0; }
  });

  // Initialise size + bird position once mounted
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const s = stateRef.current;
    s.width = rect.width || 360;
    s.height = rect.height || 480;
    s.birdY = s.height / 2;
    forceRender();
  }, []);

  // Game loop — only runs while playing
  useEffect(() => {
    if (stateRef.current.status !== 'playing') return;
    let raf = 0;
    let last = performance.now();
    let alive = true;

    const tick = (now: number) => {
      if (!alive) return;
      const dt = Math.min(now - last, 50); // cap dt to avoid huge jumps after a backgrounded tab
      const stepScale = dt / 16.67; // normalised to 60fps
      last = now;

      const s = stateRef.current;

      // Bird physics
      s.birdVY += FLAPPY.gravity * stepScale;
      // Clamp velocity (prevents tunnelling through pipes after long pause)
      if (s.birdVY > 12) s.birdVY = 12;
      if (s.birdVY < -12) s.birdVY = -12;
      s.birdY += s.birdVY * stepScale;

      // Bounds (top OK, bottom = die)
      if (s.birdY > s.height - FLAPPY.birdRadius) {
        s.birdY = s.height - FLAPPY.birdRadius;
        endRun();
        return;
      }
      if (s.birdY < FLAPPY.birdRadius) {
        s.birdY = FLAPPY.birdRadius;
        s.birdVY = 0;
      }

      // Pipes
      for (const p of s.pipes) p.x -= FLAPPY.pipeSpeed * stepScale;
      s.pipes = s.pipes.filter((p) => p.x > -FLAPPY.pipeWidth);

      if (now - s.lastPipeAt > FLAPPY.pipeIntervalMs) {
        const margin = 60;
        const gapY = margin + Math.random() * Math.max(20, s.height - FLAPPY.pipeGap - margin * 2);
        s.pipes.push({ x: s.width, gapY, passed: false });
        s.lastPipeAt = now;
      }

      // Collisions + score
      for (const p of s.pipes) {
        const inX = FLAPPY.birdX + FLAPPY.birdRadius > p.x && FLAPPY.birdX - FLAPPY.birdRadius < p.x + FLAPPY.pipeWidth;
        if (inX) {
          if (s.birdY - FLAPPY.birdRadius < p.gapY || s.birdY + FLAPPY.birdRadius > p.gapY + FLAPPY.pipeGap) {
            endRun();
            return;
          }
        }
        if (!p.passed && p.x + FLAPPY.pipeWidth < FLAPPY.birdX) {
          p.passed = true;
          s.score += 1;
        }
      }

      forceRender();
      raf = requestAnimationFrame(tick);
    };

    const endRun = () => {
      const s = stateRef.current;
      s.status = 'dead';
      if (s.score > hi) {
        setHi(s.score);
        try { window.localStorage.setItem(FLAPPY.hiKey, String(s.score)); } catch { /* private mode */ }
      }
      forceRender();
    };

    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
    };
  // We deliberately re-arm whenever status or container size changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateRef.current.status]);

  const start = useCallback(() => {
    const el = wrapRef.current;
    const rect = el?.getBoundingClientRect();
    const s = stateRef.current;
    s.width = rect?.width || s.width;
    s.height = rect?.height || s.height;
    s.birdY = s.height / 2;
    s.birdVY = 0;
    s.pipes = [];
    s.lastPipeAt = performance.now();
    s.score = 0;
    s.status = 'playing';
    forceRender();
  }, []);

  const flap = useCallback(() => {
    const s = stateRef.current;
    if (s.status === 'idle' || s.status === 'dead') {
      start();
      s.birdVY = FLAPPY.flapVel;
      forceRender();
      return;
    }
    s.birdVY = FLAPPY.flapVel;
  }, [start]);

  // Keyboard: space to flap (for laptop testers)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); flap(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flap]);

  const s = stateRef.current;

  return (
    <div className="flappy-shell">
      <div className="flappy-bar">
        <button className="flappy-back" onClick={onExit}>‹ Games</button>
        <div className="flappy-bar-center">
          <div className="flappy-score-big">{s.score}</div>
          {hi > 0 && <div className="flappy-hi-tag">BEST {hi}</div>}
        </div>
        <span className="flappy-bar-spacer" />
      </div>
      <div
        ref={wrapRef}
        className="flappy-wrap"
        onPointerDown={(e) => { e.preventDefault(); flap(); }}
        role="button"
        tabIndex={0}
      >
        {/* Cloud parallax background */}
        <div className="flappy-clouds" aria-hidden>
          <div className="flappy-cloud flappy-cloud-1" />
          <div className="flappy-cloud flappy-cloud-2" />
          <div className="flappy-cloud flappy-cloud-3" />
          <div className="flappy-cloud flappy-cloud-4" />
        </div>

        {/* Pipes */}
        {s.pipes.map((p, i) => {
          const lowerTop = p.gapY + FLAPPY.pipeGap;
          const lowerHeight = Math.max(0, s.height - lowerTop);
          return (
            <React.Fragment key={i}>
              {/* Upper pipe */}
              <div className="flappy-pipe" style={{ top: 0, width: FLAPPY.pipeWidth, height: Math.max(0, p.gapY - 18), transform: `translate3d(${p.x}px, 0, 0)` }} />
              <div className="flappy-pipe-cap" style={{ top: Math.max(0, p.gapY - 18), width: FLAPPY.pipeWidth + 8, height: 18, transform: `translate3d(${p.x - 4}px, 0, 0)` }} />
              {/* Lower pipe */}
              <div className="flappy-pipe-cap" style={{ top: lowerTop, width: FLAPPY.pipeWidth + 8, height: 18, transform: `translate3d(${p.x - 4}px, 0, 0)` }} />
              <div className="flappy-pipe" style={{ top: lowerTop + 18, width: FLAPPY.pipeWidth, height: Math.max(0, lowerHeight - 18), transform: `translate3d(${p.x}px, 0, 0)` }} />
            </React.Fragment>
          );
        })}

        {/* Ground stripe */}
        <div className="flappy-ground" aria-hidden />

        {/* Bird (custom SVG) */}
        <div
          className="flappy-bird"
          style={{
            transform: `translate3d(${FLAPPY.birdX - FLAPPY.birdRadius}px, ${s.birdY - FLAPPY.birdRadius}px, 0) rotate(${Math.max(-25, Math.min(70, s.birdVY * 5))}deg)`,
            width: FLAPPY.birdRadius * 2,
            height: FLAPPY.birdRadius * 2,
          }}
        >
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            {/* tail feather */}
            <path d="M 4 16 Q 1 17 4 19 L 7 18 Z" fill="#e89422" stroke="#1a1a1a" strokeWidth="0.8" strokeLinejoin="round" />
            {/* body */}
            <circle cx="17" cy="16" r="11" fill="#fdcb44" stroke="#1a1a1a" strokeWidth="1.2" />
            {/* belly */}
            <ellipse cx="17" cy="20" rx="7" ry="4.5" fill="#fff5d8" />
            {/* wing */}
            <path d="M 11 14 Q 9 16 12 19 Q 15 19 16 16 Q 14 13 11 14 Z" fill="#f0a82b" stroke="#1a1a1a" strokeWidth="1" />
            {/* beak */}
            <path d="M 26 14 L 30 16 L 26 18 Z" fill="#f57c00" stroke="#1a1a1a" strokeWidth="0.9" strokeLinejoin="round" />
            {/* beak line */}
            <path d="M 26 16 L 30 16" stroke="#1a1a1a" strokeWidth="0.8" />
            {/* eye white */}
            <circle cx="21" cy="11.5" r="3.2" fill="white" stroke="#1a1a1a" strokeWidth="0.9" />
            {/* pupil */}
            <circle cx="22" cy="11" r="1.5" fill="#1a1a1a" />
            {/* tiny highlight */}
            <circle cx="22.5" cy="10.6" r="0.5" fill="white" />
          </svg>
        </div>

        {/* Overlays */}
        {s.status === 'idle' && (
          <div className="flappy-overlay">
            <div className="flappy-panel">
              <div className="flappy-title">Flappy Shagga</div>
              <p className="flappy-instr">tap to flap</p>
              <p className="flappy-dim">space bar works on a laptop</p>
            </div>
          </div>
        )}
        {s.status === 'dead' && (
          <div className="flappy-overlay">
            <div className="flappy-panel flappy-panel-dead">
              <div className="flappy-title">game over</div>
              <div className="flappy-stats">
                <div className="flappy-stats-row">
                  <span>score</span><strong>{s.score}</strong>
                </div>
                <div className="flappy-stats-row">
                  <span>best</span><strong>{hi}</strong>
                </div>
              </div>
              {s.score > 0 && s.score >= hi && <div className="flappy-new-hi">NEW HIGH SCORE</div>}
              <p className="flappy-dim">tap to try again</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// MINESHAGGA — minesweeper
// ============================================================
const MINES_ROWS = 9;
const MINES_COLS = 9;
const MINES_COUNT = 10;
const MINES_HI_KEY = 'shagga-mines-best-ms';

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adj: number;
}

function newMinesGrid(safeR?: number, safeC?: number): Cell[][] {
  const grid: Cell[][] = Array.from({ length: MINES_ROWS }, () =>
    Array.from({ length: MINES_COLS }, () => ({ mine: false, revealed: false, flagged: false, adj: 0 }))
  );
  let placed = 0;
  while (placed < MINES_COUNT) {
    const r = Math.floor(Math.random() * MINES_ROWS);
    const c = Math.floor(Math.random() * MINES_COLS);
    // Don't place on first-tap cell or its neighbours to guarantee a safe opening
    if (typeof safeR === 'number' && typeof safeC === 'number') {
      if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
    }
    if (grid[r][c].mine) continue;
    grid[r][c].mine = true;
    placed += 1;
  }
  for (let r = 0; r < MINES_ROWS; r++) {
    for (let c = 0; c < MINES_COLS; c++) {
      if (grid[r][c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const rr = r + dr, cc = c + dc;
          if (rr >= 0 && rr < MINES_ROWS && cc >= 0 && cc < MINES_COLS && grid[rr][cc].mine) n += 1;
        }
      }
      grid[r][c].adj = n;
    }
  }
  return grid;
}

function cloneGrid(g: Cell[][]): Cell[][] {
  return g.map((row) => row.map((c) => ({ ...c })));
}

function floodReveal(grid: Cell[][], r: number, c: number): Cell[][] {
  const next = cloneGrid(grid);
  const queue: Array<[number, number]> = [[r, c]];
  const seen = new Set<string>();
  while (queue.length) {
    const [rr, cc] = queue.shift()!;
    const key = `${rr},${cc}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (rr < 0 || rr >= MINES_ROWS || cc < 0 || cc >= MINES_COLS) continue;
    const cell = next[rr][cc];
    if (cell.revealed || cell.flagged || cell.mine) continue;
    cell.revealed = true;
    if (cell.adj === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          queue.push([rr + dr, cc + dc]);
        }
      }
    }
  }
  return next;
}

function isWon(grid: Cell[][]): boolean {
  for (const row of grid) for (const c of row) {
    if (!c.mine && !c.revealed) return false;
  }
  return true;
}

const NUM_COLOR: Record<number, string> = {
  1: '#1976d2', 2: '#388e3c', 3: '#d32f2f', 4: '#7b1fa2',
  5: '#f57c00', 6: '#0097a7', 7: '#212121', 8: '#5d4037',
};

const Mineshagga: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [grid, setGrid] = useState<Cell[][]>(() => newMinesGrid());
  const [status, setStatus] = useState<'play' | 'won' | 'lost'>('play');
  const [flagMode, setFlagMode] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [start, setStart] = useState<number>(() => Date.now());
  const [now, setNow] = useState<number>(() => Date.now());
  const [best, setBest] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const v = window.localStorage.getItem(MINES_HI_KEY);
      return v ? Number(v) : null;
    } catch { return null; }
  });

  // Tick the clock once a second while playing
  useEffect(() => {
    if (status !== 'play' || firstClick) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [status, firstClick]);

  const elapsed = Math.max(0, Math.floor((now - start) / 1000));
  const flagsUsed = grid.flat().filter((c) => c.flagged).length;
  const minesRemaining = Math.max(0, MINES_COUNT - flagsUsed);

  const reset = useCallback(() => {
    setGrid(newMinesGrid());
    setStatus('play');
    setFlagMode(false);
    setFirstClick(true);
    const t = Date.now();
    setStart(t);
    setNow(t);
  }, []);

  const handleCell = (r: number, c: number) => {
    if (status !== 'play') return;
    const cell = grid[r][c];
    if (cell.revealed) return;

    // Flag toggle
    if (flagMode) {
      const next = cloneGrid(grid);
      next[r][c].flagged = !next[r][c].flagged;
      setGrid(next);
      return;
    }

    // Don't reveal flagged cells unless flag mode (avoid mistapping mines)
    if (cell.flagged) return;

    // First click: regenerate so it's always safe
    let working = grid;
    if (firstClick) {
      working = newMinesGrid(r, c);
      setFirstClick(false);
      setStart(Date.now());
      setNow(Date.now());
    }

    // Hit a mine = game over
    if (working[r][c].mine) {
      const dead = cloneGrid(working);
      // Reveal all mines
      for (let rr = 0; rr < MINES_ROWS; rr++) {
        for (let cc = 0; cc < MINES_COLS; cc++) {
          if (dead[rr][cc].mine) dead[rr][cc].revealed = true;
        }
      }
      dead[r][c].revealed = true;
      setGrid(dead);
      setStatus('lost');
      return;
    }

    const after = floodReveal(working, r, c);
    setGrid(after);
    if (isWon(after)) {
      setStatus('won');
      const t = Math.floor((Date.now() - start) / 1000);
      if (best === null || t < best) {
        setBest(t);
        try { window.localStorage.setItem(MINES_HI_KEY, String(t)); } catch { /* noop */ }
      }
    }
  };

  // Smiley face for reset button — classic minesweeper
  const smileyFace = status === 'lost' ? '😵' : status === 'won' ? '😎' : '🙂';
  // Pad numbers to 3 chars for LED look (matches classic Mines)
  const led = (n: number) => String(Math.max(0, Math.min(999, n))).padStart(3, '0');

  return (
    <div className="mines-app">
      <div className="mines-topbar">
        <button className="mines-back" onClick={onExit}>‹ Games</button>
        <span className="mines-title">Mineshagga</span>
        <span className="mines-best">{best != null ? `best ${best}s` : ''}</span>
      </div>

      <div className="mines-frame">
        <div className="mines-hud">
          <div className="mines-led" aria-label="mines remaining">{led(minesRemaining)}</div>
          <button className="mines-smiley" onClick={reset} aria-label="reset">
            <span className="mines-smiley-glyph">{smileyFace}</span>
          </button>
          <div className="mines-led" aria-label="elapsed seconds">{led(elapsed)}</div>
        </div>

        <div className="mines-controls">
          <button
            className={flagMode ? 'mines-mode-pill mines-mode-pill-on' : 'mines-mode-pill'}
            onClick={() => setFlagMode((m) => !m)}
          >
            {flagMode ? '🚩 Flag mode' : '👆 Tap mode'}
          </button>
        </div>

        <div className="mines-grid">
          {grid.map((row, r) => (
            <div key={r} className="mines-row">
              {row.map((cell, c) => {
                let cls = 'mines-cell';
                let body: React.ReactNode = '';
                if (cell.revealed) {
                  cls += ' mines-cell-rev';
                  if (cell.mine) {
                    cls += ' mines-cell-mine';
                    body = (
                      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                        <circle cx="12" cy="13" r="6" fill="#1a1a1a" />
                        <rect x="11" y="6" width="2" height="3" fill="#1a1a1a" />
                        <circle cx="9.5" cy="11.5" r="1" fill="white" />
                        <line x1="6" y1="13" x2="4" y2="13" stroke="#1a1a1a" strokeWidth="1" />
                        <line x1="18" y1="13" x2="20" y2="13" stroke="#1a1a1a" strokeWidth="1" />
                        <line x1="12" y1="19" x2="12" y2="21" stroke="#1a1a1a" strokeWidth="1" />
                      </svg>
                    );
                  } else if (cell.adj > 0) {
                    body = <span style={{ color: NUM_COLOR[cell.adj] }}>{cell.adj}</span>;
                  }
                } else if (cell.flagged) {
                  body = (
                    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
                      <line x1="8" y1="4" x2="8" y2="20" stroke="#1a1a1a" strokeWidth="1.5" />
                      <polygon points="8,4 17,7 8,10" fill="#d32f2f" stroke="#1a1a1a" strokeWidth="1" />
                      <rect x="5" y="19" width="6" height="2" fill="#1a1a1a" />
                    </svg>
                  );
                }
                return (
                  <button
                    key={c}
                    className={cls}
                    onClick={() => handleCell(r, c)}
                    disabled={status !== 'play'}
                  >
                    {body}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mines-foot">
        {status === 'won' && (
          <p className="mines-end mines-won">
            🎉 cleared in {elapsed}s{best === elapsed && elapsed > 0 && ' — new best'}
          </p>
        )}
        {status === 'lost' && (
          <p className="mines-end mines-lost">💥 boom. tap the face to retry.</p>
        )}
        {status === 'play' && (
          <p className="mines-tip">
            {flagMode ? 'tap a cell to flag it' : 'tap a cell to reveal it'}
          </p>
        )}
      </div>
    </div>
  );
};
