'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GramIcon } from './icons';
import { galleryList, SHAGGA_IMAGES } from './imageManifest';

interface User {
  handle: string;
  name: string;
  avatar: string;
  color: string;
  bio: string;
  verified?: boolean;
}

interface Post {
  id: number;
  userHandle: string;
  bg: string;
  emoji: string;
  caption: string;
  initialLikes: number;
  initialComments: { user: string; text: string }[];
  imageIdx?: number; // index into galleryList()
}

type View =
  | { kind: 'feed' }
  | { kind: 'explore' }
  | { kind: 'profile'; handle: string };

const USERS: User[] = [
  { handle: 'big_shagga_94',     name: 'Big Shagga',         avatar: '🤠', color: '#1976d2', bio: 'cooked. mostly.' },
  { handle: 'shaggas_nan',       name: "Shagga's Nan",       avatar: '👵', color: '#c2185b', bio: 'please call me ❤️' },
  { handle: 'snaggas_brand', name: 'Snaggas (parody)',  avatar: '🔨', color: '#ef6c00', bio: 'the home of snags', verified: true },
  { handle: 'maggie_swooper',    name: 'maggie_swooper',     avatar: '🐦‍⬛', color: '#1c1c1c', bio: 'professional swooper' },
  { handle: 'goon_lord_3000',    name: 'Goon Lord',          avatar: '🍷', color: '#7b1fa2', bio: 'back fence forever' },
  { handle: 'cooked_dave',       name: 'Cooked Dave',        avatar: '🌊', color: '#00838f', bio: 'lukewarm at the dam' },
  { handle: 'shazza_official',   name: 'Shazza',             avatar: '💅', color: '#d81b60', bio: 'pegging since 2003', verified: true },
  { handle: 'tradielife',        name: 'tradie life',        avatar: '🛠️', color: '#5d4037', bio: 'on smoko brb' },
  { handle: 'nan_again',         name: 'shaggas nan (alt)',  avatar: '👵', color: '#ad1457', bio: 'i made another account' },
  { handle: 'cookwithshagga',    name: 'Cook With Shagga',   avatar: '🍳', color: '#ff8f00', bio: 'i can ruin any meal' },
];

