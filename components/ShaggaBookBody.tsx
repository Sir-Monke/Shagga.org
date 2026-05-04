'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { BookIcon } from './icons';
import { productsList, SHAGGA_IMAGES } from './imageManifest';

interface User {
  handle: string;
  name: string;
  avatar: string;
  color: string;
  online?: boolean;
}

type Reaction = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
const REACTION_EMOJI: Record<Reaction, string> = {
  like: '👍', love: '❤️', haha: '😆', wow: '😯', sad: '😢', angry: '😡',
};

interface FBPost {
  id: number;
  userHandle: string;
  time: string;
  content: string;
  bg?: string;
  emoji?: string;
  productImageIdx?: number;
  initialReactions: { like: number; love: number; haha: number; wow: number; sad: number; angry: number };
  initialComments: { user: string; text: string }[];
  initialShares: number;
}

type View =
  | { kind: 'feed' }
  | { kind: 'marketplace' }
  | { kind: 'events' }
  | { kind: 'profile'; handle: string };

const USERS: User[] = [
  { handle: 'margaret_shagga',  name: 'Margaret Shagga',     avatar: '👵', color: '#c2185b', online: true },
  { handle: 'bunnings_local',   name: 'Bunnings Mooroolbark',avatar: '🔨', color: '#ef6c00' },
  { handle: 'daz',              name: 'Daz',                 avatar: '🍺', color: '#ffa500', online: true },
  { handle: 'shagga_memories',  name: 'Shagga Memories',     avatar: '📸', color: '#5e35b1' },
  { handle: 'genuine_news',     name: 'GENUINE NEWS Australia', avatar: '📰', color: '#d32f2f' },
  { handle: 'big_shagga_94',    name: 'Big Shagga',          avatar: '🤠', color: '#1976d2', online: true },
  { handle: 'cooked_dave',      name: 'Cooked Dave',         avatar: '🌊', color: '#00838f' },
  { handle: 'shazza',           name: 'Shazza',              avatar: '💅', color: '#d81b60', online: true },
  { handle: 'goon_lord',        name: 'Goon Lord',           avatar: '🍷', color: '#7b1fa2' },
  { handle: 'tradie_tim',       name: 'Tradie Tim',          avatar: '🛠️', color: '#5d4037', online: true },
  { handle: 'cookwithshagga',   name: 'Cook With Shagga',    avatar: '🍳', color: '#ff8f00' },
  { handle: 'maggie_swooper',   name: 'maggie_swooper',      avatar: '🐦‍⬛', color: '#1c1c1c', online: true },
];

