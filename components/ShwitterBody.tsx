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
  { handle: 'bigshagga94',     name: 'Big Shagga',         avatar: '🤠', color: '#1976d2', bio: 'top shagga since 2003. cooked. mostly.',         location: 'somewhere cooked',     verified: true },
  { handle: 'snagonionsdebate', name: 'Bunnings Snag Truth', avatar: '🌭', color: '#ef6c00', bio: 'PSA acct. onions UNDER. always.',                location: 'every Bunnings',       verified: true },
  { handle: 'swoop_zone_alert', name: 'maggie_aware',       avatar: '🐦‍⬛', color: '#1c1c1c', bio: 'tracking swoop incidents nationally.',           location: 'spring',                                  },
  { handle: 'nanofashagga',    name: "shagga's nan",        avatar: '👵', color: '#c2185b', bio: 'please call me. ❤️',                              location: 'home',                                  },
  { handle: 'goonlord3000',    name: 'Goon Lord',           avatar: '🍷', color: '#7b1fa2', bio: 'rules of the back fence. bag wrangler.',         location: 'the hills hoist',                       },
  { handle: 'bazza_official',  name: 'Bazza',               avatar: '🦘', color: '#2e7d32', bio: 'yeah nah yeah',                                  location: 'the back paddock',     verified: true },
  { handle: 'darryl_47',       name: 'wild card daz',       avatar: '🥩', color: '#5d4037', bio: 'looking for my thongs',                          location: 'Daves backyard',                        },
  { handle: 'shaggacouncil',   name: 'Shagga Council',      avatar: '🌍', color: '#0e7e7e', bio: 'official global shagga council. unofficial.',    location: 'everywhere',           verified: true },
  { handle: 'shaggacooks',     name: 'Cooking with Shagga', avatar: '🍳', color: '#ff8f00', bio: 'i can ruin any meal. trust me.',                 location: 'a kitchen',                             },
  { handle: 'cooked_dave',     name: 'Cooked Dave',         avatar: '🌊', color: '#00838f', bio: 'lukewarm at the dam. always.',                    location: 'the dam',                               },
  { handle: 'shazza_baz',      name: 'Shazza',              avatar: '💅', color: '#d81b60', bio: 'won goon of fortune 4 weeks running',            location: 'home depot',                            },
  { handle: 'ranga_tim',       name: 'ranga tim',           avatar: '👨', color: '#bf360c', bio: 'just a regular shagga',                          location: 'idk man',                               },
  { handle: 'top_shagga_uk',   name: 'TopShaggaUK',         avatar: '☕', color: '#3949ab', bio: 'tea before snag. fight me.',                     location: 'london',               verified: true },
  { handle: 'shagga_tokyo',    name: 'shagga_tokyo',        avatar: '🍣', color: '#d32f2f', bio: 'top shagga of the rising sun.',                  location: 'tokyo',                                 },
];

