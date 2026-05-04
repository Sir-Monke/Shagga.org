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
  { handle: 'margaret_90',      name: 'Margaret (Nan)',      avatar: '👵', color: '#c2185b', online: true },
  { handle: 'phil_drives',      name: 'Phil',                avatar: '🚗', color: '#1976d2', online: true },
  { handle: 'uncle_dave',       name: 'Uncle Dave',          avatar: '🧓', color: '#5d4037' },
  { handle: 'auntie_linda',     name: 'Auntie Linda',        avatar: '💃', color: '#d81b60', online: true },
  { handle: 'shagga_memories',  name: 'Shagga Memories',     avatar: '📸', color: '#5e35b1' },
  { handle: 'genuine_news',     name: 'GENUINE NEWS',        avatar: '📰', color: '#d32f2f' },
  { handle: 'big_shagga_94',    name: 'Big Shagga',          avatar: '🤠', color: '#0e7e7e', online: true },
  { handle: 'concerned_mum',    name: 'Mom',                 avatar: '👩', color: '#7b1fa2' },
  { handle: 'dad_browser',      name: 'Dad',                 avatar: '👨', color: '#3949ab' },
  { handle: 'sharon_accounts',  name: 'Sharon from Accounts', avatar: '💼', color: '#388e3c', online: true },
  { handle: 'tech_helpline',    name: 'Tech Support',        avatar: '💻', color: '#455a64', online: true },
  { handle: 'aldi_middle',      name: 'Aldi Middle Aisle',   avatar: '🛒', color: '#ef6c00' },
];

const POST_TEMPLATES: Omit<FBPost, 'id'>[] = [
  { userHandle: 'margaret_90',      time: '2 mins ago',  content: 'has anyone found my phone i must have left it somewhere. typing this on it. love nan x ❤️🌹', emoji: '📱', bg: 'linear-gradient(135deg, #ec407a, #ad1457)', initialReactions: { like: 4128, love: 14728, haha: 8472, wow: 47, sad: 12, angry: 0 }, initialComments: [{ user: 'Big Shagga', text: 'nan u are texting on your phone' }, { user: 'Auntie Linda', text: '🌹🌹🌹 LOVE U ANGEL' }], initialShares: 234 },
  { userHandle: 'phil_drives',      time: '1 hour ago',  content: 'BIG NEWS FROM ME. my car can do 90mph in first gear with NO REDLINE. it just keeps going. i think i broke physics or something. stoked!! 🚗', emoji: '🚗', bg: 'linear-gradient(135deg, #1976d2, #0d47a1)', initialReactions: { like: 8214, love: 412, haha: 12047, wow: 891, sad: 0, angry: 47 }, initialComments: [{ user: 'Mechanic', text: 'phil this is concerning' }, { user: 'Big Shagga', text: 'PHIL NO' }, { user: 'Mom', text: 'k' }], initialShares: 2104 },
  { userHandle: 'phil_drives',      time: '47 mins ago', content: 'UPDATE: also installed a manual handbrake on the auto. for the feel of it. golden 👌', emoji: '🛞', bg: 'linear-gradient(135deg, #1565c0, #0d47a1)', initialReactions: { like: 412, love: 8, haha: 8472, wow: 47, sad: 0, angry: 12 }, initialComments: [{ user: 'Mechanic', text: 'phil please' }], initialShares: 89 },
  { userHandle: 'uncle_dave',       time: '3 hours ago', content: '👍', emoji: undefined, initialReactions: { like: 47, love: 234, haha: 891, wow: 12, sad: 412, angry: 0 }, initialComments: [{ user: 'Big Shagga', text: 'dave that was a death announcement' }, { user: 'Margaret', text: 'what is happening' }], initialShares: 0 },
  { userHandle: 'auntie_linda',     time: '5 hours ago', content: '🌹🌹🌹 GOOD MORNING ANGELS!! 🌹🌹🌹 GOD BLESS THIS BEAUTIFUL DAY ❤️❤️❤️ FAMILY IS EVERYTHING 💕💕💕 SHARE IF U AGREE 🙏🙏🙏', emoji: '🌹', bg: 'linear-gradient(135deg, #ff7e5f, #feb47b)', initialReactions: { like: 1247, love: 4128, haha: 234, wow: 89, sad: 0, angry: 0 }, initialComments: [{ user: 'Margaret', text: 'AMEN GOD BLESS' }, { user: 'Uncle Dave', text: '👍' }], initialShares: 47 },
  { userHandle: 'shagga_memories',  time: '6 hours ago', content: '✨ On this day in 2007 ✨ you were tagged in 47 photos. all sideways. simpler times ❤️', emoji: '📸', bg: 'linear-gradient(135deg, #5e35b1, #311b92)', initialReactions: { like: 891, love: 234, haha: 47, wow: 12, sad: 412, angry: 0 }, initialComments: [{ user: 'Big Shagga', text: 'why was my phone always sideways' }], initialShares: 12 },
  { userHandle: 'genuine_news',     time: '12 hours ago',content: 'BREAKING: Local man "Phil" allegedly taught his automatic car to think it is a manual. Witnesses describe his driving as "concerning but committed". More at 7. 🚨', emoji: '🚨', bg: 'linear-gradient(135deg, #d32f2f, #b71c1c)', initialReactions: { like: 12847, love: 234, haha: 47281, wow: 891, sad: 12, angry: 47 }, initialComments: [{ user: 'Phil', text: 'genuine news again my goat' }, { user: 'Mom', text: 'phil call me' }], initialShares: 8421 },
  { userHandle: 'sharon_accounts',  time: '1 day ago',   content: 'ALL: please disregard my previous email. and the one before that. and the one before that. and the one i am about to send. — Sharon', emoji: '📧', bg: 'linear-gradient(135deg, #2e7d32, #1b5e20)', initialReactions: { like: 8472, love: 412, haha: 14728, wow: 47, sad: 234, angry: 12 }, initialComments: [{ user: 'IT', text: 'sharon please stop reply-all' }, { user: 'Big Shagga', text: 'sharon never stop' }], initialShares: 4128 },
  { userHandle: 'aldi_middle',      time: '2 days ago',  content: 'THIS WEEK IN THE MIDDLE AISLE: a kayak. a chainsaw. 47 garden gnomes. one (1) astronaut suit. a ukulele. £14.99 each. while stocks last 🛒', emoji: '🛒', bg: 'linear-gradient(135deg, #ef6c00, #d84315)', initialReactions: { like: 47281, love: 8472, haha: 4128, wow: 891, sad: 0, angry: 0 }, initialComments: [{ user: 'Phil', text: 'kayak booked' }, { user: 'Big Shagga', text: 'astronaut suit booked' }], initialShares: 12047 },
  { userHandle: 'concerned_mum',    time: '3 days ago',  content: 'call me when you get a chance', emoji: undefined, initialReactions: { like: 47, love: 0, haha: 0, wow: 89, sad: 412, angry: 234 }, initialComments: [{ user: 'Big Shagga', text: 'is everyone ok' }, { user: 'Mom', text: 'k' }], initialShares: 0 },
  { userHandle: 'dad_browser',      time: '4 days ago',  content: 'how do u close a tab. asking for a friend. its me. 247 of them. asking for me.', emoji: '💻', bg: 'linear-gradient(135deg, #3949ab, #1a237e)', initialReactions: { like: 891, love: 47, haha: 4128, wow: 234, sad: 412, angry: 0 }, initialComments: [{ user: 'Tech Support', text: 'have you tried turning it off and on again' }], initialShares: 47 },
  { userHandle: 'tech_helpline',    time: '5 days ago',  content: 'have you tried turning it off and on again', emoji: '💻', bg: 'linear-gradient(135deg, #455a64, #263238)', initialReactions: { like: 14728, love: 234, haha: 891, wow: 47, sad: 0, angry: 0 }, initialComments: [{ user: 'Dad', text: 'i have not. let me try' }], initialShares: 234 },
];

