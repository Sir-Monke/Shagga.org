'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ShwitterIcon } from './icons';

// ---------- Types ----------
interface Author {
  handle: string;
  name: string;
  avatar: string;
  color: string;
  bio: string;
  location: string;
  verified?: boolean;
}

interface Shweet {
  id: number;
  authorHandle: string;
  text: string;
  ageMin: number;
  parentId?: number;
  initialLikes: number;
  initialReposts: number;
  initialReplies: number;
}

type View =
  | { kind: 'feed' }
  | { kind: 'thread'; id: number }
  | { kind: 'profile'; handle: string }
  | { kind: 'explore' }
  | { kind: 'notifications' }
  | { kind: 'bookmarks' };

// ---------- Authors ----------
const AUTHORS: Author[] = [
  { handle: 'margaret_90',     name: 'Margaret (Nan)',      avatar: '👵', color: '#c2185b', bio: 'send help i lost my phone again. love nan x',         location: 'somewhere',                       },
  { handle: 'phil_drives',     name: 'Phil',                avatar: '🚗', color: '#1976d2', bio: 'my car can do 90 in first gear. no redline. ask me how.',  location: 'on the M62',                                  },
  { handle: 'uncledavefb',     name: 'Uncle Dave',          avatar: '🧓', color: '#5d4037', bio: 'just here to react with thumbs up to everything',     location: 'his armchair',                       },
  { handle: 'auntie_linda',    name: 'Auntie Linda',        avatar: '💃', color: '#d81b60', bio: '🌹🌹🌹 GOOD MORNING ANGEL 🌹🌹🌹',                       location: 'the family group chat',                       },
  { handle: 'concerned_mum',   name: 'Mom',                 avatar: '👩', color: '#7b1fa2', bio: '"k"',                                                  location: 'home',                              },
  { handle: 'dad_browser',     name: 'Dad',                 avatar: '👨', color: '#3949ab', bio: '247 tabs open. all important.',                        location: 'the spare room',                                  },
  { handle: 'big_shagga_94',   name: 'Big Shagga',          avatar: '🤠', color: '#0e7e7e', bio: 'a top shagga. (cant prove it tho)',                    location: '?',                              verified: true },
  { handle: 'shaggacouncil',   name: 'Shagga Council',      avatar: '🌍', color: '#0e7e7e', bio: 'official global ruling body. unofficial.',              location: 'the meeting',           verified: true },
  { handle: 'tech_helpline',   name: 'Tech Support',        avatar: '💻', color: '#455a64', bio: 'have you tried turning it off and on again',           location: 'a call centre',                       },
  { handle: 'midaisle_middle',     name: 'Mid-Aisle (the shop)',   avatar: '🛒', color: '#ef6c00', bio: 'this week: kayak, chainsaw, gnomes, an astronaut suit', location: 'aisle 3',               verified: true },
  { handle: 'shaggas_mate',    name: 'gareth from work',    avatar: '🧑', color: '#1565c0', bio: 'the lads.',                                            location: 'the office',                                  },
  { handle: 'doreen_57',       name: 'Auntie Doreen',       avatar: '👩‍🦰', color: '#ad1457', bio: 'sent from my iphone. i think.',                       location: 'cornwall',                                  },
  { handle: 'sharon_from_acc', name: 'Sharon from Accounts', avatar: '💼', color: '#388e3c', bio: 'reply all to all emails. mistakes were made.',         location: 'the office printer',                                  },
  { handle: 'ranga_tim',       name: 'tim',                 avatar: '🧑', color: '#bf360c', bio: 'just a regular shagga',                                location: 'idk man',                                  },
];

