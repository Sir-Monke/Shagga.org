'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { videoSrc } from './imageManifest';

// ---------- Data ----------
interface Channel {
  id: string;
  name: string;
  handle: string;
  subs: string;
  emoji: string;
  color: string;
}

interface Video {
  id: number;
  title: string;
  channelId: string;
  views: number;          // actual number so we can sort/format
  ageDays: number;
  durationSec: number;
  thumbBg: string;
  emoji: string;
  description: string;
  tags: string[];
}

const CHANNELS: Channel[] = [
  { id: 'outback', name: 'OUTBACK MAYHEM', handle: '@outbackmayhem', subs: '4.2M', emoji: '🦘', color: '#1c1c1c' },
  { id: 'snagtv',  name: 'SnaggasTV',     handle: '@snaggastv',   subs: '892k', emoji: '🔨', color: '#f00' },
  { id: 'topsh',   name: 'Top Shagga',     handle: '@topshagga',    subs: '2.1M', emoji: '🤠', color: '#00a86b' },
  { id: 'goonl',   name: 'goonlord3000',   handle: '@goonlord3000', subs: '47k',  emoji: '🍷', color: '#c4006c' },
  { id: 'staint',  name: 'shaggatainment', handle: '@shaggatainment', subs: '14M', emoji: '🎬', color: '#fff200' },
  { id: 'reacts',  name: 'shagga reacts',  handle: '@shaggareacts', subs: '128k', emoji: '👵', color: '#ff3b6b' },
  { id: 'cooked',  name: 'cooked content', handle: '@cookedcontent', subs: '600', emoji: '🔥', color: '#2f4f4f' },
  { id: 'sleepy',  name: 'sleepy shagga',  handle: '@sleepyshagga', subs: '47',   emoji: '😴', color: '#4a148c' },
  { id: 'global',  name: 'Shagga Council', handle: '@shaggacouncil', subs: '8.9M', emoji: '🌍', color: '#0066cc' },
  { id: 'cooks',   name: 'Cooking with Shagga', handle: '@shaggacooks', subs: '1.4M', emoji: '🍳', color: '#ffa500' },
  { id: 'rossbk',  name: 'Ross Buckley',     handle: '@rossbuckley',   subs: '47.2M', emoji: '🕺', color: '#9c27b0' },
];

