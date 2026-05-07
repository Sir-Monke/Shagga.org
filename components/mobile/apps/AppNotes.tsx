'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';

interface Note {
  id: string;
  body: string;
  updatedAt: number;
}

const STORAGE_KEY = 'shagga-mobile-notes';
const SEED: Note[] = [
  { id: 's1', body: "things to do today\n— check shagga.org\n— review the bin situation\n— text phil back\n— don't be a melt", updatedAt: Date.now() - 60 * 60 * 1000 },
  { id: 's2', body: "ross buckley quotes\n— shagga shagga shagga\n— here's my card\n— do you want a milkshake", updatedAt: Date.now() - 24 * 60 * 60 * 1000 },
];

function load(): Note[] {
  if (typeof window === 'undefined') return SEED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Note[]) : SEED;
  } catch { return SEED; }
}
function save(notes: Note[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch { /* quota */ }
}

export const AppNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => { setNotes(load()); }, []);

  const upsert = useCallback((id: string, body: string) => {
    setNotes((curr) => {
      const next = curr.map((n) => n.id === id ? { ...n, body, updatedAt: Date.now() } : n);
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setNotes((curr) => {
      const next = curr.filter((n) => n.id !== id);
      save(next);
      return next;
    });
    setEditingId(null);
  }, []);

  const create = useCallback(() => {
    const id = 'n_' + Math.random().toString(36).slice(2, 8);
    const note: Note = { id, body: '', updatedAt: Date.now() };
    setNotes((curr) => {
      const next = [note, ...curr];
      save(next);
      return next;
    });
    setEditingId(id);
  }, []);

  if (editingId !== null) {
    const note = notes.find((n) => n.id === editingId);
    if (!note) { setEditingId(null); return null; }
    return (
      <NoteEditor
        note={note}
        onChange={(body) => upsert(note.id, body)}
        onClose={() => setEditingId(null)}
        onDelete={() => remove(note.id)}
      />
    );
  }

  return (
    <div className="notes-app">
      <div className="notes-list">
        {notes.length === 0 && (
          <p className="notes-empty">No notes yet. Tap + to write one.</p>
        )}
        {[...notes].sort((a, b) => b.updatedAt - a.updatedAt).map((n) => (
          <button key={n.id} className="notes-row" onClick={() => setEditingId(n.id)}>
            <div className="notes-row-title">{firstLine(n.body) || 'New Note'}</div>
            <div className="notes-row-preview">{secondLine(n.body) || 'No additional text'}</div>
            <div className="notes-row-date">{formatDate(n.updatedAt)}</div>
          </button>
        ))}
      </div>
      <button className="notes-fab" onClick={create} aria-label="New note">+</button>
    </div>
  );
};

const NoteEditor: React.FC<{ note: Note; onChange: (b: string) => void; onClose: () => void; onDelete: () => void }> = ({ note, onChange, onClose, onDelete }) => {
  const [body, setBody] = useState(note.body);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  // Debounced save
  useEffect(() => {
    const t = window.setTimeout(() => onChange(body), 220);
    return () => window.clearTimeout(t);
  }, [body, onChange]);

  useEffect(() => {
    // Auto-focus on mount, place cursor at end
    if (taRef.current) {
      taRef.current.focus();
      const len = taRef.current.value.length;
      taRef.current.setSelectionRange(len, len);
    }
  }, []);

  return (
    <div className="notes-editor">
      <div className="notes-editor-toolbar">
        <button onClick={onClose} className="notes-editor-back">‹ Notes</button>
        <button onClick={() => { if (window.confirm('Delete this note?')) onDelete(); }} className="notes-editor-delete">🗑</button>
      </div>
      <textarea
        ref={taRef}
        className="notes-editor-area"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="start typing legend"
        spellCheck={false}
      />
    </div>
  );
};

function firstLine(s: string): string { return (s.split('\n')[0] || '').slice(0, 60); }
function secondLine(s: string): string {
  const lines = s.split('\n').filter(Boolean);
  return (lines[1] || '').slice(0, 60);
}
function formatDate(ts: number): string {
  const d = new Date(ts);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) {
    const h = d.getHours(), m = d.getMinutes();
    const hh = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${hh}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  }
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