// ---------- Initial shweets ----------
const INITIAL_SHWEETS: Shweet[] = [
  { id: 1,  authorHandle: 'margaret_90',    text: "has anyone found my phone i lost it again. love nan x",                                                ageMin: 4,    initialLikes: 14728,  initialReposts: 4128,  initialReplies: 891 },
  { id: 2,  authorHandle: 'phil_drives',    text: "lads i have just discovered my car can do 90mph in first gear. it has no redline. it just keeps going. golden",  ageMin: 12,   initialLikes: 89724,  initialReposts: 12847, initialReplies: 4002 },
  { id: 3,  authorHandle: 'phil_drives',    text: "update: installed a manual handbrake on the automatic. for the feel of it.",                            ageMin: 60,   initialLikes: 47281,  initialReposts: 8472,  initialReplies: 1247, parentId: 2 },
  { id: 4,  authorHandle: 'uncledavefb',    text: "👍",                                                                                                     ageMin: 18,   initialLikes: 47,     initialReposts: 8,     initialReplies: 234 },
  { id: 5,  authorHandle: 'concerned_mum',  text: "k",                                                                                                     ageMin: 30,   initialLikes: 89724,  initialReposts: 14728, initialReplies: 8472 },
  { id: 6,  authorHandle: 'auntie_linda',   text: "🌹🌹🌹🌹🌹🌹🌹🌹🌹 GOOD MORNING ANGELS 🌹🌹🌹🌹🌹🌹🌹🌹🌹 GOD BLESS ❤️❤️❤️❤️❤️",                          ageMin: 47,   initialLikes: 412,    initialReposts: 47,    initialReplies: 234 },
  { id: 7,  authorHandle: 'tech_helpline',  text: "have you tried turning it off and on again",                                                            ageMin: 90,   initialLikes: 47281,  initialReposts: 8472,  initialReplies: 234 },
  { id: 8,  authorHandle: 'big_shagga_94',  text: "found out my dad has been searching things by typing them into the address bar AND the search engine. like a relay system. unstoppable",  ageMin: 120, initialLikes: 12847, initialReposts: 4128, initialReplies: 891 },
  { id: 9,  authorHandle: 'midaisle_middle',    text: "this week in the middle aisle: a kayak, a chainsaw, 47 garden gnomes, and one (1) astronaut suit. £14.99 each.",  ageMin: 180, initialLikes: 47281, initialReposts: 12847, initialReplies: 1247 },
  { id: 10, authorHandle: 'doreen_57',      text: "sent from my iphone",                                                                                  ageMin: 240,  initialLikes: 89,     initialReposts: 12,    initialReplies: 47 },
  { id: 11, authorHandle: 'big_shagga_94',  text: "she said k. one letter. an entire generation gap.",                                                     ageMin: 300,  initialLikes: 14728,  initialReposts: 2104,  initialReplies: 891 },
  { id: 12, authorHandle: 'phil_drives',    text: "i now play 'gear shift sound effect' from a bluetooth speaker when i shift in my automatic. for immersion.",  ageMin: 360, initialLikes: 8472, initialReposts: 1247, initialReplies: 412 },
  { id: 13, authorHandle: 'shaggacouncil',  text: "BREAKING: the council has voted. you cannot reply 'k' to 'we need to talk'. effective immediately.",    ageMin: 480,  initialLikes: 47281,  initialReposts: 8472,  initialReplies: 2104 },
  { id: 14, authorHandle: 'concerned_mum',  text: "k.",                                                                                                    ageMin: 482,  initialLikes: 89724,  initialReposts: 14728, initialReplies: 12047, parentId: 13 },
  { id: 15, authorHandle: 'shaggacouncil',  text: "this is a personal attack on the council.",                                                              ageMin: 485,  initialLikes: 14728,  initialReposts: 4128,  initialReplies: 891, parentId: 13 },
  { id: 16, authorHandle: 'sharon_from_acc',text: "ALL: please disregard my previous email. and the one before that. and the one before that. — Sharon",   ageMin: 600,  initialLikes: 8472,   initialReposts: 412,   initialReplies: 234 },
  { id: 17, authorHandle: 'margaret_90',    text: "where am i. who put this onto a glass screen. love nan",                                                ageMin: 720,  initialLikes: 47281,  initialReposts: 12847, initialReplies: 8472 },
  { id: 18, authorHandle: 'uncledavefb',    text: "happy birthday auntie sheila ❤️ hope u have a good one",                                                ageMin: 800,  initialLikes: 891,    initialReposts: 47,    initialReplies: 4127 },
  { id: 19, authorHandle: 'big_shagga_94',  text: "uncle dave has wished aunt sheila happy birthday. she has been gone for 3 years. nobody has the heart to tell him.",  ageMin: 810, initialLikes: 89724, initialReposts: 14728, initialReplies: 4002, parentId: 18 },
  { id: 20, authorHandle: 'phil_drives',    text: "good news: my car is now legally a manual, automatic, AND paddle shift simultaneously. mechanic refused service. i am winning.",  ageMin: 900, initialLikes: 14728, initialReposts: 4128, initialReplies: 891 },
  { id: 21, authorHandle: 'dad_browser',    text: "anyone know how to close tabs.",                                                                        ageMin: 1100, initialLikes: 47,     initialReposts: 12,    initialReplies: 234 },
  { id: 22, authorHandle: 'big_shagga_94',  text: "tried to pay self checkout with my library card. it accepted it.",                                      ageMin: 1300, initialLikes: 12847,  initialReposts: 2104,  initialReplies: 891 },
  { id: 23, authorHandle: 'shaggas_mate',   text: "manager just sent 'reply all' to a chain that started in 2017. there are 47 people on it. only 4 still work here.",  ageMin: 1500, initialLikes: 14728, initialReposts: 4128, initialReplies: 412 },
  { id: 24, authorHandle: 'auntie_linda',   text: "FWD: FWD: FWD: FWD: this is too good not to share!! love auntie linda 💕💕💕",                            ageMin: 1700, initialLikes: 47,     initialReposts: 234,   initialReplies: 89 },
  { id: 25, authorHandle: 'concerned_mum',  text: "call me when you get a chance",                                                                          ageMin: 1900, initialLikes: 234,    initialReposts: 12,    initialReplies: 891 },
  { id: 26, authorHandle: 'shaggacouncil',  text: "is a hot dog a sandwich. answer carefully.",                                                             ageMin: 2100, initialLikes: 89724,  initialReposts: 14728, initialReplies: 12047 },
  { id: 27, authorHandle: 'phil_drives',    text: "discovered my car has 'sport mode'. have not driven in any other mode since 2019.",                     ageMin: 2400, initialLikes: 4128,   initialReposts: 412,   initialReplies: 234 },
  { id: 28, authorHandle: 'tech_helpline',  text: "BREAKING: 'have you tried turning it off and on again' has now resolved 89% of all known issues. study peer-reviewed.",  ageMin: 3600, initialLikes: 47281, initialReposts: 8472, initialReplies: 1247 },
  { id: 29, authorHandle: 'margaret_90',    text: "just liked my own photo from 2007 by accident. delete how. love nan",                                  ageMin: 4500, initialLikes: 12847,  initialReposts: 2104,  initialReplies: 891 },
  { id: 30, authorHandle: 'big_shagga_94',  text: "left my phone in the fridge for 3 hours. battery now full. cold to the touch. science.",               ageMin: 7200, initialLikes: 8472,   initialReposts: 1247,  initialReplies: 412 },
];