const VIDEOS: Video[] = [
  { id: 1,  title: '10 hour magpie attack compilation (you wont believe #7)',          channelId: 'outback', views: 4_700_000, ageDays: 3,    durationSec: 36000, thumbBg: 'linear-gradient(135deg, #1c1c1c 0%, #5a5a5a 100%)', emoji: '🐦‍⬛', description: 'every magpie attack ever recorded back to back. uncut. cinematic masterpiece.', tags: ['compilation', 'mayhem'] },
  { id: 2,  title: 'how to put a snag on a sandwich (CORRECT WAY)',                      channelId: 'snagtv',  views: 892_000,   ageDays: 14,   durationSec: 862,   thumbBg: 'linear-gradient(135deg, #f00 0%, #ff8c00 100%)',   emoji: '🌭', description: 'the definitive guide. onions UNDER. settled science. dispute me.', tags: ['food', 'tutorial'] },
  { id: 3,  title: 'I lived in a Snaggas for 24 hours (NOT clickbait!!)',                channelId: 'topsh',   views: 2_100_000, ageDays: 30,   durationSec: 1391,  thumbBg: 'linear-gradient(135deg, #00a86b 0%, #0066cc 100%)', emoji: '🔨', description: 'security found me at hour 23. worth it. one star.', tags: ['vlog', 'challenge'] },
  { id: 4,  title: 'goon of fortune RULES explained (kid friendly version)',              channelId: 'goonl',   views: 47_000,    ageDays: 150,  durationSec: 452,   thumbBg: 'linear-gradient(135deg, #c4006c 0%, #6c0040 100%)', emoji: '🍷', description: 'absolutely not kid friendly. clickbait. sorry mods.', tags: ['tutorial'] },
  { id: 5,  title: 'every aussie movie ever in 47 seconds',                               channelId: 'staint',  views: 14_000_000, ageDays: 1460, durationSec: 47,    thumbBg: 'linear-gradient(135deg, #fff200 0%, #ff7e2d 100%)', emoji: '🎬', description: 'speedrun.', tags: ['compilation'] },
  { id: 6,  title: 'reacting to my nan reacting to TikTok',                               channelId: 'reacts',  views: 128_000,   ageDays: 1,    durationSec: 728,   thumbBg: 'linear-gradient(135deg, #ff3b6b 0%, #6b1a8c 100%)', emoji: '👵', description: 'she does not get it. neither do i. quality content.', tags: ['reaction'] },
  { id: 7,  title: 'PUTTING THONGS IN THE MICROWAVE (DO NOT TRY)',                        channelId: 'cooked',  views: 600,       ageDays: 0,    durationSec: 252,   thumbBg: 'linear-gradient(135deg, #2f4f4f 0%, #696969 100%)', emoji: '🔥', description: 'do not try this. seriously the smoke alarm is still going.', tags: ['challenge', 'cooked'] },
  { id: 8,  title: 'asmr - reading shagga.txt for 4 hours',                               channelId: 'sleepy',  views: 47,        ageDays: 21,   durationSec: 14400, thumbBg: 'linear-gradient(135deg, #4a148c 0%, #1a237e 100%)', emoji: '😴', description: 'whispered. soothing. mostly nonsense.', tags: ['asmr'] },
  { id: 9,  title: 'we asked 100 shaggas: is cereal a soup?',                             channelId: 'global',  views: 3_400_000, ageDays: 7,    durationSec: 612,   thumbBg: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)', emoji: '🌍', description: 'final answer revealed at 9:47.', tags: ['debate'] },
  { id: 10, title: 'how to fry an egg perfectly (i lied i cant)',                         channelId: 'cooks',   views: 891_000,   ageDays: 5,    durationSec: 482,   thumbBg: 'linear-gradient(135deg, #ffa500 0%, #ff6b00 100%)', emoji: '🍳', description: 'the egg is fine. i am the problem.', tags: ['food'] },
  { id: 11, title: 'shower temperature: a definitive ranking',                            channelId: 'global',  views: 1_200_000, ageDays: 12,   durationSec: 354,   thumbBg: 'linear-gradient(135deg, #5392d6 0%, #b6dcff 100%)', emoji: '🚿', description: 'lukewarm wins. fight me in the comments.', tags: ['debate', 'lifestyle'] },
  { id: 12, title: 'BREAKING: shagga seen at snaggas (FOOTAGE)',                         channelId: 'outback', views: 247_000,   ageDays: 2,    durationSec: 142,   thumbBg: 'linear-gradient(135deg, #c40 0%, #802 100%)',       emoji: '🚨', description: 'witnesses say he was holding what appeared to be a snag.', tags: ['breaking'] },
  { id: 13, title: 'I tried to cook with only Snaggas ingredients',                      channelId: 'cooks',   views: 412_000,   ageDays: 18,   durationSec: 1102,  thumbBg: 'linear-gradient(135deg, #ffa500 0%, #f00 100%)',    emoji: '🍳', description: 'turns out the snags from the sausage sizzle slap.', tags: ['food', 'challenge'] },
  { id: 14, title: 'is a hot dog a sandwich? (the council decides)',                      channelId: 'global',  views: 5_700_000, ageDays: 60,   durationSec: 891,   thumbBg: 'linear-gradient(135deg, #ff6b00 0%, #c40 100%)',    emoji: '🌭', description: 'spoiler: nobody agrees. friendships were ended.', tags: ['debate'] },
  { id: 15, title: 'rating my mates BBQs (brutal honesty)',                                channelId: 'topsh',   views: 1_800_000, ageDays: 9,    durationSec: 1421,  thumbBg: 'linear-gradient(135deg, #00a86b 0%, #fff200 100%)', emoji: '🥩', description: 'dave got a 2/10. sorry dave.', tags: ['vlog', 'food'] },
  { id: 16, title: 'how long should u wait before texting back? (with experiments)',     channelId: 'reacts',  views: 891_000,   ageDays: 4,    durationSec: 542,   thumbBg: 'linear-gradient(135deg, #ff3b6b 0%, #ffa500 100%)', emoji: '📱', description: 'i tested 1min, 1hr, 1day, 1week, never. results below.', tags: ['lifestyle'] },
  { id: 17, title: 'PINEAPPLE ON PIZZA: the truth (dont @ me)',                            channelId: 'global',  views: 8_900_000, ageDays: 90,   durationSec: 723,   thumbBg: 'linear-gradient(135deg, #fff200 0%, #ff6b00 100%)', emoji: '🍕', description: 'yes. obviously yes. settled.', tags: ['debate', 'food'] },
  { id: 18, title: 'lofi shagga beats - to chill / cook a snag to',                       channelId: 'sleepy',  views: 124_000,   ageDays: 200,  durationSec: 7200,  thumbBg: 'linear-gradient(135deg, #ff7e5f 0%, #6b1a8c 100%)', emoji: '🎵', description: 'two hours. uninterrupted. sometimes a magpie chirps.', tags: ['music', 'asmr'] },
  { id: 19, title: 'my dad tries to use shaggatube (CHAOS)',                                channelId: 'reacts',  views: 234_000,   ageDays: 6,    durationSec: 612,   thumbBg: 'linear-gradient(135deg, #6b1a8c 0%, #1a237e 100%)', emoji: '👨', description: 'he hit upload by accident and now hes a creator.', tags: ['reaction'] },
  { id: 20, title: 'I followed a Snaggas sausage sizzle queue for 8 hours',              channelId: 'topsh',   views: 412_000,   ageDays: 11,   durationSec: 28800, thumbBg: 'linear-gradient(135deg, #f00 0%, #ffa500 100%)',    emoji: '🌭', description: 'the queue is a microcosm of society.', tags: ['vlog', 'documentary'] },

  // Ross Buckley channel videos
  { id: 21, title: 'i gave a man 10p and told him to buy a milkshake (HE CRIED)',         channelId: 'rossbk',  views: 47_200_000, ageDays: 1,    durationSec: 27,    thumbBg: 'linear-gradient(135deg, #9c27b0 0%, #6a1b9a 100%)', emoji: '🥤', description: 'shagga shagga shagga. see ya around shagga ✨', tags: ['shagga', 'kindness'] },
  { id: 22, title: 'unboxing my 10pk thongs (for me and the lads)',                        channelId: 'rossbk',  views: 14_700_000, ageDays: 4,    durationSec: 482,   thumbBg: 'linear-gradient(135deg, #ad1457 0%, #6a1b9a 100%)', emoji: '🩲', description: 'bulk buy. plenty of room. all welcome. shagga 💜', tags: ['unboxing', 'shagga'] },
  { id: 23, title: 'handing out business cards that just say "see ya around shagga"',     channelId: 'rossbk',  views: 8_900_000,  ageDays: 9,    durationSec: 691,   thumbBg: 'linear-gradient(135deg, #5e35b1 0%, #311b92 100%)', emoji: '🃏', description: 'no name. no number. just shagga. they work perfectly.', tags: ['shagga', 'lifestyle'] },
];

