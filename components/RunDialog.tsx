'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onRun: (command: string) => void;
}

const RECENT_COMMANDS = [
  'shagga',
  'cmd',
  'notepad',
  'minesweeper',
  'iexplore',
];

export default function RunDialog({ open, onClose, onRun }: Props) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>(RECENT_COMMANDS);
  const [historyOpen, setHistoryOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setCommand('');
      setHistoryOpen(false);
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = () => {
    const c = command.trim();
    if (!c) return;
    setHistory((h) => [c, ...h.filter((x) => x !== c)].slice(0, 10));
    onRun(c);
    onClose();
  };

  return (
    <>
      <div className="run-overlay" onClick={onClose} onMouseDown={(e) => e.stopPropagation()} />
      <div
        className="run-dialog"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="run-titlebar">
          <span className="run-title-icon">▷</span>
          <span className="run-title">Run</span>
          <button className="run-close" type="button" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="run-body">
          <div className="run-icon">
            <svg viewBox="0 0 32 32" width="32" height="32">
              <rect x="2" y="6" width="28" height="22" rx="2" fill="#ffd54f" stroke="#aa7a00" strokeWidth="1.2" />
              <rect x="2" y="6" width="28" height="5" fill="#aa7a00" />
              <text x="16" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="#5b3f00" fontFamily="Tahoma, sans-serif">▷</text>
            </svg>
          </div>
          <div className="run-prompt">
            <span>Type the name of a program, folder, document, or Internet resource, and Shagga-OS will open it for you.</span>
          </div>
          <div className="run-input-row">
            <label htmlFor="run-input" className="run-label">Open:</label>
            <div className="run-input-wrap">
              <input
                id="run-input"
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submit();
                  if (e.key === 'ArrowDown') setHistoryOpen(true);
                }}
                onFocus={() => setHistoryOpen(true)}
                onBlur={() => setTimeout(() => setHistoryOpen(false), 200)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="run-input"
                spellCheck={false}
                autoComplete="off"
              />
              {historyOpen && history.length > 0 && (
                <div className="run-history">
                  {history.filter((h) => h !== command).slice(0, 6).map((h) => (
                    <button
                      key={h}
                      className="run-history-item"
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); setCommand(h); }}
                    >{h}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="run-buttons">
          <button className="run-btn" type="button" onClick={submit} disabled={!command.trim()}>OK</button>
          <button className="run-btn" type="button" onClick={onClose}>Cancel</button>
          <button className="run-btn" type="button" disabled>Browse...</button>
        </div>
      </div>
    </>
  );
}
