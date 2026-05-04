'use client';

import React, { useState } from 'react';

interface Post {
  id: number;
  user: string;
  avatar: string;
  bg: string;
  emoji: string;
  caption: string;
  initialLikes: number;
  comments: number;
}

const POSTS: Post[] = [
  { id: 1, user: 'big_shagga_94', avatar: '🤠', bg: 'linear-gradient(135deg, #ff7e2d 0%, #ff3b3b 100%)', emoji: '🌭', caption: 'cooked snag check 👌 #snagga #cooked #legendarybehaviour', initialLikes: 2347, comments: 89 },
  { id: 2, user: 'shaggas_nan', avatar: '👵', bg: 'linear-gradient(135deg, #84cf6a 0%, #16805e 100%)', emoji: '🦘', caption: 'caught a roo in the backyard. send help. or a sausage roll', initialLikes: 47892, comments: 4112 },
  { id: 3, user: 'bunnings_official', avatar: '🔨', bg: 'linear-gradient(135deg, #fff200 0%, #f00 100%)', emoji: '🍖', caption: 'sausage sizzle this saturday 🇦🇺 onions UNDER the snag we will fight u on this', initialLikes: 198_472, comments: 22_104 },
  { id: 4, user: 'maggie_swooper', avatar: '🐦‍⬛', bg: 'linear-gradient(135deg, #1c1c1c 0%, #444 100%)', emoji: '🪶', caption: 'just swooped a cyclist its tuesday', initialLikes: 12, comments: 3 },
  { id: 5, user: 'goon_lord_3000', avatar: '🍷', bg: 'linear-gradient(135deg, #c4006c 0%, #6c0040 100%)', emoji: '🍷', caption: 'goon of fortune at the back fence 7pm be there', initialLikes: 891, comments: 47 },
];

export default function ShaggaGramBody() {
  const [likes, setLikes] = useState<Record<number, number>>(() => Object.fromEntries(POSTS.map((p) => [p.id, p.initialLikes])));
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLiked((l) => ({ ...l, [id]: !l[id] }));
    setLikes((ls) => ({ ...ls, [id]: ls[id] + (liked[id] ? -1 : 1) }));
  };

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="gram-block">
        <div className="gram-header">
          <div className="gram-logo">📷 Shagga-gram</div>
          <div className="gram-header-icons">❤️ ✉️</div>
        </div>

        <div className="gram-stories">
          {['🤠', '👵', '🔨', '🐦‍⬛', '🍷', '🦘', '🥩'].map((e, i) => (
            <div key={i} className="gram-story">
              <div className="gram-story-ring">
                <div className="gram-story-avatar">{e}</div>
              </div>
              <div className="gram-story-name">shagga{i + 1}</div>
            </div>
          ))}
        </div>

        <div className="gram-feed">
          {POSTS.map((post) => (
            <div key={post.id} className="gram-post">
              <div className="gram-post-header">
                <div className="gram-post-avatar">{post.avatar}</div>
                <div className="gram-post-user">{post.user}</div>
                <div className="gram-post-more">⋯</div>
              </div>
              <div className="gram-post-image" style={{ background: post.bg }}>
                <span className="gram-post-emoji">{post.emoji}</span>
              </div>
              <div className="gram-post-actions">
                <button
                  className={`gram-action${liked[post.id] ? ' liked' : ''}`}
                  onClick={() => toggleLike(post.id)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  {liked[post.id] ? '❤️' : '🤍'}
                </button>
                <span className="gram-action">💬</span>
                <span className="gram-action">📤</span>
                <span className="gram-action gram-bookmark">🔖</span>
              </div>
              <div className="gram-post-likes">{likes[post.id].toLocaleString()} likes</div>
              <div className="gram-post-caption">
                <strong>{post.user}</strong> {post.caption}
              </div>
              <div className="gram-post-comments">View all {post.comments.toLocaleString()} comments</div>
            </div>
          ))}
        </div>

        <div className="gram-bottomnav">
          <span>🏠</span><span>🔍</span><span>➕</span><span>❤️</span><span>👤</span>
        </div>
      </div>
    </div>
  );
}