// ---------- Helpers ----------
function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}k views`;
  return `${n} views`;
}
function formatAge(d: number): string {
  if (d < 1)  return 'today';
  if (d < 2)  return '1 day ago';
  if (d < 7)  return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)} weeks ago`;
  if (d < 365) return `${Math.floor(d / 30)} months ago`;
  return `${Math.floor(d / 365)} years ago`;
}

// ---------- Mock comments per video ----------
const COMMENT_POOL = [
  { user: '@bigshagga94', text: 'first 🥇' },
  { user: '@nanofashagga', text: 'please call ur mother' },
  { user: '@cooked_dave', text: 'who is here in 2003 👀👀' },
  { user: '@maggie_aware', text: 'you missed a maggie at 4:47' },
  { user: '@goonlord3000', text: 'sponsored by goon? asking for a friend' },
  { user: '@TopShaggaUK', text: 'incredible. life changing.' },
  { user: '@shagga_tokyo', text: 'this is now my whole personality' },
  { user: '@nanofashagga', text: 'i still think you should call me' },
  { user: '@ShaggaParis', text: 'magnifique. truly cooked.' },
  { user: '@ranga_tim', text: 'the algorithm has me in chains' },
  { user: '@shazza_baz', text: 'why is this in my recommendations at 3am' },
];

function commentsForVideo(videoId: number) {
  // Deterministic-ish — same video gets same comments
  const start = videoId % COMMENT_POOL.length;
  return [
    COMMENT_POOL[start],
    COMMENT_POOL[(start + 3) % COMMENT_POOL.length],
    COMMENT_POOL[(start + 7) % COMMENT_POOL.length],
    COMMENT_POOL[(start + 1) % COMMENT_POOL.length],
  ];
}

