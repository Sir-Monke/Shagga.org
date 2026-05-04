'use client';

import React, { useState } from 'react';

interface Tweet {
  id: number;
  user: string;
  handle: string;
  avatar: string;
  content: string;
  time: string;
  initialLikes: number;
  retweets: number;
  replies: number;
  verified?: boolean;
}

const TWEETS: Tweet[] = [
  { id: 1, user: 'Big Shagga', handle: 'bigshagga94', avatar: '🤠', content: 'just put a snag on the barbie at 6:47am cause why not. cooked behaviour. send help', time: '12m', initialLikes: 1247, retweets: 89, replies: 47, verified: true },
  { id: 2, user: 'Bunnings Snag Truth', handle: 'snagonionsdebate', avatar: '🌭', content: "PSA: onions go UNDER the snag. anyone telling u otherwise is a fed. that's all", time: '34m', initialLikes: 89_724, retweets: 12_847, replies: 4_002 },
  { id: 3, user: 'maggie_aware', handle: 'swoop_zone_alert', avatar: '🐦‍⬛', content: 'swooping season has begun. cyclists, prepare. helmets with zip ties or u perish', time: '1h', initialLikes: 47, retweets: 8, replies: 2 },
  { id: 4, user: "shagga's nan", handle: 'nanofashagga', avatar: '👵', content: "didn't see u at the bowls club on sunday. i'll tell ur mother. love nan x", time: '2h', initialLikes: 8421, retweets: 412, replies: 891 },
  { id: 5, user: 'Goon Lord', handle: 'goonlord3000', avatar: '🍷', content: 'goon of fortune at the hills hoist tonight. byo washing peg. RTs welcome.', time: '3h', initialLikes: 391, retweets: 28, replies: 14 },
  { id: 6, user: 'Bazza', handle: 'bazza_official', avatar: '🦘', content: "yeah nah yeah", time: '5h', initialLikes: 47_982, retweets: 8_213, replies: 1_104, verified: true },
  { id: 7, user: 'wild card daz', handle: 'darryl_47', avatar: '🥩', content: "anyone seen my thongs", time: '6h', initialLikes: 12, retweets: 1, replies: 47 },
];

export default function ShwitterBody() {
  const [likes, setLikes] = useState<Record<number, number>>(() => Object.fromEntries(TWEETS.map((t) => [t.id, t.initialLikes])));
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [composing, setComposing] = useState('');

  const toggleLike = (id: number) => {
    setLiked((l) => ({ ...l, [id]: !l[id] }));
    setLikes((ls) => ({ ...ls, [id]: ls[id] + (liked[id] ? -1 : 1) }));
  };

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="shwitter-block">
        <div className="shwitter-header">
          <div className="shwitter-logo">𝕏 Shwitter</div>
          <div className="shwitter-tabs">
            <span className="shwitter-tab active">For You</span>
            <span className="shwitter-tab">Following</span>
            <span className="shwitter-tab">Mates</span>
          </div>
        </div>

        <div className="shwitter-compose">
          <div className="shwitter-avatar">😎</div>
          <div className="shwitter-compose-area">
            <input
              type="text"
              placeholder="what's cookin?"
              value={composing}
              onChange={(e) => setComposing(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            />
            <button
              className="shwitter-post-btn"
              disabled={!composing.trim()}
              onClick={() => setComposing('')}
              onMouseDown={(e) => e.stopPropagation()}
            >
              Shweet
            </button>
          </div>
        </div>

        <div className="shwitter-feed">
          {TWEETS.map((t) => (
            <div key={t.id} className="shwitter-tweet">
              <div className="shwitter-avatar">{t.avatar}</div>
              <div className="shwitter-tweet-body">
                <div className="shwitter-tweet-meta">
                  <strong>{t.user}</strong>
                  {t.verified && <span className="shwitter-verified" title="verified shagga">✓</span>}
                  <span className="shwitter-handle">@{t.handle} · {t.time}</span>
                </div>
                <div className="shwitter-tweet-content">{t.content}</div>
                <div className="shwitter-tweet-actions">
                  <span>💬 {t.replies}</span>
                  <span>🔁 {t.retweets}</span>
                  <button
                    className={`shwitter-like${liked[t.id] ? ' liked' : ''}`}
                    onClick={() => toggleLike(t.id)}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
                    {liked[t.id] ? '❤️' : '🤍'} {likes[t.id].toLocaleString()}
                  </button>
                  <span>📊</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