const FRIENDS = USERS;

const EVENTS = [
  { name: 'Margaret 90th Birthday',          when: 'Next Sunday',     going: 234, location: 'her house, dont be late' },
  { name: 'Phil\'s Car Show & Tell',         when: 'This Saturday',   going: 12,  location: 'his driveway, may end early' },
  { name: 'Dad\'s 247 Tabs Closing Ceremony',when: 'Some time in 2027', going: 4, location: 'the spare room' },
  { name: 'Aldi Middle Aisle Reset',          when: 'Tuesday 8am',     going: 89,  location: 'aisle 3' },
  { name: 'Sharon\'s Email Recall Party',     when: 'Pending recall',  going: 47,  location: 'TBD (recalled)' },
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
    { name: 'Used Astronaut Suit (Aldi 2024)',  price: 14, desc: 'worn once. middle aisle classic. some moon dust included.' },
    { name: 'Phil\'s Old Manual Gearbox',        price: 47, desc: 'no longer needed. its automatic now. and a manual. and paddle shift. weirdly all 3.' },
    { name: 'Margaret\'s Phone (allegedly lost)', price: 0, desc: 'she keeps finding it then losing it. taking offers.' },
    { name: 'Garden Gnome Collection (47)',      price: 12, desc: 'middle aisle haul. all named "kevin". non-negotiable.' },
    { name: 'Dad\'s Browser Tabs (247 of them)',  price: 99, desc: 'serious buyer only. each one is "important". includes 6 banking ones from 2018.' },
    { name: 'Used Kayak (never wet)',             price: 47, desc: 'bought in middle aisle 2 years ago. has lived in the garage. mint.' },
    { name: 'Bluetooth Speaker (gear shift sounds)', price: 8, desc: 'phil\'s spare. plays manual gear shift sounds in your automatic. immersive.' },
    { name: 'Sharon\'s Email Drafts (folder)',    price: 4, desc: '47 emails marked "do not send". she sent them. all of them.' },
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