const TRENDING = [
  { topic: 'Phils Car',          count: '47k posts' },
  { topic: 'Margaret 90',        count: '14k posts' },
  { topic: 'Reply All Disaster', count: '8.9k posts' },
  { topic: 'Dad Browser Tabs',   count: '12k posts' },
  { topic: 'Just Said K',        count: '128k posts' },
  { topic: 'Mid-Aisle (the shop)',  count: '47k posts' },
];

// ---------- Helpers ----------
function fmtAge(min: number): string {
  if (min < 1) return 'now';
  if (min < 60) return `${min}m`;
  if (min < 60 * 24) return `${Math.floor(min / 60)}h`;
  if (min < 60 * 24 * 7) return `${Math.floor(min / (60 * 24))}d`;
  return `${Math.floor(min / (60 * 24 * 7))}w`;
}
function fmtCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`.replace('.0K', 'K');
  return String(n);
}

// ---------- localStorage helpers ----------
const STORAGE = {
  custom: 'shwitter-custom',
  liked: 'shwitter-liked',
  reposted: 'shwitter-reposted',
  bookmarks: 'shwitter-bookmarks',
  follows: 'shwitter-follows',
};

// ---------- Component ----------
export default function ShwitterBody() {
  const [view, setView] = useState<View>({ kind: 'feed' });
  const [composing, setComposing] = useState('');

  // Persisted state
  const [customShweets, setCustomShweets] = useState<Shweet[]>([]);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [reposted, setReposted] = useState<Set<number>>(new Set());
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [follows, setFollows] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const c = localStorage.getItem(STORAGE.custom);
      if (c) setCustomShweets(JSON.parse(c));
      const l = localStorage.getItem(STORAGE.liked);
      if (l) setLiked(new Set(JSON.parse(l)));
      const r = localStorage.getItem(STORAGE.reposted);
      if (r) setReposted(new Set(JSON.parse(r)));
      const b = localStorage.getItem(STORAGE.bookmarks);
      if (b) setBookmarks(new Set(JSON.parse(b)));
      const f = localStorage.getItem(STORAGE.follows);
      if (f) setFollows(new Set(JSON.parse(f)));
    } catch {}
  }, []);

  useEffect(() => { try { localStorage.setItem(STORAGE.custom, JSON.stringify(customShweets)); } catch {} }, [customShweets]);
  useEffect(() => { try { localStorage.setItem(STORAGE.liked, JSON.stringify(Array.from(liked))); } catch {} }, [liked]);
  useEffect(() => { try { localStorage.setItem(STORAGE.reposted, JSON.stringify(Array.from(reposted))); } catch {} }, [reposted]);
  useEffect(() => { try { localStorage.setItem(STORAGE.bookmarks, JSON.stringify(Array.from(bookmarks))); } catch {} }, [bookmarks]);
  useEffect(() => { try { localStorage.setItem(STORAGE.follows, JSON.stringify(Array.from(follows))); } catch {} }, [follows]);

  const allShweets = useMemo(() => [...customShweets, ...INITIAL_SHWEETS], [customShweets]);

  const findAuthor = (handle: string): Author => {
    if (handle === 'you') {
      return { handle: 'you', name: 'You', avatar: '🌍', color: '#0066cc', bio: 'a top shagga.', location: 'right here' };
    }
    return AUTHORS.find((a) => a.handle === handle) ?? AUTHORS[0];
  };

  // Actions
  const postShweet = (text: string, parentId?: number) => {
    const t = text.trim();
    if (!t) return;
    const id = Date.now();
    const ns: Shweet = {
      id,
      authorHandle: 'you',
      text: t,
      ageMin: 0,
      parentId,
      initialLikes: 0,
      initialReposts: 0,
      initialReplies: 0,
    };
    setCustomShweets((cs) => [ns, ...cs]);
    return id;
  };

  const toggleLike     = (id: number) => setLiked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleRepost   = (id: number) => setReposted((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleBookmark = (id: number) => setBookmarks((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleFollow   = (h: string) => setFollows((s) => { const n = new Set(s); n.has(h) ? n.delete(h) : n.add(h); return n; });

  const deleteShweet = (id: number) => setCustomShweets((cs) => cs.filter((s) => s.id !== id));

  // Filtered lists
  const feedShweets = useMemo(() => allShweets.filter((s) => !s.parentId), [allShweets]);
  const repliesOf = (id: number) => allShweets.filter((s) => s.parentId === id);

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="shw2-block">
        {/* Sidebar */}
        <div className="shw2-sidebar">
          <button className="shw2-logo" onClick={() => setView({ kind: 'feed' })} onMouseDown={(e) => e.stopPropagation()}>
            <ShwitterIcon size={24} /> <span>Shwitter</span>
          </button>
          <button className={`shw2-nav${view.kind === 'feed' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'feed' })} onMouseDown={(e) => e.stopPropagation()}>⌂ Home</button>
          <button className={`shw2-nav${view.kind === 'explore' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'explore' })} onMouseDown={(e) => e.stopPropagation()}>⌕ Explore</button>
          <button className={`shw2-nav${view.kind === 'notifications' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'notifications' })} onMouseDown={(e) => e.stopPropagation()}>🔔 Notifications</button>
          <button className={`shw2-nav${view.kind === 'bookmarks' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'bookmarks' })} onMouseDown={(e) => e.stopPropagation()}>🔖 Bookmarks</button>
          <button className={`shw2-nav${view.kind === 'profile' && view.handle === 'you' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'profile', handle: 'you' })} onMouseDown={(e) => e.stopPropagation()}>👤 Profile</button>
          <button
            className="shw2-shweet-btn"
            onClick={() => {
              const t = prompt("What's cookin?");
              if (t && t.trim()) postShweet(t.trim());
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >Shweet</button>
          <div className="shw2-me">
            <div className="shw2-avatar" style={{ background: '#0066cc' }}>🌍</div>
            <div>
              <div className="shw2-me-name">You</div>
              <div className="shw2-me-handle">@you</div>
            </div>
          </div>
        </div>

        {/* Main column */}
        <div className="shw2-main">
          {view.kind === 'feed' && (
            <FeedView
              shweets={feedShweets}
              composing={composing} setComposing={setComposing}
              onPost={() => { postShweet(composing); setComposing(''); }}
              onShweetClick={(id) => setView({ kind: 'thread', id })}
              onAuthorClick={(h) => setView({ kind: 'profile', handle: h })}
              liked={liked} reposted={reposted} bookmarks={bookmarks}
              onLike={toggleLike} onRepost={toggleRepost} onBookmark={toggleBookmark}
              findAuthor={findAuthor}
              onDelete={deleteShweet}
              repliesOf={repliesOf}
            />
          )}
          {view.kind === 'thread' && (() => {
            const root = allShweets.find((s) => s.id === view.id);
            if (!root) return <div className="shw2-empty">Shweet not found.</div>;
            const replies = repliesOf(view.id);
            return <ThreadView
              root={root} replies={replies}
              onBack={() => setView({ kind: 'feed' })}
              onAuthorClick={(h) => setView({ kind: 'profile', handle: h })}
              onShweetClick={(id) => setView({ kind: 'thread', id })}
              onPostReply={(text) => postShweet(text, view.id)}
              liked={liked} reposted={reposted} bookmarks={bookmarks}
              onLike={toggleLike} onRepost={toggleRepost} onBookmark={toggleBookmark}
              findAuthor={findAuthor}
              onDelete={deleteShweet}
            />;
          })()}
          {view.kind === 'profile' && (
            <ProfileView
              author={findAuthor(view.handle)}
              shweets={allShweets.filter((s) => s.authorHandle === view.handle && !s.parentId)}
              replies={allShweets.filter((s) => s.authorHandle === view.handle && s.parentId)}
              onBack={() => setView({ kind: 'feed' })}
              onShweetClick={(id) => setView({ kind: 'thread', id })}
              onAuthorClick={(h) => setView({ kind: 'profile', handle: h })}
              isFollowing={follows.has(view.handle)}
              onToggleFollow={() => toggleFollow(view.handle)}
              isMe={view.handle === 'you'}
              liked={liked} reposted={reposted} bookmarks={bookmarks}
              onLike={toggleLike} onRepost={toggleRepost} onBookmark={toggleBookmark}
              findAuthor={findAuthor} repliesOf={repliesOf}
              onDelete={deleteShweet}
            />
          )}
          {view.kind === 'explore' && (
            <ExploreView
              trending={TRENDING}
              authors={AUTHORS}
              onAuthorClick={(h) => setView({ kind: 'profile', handle: h })}
              follows={follows}
              onToggleFollow={toggleFollow}
            />
          )}
          {view.kind === 'notifications' && (
            <NotificationsView />
          )}
          {view.kind === 'bookmarks' && (
            <FeedView
              shweets={allShweets.filter((s) => bookmarks.has(s.id) && !s.parentId)}
              composing="" setComposing={() => {}}
              onPost={() => {}}
              hideCompose
              onShweetClick={(id) => setView({ kind: 'thread', id })}
              onAuthorClick={(h) => setView({ kind: 'profile', handle: h })}
              liked={liked} reposted={reposted} bookmarks={bookmarks}
              onLike={toggleLike} onRepost={toggleRepost} onBookmark={toggleBookmark}
              findAuthor={findAuthor}
              onDelete={deleteShweet}
              repliesOf={repliesOf}
              emptyMsg="No bookmarks yet. Hit the 🔖 on any shweet to save it."
            />
          )}
        </div>

        {/* Right rail */}
        <div className="shw2-rail">
          <div className="shw2-trending">
            <div className="shw2-rail-title">Trending in shagga world</div>
            {TRENDING.map((t) => (
              <div key={t.topic} className="shw2-trending-row">
                <div className="shw2-trending-topic">#{t.topic.replaceAll(' ', '')}</div>
                <div className="shw2-trending-count">{t.count}</div>
              </div>
            ))}
          </div>
          <div className="shw2-suggest">
            <div className="shw2-rail-title">Who to follow</div>
            {AUTHORS.slice(0, 4).map((a) => (
              <div key={a.handle} className="shw2-suggest-row">
                <button className="shw2-avatar" style={{ background: a.color }}
                  onClick={() => setView({ kind: 'profile', handle: a.handle })}
                  onMouseDown={(e) => e.stopPropagation()}>{a.avatar}</button>
                <div className="shw2-suggest-info">
                  <button className="shw2-suggest-name"
                    onClick={() => setView({ kind: 'profile', handle: a.handle })}
                    onMouseDown={(e) => e.stopPropagation()}>{a.name}</button>
                  <div className="shw2-suggest-handle">@{a.handle}</div>
                </div>
                <button
                  className={`shw2-follow-btn${follows.has(a.handle) ? ' following' : ''}`}
                  onClick={() => toggleFollow(a.handle)}
                  onMouseDown={(e) => e.stopPropagation()}
                >{follows.has(a.handle) ? 'Following' : 'Follow'}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Feed View ----------
interface FeedViewProps {
  shweets: Shweet[];
  composing: string;
  setComposing: (s: string) => void;
  onPost: () => void;
  hideCompose?: boolean;
  onShweetClick: (id: number) => void;
  onAuthorClick: (handle: string) => void;
  liked: Set<number>; reposted: Set<number>; bookmarks: Set<number>;
  onLike: (id: number) => void;
  onRepost: (id: number) => void;
  onBookmark: (id: number) => void;
  findAuthor: (h: string) => Author;
  onDelete: (id: number) => void;
  repliesOf: (id: number) => Shweet[];
  emptyMsg?: string;
}

function FeedView({ shweets, composing, setComposing, onPost, hideCompose, onShweetClick, onAuthorClick, liked, reposted, bookmarks, onLike, onRepost, onBookmark, findAuthor, onDelete, repliesOf, emptyMsg }: FeedViewProps) {
  return (
    <>
      <div className="shw2-tabs">
        <span className="shw2-tab active">For You</span>
        <span className="shw2-tab">Following</span>
      </div>
      {!hideCompose && (
        <div className="shw2-compose">
          <div className="shw2-avatar" style={{ background: '#0066cc' }}>🌍</div>
          <div className="shw2-compose-area">
            <textarea
              placeholder="What's cookin?"
              value={composing}
              onChange={(e) => setComposing(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              rows={2}
            />
            <div className="shw2-compose-row">
              <span className="shw2-compose-counter">{280 - composing.length}</span>
              <button
                className="shw2-shweet-btn shw2-shweet-btn-small"
                disabled={!composing.trim() || composing.length > 280}
                onClick={onPost}
                onMouseDown={(e) => e.stopPropagation()}
              >Shweet</button>
            </div>
          </div>
        </div>
      )}
      {shweets.length === 0 && emptyMsg && (
        <div className="shw2-empty">{emptyMsg}</div>
      )}
      {shweets.map((s) => (
        <ShweetCard
          key={s.id} s={s} author={findAuthor(s.authorHandle)}
          onClick={() => onShweetClick(s.id)}
          onAuthorClick={onAuthorClick}
          liked={liked.has(s.id)} reposted={reposted.has(s.id)} bookmarked={bookmarks.has(s.id)}
          onLike={() => onLike(s.id)} onRepost={() => onRepost(s.id)} onBookmark={() => onBookmark(s.id)}
          onDelete={s.authorHandle === 'you' ? () => onDelete(s.id) : undefined}
          replyCount={repliesOf(s.id).length + s.initialReplies}
        />
      ))}
    </>
  );
}

// ---------- Shweet Card ----------
interface ShweetCardProps {
  s: Shweet;
  author: Author;
  onClick: () => void;
  onAuthorClick: (handle: string) => void;
  liked: boolean; reposted: boolean; bookmarked: boolean;
  onLike: () => void; onRepost: () => void; onBookmark: () => void;
  onDelete?: () => void;
  replyCount: number;
}

function ShweetCard({ s, author, onClick, onAuthorClick, liked, reposted, bookmarked, onLike, onRepost, onBookmark, onDelete, replyCount }: ShweetCardProps) {
  const likeDelta = liked ? 1 : 0;
  const repostDelta = reposted ? 1 : 0;
  return (
    <div className="shw2-card" onClick={onClick} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
      <button className="shw2-avatar shw2-card-avatar" style={{ background: author.color }}
        onClick={(e) => { e.stopPropagation(); onAuthorClick(author.handle); }}>{author.avatar}</button>
      <div className="shw2-card-body">
        <div className="shw2-card-head">
          <button className="shw2-card-name" onClick={(e) => { e.stopPropagation(); onAuthorClick(author.handle); }}>
            {author.name}{author.verified && <span className="shw2-verified" title="verified shagga">✓</span>}
          </button>
          <span className="shw2-card-handle">@{author.handle} · {fmtAge(s.ageMin)}</span>
          {onDelete && (
            <button className="shw2-card-delete" onClick={(e) => { e.stopPropagation(); onDelete(); }} title="Delete">⋯</button>
          )}
        </div>
        <div className="shw2-card-text">{s.text}</div>
        <div className="shw2-card-actions">
          <span className="shw2-action">💬 {fmtCount(replyCount)}</span>
          <button className={`shw2-action shw2-repost${reposted ? ' on' : ''}`}
            onClick={(e) => { e.stopPropagation(); onRepost(); }}>↻ {fmtCount(s.initialReposts + repostDelta)}</button>
          <button className={`shw2-action shw2-like${liked ? ' on' : ''}`}
            onClick={(e) => { e.stopPropagation(); onLike(); }}>{liked ? '❤' : '♡'} {fmtCount(s.initialLikes + likeDelta)}</button>
          <button className={`shw2-action shw2-bookmark${bookmarked ? ' on' : ''}`}
            onClick={(e) => { e.stopPropagation(); onBookmark(); }}>🔖</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Thread View ----------
interface ThreadViewProps {
  root: Shweet;
  replies: Shweet[];
  onBack: () => void;
  onAuthorClick: (handle: string) => void;
  onShweetClick: (id: number) => void;
  onPostReply: (text: string) => void;
  liked: Set<number>; reposted: Set<number>; bookmarks: Set<number>;
  onLike: (id: number) => void;
  onRepost: (id: number) => void;
  onBookmark: (id: number) => void;
  findAuthor: (h: string) => Author;
  onDelete: (id: number) => void;
}

function ThreadView({ root, replies, onBack, onAuthorClick, onShweetClick, onPostReply, liked, reposted, bookmarks, onLike, onRepost, onBookmark, findAuthor, onDelete }: ThreadViewProps) {
  const [reply, setReply] = useState('');
  const author = findAuthor(root.authorHandle);
  return (
    <>
      <div className="shw2-tabs">
        <button className="shw2-back" onClick={onBack} onMouseDown={(e) => e.stopPropagation()}>← Back</button>
        <span className="shw2-tab" style={{ borderBottom: 'none' }}>Thread</span>
      </div>
      <div className="shw2-thread-root">
        <div className="shw2-thread-head">
          <button className="shw2-avatar" style={{ background: author.color, width: 48, height: 48, fontSize: 22 }}
            onClick={() => onAuthorClick(author.handle)}>{author.avatar}</button>
          <div>
            <button className="shw2-card-name" onClick={() => onAuthorClick(author.handle)}>
              {author.name}{author.verified && <span className="shw2-verified">✓</span>}
            </button>
            <div className="shw2-card-handle">@{author.handle}</div>
          </div>
        </div>
        <div className="shw2-thread-text">{root.text}</div>
        <div className="shw2-thread-time">{fmtAge(root.ageMin)} ago</div>
        <div className="shw2-thread-stats">
          <span><strong>{fmtCount(root.initialReposts + (reposted.has(root.id) ? 1 : 0))}</strong> Reposts</span>
          <span><strong>{fmtCount(root.initialLikes + (liked.has(root.id) ? 1 : 0))}</strong> Likes</span>
        </div>
        <div className="shw2-card-actions" style={{ borderTop: '1px solid #2f3336', borderBottom: '1px solid #2f3336', padding: '8px 0' }}>
          <span className="shw2-action">💬 {replies.length + root.initialReplies}</span>
          <button className={`shw2-action shw2-repost${reposted.has(root.id) ? ' on' : ''}`}
            onClick={() => onRepost(root.id)}>↻</button>
          <button className={`shw2-action shw2-like${liked.has(root.id) ? ' on' : ''}`}
            onClick={() => onLike(root.id)}>{liked.has(root.id) ? '❤' : '♡'}</button>
          <button className={`shw2-action shw2-bookmark${bookmarks.has(root.id) ? ' on' : ''}`}
            onClick={() => onBookmark(root.id)}>🔖</button>
        </div>
      </div>
      <div className="shw2-compose">
        <div className="shw2-avatar" style={{ background: '#0066cc' }}>🌍</div>
        <div className="shw2-compose-area">
          <textarea
            placeholder="Post your reply"
            value={reply} onChange={(e) => setReply(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            rows={1}
          />
          <div className="shw2-compose-row">
            <span></span>
            <button
              className="shw2-shweet-btn shw2-shweet-btn-small"
              disabled={!reply.trim()}
              onClick={() => { onPostReply(reply); setReply(''); }}
              onMouseDown={(e) => e.stopPropagation()}
            >Reply</button>
          </div>
        </div>
      </div>
      {replies.map((r) => (
        <ShweetCard
          key={r.id} s={r} author={findAuthor(r.authorHandle)}
          onClick={() => onShweetClick(r.id)}
          onAuthorClick={onAuthorClick}
          liked={liked.has(r.id)} reposted={reposted.has(r.id)} bookmarked={bookmarks.has(r.id)}
          onLike={() => onLike(r.id)} onRepost={() => onRepost(r.id)} onBookmark={() => onBookmark(r.id)}
          onDelete={r.authorHandle === 'you' ? () => onDelete(r.id) : undefined}
          replyCount={r.initialReplies}
        />
      ))}
    </>
  );
}

// ---------- Profile View ----------
interface ProfileViewProps {
  author: Author;
  shweets: Shweet[];
  replies: Shweet[];
  onBack: () => void;
  onShweetClick: (id: number) => void;
  onAuthorClick: (handle: string) => void;
  isFollowing: boolean;
  onToggleFollow: () => void;
  isMe: boolean;
  liked: Set<number>; reposted: Set<number>; bookmarks: Set<number>;
  onLike: (id: number) => void;
  onRepost: (id: number) => void;
  onBookmark: (id: number) => void;
  findAuthor: (h: string) => Author;
  repliesOf: (id: number) => Shweet[];
  onDelete: (id: number) => void;
}

function ProfileView({ author, shweets, replies, onBack, onShweetClick, onAuthorClick, isFollowing, onToggleFollow, isMe, liked, reposted, bookmarks, onLike, onRepost, onBookmark, findAuthor, repliesOf, onDelete }: ProfileViewProps) {
  const [tab, setTab] = useState<'shweets' | 'replies'>('shweets');
  return (
    <>
      <div className="shw2-tabs">
        <button className="shw2-back" onClick={onBack} onMouseDown={(e) => e.stopPropagation()}>← Back</button>
        <span className="shw2-tab" style={{ borderBottom: 'none' }}>{author.name}</span>
      </div>
      <div className="shw2-profile-banner" style={{ background: `linear-gradient(135deg, ${author.color}, #000)` }} />
      <div className="shw2-profile-header">
        <div className="shw2-avatar shw2-profile-avatar" style={{ background: author.color }}>{author.avatar}</div>
        <div className="shw2-profile-actions">
          {!isMe && (
            <button
              className={`shw2-follow-btn${isFollowing ? ' following' : ''}`}
              onClick={onToggleFollow}
              onMouseDown={(e) => e.stopPropagation()}
            >{isFollowing ? 'Following' : 'Follow'}</button>
          )}
        </div>
      </div>
      <div className="shw2-profile-info">
        <div className="shw2-profile-name">
          {author.name}
          {author.verified && <span className="shw2-verified" style={{ marginLeft: 4 }}>✓</span>}
        </div>
        <div className="shw2-profile-handle">@{author.handle}</div>
        <div className="shw2-profile-bio">{author.bio}</div>
        <div className="shw2-profile-meta">📍 {author.location}</div>
        <div className="shw2-profile-stats">
          <span><strong>{Math.floor(Math.random() * 900) + 100}</strong> Following</span>
          <span><strong>{fmtCount(Math.floor(Math.random() * 500_000) + 1000)}</strong> Followers</span>
        </div>
      </div>
      <div className="shw2-profile-tabs">
        <button className={`shw2-profile-tab${tab === 'shweets' ? ' active' : ''}`}
          onClick={() => setTab('shweets')} onMouseDown={(e) => e.stopPropagation()}>Shweets</button>
        <button className={`shw2-profile-tab${tab === 'replies' ? ' active' : ''}`}
          onClick={() => setTab('replies')} onMouseDown={(e) => e.stopPropagation()}>Replies</button>
      </div>
      {(tab === 'shweets' ? shweets : replies).length === 0 && (
        <div className="shw2-empty">Nothing here yet.</div>
      )}
      {(tab === 'shweets' ? shweets : replies).map((s) => (
        <ShweetCard
          key={s.id} s={s} author={findAuthor(s.authorHandle)}
          onClick={() => onShweetClick(s.id)}
          onAuthorClick={onAuthorClick}
          liked={liked.has(s.id)} reposted={reposted.has(s.id)} bookmarked={bookmarks.has(s.id)}
          onLike={() => onLike(s.id)} onRepost={() => onRepost(s.id)} onBookmark={() => onBookmark(s.id)}
          onDelete={s.authorHandle === 'you' ? () => onDelete(s.id) : undefined}
          replyCount={repliesOf(s.id).length + s.initialReplies}
        />
      ))}
    </>
  );
}

// ---------- Explore ----------
function ExploreView({ trending, authors, onAuthorClick, follows, onToggleFollow }: {
  trending: typeof TRENDING;
  authors: Author[];
  onAuthorClick: (h: string) => void;
  follows: Set<string>;
  onToggleFollow: (h: string) => void;
}) {
  return (
    <>
      <div className="shw2-tabs"><span className="shw2-tab active">Explore</span></div>
      <h2 className="shw2-section-title">Trending</h2>
      {trending.map((t, i) => (
        <div key={i} className="shw2-explore-row">
          <div className="shw2-explore-tag">Trending #{i + 1}</div>
          <div className="shw2-explore-topic">#{t.topic.replaceAll(' ', '')}</div>
          <div className="shw2-explore-count">{t.count}</div>
        </div>
      ))}
      <h2 className="shw2-section-title">Discover Shaggas</h2>
      {authors.map((a) => (
        <div key={a.handle} className="shw2-suggest-row" style={{ padding: '12px 16px', borderBottom: '1px solid #2f3336' }}>
          <button className="shw2-avatar" style={{ background: a.color }}
            onClick={() => onAuthorClick(a.handle)} onMouseDown={(e) => e.stopPropagation()}>{a.avatar}</button>
          <div className="shw2-suggest-info">
            <button className="shw2-suggest-name"
              onClick={() => onAuthorClick(a.handle)} onMouseDown={(e) => e.stopPropagation()}>
              {a.name}{a.verified && <span className="shw2-verified">✓</span>}
            </button>
            <div className="shw2-suggest-handle">@{a.handle}</div>
            <div className="shw2-suggest-bio">{a.bio}</div>
          </div>
          <button
            className={`shw2-follow-btn${follows.has(a.handle) ? ' following' : ''}`}
            onClick={() => onToggleFollow(a.handle)}
            onMouseDown={(e) => e.stopPropagation()}
          >{follows.has(a.handle) ? 'Following' : 'Follow'}</button>
        </div>
      ))}
    </>
  );
}

// ---------- Notifications ----------
function NotificationsView() {
  const items = [
    { ic: '❤', text: 'bigshagga94 liked your shweet', time: '2m', color: '#f91880' },
    { ic: '↻', text: 'shaggacouncil reposted you', time: '14m', color: '#00ba7c' },
    { ic: '👤', text: 'Bazza followed you', time: '1h', color: '#1d9bf0' },
    { ic: '💬', text: 'shazza_baz replied: "real"', time: '3h', color: '#1d9bf0' },
    { ic: '❤', text: 'top_shagga_uk and 47 others liked your shweet', time: '5h', color: '#f91880' },
    { ic: '👤', text: 'goonlord3000 followed you', time: '1d', color: '#1d9bf0' },
  ];
  return (
    <>
      <div className="shw2-tabs"><span className="shw2-tab active">All</span><span className="shw2-tab">Mentions</span></div>
      {items.map((it, i) => (
        <div key={i} className="shw2-notif">
          <span className="shw2-notif-icon" style={{ color: it.color }}>{it.ic}</span>
          <div>
            <div>{it.text}</div>
            <div className="shw2-notif-time">{it.time} ago</div>
          </div>
        </div>
      ))}
    </>
  );
}
