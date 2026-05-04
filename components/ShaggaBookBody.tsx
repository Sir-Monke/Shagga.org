'use client';

import React, { useState } from 'react';
import { BookIcon } from './icons';

interface FBPost {
  id: number;
  user: string;
  avatar: string;
  time: string;
  content: string;
  reactions: number;
  comments: number;
  shares: number;
  bg?: string;
}

const POSTS: FBPost[] = [
  { id: 1, user: 'Margaret Shagga', avatar: '👵', time: '47 mins ago', content: 'GOOD MORNING family !! to whom this may concern please call ur mother she is worried sick !! also enjoy this beautiful sunrise photo i found on the internet !! 🌅🌅🌅 GOD BLESS', reactions: 47, comments: 12, shares: 1, bg: 'linear-gradient(135deg, #ffd54f 0%, #ff7043 100%)' },
  { id: 2, user: 'Bunnings Warehouse Mooroolbark', avatar: '🔨', time: '2 hours ago', content: 'SAUSAGE SIZZLE SATURDAY !!! 9am till sold out. proceeds go to the local rotary club. ONIONS ARE UNDER THE SNAG. we will not be debating this in 2024. 🌭', reactions: 8214, comments: 412, shares: 2104 },
  { id: 3, user: 'Shagga Memories', avatar: '📸', time: '5 hours ago', content: '✨ On this day in 2003 ✨ you were tagged in a photo with 47 of ur mates at the dam. simpler times mate.', reactions: 891, comments: 47, shares: 12 },
  { id: 4, user: 'Daz', avatar: '🍺', time: '1 day ago', content: 'lost a thong at the BBQ. if found please return. it has sentimental value (it was my dads)', reactions: 47, comments: 89, shares: 3 },
  { id: 5, user: 'GENUINE NEWS Australia', avatar: '📰', time: '2 days ago', content: 'BREAKING: Local man "shagga" allegedly seen near Bunnings holding what witnesses described as "definitely a snag". More at 7.', reactions: 12_847, comments: 4_002, shares: 8_421 },
];

const FRIENDS = [
  { name: 'Bazza', online: true },
  { name: 'Daz', online: true },
  { name: 'Shazza', online: false },
  { name: 'Nan', online: true },
  { name: 'Bluey', online: false },
  { name: 'Cooked Dave', online: true },
  { name: 'Ranga Tim', online: false },
];

export default function ShaggaBookBody() {
  const [reacted, setReacted] = useState<Record<number, boolean>>({});
  const [reactions, setReactions] = useState<Record<number, number>>(() => Object.fromEntries(POSTS.map((p) => [p.id, p.reactions])));
  const [status, setStatus] = useState('');

  const react = (id: number) => {
    setReacted((r) => ({ ...r, [id]: !r[id] }));
    setReactions((rs) => ({ ...rs, [id]: rs[id] + (reacted[id] ? -1 : 1) }));
  };

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="fbook-block">
        <div className="fbook-header">
          <div className="fbook-logo"><BookIcon size={28} /></div>
          <div className="fbook-name">ShaggaBook</div>
          <input className="fbook-search" placeholder="Search ShaggaBook" onMouseDown={(e) => e.stopPropagation()} />
          <div className="fbook-header-icons">🏠 👥 🔔</div>
        </div>

        <div className="fbook-body">
          <div className="fbook-sidebar">
            <div className="fbook-sidebar-title">Ya Mates</div>
            {FRIENDS.map((f) => (
              <div key={f.name} className="fbook-friend">
                <span className={`fbook-dot${f.online ? ' online' : ''}`} />
                <span>{f.name}</span>
              </div>
            ))}
          </div>

          <div className="fbook-main">
            <div className="fbook-status">
              <input
                placeholder="What's on ya mind, Shagga?"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              />
              <button
                disabled={!status.trim()}
                onClick={() => setStatus('')}
                onMouseDown={(e) => e.stopPropagation()}
              >Post</button>
            </div>

            {POSTS.map((p) => (
              <div key={p.id} className="fbook-post">
                <div className="fbook-post-header">
                  <span className="fbook-post-avatar">{p.avatar}</span>
                  <div>
                    <div className="fbook-post-user">{p.user}</div>
                    <div className="fbook-post-time">{p.time} · 🌐</div>
                  </div>
                </div>
                <div className="fbook-post-content">{p.content}</div>
                {p.bg && <div className="fbook-post-image" style={{ background: p.bg }}>🌅</div>}
                <div className="fbook-post-counts">
                  <span>👍❤️😂 {reactions[p.id].toLocaleString()}</span>
                  <span>{p.comments} comments · {p.shares} shares</span>
                </div>
                <div className="fbook-post-actions">
                  <button
                    className={`fbook-action${reacted[p.id] ? ' active' : ''}`}
                    onClick={() => react(p.id)}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
                    👍 Like
                  </button>
                  <button className="fbook-action">💬 Comment</button>
                  <button className="fbook-action">↗ Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