const POST_TEMPLATES: Omit<FBPost, 'id'>[] = [
  { userHandle: 'margaret_shagga',  time: '47 mins ago', content: 'GOOD MORNING family !! to whom this may concern please call ur mother she is worried sick !! also enjoy this beautiful sunrise photo i found on the internet !! 🌅🌅🌅 GOD BLESS', emoji: '🌅', bg: 'linear-gradient(135deg, #ffd54f, #ff7043)', initialReactions: { like: 47, love: 89, haha: 2, wow: 12, sad: 0, angry: 0 }, initialComments: [{ user: 'Big Shagga', text: 'love u nan' }, { user: 'Daz', text: 'beautiful nan' }], initialShares: 1 },
  { userHandle: 'bunnings_local',   time: '2 hours ago', content: 'SAUSAGE SIZZLE SATURDAY !!! 9am till sold out. proceeds go to the local rotary club. ONIONS ARE UNDER THE SNAG. we will not be debating this in 2024. 🌭', emoji: '🌭', bg: 'linear-gradient(135deg, #ef6c00, #d32f2f)', initialReactions: { like: 8214, love: 412, haha: 47, wow: 12, sad: 2, angry: 89 }, initialComments: [{ user: 'Goon Lord', text: 'on top is heresy' }, { user: 'Daz', text: 'see u there' }], initialShares: 2104 },
  { userHandle: 'shagga_memories',  time: '5 hours ago', content: '✨ On this day in 2003 ✨ you were tagged in a photo with 47 of ur mates at the dam. simpler times mate.', emoji: '📸', bg: 'linear-gradient(135deg, #5e35b1, #311b92)', initialReactions: { like: 891, love: 234, haha: 12, wow: 47, sad: 412, angry: 0 }, initialComments: [{ user: 'Cooked Dave', text: 'wonder where everyone is now' }], initialShares: 12 },
  { userHandle: 'daz',              time: '1 day ago', content: 'lost a thong at the BBQ. if found please return. it has sentimental value (it was my dads)', emoji: '🩴', bg: 'linear-gradient(135deg, #ffa500, #ef6c00)', initialReactions: { like: 47, love: 8, haha: 234, wow: 12, sad: 89, angry: 4 }, initialComments: [{ user: 'Big Shagga', text: 'will keep an eye out' }], initialShares: 3 },
  { userHandle: 'genuine_news',     time: '2 days ago', content: 'BREAKING: Local man "shagga" allegedly seen near Bunnings holding what witnesses described as "definitely a snag". More at 7.', emoji: '📰', bg: 'linear-gradient(135deg, #d32f2f, #b71c1c)', initialReactions: { like: 12847, love: 234, haha: 8472, wow: 891, sad: 12, angry: 47 }, initialComments: [{ user: 'Big Shagga', text: 'guilty' }, { user: 'Margaret', text: 'thats my son' }], initialShares: 8421 },
  { userHandle: 'big_shagga_94',    time: '3 days ago', content: 'just put a snag on the barbie at 6:47am. cooked behaviour. happy weekend everyone 🌭🍻', emoji: '🌭', bg: 'linear-gradient(135deg, #ff7e2d, #ff3b3b)', initialReactions: { like: 891, love: 47, haha: 234, wow: 12, sad: 0, angry: 0 }, initialComments: [{ user: 'Daz', text: 'pour one out for me' }], initialShares: 12 },
  { userHandle: 'cooked_dave',      time: '4 days ago', content: 'going to the dam if anyone wants to come. its lukewarm. as is tradition.', emoji: '🌊', bg: 'linear-gradient(135deg, #2c5364, #0f2027)', initialReactions: { like: 234, love: 47, haha: 12, wow: 0, sad: 0, angry: 0 }, initialComments: [{ user: 'Daz', text: 'on my way' }], initialShares: 4 },
  { userHandle: 'shazza',           time: '5 days ago', content: 'WON GOON OF FORTUNE AGAIN!!! 4 weeks running 👑👑👑 nobody can beat me', emoji: '👑', bg: 'linear-gradient(135deg, #d81b60, #6a1b9a)', initialReactions: { like: 2341, love: 412, haha: 47, wow: 12, sad: 891, angry: 234 }, initialComments: [{ user: 'Goon Lord', text: 'unbeatable. truly.' }, { user: 'Daz', text: 'rematch' }], initialShares: 89 },
  { userHandle: 'goon_lord',        time: '6 days ago', content: 'tonight. 7pm. back fence. byo peg. RT this post.', emoji: '🍷', bg: 'linear-gradient(135deg, #7b1fa2, #4a148c)', initialReactions: { like: 412, love: 47, haha: 12, wow: 0, sad: 0, angry: 4 }, initialComments: [{ user: 'Shazza', text: 'count me in' }], initialShares: 28 },
  { userHandle: 'tradie_tim',       time: '1 week ago', content: 'on smoko. dont txt. unless its about a snag.', emoji: '🚬', bg: 'linear-gradient(135deg, #5d4037, #3e2723)', initialReactions: { like: 234, love: 12, haha: 412, wow: 0, sad: 0, angry: 0 }, initialComments: [{ user: 'boss', text: 'come back to work' }], initialShares: 7 },
  { userHandle: 'cookwithshagga',   time: '1 week ago', content: 'fried egg. attempt #47. close but not perfect. recipe in comments below 👇', emoji: '🍳', bg: 'linear-gradient(135deg, #ffa500, #ef6c00)', initialReactions: { like: 891, love: 234, haha: 47, wow: 12, sad: 8, angry: 0 }, initialComments: [{ user: 'Margaret', text: 'use less butter' }], initialShares: 89 },
  { userHandle: 'maggie_swooper',   time: '2 weeks ago', content: 'reminder: swooping season is upon us. wear a helmet. carry a stick. respect the maggies.', emoji: '🪶', bg: 'linear-gradient(135deg, #1c1c1c, #444)', initialReactions: { like: 47, love: 8, haha: 89, wow: 12, sad: 4, angry: 12 }, initialComments: [{ user: 'cyclist', text: 'they are evil' }], initialShares: 23 },
];

