'use client';

import React, { useEffect, useState } from 'react';

const COLS = 9;
const ROWS = 9;
const MINES = 10;

interface Cell {
  mine: boolean;
  count: number;
  revealed: boolean;
  flagged: boolean;
}

function buildBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, count: 0, revealed: false, flagged: false }))
  );
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) count++;
        }
      }
      board[r][c].count = count;
    }
  }
  return board;
}

export default function MinesweeperBody() {
  const [board, setBoard] = useState<Cell[][]>(buildBoard);
  const [status, setStatus] = useState<'play' | 'won' | 'lost'>('play');
  const [time, setTime] = useState(0);
  const flagsLeft = MINES - board.flat().filter((c) => c.flagged).length;

  useEffect(() => {
    if (status !== 'play') return;
    const id = setInterval(() => setTime((t) => Math.min(999, t + 1)), 1000);
    return () => clearInterval(id);
  }, [status]);

  function reset() {
    setBoard(buildBoard());
    setStatus('play');
    setTime(0);
  }

  function reveal(r: number, c: number) {
    if (status !== 'play') return;
    const cell = board[r][c];
    if (cell.flagged || cell.revealed) return;
    const next = board.map((row) => row.map((c2) => ({ ...c2 })));
    if (cell.mine) {
      // reveal everything
      next.forEach((row) => row.forEach((c2) => { c2.revealed = true; }));
      setBoard(next);
      setStatus('lost');
      return;
    }
    flood(next, r, c);
    setBoard(next);
    // win check
    const allSafeRevealed = next.every((row) => row.every((c2) => c2.mine || c2.revealed));
    if (allSafeRevealed) setStatus('won');
  }

  function flag(r: number, c: number, e: React.MouseEvent) {
    e.preventDefault();
    if (status !== 'play') return;
    const next = board.map((row) => row.map((c2) => ({ ...c2 })));
    if (next[r][c].revealed) return;
    next[r][c].flagged = !next[r][c].flagged;
    setBoard(next);
  }

  function flood(b: Cell[][], r: number, c: number) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    const cell = b[r][c];
    if (cell.revealed || cell.flagged || cell.mine) return;
    cell.revealed = true;
    if (cell.count === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          flood(b, r + dr, c + dc);
        }
      }
    }
  }

  const face = status === 'lost' ? '😵' : status === 'won' ? '😎' : '🙂';
  const numColors = ['#000', '#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000', '#808080'];

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="mine-block">
        <div className="mine-status">
          <div className="mine-counter">{String(flagsLeft).padStart(3, '0')}</div>
          <button className="mine-face" onClick={reset}>{face}</button>
          <div className="mine-counter">{String(time).padStart(3, '0')}</div>
        </div>
        <div className="mine-grid">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                className={`mine-cell${cell.revealed ? ' revealed' : ''}${cell.mine && cell.revealed ? ' bomb' : ''}`}
                onClick={() => reveal(r, c)}
                onContextMenu={(e) => flag(r, c, e)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                style={{ color: cell.count ? numColors[cell.count] : 'inherit' }}
              >
                {cell.revealed
                  ? cell.mine ? '💣' : cell.count > 0 ? cell.count : ''
                  : cell.flagged ? '🚩' : ''}
              </button>
            ))
          )}
        </div>
        <div style={{ fontSize: 10, textAlign: 'center', padding: 4, color: '#444' }}>
          left click: reveal · right click: flag
        </div>
      </div>
    </div>
  );
}