// ---------- localStorage helpers ----------
const STORAGE = {
  subs: 'shaggatube-subs',
  watchLater: 'shaggatube-watchlater',
};
function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}
function saveSet(key: string, value: Set<string>) {
  try { localStorage.setItem(key, JSON.stringify(Array.from(value))); } catch {}
}

// ---------- Main component ----------
type View = 'home' | 'watch' | 'channel' | 'watchlater' | 'subscriptions';

export default function ShaggaTubeBody() {
  const [view, setView] = useState<View>('home');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Persisted state
  const [subs, setSubs] = useState<Set<string>>(new Set());
  const [watchLater, setWatchLater] = useState<Set<number>>(new Set());

  useEffect(() => {
    setSubs(loadSet(STORAGE.subs) as Set<string>);
    try {
      const raw = localStorage.getItem(STORAGE.watchLater);
      if (raw) setWatchLater(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const toggleSub = (channelId: string) => {
    setSubs((s) => {
      const next = new Set(s);
      if (next.has(channelId)) next.delete(channelId);
      else next.add(channelId);
      saveSet(STORAGE.subs, next);
      return next;
    });
  };
  const toggleWatchLater = (videoId: number) => {
    setWatchLater((w) => {
      const next = new Set(w);
      if (next.has(videoId)) next.delete(videoId);
      else next.add(videoId);
      try { localStorage.setItem(STORAGE.watchLater, JSON.stringify(Array.from(next))); } catch {}
      return next;
    });
  };

  // Filtered video list based on view
  const visibleVideos = useMemo(() => {
    let list = VIDEOS;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((v) => {
        const ch = CHANNELS.find((c) => c.id === v.channelId);
        return v.title.toLowerCase().includes(q)
            || v.tags.some((t) => t.includes(q))
            || (ch && ch.name.toLowerCase().includes(q));
      });
    }
    if (view === 'subscriptions') list = list.filter((v) => subs.has(v.channelId));
    if (view === 'watchlater')    list = list.filter((v) => watchLater.has(v.id));
    if (view === 'channel' && activeChannel) list = list.filter((v) => v.channelId === activeChannel.id);
    return list;
  }, [view, searchQuery, subs, watchLater, activeChannel]);

  // ---------- Render: Watch view ----------
  if (view === 'watch' && activeVideo) {
    return <WatchView
      video={activeVideo}
      onBack={() => { setView('home'); setActiveVideo(null); }}
      onChannelClick={(ch) => { setActiveChannel(ch); setView('channel'); setActiveVideo(null); }}
      onPickRelated={(v) => setActiveVideo(v)}
      isSubbed={subs.has(activeVideo.channelId)}
      onToggleSub={() => toggleSub(activeVideo.channelId)}
      isSaved={watchLater.has(activeVideo.id)}
      onToggleSave={() => toggleWatchLater(activeVideo.id)}
    />;
  }

  // ---------- Render: Channel view ----------
  if (view === 'channel' && activeChannel) {
    return <ChannelView
      channel={activeChannel}
      videos={VIDEOS.filter((v) => v.channelId === activeChannel.id)}
      onBack={() => { setView('home'); setActiveChannel(null); }}
      onVideoClick={(v) => { setActiveVideo(v); setView('watch'); }}
      isSubbed={subs.has(activeChannel.id)}
      onToggleSub={() => toggleSub(activeChannel.id)}
    />;
  }

  // ---------- Render: List views ----------
  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="ytube2-block">
        <div className="ytube2-header">
          <button
            className="ytube2-logo"
            onClick={() => { setView('home'); setSearch(''); setSearchQuery(''); }}
            onMouseDown={(e) => e.stopPropagation()}
          >ShaggaTube</button>
          <div className="ytube2-searchbar">
            <input
              type="text"
              placeholder="Search shaggas, channels, snags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') setSearchQuery(search); }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            />
            <button
              className="ytube2-search-btn"
              onClick={() => setSearchQuery(search)}
              onMouseDown={(e) => e.stopPropagation()}
            >🔍</button>
          </div>
        </div>

        <div className="ytube2-body">
          <div className="ytube2-sidebar">
            <button className={`ytube2-navitem${view === 'home' ? ' active' : ''}`}
              onClick={() => { setView('home'); setSearchQuery(''); setSearch(''); }}
              onMouseDown={(e) => e.stopPropagation()}>🏠 Home</button>
            <button className={`ytube2-navitem${view === 'subscriptions' ? ' active' : ''}`}
              onClick={() => setView('subscriptions')}
              onMouseDown={(e) => e.stopPropagation()}>
              📺 Subscriptions {subs.size > 0 && <span className="ytube2-count">{subs.size}</span>}
            </button>
            <button className={`ytube2-navitem${view === 'watchlater' ? ' active' : ''}`}
              onClick={() => setView('watchlater')}
              onMouseDown={(e) => e.stopPropagation()}>
              ⏱ Watch Later {watchLater.size > 0 && <span className="ytube2-count">{watchLater.size}</span>}
            </button>
            <div className="ytube2-section-title">SUBSCRIPTIONS</div>
            {subs.size === 0
              ? <div className="ytube2-empty-msg">no subs yet</div>
              : CHANNELS.filter((c) => subs.has(c.id)).map((ch) => (
                  <button
                    key={ch.id}
                    className="ytube2-channel-row"
                    onClick={() => { setActiveChannel(ch); setView('channel'); }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <span className="ytube2-channel-avatar" style={{ background: ch.color }}>{ch.emoji}</span>
                    <span className="ytube2-channel-name">{ch.name}</span>
                  </button>
                ))}
          </div>

          <div className="ytube2-main">
            {searchQuery && (
              <div className="ytube2-search-banner">
                Showing results for: <strong>{searchQuery}</strong>
                <button onClick={() => { setSearchQuery(''); setSearch(''); }}
                  onMouseDown={(e) => e.stopPropagation()}>Clear</button>
              </div>
            )}
            {view === 'subscriptions' && subs.size === 0 && (
              <div className="ytube2-empty">
                <div className="ytube2-empty-icon">📺</div>
                <div>No subscriptions yet.</div>
                <div className="ytube2-empty-sub">Click a channel name on any video to subscribe.</div>
              </div>
            )}
            {view === 'watchlater' && watchLater.size === 0 && (
              <div className="ytube2-empty">
                <div className="ytube2-empty-icon">⏱</div>
                <div>Watch Later is empty.</div>
                <div className="ytube2-empty-sub">Hit the ⏱ button on any video to save it.</div>
              </div>
            )}
            {visibleVideos.length === 0 && searchQuery && (
              <div className="ytube2-empty">
                <div className="ytube2-empty-icon">🔍</div>
                <div>No results for &quot;{searchQuery}&quot;</div>
              </div>
            )}
            <div className="ytube2-grid">
              {visibleVideos.map((v) => {
                const ch = CHANNELS.find((c) => c.id === v.channelId)!;
                return (
                  <button
                    key={v.id}
                    className="ytube2-card"
                    onClick={() => { setActiveVideo(v); setView('watch'); }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
                    <div className="ytube2-thumb" style={{ background: v.thumbBg }}>
                      <span className="ytube2-thumb-emoji">{v.emoji}</span>
                      <span className="ytube2-duration">{formatDuration(v.durationSec)}</span>
                    </div>
                    <div className="ytube2-card-body">
                      <span className="ytube2-card-avatar" style={{ background: ch.color }}>{ch.emoji}</span>
                      <div className="ytube2-card-text">
                        <div className="ytube2-card-title">{v.title}</div>
                        <div className="ytube2-card-channel">{ch.name}</div>
                        <div className="ytube2-card-meta">{formatViews(v.views)} • {formatAge(v.ageDays)}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Watch View ----------
interface WatchViewProps {
  video: Video;
  onBack: () => void;
  onChannelClick: (ch: Channel) => void;
  onPickRelated: (v: Video) => void;
  isSubbed: boolean;
  onToggleSub: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

function WatchView({ video, onBack, onChannelClick, onPickRelated, isSubbed, onToggleSub, isSaved, onToggleSave }: WatchViewProps) {
  const channel = CHANNELS.find((c) => c.id === video.channelId)!;
  const videoUrl = videoSrc(video.id);
  const related = useMemo(
    () => VIDEOS.filter((v) => v.id !== video.id && (v.channelId === video.channelId || v.tags.some((t) => video.tags.includes(t)))).slice(0, 8).concat(
      VIDEOS.filter((v) => v.id !== video.id).slice(0, 4)
    ).slice(0, 10),
    [video.id, video.channelId, video.tags]
  );

  // Playback simulation
  const [playing, setPlaying] = useState(true);
  const [progressSec, setProgressSec] = useState(0);
  useEffect(() => {
    setProgressSec(0);
    setPlaying(true);
  }, [video.id]);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgressSec((p) => {
        if (p >= video.durationSec) { setPlaying(false); return video.durationSec; }
        return p + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, video.durationSec]);
  const progressPct = (progressSec / video.durationSec) * 100;

  // Likes (per-video, in-memory)
  const [likes, setLikes] = useState(Math.floor(video.views * 0.04));
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const toggleLike = () => {
    if (liked) { setLikes((l) => l - 1); setLiked(false); }
    else { setLikes((l) => l + (disliked ? 1 : 1)); setLiked(true); setDisliked(false); }
  };
  const toggleDislike = () => {
    if (disliked) setDisliked(false);
    else { setDisliked(true); if (liked) { setLikes((l) => l - 1); setLiked(false); } }
  };

  // Comments
  const initialComments = commentsForVideo(video.id);
  const [comments, setComments] = useState<{ user: string; text: string }[]>(initialComments);
  const [draft, setDraft] = useState('');
  useEffect(() => { setComments(commentsForVideo(video.id)); setDraft(''); }, [video.id]);
  const postComment = () => {
    const t = draft.trim();
    if (!t) return;
    setComments((c) => [{ user: '@you', text: t }, ...c]);
    setDraft('');
  };

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="ytube2-block">
        <div className="ytube2-header">
          <button
            className="ytube2-back"
            onClick={onBack}
            onMouseDown={(e) => e.stopPropagation()}
          >← Back</button>
          <button className="ytube2-logo-small" onClick={onBack}>ShaggaTube</button>
        </div>
        <div className="ytube2-watch">
          <div className="ytube2-watch-main">
            {/* Player — uses real <video> when src is available, else simulated playback */}
            {videoUrl ? (
              <div className="ytube2-player ytube2-player-real">
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  loop={false}
                  preload="metadata"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                />
              </div>
            ) : (
              <div className="ytube2-player" style={{ background: video.thumbBg }}>
                <span className="ytube2-player-emoji">{video.emoji}</span>
                {!playing && progressSec >= video.durationSec && (
                  <div className="ytube2-player-end">▷ replay</div>
                )}
                <div className="ytube2-player-controls">
                  <button
                    onClick={() => {
                      if (progressSec >= video.durationSec) setProgressSec(0);
                      setPlaying((p) => !p);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >{playing ? '⏸' : '▷'}</button>
                  <div className="ytube2-player-time">{formatDuration(progressSec)}</div>
                  <div className="ytube2-player-progress">
                    <div className="ytube2-player-progress-bar" style={{ width: `${progressPct}%` }} />
                  </div>
                  <div className="ytube2-player-time">{formatDuration(video.durationSec)}</div>
                  <button onMouseDown={(e) => e.stopPropagation()}>🔊</button>
                  <button onMouseDown={(e) => e.stopPropagation()}>⛶</button>
                </div>
              </div>
            )}

            <h2 className="ytube2-watch-title">{video.title}</h2>
            <div className="ytube2-watch-meta">
              <button
                className="ytube2-watch-channel"
                onClick={() => onChannelClick(channel)}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <span className="ytube2-card-avatar" style={{ background: channel.color }}>{channel.emoji}</span>
                <div>
                  <div className="ytube2-watch-channel-name">{channel.name}</div>
                  <div className="ytube2-watch-channel-subs">{channel.subs} subscribers</div>
                </div>
              </button>
              <button
                className={`ytube2-sub-btn${isSubbed ? ' subbed' : ''}`}
                onClick={onToggleSub}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {isSubbed ? '✓ Subscribed' : 'Subscribe'}
              </button>
              <div className="ytube2-watch-actions">
                <button
                  className={`ytube2-action${liked ? ' active' : ''}`}
                  onClick={toggleLike}
                  onMouseDown={(e) => e.stopPropagation()}
                >👍 {likes.toLocaleString()}</button>
                <button
                  className={`ytube2-action${disliked ? ' active' : ''}`}
                  onClick={toggleDislike}
                  onMouseDown={(e) => e.stopPropagation()}
                >👎</button>
                <button
                  className={`ytube2-action${isSaved ? ' active' : ''}`}
                  onClick={onToggleSave}
                  onMouseDown={(e) => e.stopPropagation()}
                  title={isSaved ? 'Remove from Watch Later' : 'Save to Watch Later'}
                >⏱ {isSaved ? 'Saved' : 'Save'}</button>
              </div>
            </div>
            <div className="ytube2-watch-info">
              <div className="ytube2-watch-stats">{formatViews(video.views)} • {formatAge(video.ageDays)}</div>
              <div className="ytube2-watch-desc">{video.description}</div>
            </div>

            {/* Comments */}
            <div className="ytube2-comments">
              <div className="ytube2-comments-title">{comments.length} Comments</div>
              <div className="ytube2-comment-compose">
                <span className="ytube2-card-avatar" style={{ background: '#0066cc' }}>🌍</span>
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') postComment(); }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  placeholder="Add a comment..."
                />
                <button
                  onClick={postComment}
                  disabled={!draft.trim()}
                  onMouseDown={(e) => e.stopPropagation()}
                >Comment</button>
              </div>
              {comments.map((c, i) => (
                <div key={i} className="ytube2-comment">
                  <span className="ytube2-card-avatar" style={{ background: '#444' }}>👤</span>
                  <div>
                    <div className="ytube2-comment-user">{c.user}</div>
                    <div className="ytube2-comment-text">{c.text}</div>
                    <div className="ytube2-comment-actions">👍 0 • 👎 • Reply</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related sidebar */}
          <div className="ytube2-related">
            <div className="ytube2-related-title">Up next</div>
            {related.map((v) => {
              const ch = CHANNELS.find((c) => c.id === v.channelId)!;
              return (
                <button
                  key={v.id}
                  className="ytube2-related-card"
                  onClick={() => onPickRelated(v)}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="ytube2-related-thumb" style={{ background: v.thumbBg }}>
                    <span>{v.emoji}</span>
                    <span className="ytube2-duration">{formatDuration(v.durationSec)}</span>
                  </div>
                  <div className="ytube2-related-info">
                    <div className="ytube2-related-vtitle">{v.title}</div>
                    <div className="ytube2-related-vchannel">{ch.name}</div>
                    <div className="ytube2-related-vmeta">{formatViews(v.views)} • {formatAge(v.ageDays)}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Channel View ----------
function ChannelView({ channel, videos, onBack, onVideoClick, isSubbed, onToggleSub }: {
  channel: Channel;
  videos: Video[];
  onBack: () => void;
  onVideoClick: (v: Video) => void;
  isSubbed: boolean;
  onToggleSub: () => void;
}) {
  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="ytube2-block">
        <div className="ytube2-header">
          <button
            className="ytube2-back"
            onClick={onBack}
            onMouseDown={(e) => e.stopPropagation()}
          >← Back</button>
          <button className="ytube2-logo-small" onClick={onBack}>ShaggaTube</button>
        </div>
        <div className="ytube2-channelpage">
          <div className="ytube2-channelpage-banner" style={{ background: channel.color }} />
          <div className="ytube2-channelpage-header">
            <span className="ytube2-channelpage-avatar" style={{ background: channel.color }}>{channel.emoji}</span>
            <div className="ytube2-channelpage-info">
              <div className="ytube2-channelpage-name">{channel.name}</div>
              <div className="ytube2-channelpage-handle">{channel.handle} • {channel.subs} subscribers • {videos.length} videos</div>
            </div>
            <button
              className={`ytube2-sub-btn${isSubbed ? ' subbed' : ''}`}
              onClick={onToggleSub}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {isSubbed ? '✓ Subscribed' : 'Subscribe'}
            </button>
          </div>
          <div className="ytube2-channelpage-tabs">
            <span className="ytube2-channelpage-tab active">Videos</span>
            <span className="ytube2-channelpage-tab">Playlists</span>
            <span className="ytube2-channelpage-tab">About</span>
          </div>
          <div className="ytube2-grid" style={{ padding: 12 }}>
            {videos.map((v) => (
              <button
                key={v.id}
                className="ytube2-card"
                onClick={() => onVideoClick(v)}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="ytube2-thumb" style={{ background: v.thumbBg }}>
                  <span className="ytube2-thumb-emoji">{v.emoji}</span>
                  <span className="ytube2-duration">{formatDuration(v.durationSec)}</span>
                </div>
                <div className="ytube2-card-body">
                  <span className="ytube2-card-avatar" style={{ background: channel.color }}>{channel.emoji}</span>
                  <div className="ytube2-card-text">
                    <div className="ytube2-card-title">{v.title}</div>
                    <div className="ytube2-card-meta">{formatViews(v.views)} • {formatAge(v.ageDays)}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