// ---------- Initial shweets ----------
const INITIAL_SHWEETS: Shweet[] = [
  { id: 1,  authorHandle: 'bigshagga94',    text: 'just put a snag on the barbie at 6:47am cause why not. cooked behaviour. send help', ageMin: 12, initialLikes: 1247, initialReposts: 89,  initialReplies: 47 },
  { id: 2,  authorHandle: 'snagonionsdebate', text: "PSA: onions go UNDER the snag. anyone telling u otherwise is a fed. that's all", ageMin: 34, initialLikes: 89724, initialReposts: 12847, initialReplies: 4002 },
  { id: 3,  authorHandle: 'swoop_zone_alert', text: 'swooping season has begun. cyclists, prepare. helmets with zip ties or u perish', ageMin: 60, initialLikes: 47, initialReposts: 8, initialReplies: 2 },
  { id: 4,  authorHandle: 'nanofashagga',   text: "didn't see u at the bowls club on sunday. i'll tell ur mother. love nan x",      ageMin: 120, initialLikes: 8421, initialReposts: 412, initialReplies: 891 },
  { id: 5,  authorHandle: 'goonlord3000',    text: 'goon of fortune at the hills hoist tonight. byo washing peg. RTs welcome.',     ageMin: 180, initialLikes: 391,  initialReposts: 28, initialReplies: 14 },
  { id: 6,  authorHandle: 'bazza_official', text: 'yeah nah yeah',                                                                   ageMin: 300, initialLikes: 47982, initialReposts: 8213, initialReplies: 1104 },
  { id: 7,  authorHandle: 'darryl_47',      text: 'anyone seen my thongs',                                                            ageMin: 360, initialLikes: 12, initialReposts: 1, initialReplies: 47 },
  { id: 8,  authorHandle: 'shaggacouncil',   text: 'breaking: pineapple on pizza is officially yes. settled. council adjourned.',     ageMin: 480, initialLikes: 89472, initialReposts: 22841, initialReplies: 12047 },
  { id: 9,  authorHandle: 'shaggacooks',    text: "today's experiment: putting cereal in soup. results: i am sad. cereal is not a soup.", ageMin: 540, initialLikes: 891, initialReposts: 47, initialReplies: 234 },
  { id: 10, authorHandle: 'cooked_dave',    text: "the dam is lukewarm. perfect temperature. confirmed.",                              ageMin: 600, initialLikes: 234, initialReposts: 12, initialReplies: 8 },
  { id: 11, authorHandle: 'shazza_baz',     text: "shaggalike if u peg ur own washing",                                                ageMin: 720, initialLikes: 4128, initialReposts: 612, initialReplies: 89 },
  { id: 12, authorHandle: 'ranga_tim',      text: "wait did everyone forget about me",                                                  ageMin: 800, initialLikes: 2, initialReposts: 0, initialReplies: 1 },
  { id: 13, authorHandle: 'top_shagga_uk',  text: "lukewarm shower or u are a coward. this is final.",                                  ageMin: 900, initialLikes: 12847, initialReposts: 4002, initialReplies: 2104 },
  { id: 14, authorHandle: 'shagga_tokyo',   text: 'very hot shower is correct. sorry uk shagga. you are wrong.',                       ageMin: 940, initialLikes: 47281, initialReposts: 8472, initialReplies: 3104, parentId: 13 },
  { id: 15, authorHandle: 'shaggacouncil',   text: "the council is reviewing the shower temperature debate. updates to follow.",       ageMin: 980, initialLikes: 891, initialReposts: 47, initialReplies: 12, parentId: 13 },
  { id: 16, authorHandle: 'bigshagga94',    text: "is a hot dog a sandwich. answer carefully. ur reputation is on the line.",          ageMin: 1100, initialLikes: 8472, initialReposts: 1247, initialReplies: 4127 },
  { id: 17, authorHandle: 'snagonionsdebate', text: "a hot dog is a TACO. fight me.",                                                  ageMin: 1130, initialLikes: 12047, initialReposts: 2841, initialReplies: 891, parentId: 16 },
  { id: 18, authorHandle: 'shaggacouncil',  text: "this is now a council matter.",                                                     ageMin: 1140, initialLikes: 234, initialReposts: 12, initialReplies: 4, parentId: 16 },
  { id: 19, authorHandle: 'goonlord3000',   text: "best snack of all time poll: 1) tea & biscuit 2) onigiri 3) snag 4) goon",          ageMin: 1500, initialLikes: 4128, initialReposts: 412, initialReplies: 891 },
  { id: 20, authorHandle: 'darryl_47',     text: "guys i found one of my thongs. just one tho. send the other.",                       ageMin: 1800, initialLikes: 47, initialReposts: 12, initialReplies: 8 },
  { id: 21, authorHandle: 'bazza_official', text: "yeah nah",                                                                          ageMin: 2100, initialLikes: 14728, initialReposts: 2104, initialReplies: 412 },
  { id: 22, authorHandle: 'nanofashagga',   text: "ur uncle david is on facebook again. someone go check on him pls",                  ageMin: 2400, initialLikes: 891, initialReposts: 47, initialReplies: 234 },
  { id: 23, authorHandle: 'cooked_dave',    text: "got cooked at the dam. as is tradition.",                                            ageMin: 3000, initialLikes: 412, initialReposts: 47, initialReplies: 23 },
  { id: 24, authorHandle: 'shazza_baz',     text: "girls who say yeah nah are simply more interesting",                                ageMin: 3600, initialLikes: 8472, initialReposts: 1247, initialReplies: 412 },
  { id: 25, authorHandle: 'shaggacouncil',  text: "shower temperature debate verdict: lukewarm wins by 3 votes. dispute filed.",       ageMin: 4200, initialLikes: 47281, initialReposts: 12047, initialReplies: 8472 },
  { id: 26, authorHandle: 'shaggacooks',    text: "fried an egg today. didnt go great. burned the kitchen. otherwise good.",          ageMin: 5400, initialLikes: 234, initialReposts: 12, initialReplies: 89 },
  { id: 27, authorHandle: 'top_shagga_uk',  text: "tea. snag. tea. snag. that's the routine. keeps me grounded.",                       ageMin: 7200, initialLikes: 4128, initialReposts: 412, initialReplies: 234 },
  { id: 28, authorHandle: 'bigshagga94',    text: "the magpies are getting bolder. one stole my snag straight off the barbie.",        ageMin: 9000, initialLikes: 891, initialReposts: 47, initialReplies: 234 },
  { id: 29, authorHandle: 'shagga_tokyo',   text: "onigiri > all snacks. this is final.",                                              ageMin: 10080, initialLikes: 12847, initialReposts: 4002, initialReplies: 891 },
  { id: 30, authorHandle: 'goonlord3000',   text: "if you've never played goon of fortune you havent lived",                            ageMin: 14400, initialLikes: 1247, initialReposts: 89, initialReplies: 234 },
];

const TRENDING = [
  { topic: 'Shower Temperature', count: '47k posts' },
  { topic: 'Onions Under',       count: '128k posts' },
  { topic: 'Magpie Season',      count: '12k posts' },
  { topic: 'Goon of Fortune',    count: '4.7k posts' },
  { topic: 'Top Shagga 2024',    count: '8.9k posts' },
  { topic: 'cooked',             count: '1.2M posts' },
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
