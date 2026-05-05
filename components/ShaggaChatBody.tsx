'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ChatUser {
  handle: string;
  flag: string;
  color: string;
  online: boolean;
}

interface Message {
  id: number;
  user: string;
  flag: string;
  color: string;
  text: string;
  ts: number;
  fromMe?: boolean;
}

const USERS: ChatUser[] = [
  { handle: 'BigShagga_NYC',     flag: '🇺🇸', color: '#1976d2', online: true  },
  { handle: 'shagga_tokyo',      flag: '🇯🇵', color: '#d32f2f', online: true  },
  { handle: 'TopShaggaUK',       flag: '🇬🇧', color: '#7b1fa2', online: true  },
  { handle: 'ShaggaParis',       flag: '🇫🇷', color: '#c2185b', online: true  },
  { handle: 'ShaggaBerlin',      flag: '🇩🇪', color: '#f57c00', online: true  },
  { handle: 'sydney_shagga',     flag: '🇦🇺', color: '#388e3c', online: true  },
  { handle: 'ShaggaLagos',       flag: '🇳🇬', color: '#00897b', online: false },
  { handle: 'shagga_seoul',      flag: '🇰🇷', color: '#5e35b1', online: true  },
  { handle: 'BigShaggaBR',       flag: '🇧🇷', color: '#43a047', online: true  },
  { handle: 'ShaggaIndia',       flag: '🇮🇳', color: '#fb8c00', online: false },
  { handle: 'ross_buckley',      flag: '🕺', color: '#9c27b0', online: true  },
];

// Universal "top shagga" problems — questions humans actually argue about.
const SCRIPT: { handle: string; text: string }[] = [
  { handle: 'BigShagga_NYC',  text: 'serious question for the global shagga council' },
  { handle: 'BigShagga_NYC',  text: 'how warm should a shower actually be set to' },
  { handle: 'TopShaggaUK',    text: 'lukewarm. anything hotter and ur a coward' },
  { handle: 'shagga_tokyo',   text: 'wrong. very hot. cleansing.' },
  { handle: 'ShaggaParis',    text: 'mildly warm. it is about the experience.' },
  { handle: 'sydney_shagga',  text: 'cold. character building.' },
  { handle: 'ShaggaBerlin',   text: 'this council is unserious. moving on.' },
  { handle: 'shagga_seoul',   text: "next problem: pineapple on pizza. yes or no" },
  { handle: 'TopShaggaUK',    text: 'absolutely yes. this is settled science.' },
  { handle: 'ShaggaParis',    text: 'i am leaving this chat' },
  { handle: 'BigShagga_NYC',  text: 'lol' },
  { handle: 'BigShaggaBR',    text: 'real question: is cereal a soup' },
  { handle: 'shagga_tokyo',   text: 'cereal is cereal. soup is soup. why are u like this.' },
  { handle: 'ShaggaBerlin',   text: 'a hot dog is a sandwich. discuss.' },
  { handle: 'TopShaggaUK',    text: 'NO. it is a taco at best.' },
  { handle: 'sydney_shagga',  text: 'a hot dog is a hot dog. taxonomy is fake.' },
  { handle: 'BigShagga_NYC',  text: 'how long do u wait before texting back' },
  { handle: 'ShaggaParis',    text: 'as long as it took them. balance.' },
  { handle: 'shagga_seoul',   text: '3 hours minimum. game theory.' },
  { handle: 'TopShaggaUK',    text: 'i text back instantly. i have no game.' },
  { handle: 'BigShaggaBR',    text: 'final problem: best snack of all time' },
  { handle: 'shagga_tokyo',   text: 'onigiri. dont fight me.' },
  { handle: 'TopShaggaUK',    text: 'tea and a biscuit. a complete meal.' },
  { handle: 'BigShagga_NYC',  text: 'a perfect grilled cheese. nothing else comes close.' },
  { handle: 'ShaggaBerlin',   text: 'pretzel. with mustard. dispute me.' },
  { handle: 'sydney_shagga',  text: 'we are not going to agree on anything are we' },
  { handle: 'BigShagga_NYC',  text: 'no. but at least we are shaggas together.' },
  { handle: 'TopShaggaUK',    text: '🫡' },

  // ross buckley arrives
  { handle: 'ross_buckley',   text: 'shagga' },
  { handle: 'ross_buckley',   text: 'shagga shagga' },
  { handle: 'BigShagga_NYC',  text: 'who is this' },
  { handle: 'TopShaggaUK',    text: 'idk he just joined. ross buckley?? never heard of him' },
  { handle: 'ross_buckley',   text: 'see ya around shagga ✨' },
  { handle: 'ross_buckley',   text: 'left chat' },
  { handle: 'BigShagga_NYC',  text: 'wait he just gave me a business card via the screen somehow??' },
  { handle: 'BigShagga_NYC',  text: 'it just says "see ya around shagga". no name. how did he do that' },
  { handle: 'TopShaggaUK',    text: 'oh ross buckley does this. dont question it. just say shagga back next time u see him' },
  { handle: 'ShaggaParis',    text: 'he gave me 10p once and told me to go buy a milkshake. it was somehow the kindest thing anyone has ever done' },
  { handle: 'sydney_shagga',  text: 'genuine top shagga energy. one of the boys.' },
  { handle: 'ross_buckley',   text: 'shagga' },
  { handle: 'BigShagga_NYC',  text: 'ross???' },
  { handle: 'ross_buckley',   text: 'left chat' },
];