const POST_TEMPLATES: Omit<Post, 'id'>[] = [
  { userHandle: 'big_shagga_94',    bg: 'linear-gradient(135deg, #ff7e2d, #ff3b3b)', emoji: '🌭', caption: 'cooked snag check 👌', initialLikes: 2347, initialComments: [{ user: '@cooked_dave', text: 'thats a 10/10 snag' }, { user: '@nan', text: 'CALL UR MOTHER' }] },
  { userHandle: 'shaggas_nan',      bg: 'linear-gradient(135deg, #84cf6a, #16805e)', emoji: '🌅', caption: 'GOOD MORNING family !! beautiful sunrise photo. GOD BLESS', initialLikes: 47892, initialComments: [{ user: '@big_shagga_94', text: 'love u nan' }, { user: '@shazza_official', text: 'amen 🙏' }] },
  { userHandle: 'snaggas_brand', bg: 'linear-gradient(135deg, #fff200, #f00)',   emoji: '🍖', caption: 'sausage sizzle saturday. onions UNDER. we will fight u on this.', initialLikes: 198_472, initialComments: [{ user: '@goonlord', text: 'on top is heresy' }, { user: '@daz', text: 'see u there' }] },
  { userHandle: 'maggie_swooper',   bg: 'linear-gradient(135deg, #1c1c1c, #444)',     emoji: '🪶', caption: 'just swooped a cyclist. tuesday vibes.', initialLikes: 12, initialComments: [] },
  { userHandle: 'goon_lord_3000',   bg: 'linear-gradient(135deg, #c4006c, #6c0040)', emoji: '🍷', caption: 'goon of fortune at the back fence. 7pm. byo peg.', initialLikes: 891, initialComments: [{ user: '@daz', text: 'count me in' }] },
  { userHandle: 'cooked_dave',      bg: 'linear-gradient(135deg, #2c5364, #0f2027)', emoji: '🌊', caption: 'the dam is lukewarm. perfect.', initialLikes: 412, initialComments: [{ user: '@shaggas_nan', text: 'pls dont swim there' }] },
  { userHandle: 'shazza_official',  bg: 'linear-gradient(135deg, #ff3b6b, #6b1a8c)', emoji: '💅', caption: 'won goon of fortune again. queen behaviour 👑', initialLikes: 8472, initialComments: [{ user: '@goon_lord_3000', text: 'unbeatable' }] },
  { userHandle: 'tradielife',       bg: 'linear-gradient(135deg, #ffa500, #cc6600)', emoji: '🚬', caption: 'on smoko. dont txt.', initialLikes: 234, initialComments: [{ user: '@boss', text: 'come back' }] },
  { userHandle: 'nan_again',        bg: 'linear-gradient(135deg, #6a1b9a, #4a148c)', emoji: '🦘', caption: 'caught a roo in the backyard. send help. or a sausage roll.', initialLikes: 47892, initialComments: [{ user: '@big_shagga_94', text: 'im on my way' }] },
  { userHandle: 'cookwithshagga',   bg: 'linear-gradient(135deg, #ffa500, #ff6b00)', emoji: '🍳', caption: 'fried egg attempt #47. close but not perfect.', initialLikes: 891, initialComments: [{ user: '@nan', text: 'ill teach u' }] },
  { userHandle: 'big_shagga_94',    bg: 'linear-gradient(135deg, #5392d6, #b6dcff)', emoji: '🚿', caption: 'lukewarm shower. perfect.', initialLikes: 1247, initialComments: [{ user: '@top_shagga_uk', text: 'finally someone gets it' }] },
  { userHandle: 'cooked_dave',      bg: 'linear-gradient(135deg, #c40, #802)',       emoji: '🥩', caption: 'BBQ at daves. as is tradition.', initialLikes: 3214, initialComments: [{ user: '@daz', text: 'count me in' }, { user: '@bazza', text: 'on my way' }] },
  { userHandle: 'goon_lord_3000',   bg: 'linear-gradient(135deg, #ad1457, #6a1b9a)', emoji: '🍷', caption: 'goon bag in the wild. respect.', initialLikes: 412, initialComments: [] },
  { userHandle: 'shaggas_nan',      bg: 'linear-gradient(135deg, #ff7e5f, #feb47b)', emoji: '🌹', caption: 'thinking of u all. love nan x', initialLikes: 14728, initialComments: [{ user: '@everyone', text: '❤️' }] },
  { userHandle: 'snaggas_brand', bg: 'linear-gradient(135deg, #c40, #f00)',      emoji: '🔨', caption: 'new aisle just dropped. all snag-related items.', initialLikes: 47281, initialComments: [{ user: '@tradielife', text: 'on my way' }] },
  { userHandle: 'maggie_swooper',   bg: 'linear-gradient(135deg, #2f4f4f, #696969)', emoji: '⚡', caption: 'speedrun: 47 swoops in 3 minutes. world record?', initialLikes: 89, initialComments: [{ user: '@cyclist', text: 'leave me alone' }] },
  { userHandle: 'tradielife',       bg: 'linear-gradient(135deg, #5d4037, #3e2723)', emoji: '🥪', caption: 'snag sandwich. 11am breakfast. peak shagga.', initialLikes: 612, initialComments: [{ user: '@cookwithshagga', text: 'this is art' }] },
  { userHandle: 'big_shagga_94',    bg: 'linear-gradient(135deg, #00838f, #006064)', emoji: '🦘', caption: 'this roo just stole my snag. unbelievable.', initialLikes: 4128, initialComments: [{ user: '@maggie_swooper', text: 'we have an ally' }] },
  { userHandle: 'shazza_official',  bg: 'linear-gradient(135deg, #d81b60, #ad1457)', emoji: '💄', caption: 'new lipstick. matches my goon.', initialLikes: 2341, initialComments: [] },
  { userHandle: 'cookwithshagga',   bg: 'linear-gradient(135deg, #ef6c00, #d32f2f)', emoji: '🌭', caption: 'sandwich attempt #2. the bread didnt make it.', initialLikes: 412, initialComments: [{ user: '@nan', text: 'ur trying ❤️' }] },
];

const STORIES: User[] = USERS.slice(0, 8);

