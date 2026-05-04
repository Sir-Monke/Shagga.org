'use client';

import React, { useEffect, useState } from 'react';

const HANDLES = [
  '~*~ShAgGaLaD94~*~', 'xX_TopShagga_Xx', 'maggie.swooper.69', 'GoonBag_Gary',
  'snag.connoisseur', 'BunningsLegend', '<3 Shagga 4 lyf <3', '$$$_Shagga_Daddy_$$$',
];

const OPENERS = [
  "u up?",
  "asl?? :P",
  "lol guess where i am rn",
  "bro check this out ➡ www.s|-|agga.org",
  "wanna see my new MSN background?? :D",
  "did u hear about jess..",
  "OMG I CANT BELIEVE YOU",
  "send a/s/l rn",
];

export default function MsnMessengerBody() {
  const [handle] = useState(() => HANDLES[Math.floor(Math.random() * HANDLES.length)]);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [nudged, setNudged] = useState(false);

  useEffect(() => {
    setMessages([OPENERS[Math.floor(Math.random() * OPENERS.length)]]);
    const t = setTimeout(() => {
      setNudged(true);
      setTimeout(() => setNudged(false), 600);
      setMessages((m) => [...m, '*** they sent u a NUDGE ***']);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  function send() {
    if (!input.trim()) return;
    setMessages((m) => [...m, `> ${input}`]);
    setInput('');
    setTimeout(() => {
      const replies = ['lol', 'rofl', 'cya', 'asl?', 'brb mum calling', 'ttyl', '...'];
      setMessages((m) => [...m, replies[Math.floor(Math.random() * replies.length)]]);
    }, 900 + Math.random() * 1200);
  }

  return (
    <div className={`xp-content ${nudged ? 'nudge-shake' : ''}`} style={{ padding: 0 }}>
      <div className="msn-block">
        <div className="msn-header">
          <div>
            <div className="msn-handle">{handle}</div>
            <div className="msn-status">😊 online — feelin shaggy</div>
          </div>
        </div>
        <div className="msn-log">
          {messages.map((m, i) => (
            <div key={i} className={m.startsWith('>') ? 'msn-mine' : m.startsWith('***') ? 'msn-system' : 'msn-them'}>
              {m}
            </div>
          ))}
        </div>
        <div className="msn-input-row">
          <input
            className="msn-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type ur reply..."
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          />
          <button className="xp-btn" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}
