'use client';
import React, { useState, useEffect, useRef } from 'react';
import { VIDEOS, CHANNELS, type Video } from '../../ShaggaTubeBody';
import { videoSrc } from '../../imageManifest';

// ============================================================
// SHAGGATUBE
// ============================================================
function fmtViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
function fmtAge(days: number): string {
  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? '' : 's'} ago`;
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) === 1 ? '' : 's'} ago`;
}
function fmtDuration(s: number): string {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

const STUBE_COMMENTS = [
  { author: '@phil_drives', body: 'this is the truest thing ever uploaded' },
  { author: '@auntie_linda', body: '🌹🌹🌹 GOD BLESS this content 🌹🌹🌹' },
  { author: '@big_shagga_94', body: 'this saved my marriage. unironically.' },
  { author: '@concerned_mum', body: 'k.' },
  { author: '@midaisle_mike', body: 'middle aisle had this on dvd for £2.99 last week' },
  { author: '@tech_helpline', body: 'have you tried turning it off and on again' },
];

export const AppShaggaTube: React.FC = () => {
  const [playing, setPlaying] = useState<Video | null>(null);
  const [search, setSearch] = useState('');
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [subscribed, setSubscribed] = useState<Set<string>>(new Set());

  const visible = search.trim()
    ? VIDEOS.filter((v) => {
        const q = search.toLowerCase();
        return v.title.toLowerCase().includes(q)
          || v.tags.some((t) => t.toLowerCase().includes(q));
      })
    : [...VIDEOS].sort((a, b) => b.views - a.views);

  if (playing) {
    const channel = CHANNELS.find((c) => c.id === playing.channelId)!;
    const isLiked = liked.has(playing.id);
    const isSubbed = subscribed.has(channel.id);
    const src = videoSrc(playing.id);
    return (
      <div className="stube-player">
        <button className="stube-back" onClick={() => setPlaying(null)}>‹ Back</button>
        <div className="stube-screen" style={{ background: playing.thumbBg }}>
          {src ? (
            <video src={src} controls autoPlay loop playsInline className="stube-video" />
          ) : (
            <>
              <span className="stube-emoji">{playing.emoji}</span>
              <div className="stube-fakeplay">▶</div>
            </>
          )}
        </div>
        <h2 className="stube-title">{playing.title}</h2>
        <div className="stube-meta">{fmtViews(playing.views)} views · {fmtAge(playing.ageDays)}</div>
        <div className="stube-actions">
          <button className={isLiked ? 'stube-action stube-action-on' : 'stube-action'} onClick={() => setLiked((s) => { const n = new Set(s); n.has(playing.id) ? n.delete(playing.id) : n.add(playing.id); return n; })}>
            👍 Like {isLiked && '✓'}
          </button>
          <button className="stube-action">💬 Comments</button>
          <button className="stube-action">📥 Save</button>
          <button className="stube-action">📤 Share</button>
        </div>
        <div className="stube-channel-row">
          <div className="stube-avatar" style={{ background: channel.color }}>{channel.emoji}</div>
          <div className="stube-channel-text">
            <div className="stube-channel-name">{channel.name}</div>
            <div className="stube-channel-subs">{channel.subs} subscribers</div>
          </div>
          <button className={isSubbed ? 'stube-subscribe stube-subscribe-on' : 'stube-subscribe'} onClick={() => setSubscribed((s) => { const n = new Set(s); n.has(channel.id) ? n.delete(channel.id) : n.add(channel.id); return n; })}>
            {isSubbed ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </div>
        <p className="stube-description">{playing.description}</p>
        <div className="stube-comments-section">
          <h3>Comments · {STUBE_COMMENTS.length}</h3>
          {STUBE_COMMENTS.map((c, i) => (
            <div key={i} className="stube-comment">
              <div className="stube-comment-author">{c.author}</div>
              <div>{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="stube-app">
      <div className="stube-search">
        <input placeholder="Search ShaggaTube" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {visible.length === 0 && <p className="stube-empty">No videos match "{search}".</p>}
      {visible.map((v) => {
        const channel = CHANNELS.find((c) => c.id === v.channelId)!;
        return (
          <button key={v.id} className="stube-row" onClick={() => setPlaying(v)}>
            <div className="stube-thumb" style={{ background: v.thumbBg }}>
              <span className="stube-thumb-emoji">{v.emoji}</span>
              <span className="stube-duration">{fmtDuration(v.durationSec)}</span>
              <div className="stube-play-overlay">▶</div>
            </div>
            <div className="stube-row-text">
              <div className="stube-row-title">{v.title}</div>
              <div className="stube-row-meta">{channel.name} · {fmtViews(v.views)} views · {fmtAge(v.ageDays)}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

// ============================================================
// SHAGGA-FY
// ============================================================
import { TRACKS as ALL_TRACKS, type Track } from '../../ShaggaFyBody';
import { audioSrc } from '../../imageManifest';

type SfyView = 'home' | 'library' | 'search' | 'liked';

function sfyFmt(s: number): string {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

export const AppShaggaFy: React.FC = () => {
  const [view, setView] = useState<SfyView>('home');
  const [playing, setPlaying] = useState<Track | null>(null);
  const [progress, setProgress] = useState(0); // seconds
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Drive progress from the audio element if available, otherwise use a timer
  useEffect(() => {
    if (!playing) return;
    if (paused) return;
    if (audioRef.current && !audioRef.current.paused) return; // audio drives it
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= playing.durationSec) {
          // auto-advance to next
          const idx = ALL_TRACKS.findIndex((t) => t.id === playing.id);
          const next = ALL_TRACKS[(idx + 1) % ALL_TRACKS.length];
          setPlaying(next);
          return 0;
        }
        return p + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, paused]);

  // When the audio element has its own time, sync progress from it
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onEnd = () => {
      const idx = ALL_TRACKS.findIndex((t) => t.id === playing?.id);
      const next = ALL_TRACKS[(idx + 1) % ALL_TRACKS.length];
      setPlaying(next);
      setProgress(0);
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, [playing]);

  // When playing track changes, restart audio
  useEffect(() => {
    if (!audioRef.current || !playing) return;
    const src = audioSrc(playing.id);
    if (src) {
      audioRef.current.src = src;
      audioRef.current.play().catch(() => { /* autoplay blocked; user will tap play */ });
    }
    setProgress(0);
    setPaused(false);
  }, [playing]);

  const togglePlay = () => {
    setPaused((p) => {
      const next = !p;
      if (audioRef.current) {
        if (next) audioRef.current.pause();
        else audioRef.current.play().catch(() => {});
      }
      return next;
    });
  };

  const playTrack = (t: Track) => {
    setPlaying(t);
  };

  const next = () => {
    if (!playing) return;
    const idx = ALL_TRACKS.findIndex((t) => t.id === playing.id);
    setPlaying(ALL_TRACKS[(idx + 1) % ALL_TRACKS.length]);
  };
  const prev = () => {
    if (!playing) return;
    const idx = ALL_TRACKS.findIndex((t) => t.id === playing.id);
    setPlaying(ALL_TRACKS[(idx - 1 + ALL_TRACKS.length) % ALL_TRACKS.length]);
  };

  const toggleLike = (id: number) => setLiked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // Now-playing full-screen
  if (playing && view === 'home' && false /* keep mini-player visible by default */) { /* no-op */ }

  // List of tracks for the current view
  const filteredBySearch = search.trim()
    ? ALL_TRACKS.filter((t) => {
        const q = search.toLowerCase();
        return t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q) || t.album.toLowerCase().includes(q);
      })
    : ALL_TRACKS;
  const tracks = view === 'liked'
    ? ALL_TRACKS.filter((t) => liked.has(t.id))
    : view === 'search'
      ? filteredBySearch
      : ALL_TRACKS;

  return (
    <div className="sfy-shell">
      {/* Always-mounted hidden audio element so playback survives view switches */}
      <audio ref={audioRef} preload="auto" />

      <div className="sfy-content">
        {view === 'home' && (
          <>
            <h2 className="sfy-h">Recently played</h2>
            <div className="sfy-row-list">
              {ALL_TRACKS.slice(0, 12).map((t) => (
                <button key={t.id} className={t.id === playing?.id ? 'sfy-row sfy-row-active' : 'sfy-row'} onClick={() => playTrack(t)}>
                  <div className="sfy-row-art" style={{ background: t.bg }}>{t.emoji}</div>
                  <div className="sfy-row-text">
                    <div className="sfy-row-title">{t.title}</div>
                    <div className="sfy-row-artist">{t.artist} · {t.album}</div>
                  </div>
                  <button className={`sfy-row-heart ${liked.has(t.id) ? 'sfy-row-heart-on' : ''}`} onClick={(e) => { e.stopPropagation(); toggleLike(t.id); }}>{liked.has(t.id) ? '❤️' : '🤍'}</button>
                  <div className="sfy-row-dur">{sfyFmt(t.durationSec)}</div>
                </button>
              ))}
            </div>
          </>
        )}
        {view === 'search' && (
          <>
            <div className="sfy-search-wrap">
              <input
                className="sfy-search"
                placeholder="Tracks, artists, albums…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div className="sfy-row-list">
              {tracks.length === 0 && <p className="sfy-empty">No matches.</p>}
              {tracks.map((t) => (
                <button key={t.id} className={t.id === playing?.id ? 'sfy-row sfy-row-active' : 'sfy-row'} onClick={() => playTrack(t)}>
                  <div className="sfy-row-art" style={{ background: t.bg }}>{t.emoji}</div>
                  <div className="sfy-row-text">
                    <div className="sfy-row-title">{t.title}</div>
                    <div className="sfy-row-artist">{t.artist}</div>
                  </div>
                  <div className="sfy-row-dur">{sfyFmt(t.durationSec)}</div>
                </button>
              ))}
            </div>
          </>
        )}
        {view === 'library' && (
          <>
            <h2 className="sfy-h">All tracks · {ALL_TRACKS.length}</h2>
            <div className="sfy-row-list">
              {tracks.map((t) => (
                <button key={t.id} className={t.id === playing?.id ? 'sfy-row sfy-row-active' : 'sfy-row'} onClick={() => playTrack(t)}>
                  <div className="sfy-row-art" style={{ background: t.bg }}>{t.emoji}</div>
                  <div className="sfy-row-text">
                    <div className="sfy-row-title">{t.title}</div>
                    <div className="sfy-row-artist">{t.artist} · {t.album}</div>
                  </div>
                  <div className="sfy-row-dur">{sfyFmt(t.durationSec)}</div>
                </button>
              ))}
            </div>
          </>
        )}
        {view === 'liked' && (
          <>
            <h2 className="sfy-h">Liked songs</h2>
            <div className="sfy-row-list">
              {tracks.length === 0 && <p className="sfy-empty">Nothing liked yet. Tap the heart on tracks you love.</p>}
              {tracks.map((t) => (
                <button key={t.id} className={t.id === playing?.id ? 'sfy-row sfy-row-active' : 'sfy-row'} onClick={() => playTrack(t)}>
                  <div className="sfy-row-art" style={{ background: t.bg }}>{t.emoji}</div>
                  <div className="sfy-row-text">
                    <div className="sfy-row-title">{t.title}</div>
                    <div className="sfy-row-artist">{t.artist}</div>
                  </div>
                  <div className="sfy-row-dur">{sfyFmt(t.durationSec)}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mini player (always visible when something is playing) */}
      {playing && (
        <div className="sfy-mini">
          <div className="sfy-mini-art" style={{ background: playing.bg }}>{playing.emoji}</div>
          <div className="sfy-mini-text">
            <div className="sfy-mini-title">{playing.title}</div>
            <div className="sfy-mini-artist">{playing.artist}</div>
          </div>
          <button className="sfy-mini-btn" onClick={prev}>⏮</button>
          <button className="sfy-mini-btn sfy-mini-play" onClick={togglePlay}>{paused ? '▶' : '❚❚'}</button>
          <button className="sfy-mini-btn" onClick={next}>⏭</button>
        </div>
      )}

      {/* Bottom tabs */}
      <div className="sfy-tabbar">
        <button className={view === 'home' ? 'sfy-tab sfy-tab-active' : 'sfy-tab'} onClick={() => setView('home')}>🏠<br /><span>Home</span></button>
        <button className={view === 'search' ? 'sfy-tab sfy-tab-active' : 'sfy-tab'} onClick={() => setView('search')}>🔍<br /><span>Search</span></button>
        <button className={view === 'library' ? 'sfy-tab sfy-tab-active' : 'sfy-tab'} onClick={() => setView('library')}>📚<br /><span>Library</span></button>
        <button className={view === 'liked' ? 'sfy-tab sfy-tab-active' : 'sfy-tab'} onClick={() => setView('liked')}>❤️<br /><span>Liked</span></button>
      </div>
    </div>
  );
};

// ============================================================
// TEXT (Messages)
// ============================================================
interface ThreadMsg { from: 'me' | 'them'; body: string; time: string }
interface Conversation {
  id: number; name: string; preview: string; time: string; unread: boolean;
  thread: ThreadMsg[];
  /** Random selection of canned replies the contact will fire when you send something */
  replyPool: string[];
}

const INITIAL_CONVS: Conversation[] = [
  { id: 1, name: 'Phil', preview: 'sausage roll situation. need backup.', time: '12:42', unread: true,
    thread: [
      { from: 'them', body: 'sausage roll situation', time: '12:40' },
      { from: 'them', body: 'need backup', time: '12:42' },
      { from: 'me',   body: 'on my way',   time: '12:43' },
      { from: 'them', body: 'legend',      time: '12:43' },
    ],
    replyPool: ['legend', 'top shagga energy', 'aye', 'lidl middle aisle has astronaut suits btw', 'cavalier just hit 188k miles. she keeps going.', 'pints later?'] },
  { id: 2, name: 'Mum', preview: 'k', time: '11:08', unread: true,
    thread: [
      { from: 'me',   body: 'we need to talk about christmas', time: '11:05' },
      { from: 'them', body: 'k', time: '11:08' },
    ],
    replyPool: ['k', 'k.', 'fine.', 'hmm', 'we will discuss when you are home', 'k.'] },
  { id: 3, name: 'Auntie Linda', preview: '🌹🌹🌹 GOOD MORNING ANGELS 🌹🌹🌹', time: 'Yesterday', unread: false,
    thread: [
      { from: 'them', body: '🌹🌹🌹 GOOD MORNING ANGELS 🌹🌹🌹', time: '07:00' },
      { from: 'them', body: 'GOD BLESS ❤️❤️❤️', time: '07:00' },
      { from: 'me',   body: 'morning auntie linda', time: '08:32' },
    ],
    replyPool: ['my love ❤️❤️❤️', '🌹🌹🌹', 'hope you are eating properly', 'auntie linda x', 'remember to forward this to 7 people for good luck'] },
  { id: 4, name: 'Ross Buckley', preview: 'card?', time: 'Tuesday', unread: false,
    thread: [
      { from: 'them', body: 'card?', time: 'Tuesday 14:22' },
      { from: 'them', body: 'milkshake?', time: 'Tuesday 14:22' },
      { from: 'them', body: 'shagga shagga shagga', time: 'Tuesday 14:23' },
    ],
    replyPool: ['shagga shagga shagga', 'card.', 'milkshake.', '💜', 'see ya around shagga ✨', 'shagga'] },
  { id: 5, name: 'Tech Helpline', preview: 'have you tried turning it off and on again', time: 'Monday', unread: false,
    thread: [
      { from: 'me',   body: "internet's down again", time: 'Monday 09:14' },
      { from: 'them', body: 'have you tried turning it off and on again', time: 'Monday 09:21' },
    ],
    replyPool: ['have you tried turning it off and on again', 'we will escalate this to tier 2', 'this is an automated response', 'please reply YES to confirm', 'a ticket has been created. ref: SHG-' + Math.floor(Math.random() * 99999)] },
  { id: 6, name: 'Margaret', preview: 'have you found my phone', time: 'Sunday', unread: false,
    thread: [
      { from: 'them', body: 'have you found my phone', time: 'Sunday' },
      { from: 'them', body: 'i lost it again', time: 'Sunday' },
      { from: 'them', body: 'love nan x', time: 'Sunday' },
    ],
    replyPool: ['its in your handbag again nan', 'check the kitchen table', 'love you nan x', 'have you tried calling it', 'i am calling it now'] },
];

function nowTime() {
  const d = new Date();
  const h = d.getHours(), m = d.getMinutes();
  const hh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hh}:${String(m).padStart(2, '0')}`;
}

export const AppText: React.FC = () => {
  const [convs, setConvs] = useState<Conversation[]>(INITIAL_CONVS);
  const [openId, setOpenId] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const open = openId !== null ? convs.find((c) => c.id === openId) : null;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom whenever the open thread changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [openId, open?.thread.length]);

  const appendMessage = (convId: number, msg: ThreadMsg) => {
    setConvs((curr) => curr.map((c) => c.id === convId ? {
      ...c,
      thread: [...c.thread, msg],
      preview: msg.body.slice(0, 60),
      time: msg.time,
      unread: msg.from === 'them' && c.id !== openId,
    } : c));
  };

  const send = () => {
    if (!open || !draft.trim()) return;
    const text = draft.trim();
    setDraft('');
    appendMessage(open.id, { from: 'me', body: text, time: nowTime() });
    // Fake auto-reply 1.2-2.4s later
    const replyDelay = 1200 + Math.random() * 1200;
    const replyText = open.replyPool[Math.floor(Math.random() * open.replyPool.length)];
    setTimeout(() => {
      appendMessage(open.id, { from: 'them', body: replyText, time: nowTime() });
    }, replyDelay);
  };

  const openConv = (id: number) => {
    setOpenId(id);
    // Mark as read when opened
    setConvs((curr) => curr.map((c) => c.id === id ? { ...c, unread: false } : c));
  };

  if (open) {
    return (
      <div className="msg-thread">
        <div className="msg-thread-bar">
          <button onClick={() => setOpenId(null)} className="msg-back">‹</button>
          <span className="msg-thread-name">{open.name}</span>
        </div>
        <div className="msg-bubbles" ref={scrollRef}>
          {open.thread.map((m, i) => (
            <div key={i} className={`msg-bubble msg-bubble-${m.from}`}>
              <div>{m.body}</div>
            </div>
          ))}
        </div>
        <div className="msg-input-row">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); send(); } }}
            placeholder="Text Message"
          />
          <button onClick={send} className="msg-send" disabled={!draft.trim()}>Send</button>
        </div>
      </div>
    );
  }

  // Sort conversations by time (most recent has unread or is at top)
  const sorted = [...convs].sort((a, b) => Number(b.unread) - Number(a.unread));
  return (
    <div className="msg-list">
      {sorted.map((c) => (
        <button key={c.id} className="msg-row" onClick={() => openConv(c.id)}>
          {c.unread && <span className="msg-unread-dot" />}
          <div className="msg-row-content">
            <div className="msg-row-line1">
              <span className="msg-row-name">{c.name}</span>
              <span className="msg-row-time">{c.time} ›</span>
            </div>
            <div className="msg-row-preview">{c.preview}</div>
          </div>
        </button>
      ))}
    </div>
  );
};