// ---------- Helpers ----------
function fmtCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`.replace('.0K', 'K');
  return String(n);
}

const STORAGE = {
  liked: 'shaggagram-liked',
  follows: 'shaggagram-follows',
  comments: 'shaggagram-comments',
};

// ---------- Component ----------
export default function ShaggaGramBody() {
  const [view, setView] = useState<View>({ kind: 'feed' });
  const [storyOpenIdx, setStoryOpenIdx] = useState<number | null>(null);

  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [follows, setFollows] = useState<Set<string>>(new Set());
  const [extraComments, setExtraComments] = useState<Record<number, { user: string; text: string }[]>>({});

  // Build posts (assign gallery images if available, round-robin)
  const galleryImages = useMemo(() => galleryList(), []);
  const posts: Post[] = useMemo(() => {
    return POST_TEMPLATES.map((p, i) => ({
      ...p,
      id: i + 1,
      imageIdx: !SHAGGA_IMAGES.usePlaceholder && galleryImages.length > 0
        ? i % galleryImages.length
        : undefined,
    }));
  }, [galleryImages]);

  // Persistence
  useEffect(() => {
    try {
      const l = localStorage.getItem(STORAGE.liked);
      if (l) setLiked(new Set(JSON.parse(l)));
      const f = localStorage.getItem(STORAGE.follows);
      if (f) setFollows(new Set(JSON.parse(f)));
      const c = localStorage.getItem(STORAGE.comments);
      if (c) setExtraComments(JSON.parse(c));
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem(STORAGE.liked, JSON.stringify(Array.from(liked))); } catch {} }, [liked]);
  useEffect(() => { try { localStorage.setItem(STORAGE.follows, JSON.stringify(Array.from(follows))); } catch {} }, [follows]);
  useEffect(() => { try { localStorage.setItem(STORAGE.comments, JSON.stringify(extraComments)); } catch {} }, [extraComments]);

  const toggleLike   = (id: number) => setLiked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleFollow = (h: string) => setFollows((s) => { const n = new Set(s); n.has(h) ? n.delete(h) : n.add(h); return n; });

  const addComment = (postId: number, text: string) => {
    setExtraComments((ec) => ({
      ...ec,
      [postId]: [...(ec[postId] ?? []), { user: '@you', text }],
    }));
  };

  const findUser = (handle: string): User =>
    USERS.find((u) => u.handle === handle) ?? USERS[0];

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="gram2-block">
        {/* Sidebar */}
        <div className="gram2-sidebar">
          <button className="gram2-logo" onClick={() => setView({ kind: 'feed' })} onMouseDown={(e) => e.stopPropagation()}>
            <GramIcon size={24} /> <span>Shagga-gram</span>
          </button>
          <button className={`gram2-nav${view.kind === 'feed' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'feed' })} onMouseDown={(e) => e.stopPropagation()}>⌂ Home</button>
          <button className={`gram2-nav${view.kind === 'explore' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'explore' })} onMouseDown={(e) => e.stopPropagation()}>⌕ Explore</button>
          <button className={`gram2-nav${view.kind === 'profile' && view.handle === 'you' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'profile', handle: 'you' })} onMouseDown={(e) => e.stopPropagation()}>👤 Profile</button>
        </div>

        {/* Main */}
        <div className="gram2-main">
          {view.kind === 'feed' && (
            <>
              <div className="gram2-stories">
                {STORIES.map((u, i) => (
                  <button key={u.handle} className="gram2-story"
                    onClick={() => setStoryOpenIdx(i)} onMouseDown={(e) => e.stopPropagation()}>
                    <div className="gram2-story-ring">
                      <div className="gram2-story-avatar" style={{ background: u.color }}>{u.avatar}</div>
                    </div>
                    <div className="gram2-story-name">{u.handle}</div>
                  </button>
                ))}
              </div>
              <div className="gram2-feed">
                {posts.map((p) => {
                  const user = findUser(p.userHandle);
                  return (
                    <PostCard
                      key={p.id} post={p} user={user}
                      liked={liked.has(p.id)} onToggleLike={() => toggleLike(p.id)}
                      onAuthorClick={(h) => setView({ kind: 'profile', handle: h })}
                      extraComments={extraComments[p.id] ?? []}
                      onAddComment={(t) => addComment(p.id, t)}
                      galleryImages={galleryImages}
                    />
                  );
                })}
              </div>
            </>
          )}
          {view.kind === 'explore' && (
            <ExploreView
              posts={posts}
              onPostClick={(p) => {
                // Show the post in a "feed" of 1 by jumping to the user's profile
                setView({ kind: 'profile', handle: p.userHandle });
              }}
              galleryImages={galleryImages}
            />
          )}
          {view.kind === 'profile' && (() => {
            const isMe = view.handle === 'you';
            const user: User = isMe
              ? { handle: 'you', name: 'You', avatar: '🌍', color: '#0066cc', bio: 'a top shagga.' }
              : findUser(view.handle);
            const userPosts = isMe ? [] : posts.filter((p) => p.userHandle === view.handle);
            return <ProfileView
              user={user}
              posts={userPosts}
              onBack={() => setView({ kind: 'feed' })}
              onPostClick={(p) => {
                setLiked((s) => { /* no-op, just to show interactivity */ return s; });
                // Open the post via story view of just that one post (reuse story modal)
                const justUser: User = findUser(p.userHandle);
                setStoryOpenIdx(STORIES.findIndex((s) => s.handle === justUser.handle));
              }}
              isFollowing={follows.has(view.handle)}
              onToggleFollow={() => toggleFollow(view.handle)}
              isMe={isMe}
              galleryImages={galleryImages}
            />;
          })()}
        </div>

        {/* Story modal */}
        {storyOpenIdx != null && (
          <StoryView
            users={STORIES}
            startIdx={storyOpenIdx}
            onClose={() => setStoryOpenIdx(null)}
          />
        )}
      </div>
    </div>
  );
}

