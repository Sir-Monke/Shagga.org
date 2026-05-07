'use client';
import React, { useState, useCallback } from 'react';

const FAVOURITES = [
  { name: 'Phil Drives',          sub: 'mobile',  digits: '07700900421' },
  { name: 'Auntie Linda',         sub: 'home',    digits: '01512004701' },
  { name: 'Margaret (Nan)',       sub: 'mobile',  digits: '07700900111' },
  { name: 'Uncle Dave',           sub: 'mobile',  digits: '07700900222' },
  { name: 'Tech Helpline',        sub: 'work',    digits: '08000840004' },
  { name: 'Ross Buckley',         sub: 'card',    digits: '—' },
];

const RECENTS = [
  { name: 'Phil Drives',         time: '12:42',     missed: false },
  { name: 'Unknown',             time: '11:08',     missed: true  },
  { name: 'Auntie Linda',        time: 'Yesterday', missed: false },
  { name: 'Sharon @ accounts',   time: 'Yesterday', missed: true  },
  { name: 'Ross Buckley',        time: 'Tuesday',   missed: false },
  { name: 'Margaret (Nan)',      time: 'Monday',    missed: false },
];

type Tab = 'favourites' | 'recents' | 'keypad';

export const AppPhone: React.FC = () => {
  const [tab, setTab] = useState<Tab>('keypad');
  const [number, setNumber] = useState('');
  const [calling, setCalling] = useState<string | null>(null);

  const append = (d: string) => setNumber((n) => (n.length < 13 ? n + d : n));
  const back = () => setNumber((n) => n.slice(0, -1));

  const dial = useCallback(() => {
    if (number.length === 0) return;
    setCalling(number);
  }, [number]);

  if (calling) return <CallScreen num={calling} onEnd={() => { setCalling(null); setNumber(''); }} />;

  return (
    <div className="phone-app">
      <div className="phone-content">
        {tab === 'keypad' && (
          <div className="phone-keypad-wrap">
            <div className="phone-keypad-display">
              <span className="phone-keypad-num">{number || '\u00a0'}</span>
              {number.length > 0 && <button className="phone-keypad-back" onClick={back}>⌫</button>}
            </div>
            <div className="phone-keypad-grid">
              {[
                { n: '1', l: '' }, { n: '2', l: 'A B C' }, { n: '3', l: 'D E F' },
                { n: '4', l: 'G H I' }, { n: '5', l: 'J K L' }, { n: '6', l: 'M N O' },
                { n: '7', l: 'P Q R S' }, { n: '8', l: 'T U V' }, { n: '9', l: 'W X Y Z' },
                { n: '*', l: '' }, { n: '0', l: '+' }, { n: '#', l: '' },
              ].map((k) => (
                <button key={k.n} className="phone-key" onClick={() => append(k.n)}>
                  <span className="phone-key-num">{k.n}</span>
                  {k.l && <span className="phone-key-letters">{k.l}</span>}
                </button>
              ))}
            </div>
            <button className="phone-call-btn" onClick={dial} aria-label="Call">📞</button>
          </div>
        )}
        {tab === 'favourites' && (
          <div className="phone-list">
            {FAVOURITES.map((f) => (
              <button key={f.name} className="phone-list-row" onClick={() => setCalling(f.name)}>
                <div>
                  <div className="phone-list-name">{f.name}</div>
                  <div className="phone-list-sub">{f.sub}</div>
                </div>
                <span className="phone-list-info">ⓘ</span>
              </button>
            ))}
          </div>
        )}
        {tab === 'recents' && (
          <div className="phone-list">
            {RECENTS.map((r, i) => (
              <button key={i} className="phone-list-row" onClick={() => setCalling(r.name)}>
                <div>
                  <div className="phone-list-name" style={{ color: r.missed ? '#d22020' : undefined }}>
                    {r.missed && '⤺ '}{r.name}
                  </div>
                  <div className="phone-list-sub">{r.time}</div>
                </div>
                <span className="phone-list-info">ⓘ</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="phone-tabbar">
        <button className={tab === 'favourites' ? 'phone-tab phone-tab-active' : 'phone-tab'} onClick={() => setTab('favourites')}>
          ⭐<br /><span>Favourites</span>
        </button>
        <button className={tab === 'recents' ? 'phone-tab phone-tab-active' : 'phone-tab'} onClick={() => setTab('recents')}>
          🕒<br /><span>Recents</span>
        </button>
        <button className={tab === 'keypad' ? 'phone-tab phone-tab-active' : 'phone-tab'} onClick={() => setTab('keypad')}>
          🔢<br /><span>Keypad</span>
        </button>
      </div>
    </div>
  );
};

const CallScreen: React.FC<{ num: string; onEnd: () => void }> = ({ num, onEnd }) => {
  const [secs, setSecs] = useState(0);
  const [phase, setPhase] = useState<'connecting' | 'connected'>('connecting');

  React.useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('connected'), 1800);
    const t2 = window.setInterval(() => { if (phase === 'connected') setSecs((s) => s + 1); }, 1000);
    return () => { window.clearTimeout(t1); window.clearInterval(t2); };
  }, [phase]);

  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  return (
    <div className="phone-call">
      <div className="phone-call-name">{num}</div>
      <div className="phone-call-status">
        {phase === 'connecting' ? 'calling…' : `${mm}:${ss}`}
      </div>
      <div className="phone-call-actions">
        <span className="phone-call-action">🔇<br /><small>mute</small></span>
        <span className="phone-call-action">🔊<br /><small>speaker</small></span>
        <span className="phone-call-action">⏸<br /><small>hold</small></span>
      </div>
      <button className="phone-call-end" onClick={onEnd}>End</button>
    </div>
  );
};