export default function ShaggaChatBody() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [scriptIdx, setScriptIdx] = useState(0);
  const [typing, setTyping] = useState<string | null>(null);
  const idRef = useRef(0);
  const feedRef = useRef<HTMLDivElement>(null);

  // Push next scripted message every few seconds
  useEffect(() => {
    if (scriptIdx >= SCRIPT.length) return;
    const next = SCRIPT[scriptIdx];
    const user = USERS.find((u) => u.handle === next.handle);
    if (!user) { setScriptIdx((i) => i + 1); return; }

    setTyping(next.handle);
    const showAfter = 1200 + Math.random() * 1500;

    const t = setTimeout(() => {
      setTyping(null);
      idRef.current += 1;
      setMessages((m) => [...m, {
        id: idRef.current,
        user: next.handle,
        flag: user.flag,
        color: user.color,
        text: next.text,
        ts: Date.now(),
      }]);
      setScriptIdx((i) => i + 1);
    }, showAfter);

    return () => clearTimeout(t);
  }, [scriptIdx]);

  // Auto-scroll feed to bottom
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    idRef.current += 1;
    setMessages((m) => [...m, {
      id: idRef.current,
      user: 'You',
      flag: '🌍',
      color: '#0d6efd',
      text,
      ts: Date.now(),
      fromMe: true,
    }]);
    setDraft('');

    // Random reply from a global shagga
    setTimeout(() => {
      const replier = USERS[Math.floor(Math.random() * USERS.length)];
      const replies = [
        'real',
        'no thoughts head empty',
        'this is now a global shagga issue',
        'top shagga energy ngl',
        'i\'m forwarding this to the council',
        'agreed',
        'no comment',
        'this is the most shagga thing i\'ve heard today',
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      idRef.current += 1;
      setMessages((m) => [...m, {
        id: idRef.current,
        user: replier.handle,
        flag: replier.flag,
        color: replier.color,
        text: reply,
        ts: Date.now(),
      }]);
    }, 800 + Math.random() * 1500);
  };

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="schat-block">
        <div className="schat-roster">
          <div className="schat-roster-title">
            🌍 Global Shaggas <span className="schat-roster-count">({USERS.filter((u) => u.online).length} online)</span>
          </div>
          {USERS.map((u) => (
            <div key={u.handle} className="schat-roster-row">
              <span className={`schat-status ${u.online ? 'on' : 'off'}`} />
              <span className="schat-flag">{u.flag}</span>
              <span className="schat-handle" style={{ color: u.color }}>{u.handle}</span>
            </div>
          ))}
        </div>
        <div className="schat-main">
          <div className="schat-header">
            <div>
              <div className="schat-title"># shagga-council</div>
              <div className="schat-topic">solving universal shagga problems since 2003</div>
            </div>
          </div>
          <div className="schat-feed" ref={feedRef}>
            {messages.map((m) => (
              <div key={m.id} className={`schat-msg ${m.fromMe ? 'me' : ''}`}>
                <div className="schat-msg-head">
                  <span className="schat-msg-flag">{m.flag}</span>
                  <span className="schat-msg-user" style={{ color: m.color }}>{m.user}</span>
                  <span className="schat-msg-time">
                    {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="schat-msg-text">{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="schat-typing">
                <span>{typing}</span> is typing<span className="schat-dot">.</span><span className="schat-dot">.</span><span className="schat-dot">.</span>
              </div>
            )}
          </div>
          <div className="schat-compose">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              placeholder="message #shagga-council..."
            />
            <button
              onClick={send}
              disabled={!draft.trim()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