// ---------- Post Card ----------
function PostCard({ post, user, liked, onToggleLike, onAuthorClick, extraComments, onAddComment, galleryImages }: {
  post: Post;
  user: User;
  liked: boolean;
  onToggleLike: () => void;
  onAuthorClick: (h: string) => void;
  extraComments: { user: string; text: string }[];
  onAddComment: (text: string) => void;
  galleryImages: string[];
}) {
  const [comment, setComment] = useState('');
  const allComments = [...post.initialComments, ...extraComments];
  const likeDelta = liked ? 1 : 0;

  return (
    <article className="gram2-post">
      <header className="gram2-post-header">
        <button className="gram2-post-avatar" style={{ background: user.color }}
          onClick={() => onAuthorClick(user.handle)} onMouseDown={(e) => e.stopPropagation()}>{user.avatar}</button>
        <button className="gram2-post-user" onClick={() => onAuthorClick(user.handle)} onMouseDown={(e) => e.stopPropagation()}>
          {user.handle}{user.verified && <span className="gram2-verified">✓</span>}
        </button>
        <span className="gram2-post-more">⋯</span>
      </header>
      <div
        className="gram2-post-image"
        style={{ background: post.bg }}
        onDoubleClick={onToggleLike}
      >
        {post.imageIdx != null && galleryImages[post.imageIdx] ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={galleryImages[post.imageIdx]} alt="post" loading="lazy" />
        ) : (
          <span className="gram2-post-emoji">{post.emoji}</span>
        )}
      </div>
      <div className="gram2-post-actions">
        <button className={`gram2-action${liked ? ' liked' : ''}`}
          onClick={onToggleLike} onMouseDown={(e) => e.stopPropagation()}>{liked ? '❤' : '♡'}</button>
        <span className="gram2-action">💬</span>
        <span className="gram2-action">📤</span>
        <span className="gram2-action gram2-bookmark">🔖</span>
      </div>
      <div className="gram2-post-likes">{fmtCount(post.initialLikes + likeDelta)} likes</div>
      <div className="gram2-post-caption">
        <strong>{user.handle}</strong> {post.caption}
      </div>
      {allComments.length > 0 && (
        <div className="gram2-post-comments">
          {allComments.slice(0, 3).map((c, i) => (
            <div key={i} className="gram2-comment">
              <strong>{c.user}</strong> {c.text}
            </div>
          ))}
          {allComments.length > 3 && (
            <div className="gram2-comment-more">View all {allComments.length} comments</div>
          )}
        </div>
      )}
      <form
        className="gram2-comment-form"
        onSubmit={(e) => {
          e.preventDefault();
          const t = comment.trim();
          if (!t) return;
          onAddComment(t);
          setComment('');
        }}
      >
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          onMouseDown={(e) => e.stopPropagation()}
        >Post</button>
      </form>
    </article>
  );
}