const FRIENDS = USERS;

const EVENTS = [
  { name: 'Sausage Sizzle Saturday',  when: 'Saturday 9am', going: 47, location: 'Bunnings Mooroolbark' },
  { name: 'Goon of Fortune Tournament', when: 'Tonight 7pm', going: 12, location: 'Back fence' },
  { name: 'Shaggas Nan\'s Birthday',  when: 'Next Tuesday', going: 234, location: 'her house, dont be late' },
  { name: 'BBQ at Daves',              when: 'This Sunday', going: 89, location: "Daves backyard" },
];

// ---------- Helpers ----------
function fmtCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`.replace('.0K', 'K');
  return String(n);
}
function totalReactions(r: FBPost['initialReactions']): number {
  return r.like + r.love + r.haha + r.wow + r.sad + r.angry;
}

const STORAGE = {
  myReact: 'shaggabook-myreact',
  comments: 'shaggabook-comments',
  friends: 'shaggabook-friends',
  customPosts: 'shaggabook-posts',
};

// ---------- Component ----------
export default function ShaggaBookBody() {
  const [view, setView] = useState<View>({ kind: 'feed' });
  const [composing, setComposing] = useState('');

  const [myReactions, setMyReactions] = useState<Record<number, Reaction>>({});
  const [extraComments, setExtraComments] = useState<Record<number, { user: string; text: string }[]>>({});
  const [customPosts, setCustomPosts] = useState<FBPost[]>([]);
  const [friendStatus, setFriendStatus] = useState<Set<string>>(new Set());

  const products = useMemo(() => productsList(), []);

  // Persistence
  useEffect(() => {
    try {
      const r = localStorage.getItem(STORAGE.myReact);
      if (r) setMyReactions(JSON.parse(r));
      const c = localStorage.getItem(STORAGE.comments);
      if (c) setExtraComments(JSON.parse(c));
      const cp = localStorage.getItem(STORAGE.customPosts);
      if (cp) setCustomPosts(JSON.parse(cp));
      const f = localStorage.getItem(STORAGE.friends);
      if (f) setFriendStatus(new Set(JSON.parse(f)));
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem(STORAGE.myReact, JSON.stringify(myReactions)); } catch {} }, [myReactions]);
  useEffect(() => { try { localStorage.setItem(STORAGE.comments, JSON.stringify(extraComments)); } catch {} }, [extraComments]);
  useEffect(() => { try { localStorage.setItem(STORAGE.customPosts, JSON.stringify(customPosts)); } catch {} }, [customPosts]);
  useEffect(() => { try { localStorage.setItem(STORAGE.friends, JSON.stringify(Array.from(friendStatus))); } catch {} }, [friendStatus]);

  const setReaction = (postId: number, r: Reaction | null) => {
    setMyReactions((m) => {
      const next = { ...m };
      if (r === null || next[postId] === r) delete next[postId];
      else next[postId] = r;
      return next;
    });
  };
  const addComment = (postId: number, text: string) => {
    setExtraComments((ec) => ({
      ...ec,
      [postId]: [...(ec[postId] ?? []), { user: 'You', text }],
    }));
  };
  const toggleFriend = (handle: string) => {
    setFriendStatus((s) => { const n = new Set(s); n.has(handle) ? n.delete(handle) : n.add(handle); return n; });
  };

  const allPosts = useMemo(() => {
    const seeded = POST_TEMPLATES.map((p, i) => ({ ...p, id: i + 1 }));
    return [...customPosts, ...seeded];
  }, [customPosts]);

  const findUser = (handle: string): User =>
    handle === 'you'
      ? { handle: 'you', name: 'You', avatar: '🌍', color: '#0066cc', online: true }
      : USERS.find((u) => u.handle === handle) ?? USERS[0];

  const post = (text: string) => {
    const t = text.trim(); if (!t) return;
    const np: FBPost = {
      id: Date.now(),
      userHandle: 'you',
      time: 'just now',
      content: t,
      initialReactions: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      initialComments: [],
      initialShares: 0,
    };
    setCustomPosts((cs) => [np, ...cs]);
    setComposing('');
  };

  const deletePost = (id: number) => {
    setCustomPosts((cs) => cs.filter((p) => p.id !== id));
  };

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="fb2-block">
        {/* Header */}
        <div className="fb2-header">
          <button className="fb2-logo" onClick={() => setView({ kind: 'feed' })} onMouseDown={(e) => e.stopPropagation()}>
            <BookIcon size={28} /> <span>ShaggaBook</span>
          </button>
          <div className="fb2-nav-tabs">
            <button className={`fb2-nav-tab${view.kind === 'feed' ? ' active' : ''}`}
              onClick={() => setView({ kind: 'feed' })} onMouseDown={(e) => e.stopPropagation()} title="Home">⌂</button>
            <button className={`fb2-nav-tab${view.kind === 'marketplace' ? ' active' : ''}`}
              onClick={() => setView({ kind: 'marketplace' })} onMouseDown={(e) => e.stopPropagation()} title="Marketplace">🛒</button>
            <button className={`fb2-nav-tab${view.kind === 'events' ? ' active' : ''}`}
              onClick={() => setView({ kind: 'events' })} onMouseDown={(e) => e.stopPropagation()} title="Events">📅</button>
          </div>
          <div className="fb2-me">
            <div className="fb2-avatar" style={{ background: '#0066cc', width: 32, height: 32, fontSize: 16 }}>🌍</div>
          </div>
        </div>

        {/* Main */}
        <div className="fb2-body">
          <div className="fb2-sidebar">
            <button className="fb2-sb-item" onClick={() => setView({ kind: 'profile', handle: 'you' })} onMouseDown={(e) => e.stopPropagation()}>
              <div className="fb2-avatar" style={{ background: '#0066cc' }}>🌍</div>
              <span>You</span>
            </button>
            <button className="fb2-sb-item"><span style={{ fontSize: 20 }}>👥</span><span>Friends</span></button>
            <button className="fb2-sb-item" onClick={() => setView({ kind: 'marketplace' })} onMouseDown={(e) => e.stopPropagation()}>
              <span style={{ fontSize: 20 }}>🛒</span><span>Marketplace</span>
            </button>
            <button className="fb2-sb-item" onClick={() => setView({ kind: 'events' })} onMouseDown={(e) => e.stopPropagation()}>
              <span style={{ fontSize: 20 }}>📅</span><span>Events</span>
            </button>
            <div className="fb2-sb-section">Online Mates</div>
            {USERS.filter((u) => u.online).slice(0, 6).map((u) => (
              <button key={u.handle} className="fb2-sb-item" onClick={() => setView({ kind: 'profile', handle: u.handle })} onMouseDown={(e) => e.stopPropagation()}>
                <div className="fb2-avatar fb2-avatar-online" style={{ background: u.color }}>{u.avatar}</div>
                <span>{u.name}</span>
              </button>
            ))}
          </div>

          <div className="fb2-main">
            {view.kind === 'feed' && (
              <>
                <div className="fb2-compose">
                  <div className="fb2-compose-row">
                    <div className="fb2-avatar" style={{ background: '#0066cc' }}>🌍</div>
                    <input
                      placeholder="What's on ya mind, Shagga?"
                      value={composing}
                      onChange={(e) => setComposing(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') post(composing); }}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="fb2-compose-actions">
                    <span>📷 Photo/Video</span>
                    <span>😀 Feeling</span>
                    <button
                      className="fb2-post-btn"
                      disabled={!composing.trim()}
                      onClick={() => post(composing)}
                      onMouseDown={(e) => e.stopPropagation()}
                    >Post</button>
                  </div>
                </div>
                {allPosts.map((p) => (
                  <PostCard
                    key={p.id} post={p}
                    user={findUser(p.userHandle)}
                    myReaction={myReactions[p.id] ?? null}
                    onReact={(r) => setReaction(p.id, r)}
                    extraComments={extraComments[p.id] ?? []}
                    onAddComment={(t) => addComment(p.id, t)}
                    onAuthorClick={(h) => setView({ kind: 'profile', handle: h })}
                    onDelete={p.userHandle === 'you' ? () => deletePost(p.id) : undefined}
                  />
                ))}
              </>
            )}
            {view.kind === 'marketplace' && (
              <MarketplaceView products={products} placeholder={SHAGGA_IMAGES.usePlaceholder} />
            )}
            {view.kind === 'events' && (
              <EventsView events={EVENTS} />
            )}
            {view.kind === 'profile' && (() => {
              const isMe = view.handle === 'you';
              const user = findUser(view.handle);
              const userPosts = allPosts.filter((p) => p.userHandle === view.handle);
              return <ProfileView
                user={user}
                posts={userPosts}
                isMe={isMe}
                isFriend={friendStatus.has(view.handle)}
                onToggleFriend={() => toggleFriend(view.handle)}
                onBack={() => setView({ kind: 'feed' })}
                myReactions={myReactions} setMyReact={setReaction}
                extraComments={extraComments} addComment={addComment}
                findUser={findUser}
                onAuthorClick={(h) => setView({ kind: 'profile', handle: h })}
                onDelete={(id) => deletePost(id)}
              />;
            })()}
          </div>

          <div className="fb2-rail">
            <div className="fb2-rail-title">Your friends</div>
            {FRIENDS.slice(0, 8).map((f) => (
              <button key={f.handle} className="fb2-rail-friend"
                onClick={() => setView({ kind: 'profile', handle: f.handle })}
                onMouseDown={(e) => e.stopPropagation()}>
                <div className={`fb2-avatar${f.online ? ' fb2-avatar-online' : ''}`} style={{ background: f.color }}>{f.avatar}</div>
                <span>{f.name}</span>
              </button>
            ))}
            <div className="fb2-rail-title" style={{ marginTop: 16 }}>Upcoming events</div>
            {EVENTS.slice(0, 3).map((e) => (
              <div key={e.name} className="fb2-rail-event">
                <div className="fb2-rail-event-name">{e.name}</div>
                <div className="fb2-rail-event-when">{e.when}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Post Card ----------
function PostCard({ post, user, myReaction, onReact, extraComments, onAddComment, onAuthorClick, onDelete }: {
  post: FBPost;
  user: User;
  myReaction: Reaction | null;
  onReact: (r: Reaction | null) => void;
  extraComments: { user: string; text: string }[];
  onAddComment: (t: string) => void;
  onAuthorClick: (h: string) => void;
  onDelete?: () => void;
}) {
  const [comment, setComment] = useState('');
  const [showReactions, setShowReactions] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  // Compute reaction counts (with my added/removed reaction)
  const reactionCounts = { ...post.initialReactions };
  if (myReaction) reactionCounts[myReaction] = (reactionCounts[myReaction] ?? 0) + 1;
  const total = totalReactions(reactionCounts);

  const allComments = [...post.initialComments, ...extraComments];
  const visibleComments = showAllComments ? allComments : allComments.slice(0, 2);

  // Top 3 reactions to show as bubble icons
  const topReactions = (Object.entries(reactionCounts) as [Reaction, number][])
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([r]) => r);

  return (
    <article className="fb2-post">
      <header className="fb2-post-head">
        <button className="fb2-avatar" style={{ background: user.color }}
          onClick={() => onAuthorClick(user.handle)} onMouseDown={(e) => e.stopPropagation()}>{user.avatar}</button>
        <div className="fb2-post-head-info">
          <button className="fb2-post-name"
            onClick={() => onAuthorClick(user.handle)} onMouseDown={(e) => e.stopPropagation()}>{user.name}</button>
          <div className="fb2-post-time">{post.time} · 🌐</div>
        </div>
        {onDelete && (
          <button className="fb2-post-more" onClick={onDelete} title="Delete">⋯</button>
        )}
      </header>
      <div className="fb2-post-content">{post.content}</div>
      {(post.bg || post.emoji) && (
        <div className="fb2-post-image" style={{ background: post.bg }}>
          <span className="fb2-post-emoji">{post.emoji}</span>
        </div>
      )}
      {total > 0 && (
        <div className="fb2-post-counts">
          <span>
            {topReactions.map((r, i) => (
              <span key={r} className="fb2-react-bubble" style={{ marginLeft: i > 0 ? -4 : 0 }}>{REACTION_EMOJI[r]}</span>
            ))}
            <span style={{ marginLeft: 6 }}>{fmtCount(total)}</span>
          </span>
          <span>{post.initialComments.length + extraComments.length} comments · {post.initialShares} shares</span>
        </div>
      )}
      <div
        className="fb2-post-actions"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        <button className={`fb2-action${myReaction ? ' active' : ''}`}
          onClick={() => onReact(myReaction ? null : 'like')}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => { e.stopPropagation(); setShowReactions((s) => !s); }}>
          {myReaction ? `${REACTION_EMOJI[myReaction]} ${myReaction[0].toUpperCase() + myReaction.slice(1)}` : '👍 Like'}
        </button>
        <button className="fb2-action" onMouseDown={(e) => e.stopPropagation()}>💬 Comment</button>
        <button className="fb2-action" onMouseDown={(e) => e.stopPropagation()}>↗ Share</button>
        {showReactions && (
          <div className="fb2-react-panel">
            {(['like', 'love', 'haha', 'wow', 'sad', 'angry'] as Reaction[]).map((r) => (
              <button key={r} className="fb2-react-btn" onClick={() => { onReact(r); setShowReactions(false); }} onMouseDown={(e) => e.stopPropagation()} title={r}>
                {REACTION_EMOJI[r]}
              </button>
            ))}
          </div>
        )}
      </div>
      {allComments.length > 0 && (
        <div className="fb2-comments">
          {!showAllComments && allComments.length > 2 && (
            <button className="fb2-comments-more" onClick={() => setShowAllComments(true)} onMouseDown={(e) => e.stopPropagation()}>
              View {allComments.length - 2} more comments
            </button>
          )}
          {visibleComments.map((c, i) => (
            <div key={i} className="fb2-comment">
              <div className="fb2-comment-bubble">
                <div className="fb2-comment-user">{c.user}</div>
                <div className="fb2-comment-text">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <form
        className="fb2-comment-form"
        onSubmit={(e) => {
          e.preventDefault();
          const t = comment.trim();
          if (!t) return;
          onAddComment(t);
          setComment('');
        }}
      >
        <div className="fb2-avatar" style={{ background: '#0066cc', width: 28, height: 28, fontSize: 14 }}>🌍</div>
        <input
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        />
      </form>
    </article>
  );
}

// ---------- Marketplace ----------
function MarketplaceView({ products, placeholder }: { products: string[]; placeholder: boolean }) {
  const items = [
    { name: 'Genuine Shagga Thong (single)',  price: 2,  desc: 'sentimental value. mostly. lost the other one at a BBQ.' },
    { name: 'Used Hills Hoist (slightly leans)', price: 47, desc: 'great for goon of fortune. comes with vibes.' },
    { name: 'Cooked Snag Photo (signed)',      price: 99, desc: 'rare. signed by Big Shagga himself. mint condition.' },
    { name: 'Empty Goon Bag (sentimental)',    price: 5,  desc: 'won goon of fortune in 2003 with this. priceless really.' },
    { name: 'Bunnings Sausage Sizzle Tongs',   price: 12, desc: 'used. seasoned. you cannot replicate the patina.' },
    { name: 'Magpie Repellent (homemade)',     price: 15, desc: 'works 47% of the time. money back unguaranteed.' },
    { name: 'Lukewarm Shower Head',             price: 8,  desc: 'never lets you go hot. perfect for shaggas.' },
    { name: 'Vegemite Sandwich (digital nft)',  price: 4747, desc: 'definitely real. trust.' },
  ];
  return (
    <div className="fb2-marketplace">
      <h2 className="fb2-h2">Marketplace</h2>
      <div className="fb2-market-grid">
        {items.map((it, i) => (
          <button key={i} className="fb2-market-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="fb2-market-image">
              {!placeholder && products[i % products.length] ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={products[i % products.length]} alt={it.name} loading="lazy" />
              ) : (
                <span style={{ fontSize: 64 }}>📦</span>
              )}
            </div>
            <div className="fb2-market-name">{it.name}</div>
            <div className="fb2-market-price">£{it.price}</div>
            <div className="fb2-market-desc">{it.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- Events ----------
function EventsView({ events }: { events: typeof EVENTS }) {
  return (
    <div className="fb2-events">
      <h2 className="fb2-h2">Events</h2>
      {events.map((e) => (
        <div key={e.name} className="fb2-event-card">
          <div className="fb2-event-icon">📅</div>
          <div className="fb2-event-info">
            <div className="fb2-event-name">{e.name}</div>
            <div className="fb2-event-when">{e.when} · {e.location}</div>
            <div className="fb2-event-going">{e.going} going</div>
          </div>
          <button className="fb2-event-btn" onMouseDown={(e) => e.stopPropagation()}>Interested</button>
        </div>
      ))}
    </div>
  );
}

// ---------- Profile ----------
function ProfileView({ user, posts, isMe, isFriend, onToggleFriend, onBack, myReactions, setMyReact, extraComments, addComment, findUser, onAuthorClick, onDelete }: {
  user: User;
  posts: FBPost[];
  isMe: boolean;
  isFriend: boolean;
  onToggleFriend: () => void;
  onBack: () => void;
  myReactions: Record<number, Reaction>;
  setMyReact: (id: number, r: Reaction | null) => void;
  extraComments: Record<number, { user: string; text: string }[]>;
  addComment: (id: number, t: string) => void;
  findUser: (h: string) => User;
  onAuthorClick: (h: string) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="fb2-profile">
      <button className="fb2-back" onClick={onBack} onMouseDown={(e) => e.stopPropagation()}>← Back</button>
      <div className="fb2-profile-banner" style={{ background: `linear-gradient(135deg, ${user.color}, #000)` }} />
      <div className="fb2-profile-head">
        <div className="fb2-avatar fb2-profile-avatar" style={{ background: user.color }}>{user.avatar}</div>
        <div className="fb2-profile-info">
          <div className="fb2-profile-name">{user.name}</div>
          <div className="fb2-profile-handle">@{user.handle}</div>
        </div>
        {!isMe && (
          <button
            className={`fb2-friend-btn${isFriend ? ' added' : ''}`}
            onClick={onToggleFriend}
            onMouseDown={(e) => e.stopPropagation()}
          >{isFriend ? '✓ Friends' : '＋ Add Friend'}</button>
        )}
      </div>
      {posts.length === 0 ? (
        <div className="fb2-empty">No posts yet.</div>
      ) : (
        posts.map((p) => (
          <PostCard
            key={p.id} post={p}
            user={findUser(p.userHandle)}
            myReaction={myReactions[p.id] ?? null}
            onReact={(r) => setMyReact(p.id, r)}
            extraComments={extraComments[p.id] ?? []}
            onAddComment={(t) => addComment(p.id, t)}
            onAuthorClick={onAuthorClick}
            onDelete={p.userHandle === 'you' ? () => onDelete(p.id) : undefined}
          />
        ))
      )}
    </div>
  );
}