// ---------- Story View (full-screen) ----------
function StoryView({ users, startIdx, onClose }: {
  users: User[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          // Advance to next
          if (idx < users.length - 1) { setIdx((i) => i + 1); return 0; }
          else { onClose(); return 100; }
        }
        return p + 2;
      });
    }, 100);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [idx, users.length, onClose]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIdx((i) => Math.min(users.length - 1, i + 1));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, users.length]);

  const user = users[idx];
  return (
    <div className="gram2-story-modal" onClick={onClose} onMouseDown={(e) => e.stopPropagation()}>
      <div className="gram2-story-frame" onClick={(e) => e.stopPropagation()}>
        <div className="gram2-story-bars">
          {users.map((_, i) => (
            <div key={i} className="gram2-story-bar">
              <div
                className="gram2-story-bar-fill"
                style={{ width: i < idx ? '100%' : i === idx ? `${progress}%` : '0%' }}
              />
            </div>
          ))}
        </div>
        <div className="gram2-story-head">
          <div className="gram2-post-avatar" style={{ background: user.color }}>{user.avatar}</div>
          <div className="gram2-story-name">{user.handle}</div>
          <button className="gram2-story-close" onClick={onClose}>✕</button>
        </div>
        <div className="gram2-story-body" style={{ background: `linear-gradient(135deg, ${user.color}, #000)` }}>
          <div className="gram2-story-emoji">{user.avatar}</div>
          <div className="gram2-story-caption">just vibing tbh</div>
        </div>
        <div className="gram2-story-nav">
          <button onClick={() => setIdx((i) => Math.max(0, i - 1))} onMouseDown={(e) => e.stopPropagation()}>‹</button>
          <button onClick={() => setIdx((i) => Math.min(users.length - 1, i + 1))} onMouseDown={(e) => e.stopPropagation()}>›</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Explore ----------
function ExploreView({ posts, onPostClick, galleryImages }: {
  posts: Post[];
  onPostClick: (p: Post) => void;
  galleryImages: string[];
}) {
  return (
    <div className="gram2-explore">
      {posts.map((p) => (
        <button key={p.id} className="gram2-explore-tile"
          style={{ background: p.bg }}
          onClick={() => onPostClick(p)}
          onMouseDown={(e) => e.stopPropagation()}>
          {p.imageIdx != null && galleryImages[p.imageIdx] ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={galleryImages[p.imageIdx]} alt="" loading="lazy" />
          ) : (
            <span className="gram2-explore-emoji">{p.emoji}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ---------- Profile ----------
function ProfileView({ user, posts, onBack, onPostClick, isFollowing, onToggleFollow, isMe, galleryImages }: {
  user: User;
  posts: Post[];
  onBack: () => void;
  onPostClick: (p: Post) => void;
  isFollowing: boolean;
  onToggleFollow: () => void;
  isMe: boolean;
  galleryImages: string[];
}) {
  return (
    <div className="gram2-profile">
      <button className="gram2-back" onClick={onBack} onMouseDown={(e) => e.stopPropagation()}>← Back</button>
      <div className="gram2-profile-head">
        <div className="gram2-profile-avatar" style={{ background: user.color }}>{user.avatar}</div>
        <div className="gram2-profile-info">
          <div className="gram2-profile-name">
            {user.handle}{user.verified && <span className="gram2-verified">✓</span>}
            {!isMe && (
              <button
                className={`gram2-follow${isFollowing ? ' following' : ''}`}
                onClick={onToggleFollow}
                onMouseDown={(e) => e.stopPropagation()}
              >{isFollowing ? 'Following' : 'Follow'}</button>
            )}
          </div>
          <div className="gram2-profile-stats">
            <span><strong>{posts.length}</strong> posts</span>
            <span><strong>{fmtCount(Math.floor(Math.random() * 999_999) + 100)}</strong> followers</span>
            <span><strong>{Math.floor(Math.random() * 800) + 100}</strong> following</span>
          </div>
          <div className="gram2-profile-bio"><strong>{user.name}</strong></div>
          <div className="gram2-profile-bio">{user.bio}</div>
        </div>
      </div>
      {posts.length === 0 ? (
        <div className="gram2-empty">No posts yet.</div>
      ) : (
        <div className="gram2-profile-grid">
          {posts.map((p) => (
            <button key={p.id} className="gram2-profile-tile"
              style={{ background: p.bg }}
              onClick={() => onPostClick(p)}
              onMouseDown={(e) => e.stopPropagation()}>
              {p.imageIdx != null && galleryImages[p.imageIdx] ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={galleryImages[p.imageIdx]} alt="" loading="lazy" />
              ) : (
                <span className="gram2-explore-emoji">{p.emoji}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
