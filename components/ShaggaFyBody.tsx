'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SfyIcon } from './icons';
import { audioSrc } from './imageManifest';

// ---------- Types ----------
interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  durationSec: number;
  emoji: string;
  bg: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  emoji: string;
  bg: string;
  trackIds: number[];
  custom?: boolean;
}

type View =
  | { kind: 'home' }
  | { kind: 'search' }
  | { kind: 'library' }
  | { kind: 'playlist'; id: string }
  | { kind: 'liked' }
  | { kind: 'queue' }
  | { kind: 'now' };

// ---------- Track data (40+) ----------
const TRACKS: Track[] = [
  { id: 1,  title: "Down Under (but cooked)",         artist: 'Men At Snag',         album: 'Cooked Classics',     durationSec: 227, emoji: '🌭', bg: 'linear-gradient(135deg, #ff7e5f, #c44569)' },
  { id: 2,  title: 'Goon of Fortune',                 artist: 'The Hills Hoists',    album: 'Backyard Bangers',    durationSec: 252, emoji: '🍷', bg: 'linear-gradient(135deg, #6a1b9a, #c4006c)' },
  { id: 3,  title: 'Sausage Sizzle Saturday',         artist: 'Snaggas Boys',       album: 'Hardware & Heart',    durationSec: 178, emoji: '🔨', bg: 'linear-gradient(135deg, #c40, #f00)' },
  { id: 4,  title: 'Maggie Swoop Anthem',             artist: 'Beak Riot',           album: 'Spring Terror',       durationSec: 303, emoji: '🪶', bg: 'linear-gradient(135deg, #1c1c1c, #5a5a5a)' },
  { id: 5,  title: "She'll Be Right (Extended Mix)",  artist: 'Tradies Anonymous',   album: 'Apathy in C Major',   durationSec: 467, emoji: '🛠️', bg: 'linear-gradient(135deg, #ffa500, #ff6b00)' },
  { id: 6,  title: 'Yeah Nah Yeah Nah',               artist: 'The Bazzas',          album: 'Yeah Nah',            durationSec: 151, emoji: '🤙', bg: 'linear-gradient(135deg, #00897b, #1976d2)' },
  { id: 7,  title: 'Top Shagga (Radio Edit)',         artist: 'Big Shagga',          album: 'Top Shagga',          durationSec: 201, emoji: '🤠', bg: 'linear-gradient(135deg, #8d4925, #5a2d18)' },
  { id: 8,  title: 'Cooked at the Dam',               artist: 'Cooked Dave',         album: 'Lukewarm Lakes',      durationSec: 296, emoji: '🌊', bg: 'linear-gradient(135deg, #0066cc, #003a75)' },
  { id: 9,  title: 'Shower Singalong',                artist: 'Solo Bathroom',       album: 'Acoustic & Naked',    durationSec: 192, emoji: '🚿', bg: 'linear-gradient(135deg, #4fc3f7, #29b6f6)' },
  { id: 10, title: 'Onions Under (Diss Track)',       artist: 'MC Snag',             album: 'Hardware Beef',       durationSec: 215, emoji: '🌭', bg: 'linear-gradient(135deg, #ef6c00, #c40)' },
  { id: 11, title: 'Lo-fi Shagga to Cook a Snag To',  artist: 'sleepy shagga',       album: 'Beats to Snag To',    durationSec: 614, emoji: '😴', bg: 'linear-gradient(135deg, #4a148c, #1a237e)' },
  { id: 12, title: 'Tea & Biscuit Blues',             artist: 'The Council',         album: 'Universal Problems',  durationSec: 246, emoji: '🫖', bg: 'linear-gradient(135deg, #6d4c41, #3e2723)' },
  { id: 13, title: 'Lukewarm Anthem',                 artist: 'Solo Bathroom',       album: 'Acoustic & Naked',    durationSec: 184, emoji: '🚿', bg: 'linear-gradient(135deg, #4fc3f7, #00897b)' },
  { id: 14, title: 'Pineapple on Pizza (Yes)',        artist: 'The Council',         album: 'Universal Problems',  durationSec: 232, emoji: '🍕', bg: 'linear-gradient(135deg, #fff200, #ff7e2d)' },
  { id: 15, title: 'Texting Back at 3am',             artist: 'shagga reacts',       album: 'Anxiety Pop',         durationSec: 198, emoji: '📱', bg: 'linear-gradient(135deg, #ff3b6b, #6b1a8c)' },
  { id: 16, title: 'BBQ at Daves',                    artist: 'The Bazzas',          album: 'Yeah Nah',            durationSec: 263, emoji: '🥩', bg: 'linear-gradient(135deg, #c40, #802)' },
  { id: 17, title: 'Cereal is Not a Soup',            artist: 'The Council',         album: 'Universal Problems',  durationSec: 187, emoji: '🥣', bg: 'linear-gradient(135deg, #ffa500, #ffd54f)' },
  { id: 18, title: 'Hot Dog (Sandwich Remix)',        artist: 'MC Snag',             album: 'Hardware Beef',       durationSec: 224, emoji: '🌭', bg: 'linear-gradient(135deg, #ef6c00, #d32f2f)' },
  { id: 19, title: 'Snaggas After Dark',             artist: 'Snaggas Boys',       album: 'Hardware & Heart',    durationSec: 312, emoji: '🌙', bg: 'linear-gradient(135deg, #1a237e, #311b92)' },
  { id: 20, title: 'Goon of Fortune (Acoustic)',      artist: 'The Hills Hoists',    album: 'Acoustic Bag',        durationSec: 271, emoji: '🍷', bg: 'linear-gradient(135deg, #ad1457, #6a1b9a)' },
  { id: 21, title: 'Top Shagga (Live at the Dam)',    artist: 'Big Shagga',          album: 'Top Shagga (Live)',   durationSec: 412, emoji: '🤠', bg: 'linear-gradient(135deg, #5d4037, #3e2723)' },
  { id: 22, title: 'Lo-fi Shower Beats',              artist: 'sleepy shagga',       album: 'Beats to Snag To',    durationSec: 532, emoji: '😴', bg: 'linear-gradient(135deg, #5392d6, #4a148c)' },
  { id: 23, title: 'Maggie in the Morning',           artist: 'Beak Riot',           album: 'Spring Terror',       durationSec: 251, emoji: '🪶', bg: 'linear-gradient(135deg, #2f4f4f, #696969)' },
  { id: 24, title: 'Backyard Cricket Theme',          artist: 'Tradies Anonymous',   album: 'Backyard Bangers',    durationSec: 145, emoji: '🏏', bg: 'linear-gradient(135deg, #66bb6a, #2e7d32)' },
  { id: 25, title: 'Vegemite (Love Song)',            artist: 'MC Snag',             album: 'Hardware Beef',       durationSec: 209, emoji: '🍞', bg: 'linear-gradient(135deg, #4e342e, #3e2723)' },
  { id: 26, title: 'Yeah Nah (Symphony No.1)',        artist: 'The Bazzas',          album: 'Yeah Nah Orchestra',  durationSec: 487, emoji: '🤙', bg: 'linear-gradient(135deg, #5e35b1, #1976d2)' },
  { id: 27, title: 'Shagga Council Theme Song',       artist: 'The Council',         album: 'Universal Problems',  durationSec: 167, emoji: '🌍', bg: 'linear-gradient(135deg, #00897b, #00695c)' },
  { id: 28, title: 'BBQ Sauce on Everything',         artist: 'Cooked Dave',         album: 'Lukewarm Lakes',      durationSec: 198, emoji: '🥩', bg: 'linear-gradient(135deg, #d84315, #bf360c)' },
  { id: 29, title: 'Snag in a Bun (Original Mix)',    artist: 'Big Shagga',          album: 'Top Shagga',          durationSec: 234, emoji: '🌭', bg: 'linear-gradient(135deg, #ff8a65, #e64a19)' },
  { id: 30, title: 'The Council Decides',             artist: 'The Council',         album: 'Universal Problems',  durationSec: 358, emoji: '⚖️', bg: 'linear-gradient(135deg, #455a64, #263238)' },
  { id: 31, title: 'Thongs in the Microwave',         artist: 'cooked content',      album: 'Cooked Vol. 1',       durationSec: 142, emoji: '🔥', bg: 'linear-gradient(135deg, #2f4f4f, #696969)' },
  { id: 32, title: 'Shower Temperature Debate',       artist: 'The Council',         album: 'Universal Problems',  durationSec: 287, emoji: '🚿', bg: 'linear-gradient(135deg, #4fc3f7, #b6dcff)' },
  { id: 33, title: 'Maggie Swoop Speedrun',           artist: 'Beak Riot',           album: 'Speed Tactics',       durationSec: 89,  emoji: '⚡', bg: 'linear-gradient(135deg, #ff5722, #d84315)' },
  { id: 34, title: 'Sunday Arvo at Nans',             artist: 'shagga reacts',       album: 'Family Anxiety',      durationSec: 312, emoji: '👵', bg: 'linear-gradient(135deg, #ff3b6b, #ad1457)' },
  { id: 35, title: 'Cooked Dave (Theme)',             artist: 'Cooked Dave',         album: 'Lukewarm Lakes',      durationSec: 188, emoji: '🌊', bg: 'linear-gradient(135deg, #00838f, #006064)' },
  { id: 36, title: 'Nans WiFi Password',              artist: 'shagga reacts',       album: 'Family Anxiety',      durationSec: 174, emoji: '📡', bg: 'linear-gradient(135deg, #6a1b9a, #4a148c)' },
  { id: 37, title: 'Tradie Smoko Anthem',             artist: 'Tradies Anonymous',   album: 'Apathy in C Major',   durationSec: 219, emoji: '🚬', bg: 'linear-gradient(135deg, #ffa726, #ef6c00)' },
  { id: 38, title: 'Sausage Roll Slowdance',          artist: 'Big Shagga',          album: 'Top Shagga',          durationSec: 264, emoji: '🥖', bg: 'linear-gradient(135deg, #d4a574, #8d6e63)' },
  { id: 39, title: 'Lo-fi Snaggas Lobby',            artist: 'sleepy shagga',       album: 'Beats to Snag To',    durationSec: 442, emoji: '🛒', bg: 'linear-gradient(135deg, #ef6c00, #5d4037)' },
  { id: 40, title: 'Final Shagga (10 Min Mix)',       artist: 'Big Shagga',          album: 'Top Shagga (Live)',   durationSec: 614, emoji: '🤠', bg: 'linear-gradient(135deg, #5d4037, #1a237e)' },
  { id: 41, title: 'See Ya Around Shagga',            artist: 'Ross Buckley',        album: 'Cards & Milkshakes',  durationSec: 207, emoji: '🃏', bg: 'linear-gradient(135deg, #9c27b0, #6a1b9a)' },
  { id: 42, title: 'Shagga (Single)',                 artist: 'Ross Buckley',        album: 'Cards & Milkshakes',  durationSec: 14,  emoji: '✨', bg: 'linear-gradient(135deg, #6a1b9a, #311b92)' },
  { id: 43, title: '10p for a Milkshake',             artist: 'Ross Buckley',        album: 'Cards & Milkshakes',  durationSec: 248, emoji: '🥤', bg: 'linear-gradient(135deg, #4a148c, #311b92)' },
  { id: 44, title: '10pk Thong Anthem (feat. The Lads)', artist: 'Ross Buckley',     album: 'Cards & Milkshakes',  durationSec: 196, emoji: '🩲', bg: 'linear-gradient(135deg, #ad1457, #6a1b9a)' },
  { id: 45, title: 'shagga shagga shagga (10 hour loop)', artist: 'sleepy shagga',  album: 'Beats to Snag To',    durationSec: 36000, emoji: '😴', bg: 'linear-gradient(135deg, #4a148c, #9c27b0)' },
  { id: 46, title: 'Ross Was Here (Tribute)',         artist: 'The Council',         album: 'Universal Problems',  durationSec: 234, emoji: '🃏', bg: 'linear-gradient(135deg, #5e35b1, #1976d2)' },
  { id: 47, title: 'Wink (Instrumental)',             artist: 'Ross Buckley',        album: 'Cards & Milkshakes',  durationSec: 89,  emoji: '✨', bg: 'linear-gradient(135deg, #9c27b0, #4a148c)' },
];

// ---------- Default playlists ----------
const DEFAULT_PLAYLISTS: Playlist[] = [
  { id: 'rossbuckley', name: 'The Ross Buckley Experience', description: 'shagga shagga shagga ✨ see ya around shagga', emoji: '🃏', bg: 'linear-gradient(135deg, #9c27b0, #4a148c)', trackIds: [41, 42, 43, 44, 47, 46] },
  { id: 'top2003',   name: 'Top Shagga 2003',     description: 'the originals. accept no substitutes.', emoji: '🌭', bg: 'linear-gradient(135deg, #ff7e5f, #c44569)', trackIds: [1, 2, 3, 7, 10, 21] },
  { id: 'snaggas',  name: 'Snaggas Bangers',    description: 'sausage sizzle adjacent.',              emoji: '🔨', bg: 'linear-gradient(135deg, #c40, #f00)',           trackIds: [3, 5, 19, 24, 37, 39] },
  { id: 'sunday',    name: 'Cooked Sunday Vibes', description: 'low energy, high vibes.',               emoji: '🌊', bg: 'linear-gradient(135deg, #00838f, #006064)', trackIds: [8, 11, 12, 22, 35, 38, 47] },
  { id: 'shower',    name: 'Shower Singalongs',   description: 'lukewarm. always lukewarm.',            emoji: '🚿', bg: 'linear-gradient(135deg, #4fc3f7, #29b6f6)', trackIds: [9, 13, 32] },
  { id: 'goon',      name: 'Goon Bag Gold',       description: 'the back fence calls.',                 emoji: '🍷', bg: 'linear-gradient(135deg, #6a1b9a, #c4006c)', trackIds: [2, 6, 16, 20, 26, 44] },
  { id: 'bbq',       name: 'BBQ Bops',            description: 'meat-adjacent music.',                  emoji: '🥩', bg: 'linear-gradient(135deg, #c40, #802)',         trackIds: [3, 16, 24, 28, 29, 38] },
  { id: 'maggie',    name: 'Maggie Swoop Season', description: 'helmet on. zip ties up.',               emoji: '🪶', bg: 'linear-gradient(135deg, #1c1c1c, #5a5a5a)', trackIds: [4, 23, 33] },
  { id: 'lofi',      name: 'Lo-fi Shagga',        description: 'study, snag, sleep, repeat.',           emoji: '😴', bg: 'linear-gradient(135deg, #4a148c, #1a237e)', trackIds: [11, 22, 39, 27, 36, 45] },
];

// ---------- Helpers ----------
function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

const STORAGE = {
  liked:    'shaggafy-liked',
  custom:   'shaggafy-custom-playlists',
  volume:   'shaggafy-volume',
};

// ---------- Main component ----------
export default function ShaggaFyBody() {
  const [view, setView] = useState<View>({ kind: 'home' });

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);    // seconds
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off');

  // Queue (track IDs in upcoming order)
  const [queue, setQueue] = useState<number[]>([]);

  // Persistent state
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [customPlaylists, setCustomPlaylists] = useState<Playlist[]>([]);
  const [search, setSearch] = useState('');

  // ---------- Persistence ----------
  useEffect(() => {
    try {
      const l = localStorage.getItem(STORAGE.liked);
      if (l) setLiked(new Set(JSON.parse(l)));
      const c = localStorage.getItem(STORAGE.custom);
      if (c) setCustomPlaylists(JSON.parse(c));
      const v = localStorage.getItem(STORAGE.volume);
      if (v) setVolume(parseFloat(v));
    } catch {}
  }, []);

  // Save liked
  useEffect(() => {
    try { localStorage.setItem(STORAGE.liked, JSON.stringify(Array.from(liked))); } catch {}
  }, [liked]);
  // Save custom playlists
  useEffect(() => {
    try { localStorage.setItem(STORAGE.custom, JSON.stringify(customPlaylists)); } catch {}
  }, [customPlaylists]);
  // Save volume
  useEffect(() => {
    try { localStorage.setItem(STORAGE.volume, String(volume)); } catch {}
  }, [volume]);

  // ---------- Audio element wiring ----------
  const currentTrack = currentTrackId != null ? TRACKS.find((t) => t.id === currentTrackId) ?? null : null;
  const realAudioUrl = currentTrack ? audioSrc(currentTrack.id) : null;

  // When the track changes, reset the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (realAudioUrl) {
      audio.src = realAudioUrl;
      audio.volume = volume;
      if (isPlaying) audio.play().catch(() => {});
    }
    setProgress(0);
  }, [currentTrackId, realAudioUrl]); // eslint-disable-line

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !realAudioUrl) return;
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, [isPlaying, realAudioUrl]);

  // Sync volume
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  // Track audio progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !realAudioUrl) return;
    const onTime = () => setProgress(audio.currentTime);
    const onEnd = () => playNext();
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, [realAudioUrl, queue, repeat, shuffle, currentTrackId]); // eslint-disable-line

  // Simulated playback for when there's no real audio file
  useEffect(() => {
    if (realAudioUrl) return; // real audio handles this itself
    if (!isPlaying || !currentTrack) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= currentTrack.durationSec) {
          playNext();
          return 0;
        }
        return p + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isPlaying, currentTrack, realAudioUrl]); // eslint-disable-line

  // ---------- Playback control ----------
  const playTrack = (trackId: number, contextTrackIds?: number[]) => {
    setCurrentTrackId(trackId);
    setIsPlaying(true);
    setProgress(0);
    if (contextTrackIds) {
      const i = contextTrackIds.indexOf(trackId);
      const after = i >= 0 ? contextTrackIds.slice(i + 1) : [];
      setQueue(shuffle ? [...after].sort(() => Math.random() - 0.5) : after);
    } else {
      setQueue([]);
    }
  };

  const playNext = () => {
    if (repeat === 'one' && currentTrackId != null) {
      // Restart the current track
      setProgress(0);
      const audio = audioRef.current;
      if (audio && realAudioUrl) { audio.currentTime = 0; audio.play().catch(() => {}); }
      else setIsPlaying(true);
      return;
    }
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      setQueue(rest);
      setCurrentTrackId(next);
      setProgress(0);
      setIsPlaying(true);
    } else if (repeat === 'all' && currentTrackId != null) {
      // Restart from beginning of queue context (just play random for simplicity)
      const all = TRACKS.map((t) => t.id);
      const next = all[Math.floor(Math.random() * all.length)];
      setCurrentTrackId(next);
      setProgress(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const playPrev = () => {
    if (currentTrack && progress > 3) {
      setProgress(0);
      const audio = audioRef.current;
      if (audio && realAudioUrl) audio.currentTime = 0;
      return;
    }
    // No real history tracking — just restart for simplicity
    setProgress(0);
  };

  const togglePlay = () => {
    if (!currentTrack && TRACKS.length > 0) {
      playTrack(TRACKS[0].id, TRACKS.map((t) => t.id));
      return;
    }
    setIsPlaying((p) => !p);
  };

  const seek = (sec: number) => {
    setProgress(sec);
    const audio = audioRef.current;
    if (audio && realAudioUrl) audio.currentTime = sec;
  };

  const toggleLike = (trackId: number) => {
    setLiked((l) => {
      const next = new Set(l);
      if (next.has(trackId)) next.delete(trackId); else next.add(trackId);
      return next;
    });
  };

  const addToQueue = (trackId: number) => {
    setQueue((q) => [...q, trackId]);
  };

  // ---------- Custom playlist management ----------
  const createPlaylist = (name: string) => {
    const id = `custom-${Date.now()}`;
    const np: Playlist = {
      id,
      name,
      description: 'Your playlist',
      emoji: '🎵',
      bg: 'linear-gradient(135deg, #6a1b9a, #4a148c)',
      trackIds: [],
      custom: true,
    };
    setCustomPlaylists((ps) => [...ps, np]);
    return id;
  };

  const deletePlaylist = (id: string) => {
    setCustomPlaylists((ps) => ps.filter((p) => p.id !== id));
    if (view.kind === 'playlist' && view.id === id) setView({ kind: 'home' });
  };

  const addTrackToCustom = (playlistId: string, trackId: number) => {
    setCustomPlaylists((ps) =>
      ps.map((p) => p.id === playlistId
        ? { ...p, trackIds: p.trackIds.includes(trackId) ? p.trackIds : [...p.trackIds, trackId] }
        : p
      )
    );
  };

  const removeTrackFromCustom = (playlistId: string, trackId: number) => {
    setCustomPlaylists((ps) =>
      ps.map((p) => p.id === playlistId
        ? { ...p, trackIds: p.trackIds.filter((id) => id !== trackId) }
        : p
      )
    );
  };

  // ---------- All playlists ----------
  const allPlaylists = useMemo(() => [...DEFAULT_PLAYLISTS, ...customPlaylists], [customPlaylists]);

  // Search results
  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return { tracks: [], playlists: [] };
    return {
      tracks: TRACKS.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.album.toLowerCase().includes(q)
      ),
      playlists: allPlaylists.filter((p) => p.name.toLowerCase().includes(q)),
    };
  }, [search, allPlaylists]);

  // ---------- Render ----------
  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="sfy2-block">
        {/* Hidden audio element for real playback */}
        <audio ref={audioRef} preload="metadata" />

        {/* Sidebar */}
        <div className="sfy2-sidebar">
          <button className="sfy2-logo">
            <SfyIcon size={22} /> Shagga-fy
          </button>
          <div className="sfy2-nav">
            <button className={`sfy2-nav-item${view.kind === 'home' ? ' active' : ''}`}
              onClick={() => setView({ kind: 'home' })} onMouseDown={(e) => e.stopPropagation()}>
              ⌂ Home
            </button>
            <button className={`sfy2-nav-item${view.kind === 'search' ? ' active' : ''}`}
              onClick={() => setView({ kind: 'search' })} onMouseDown={(e) => e.stopPropagation()}>
              ⌕ Search
            </button>
            <button className={`sfy2-nav-item${view.kind === 'library' ? ' active' : ''}`}
              onClick={() => setView({ kind: 'library' })} onMouseDown={(e) => e.stopPropagation()}>
              ☰ Your Library
            </button>
          </div>
          <div className="sfy2-divider" />
          <div className="sfy2-section-head">
            <span>PLAYLISTS</span>
            <button
              className="sfy2-newpl"
              onClick={() => {
                const name = prompt('New playlist name:');
                if (name && name.trim()) {
                  const id = createPlaylist(name.trim());
                  setView({ kind: 'playlist', id });
                }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              title="Create playlist"
            >+</button>
          </div>
          <button className={`sfy2-pl-item${view.kind === 'liked' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'liked' })} onMouseDown={(e) => e.stopPropagation()}>
            <span className="sfy2-pl-icon" style={{ background: 'linear-gradient(135deg, #d81b60, #4a148c)' }}>♥</span>
            <span className="sfy2-pl-name">Liked Songs</span>
            <span className="sfy2-pl-count">{liked.size}</span>
          </button>
          <button className={`sfy2-pl-item${view.kind === 'queue' ? ' active' : ''}`}
            onClick={() => setView({ kind: 'queue' })} onMouseDown={(e) => e.stopPropagation()}>
            <span className="sfy2-pl-icon" style={{ background: '#444' }}>⏶</span>
            <span className="sfy2-pl-name">Queue</span>
            <span className="sfy2-pl-count">{queue.length}</span>
          </button>
          {allPlaylists.map((p) => (
            <button key={p.id}
              className={`sfy2-pl-item${view.kind === 'playlist' && view.id === p.id ? ' active' : ''}`}
              onClick={() => setView({ kind: 'playlist', id: p.id })}
              onMouseDown={(e) => e.stopPropagation()}>
              <span className="sfy2-pl-icon" style={{ background: p.bg }}>{p.emoji}</span>
              <span className="sfy2-pl-name">{p.name}</span>
              {p.custom && <span className="sfy2-pl-tag">custom</span>}
            </button>
          ))}
        </div>

        {/* Main area */}
        <div className="sfy2-main">
          {view.kind === 'home' && (
            <HomeView playlists={DEFAULT_PLAYLISTS} onPickPlaylist={(id) => setView({ kind: 'playlist', id })} onPickTrack={(id) => playTrack(id, TRACKS.map((t) => t.id))} />
          )}
          {view.kind === 'search' && (
            <SearchView search={search} setSearch={setSearch} results={searchResults}
              onPickTrack={(id, ctxIds) => playTrack(id, ctxIds)}
              onPickPlaylist={(id) => setView({ kind: 'playlist', id })}
              currentTrackId={currentTrackId} isPlaying={isPlaying} liked={liked} onToggleLike={toggleLike}
            />
          )}
          {view.kind === 'library' && (
            <LibraryView playlists={allPlaylists} onPickPlaylist={(id) => setView({ kind: 'playlist', id })} likedCount={liked.size} onShowLiked={() => setView({ kind: 'liked' })} />
          )}
          {view.kind === 'playlist' && (() => {
            const p = allPlaylists.find((x) => x.id === view.id);
            if (!p) return <div className="sfy2-empty">Playlist not found.</div>;
            return <PlaylistView
              playlist={p}
              tracks={p.trackIds.map((id) => TRACKS.find((t) => t.id === id)!).filter(Boolean)}
              onPlayAll={() => p.trackIds.length > 0 && playTrack(p.trackIds[0], p.trackIds)}
              onPickTrack={(id) => playTrack(id, p.trackIds)}
              currentTrackId={currentTrackId} isPlaying={isPlaying} liked={liked} onToggleLike={toggleLike}
              onAddToQueue={addToQueue}
              onRemoveTrack={p.custom ? (id) => removeTrackFromCustom(p.id, id) : undefined}
              onDeletePlaylist={p.custom ? () => deletePlaylist(p.id) : undefined}
              allTracks={TRACKS}
              onAddTrack={p.custom ? (id) => addTrackToCustom(p.id, id) : undefined}
            />;
          })()}
          {view.kind === 'liked' && (
            <LikedView
              tracks={TRACKS.filter((t) => liked.has(t.id))}
              onPlayAll={() => {
                const ids = TRACKS.filter((t) => liked.has(t.id)).map((t) => t.id);
                if (ids[0] != null) playTrack(ids[0], ids);
              }}
              onPickTrack={(id) => playTrack(id, TRACKS.filter((t) => liked.has(t.id)).map((t) => t.id))}
              currentTrackId={currentTrackId} isPlaying={isPlaying}
              onToggleLike={toggleLike}
              onAddToQueue={addToQueue}
            />
          )}
          {view.kind === 'queue' && (
            <QueueView
              currentTrack={currentTrack}
              upcoming={queue.map((id) => TRACKS.find((t) => t.id === id)!).filter(Boolean)}
              onPickTrack={(id) => {
                setCurrentTrackId(id);
                setQueue((q) => q.filter((qid) => qid !== id));
                setIsPlaying(true);
                setProgress(0);
              }}
              onClearQueue={() => setQueue([])}
              onRemoveFromQueue={(id) => setQueue((q) => {
                const idx = q.indexOf(id);
                if (idx === -1) return q;
                return [...q.slice(0, idx), ...q.slice(idx + 1)];
              })}
            />
          )}
        </div>

        {/* Player bar */}
        <div className="sfy2-player">
          <div className="sfy2-player-info">
            {currentTrack ? (
              <>
                <div className="sfy2-player-art" style={{ background: currentTrack.bg }}>{currentTrack.emoji}</div>
                <div className="sfy2-player-track">
                  <div className="sfy2-player-title">{currentTrack.title}</div>
                  <div className="sfy2-player-artist">{currentTrack.artist}</div>
                </div>
                <button
                  className={`sfy2-heart${liked.has(currentTrack.id) ? ' liked' : ''}`}
                  onClick={() => toggleLike(currentTrack.id)}
                  onMouseDown={(e) => e.stopPropagation()}
                  title={liked.has(currentTrack.id) ? 'Unlike' : 'Like'}
                >{liked.has(currentTrack.id) ? '♥' : '♡'}</button>
              </>
            ) : (
              <div className="sfy2-player-empty">Pick a song to get started</div>
            )}
          </div>

          <div className="sfy2-player-center">
            <div className="sfy2-controls">
              <button className={`sfy2-shuffle${shuffle ? ' on' : ''}`}
                onClick={() => setShuffle((s) => !s)} onMouseDown={(e) => e.stopPropagation()}
                title="Shuffle">⤨</button>
              <button onClick={playPrev} onMouseDown={(e) => e.stopPropagation()} title="Previous">⏮</button>
              <button className="sfy2-play" onClick={togglePlay} onMouseDown={(e) => e.stopPropagation()}
                title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? '⏸' : '▷'}
              </button>
              <button onClick={playNext} onMouseDown={(e) => e.stopPropagation()} title="Next">⏭</button>
              <button className={`sfy2-repeat repeat-${repeat}`}
                onClick={() => setRepeat((r) => r === 'off' ? 'all' : r === 'all' ? 'one' : 'off')}
                onMouseDown={(e) => e.stopPropagation()}
                title={`Repeat: ${repeat}`}>
                {repeat === 'one' ? '🔂' : '🔁'}
              </button>
            </div>
            <div className="sfy2-bar">
              <span className="sfy2-time">{fmt(progress)}</span>
              <input
                type="range"
                min={0}
                max={currentTrack?.durationSec ?? 0}
                value={progress}
                onChange={(e) => seek(parseInt(e.target.value, 10))}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                disabled={!currentTrack}
                className="sfy2-seek"
              />
              <span className="sfy2-time">{fmt(currentTrack?.durationSec ?? 0)}</span>
            </div>
          </div>

          <div className="sfy2-player-right">
            <button className="sfy2-queue-btn" onClick={() => setView({ kind: 'queue' })} onMouseDown={(e) => e.stopPropagation()} title="Queue">⏶</button>
            <span className="sfy2-vol-icon">🔊</span>
            <input
              type="range"
              min={0} max={1} step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="sfy2-vol"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Subviews ----------

function HomeView({ playlists, onPickPlaylist, onPickTrack }: {
  playlists: Playlist[];
  onPickPlaylist: (id: string) => void;
  onPickTrack: (id: number) => void;
}) {
  return (
    <div className="sfy2-home">
      <h1 className="sfy2-h1">Good arvo, Shagga.</h1>
      <div className="sfy2-shortcut-grid">
        {playlists.slice(0, 6).map((p) => (
          <button key={p.id} className="sfy2-shortcut" onClick={() => onPickPlaylist(p.id)} onMouseDown={(e) => e.stopPropagation()}>
            <div className="sfy2-shortcut-art" style={{ background: p.bg }}>{p.emoji}</div>
            <div className="sfy2-shortcut-name">{p.name}</div>
          </button>
        ))}
      </div>

      <h2 className="sfy2-h2">Made for you</h2>
      <div className="sfy2-card-row">
        {playlists.map((p) => (
          <button key={p.id} className="sfy2-card" onClick={() => onPickPlaylist(p.id)} onMouseDown={(e) => e.stopPropagation()}>
            <div className="sfy2-card-art" style={{ background: p.bg }}>{p.emoji}</div>
            <div className="sfy2-card-title">{p.name}</div>
            <div className="sfy2-card-desc">{p.description}</div>
          </button>
        ))}
      </div>

      <h2 className="sfy2-h2">Trending shaggas</h2>
      <div className="sfy2-card-row">
        {TRACKS.slice(0, 8).map((t) => (
          <button key={t.id} className="sfy2-card" onClick={() => onPickTrack(t.id)} onMouseDown={(e) => e.stopPropagation()}>
            <div className="sfy2-card-art" style={{ background: t.bg }}>{t.emoji}</div>
            <div className="sfy2-card-title">{t.title}</div>
            <div className="sfy2-card-desc">{t.artist}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchView({ search, setSearch, results, onPickTrack, onPickPlaylist, currentTrackId, isPlaying, liked, onToggleLike }: {
  search: string;
  setSearch: (s: string) => void;
  results: { tracks: Track[]; playlists: Playlist[] };
  onPickTrack: (id: number, ctxIds: number[]) => void;
  onPickPlaylist: (id: string) => void;
  currentTrackId: number | null;
  isPlaying: boolean;
  liked: Set<number>;
  onToggleLike: (id: number) => void;
}) {
  return (
    <div className="sfy2-search">
      <input
        autoFocus
        type="text"
        className="sfy2-search-input"
        placeholder="What do you want to listen to?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      />
      {!search.trim() && (
        <div className="sfy2-empty">Search for songs, artists, or playlists.</div>
      )}
      {search.trim() && results.tracks.length === 0 && results.playlists.length === 0 && (
        <div className="sfy2-empty">No results for &quot;{search}&quot;.</div>
      )}
      {results.tracks.length > 0 && (
        <>
          <h2 className="sfy2-h2">Songs</h2>
          <TrackList
            tracks={results.tracks}
            currentTrackId={currentTrackId} isPlaying={isPlaying} liked={liked}
            onPlay={(id) => onPickTrack(id, results.tracks.map((t) => t.id))}
            onToggleLike={onToggleLike}
          />
        </>
      )}
      {results.playlists.length > 0 && (
        <>
          <h2 className="sfy2-h2">Playlists</h2>
          <div className="sfy2-card-row">
            {results.playlists.map((p) => (
              <button key={p.id} className="sfy2-card" onClick={() => onPickPlaylist(p.id)} onMouseDown={(e) => e.stopPropagation()}>
                <div className="sfy2-card-art" style={{ background: p.bg }}>{p.emoji}</div>
                <div className="sfy2-card-title">{p.name}</div>
                <div className="sfy2-card-desc">{p.description}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LibraryView({ playlists, onPickPlaylist, likedCount, onShowLiked }: {
  playlists: Playlist[];
  onPickPlaylist: (id: string) => void;
  likedCount: number;
  onShowLiked: () => void;
}) {
  return (
    <div className="sfy2-library">
      <h1 className="sfy2-h1">Your Library</h1>
      <button className="sfy2-libitem" onClick={onShowLiked} onMouseDown={(e) => e.stopPropagation()}>
        <div className="sfy2-libitem-art" style={{ background: 'linear-gradient(135deg, #d81b60, #4a148c)' }}>♥</div>
        <div>
          <div className="sfy2-libitem-name">Liked Songs</div>
          <div className="sfy2-libitem-meta">Playlist • {likedCount} songs</div>
        </div>
      </button>
      {playlists.map((p) => (
        <button key={p.id} className="sfy2-libitem" onClick={() => onPickPlaylist(p.id)} onMouseDown={(e) => e.stopPropagation()}>
          <div className="sfy2-libitem-art" style={{ background: p.bg }}>{p.emoji}</div>
          <div>
            <div className="sfy2-libitem-name">{p.name}</div>
            <div className="sfy2-libitem-meta">Playlist • {p.trackIds.length} songs{p.custom ? ' • custom' : ''}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function PlaylistView({
  playlist, tracks, onPlayAll, onPickTrack, currentTrackId, isPlaying, liked, onToggleLike,
  onAddToQueue, onRemoveTrack, onDeletePlaylist, allTracks, onAddTrack,
}: {
  playlist: Playlist;
  tracks: Track[];
  onPlayAll: () => void;
  onPickTrack: (id: number) => void;
  currentTrackId: number | null;
  isPlaying: boolean;
  liked: Set<number>;
  onToggleLike: (id: number) => void;
  onAddToQueue: (id: number) => void;
  onRemoveTrack?: (id: number) => void;
  onDeletePlaylist?: () => void;
  allTracks: Track[];
  onAddTrack?: (id: number) => void;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const totalSec = tracks.reduce((sum, t) => sum + t.durationSec, 0);
  const totalH = Math.floor(totalSec / 3600);
  const totalM = Math.floor((totalSec % 3600) / 60);
  const totalLabel = totalH > 0 ? `${totalH} hr ${totalM} min` : `${totalM} min`;

  return (
    <div className="sfy2-playlist">
      <div className="sfy2-pl-banner" style={{ background: playlist.bg }}>
        <div className="sfy2-pl-banner-art">{playlist.emoji}</div>
        <div className="sfy2-pl-banner-info">
          <div className="sfy2-pl-banner-tag">PLAYLIST</div>
          <div className="sfy2-pl-banner-title">{playlist.name}</div>
          <div className="sfy2-pl-banner-desc">{playlist.description}</div>
          <div className="sfy2-pl-banner-meta">{tracks.length} songs, {totalLabel}{playlist.custom ? ' • custom' : ''}</div>
        </div>
      </div>
      <div className="sfy2-pl-actions">
        <button className="sfy2-playall"
          onClick={onPlayAll}
          onMouseDown={(e) => e.stopPropagation()}
          disabled={tracks.length === 0}>▷</button>
        {playlist.custom && (
          <>
            <button className="sfy2-pl-add" onClick={() => setShowAdd((v) => !v)} onMouseDown={(e) => e.stopPropagation()}>
              {showAdd ? 'Done adding' : '+ Add tracks'}
            </button>
            <button className="sfy2-pl-delete" onClick={() => {
              if (confirm(`Delete "${playlist.name}"?`) && onDeletePlaylist) onDeletePlaylist();
            }} onMouseDown={(e) => e.stopPropagation()}>Delete playlist</button>
          </>
        )}
      </div>
      {tracks.length === 0 && (
        <div className="sfy2-empty" style={{ padding: '40px 0' }}>No tracks yet. Click + Add tracks above.</div>
      )}
      {tracks.length > 0 && (
        <TrackList
          tracks={tracks}
          currentTrackId={currentTrackId} isPlaying={isPlaying} liked={liked}
          onPlay={onPickTrack} onToggleLike={onToggleLike}
          onAddToQueue={onAddToQueue}
          onRemove={onRemoveTrack}
        />
      )}
      {showAdd && playlist.custom && onAddTrack && (
        <>
          <h2 className="sfy2-h2" style={{ marginTop: 24 }}>Add tracks</h2>
          <div className="sfy2-add-grid">
            {allTracks.filter((t) => !playlist.trackIds.includes(t.id)).map((t) => (
              <button key={t.id} className="sfy2-add-item" onClick={() => onAddTrack(t.id)} onMouseDown={(e) => e.stopPropagation()}>
                <div className="sfy2-add-art" style={{ background: t.bg }}>{t.emoji}</div>
                <div className="sfy2-add-info">
                  <div className="sfy2-add-title">{t.title}</div>
                  <div className="sfy2-add-artist">{t.artist}</div>
                </div>
                <span className="sfy2-add-plus">+</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LikedView({ tracks, onPlayAll, onPickTrack, currentTrackId, isPlaying, onToggleLike, onAddToQueue }: {
  tracks: Track[];
  onPlayAll: () => void;
  onPickTrack: (id: number) => void;
  currentTrackId: number | null;
  isPlaying: boolean;
  onToggleLike: (id: number) => void;
  onAddToQueue: (id: number) => void;
}) {
  return (
    <div className="sfy2-playlist">
      <div className="sfy2-pl-banner" style={{ background: 'linear-gradient(135deg, #d81b60, #4a148c)' }}>
        <div className="sfy2-pl-banner-art">♥</div>
        <div className="sfy2-pl-banner-info">
          <div className="sfy2-pl-banner-tag">PLAYLIST</div>
          <div className="sfy2-pl-banner-title">Liked Songs</div>
          <div className="sfy2-pl-banner-desc">tracks you&apos;ve hit the heart on</div>
          <div className="sfy2-pl-banner-meta">{tracks.length} songs</div>
        </div>
      </div>
      <div className="sfy2-pl-actions">
        <button className="sfy2-playall" onClick={onPlayAll} onMouseDown={(e) => e.stopPropagation()} disabled={tracks.length === 0}>▷</button>
      </div>
      {tracks.length === 0 ? (
        <div className="sfy2-empty" style={{ padding: '40px 0' }}>You haven&apos;t liked anything yet. Hit ♡ on any track.</div>
      ) : (
        <TrackList
          tracks={tracks}
          currentTrackId={currentTrackId} isPlaying={isPlaying}
          liked={new Set(tracks.map((t) => t.id))}
          onPlay={onPickTrack}
          onToggleLike={onToggleLike}
          onAddToQueue={onAddToQueue}
        />
      )}
    </div>
  );
}

function QueueView({ currentTrack, upcoming, onPickTrack, onClearQueue, onRemoveFromQueue }: {
  currentTrack: Track | null;
  upcoming: Track[];
  onPickTrack: (id: number) => void;
  onClearQueue: () => void;
  onRemoveFromQueue: (id: number) => void;
}) {
  return (
    <div className="sfy2-queueview">
      <div className="sfy2-queue-head">
        <h1 className="sfy2-h1" style={{ margin: 0 }}>Queue</h1>
        <button className="sfy2-pl-delete" onClick={onClearQueue} onMouseDown={(e) => e.stopPropagation()} disabled={upcoming.length === 0}>Clear queue</button>
      </div>
      {currentTrack && (
        <>
          <h3 className="sfy2-h3">Now playing</h3>
          <div className="sfy2-queue-row playing">
            <div className="sfy2-queue-art" style={{ background: currentTrack.bg }}>{currentTrack.emoji}</div>
            <div>
              <div className="sfy2-queue-title">{currentTrack.title}</div>
              <div className="sfy2-queue-artist">{currentTrack.artist}</div>
            </div>
          </div>
        </>
      )}
      <h3 className="sfy2-h3">Up next ({upcoming.length})</h3>
      {upcoming.length === 0 ? (
        <div className="sfy2-empty">Queue is empty. Right-click or click ⋮ on any track to add.</div>
      ) : (
        upcoming.map((t, i) => (
          <button key={`${t.id}-${i}`} className="sfy2-queue-row" onClick={() => onPickTrack(t.id)} onMouseDown={(e) => e.stopPropagation()}>
            <div className="sfy2-queue-art" style={{ background: t.bg }}>{t.emoji}</div>
            <div>
              <div className="sfy2-queue-title">{t.title}</div>
              <div className="sfy2-queue-artist">{t.artist}</div>
            </div>
            <button className="sfy2-queue-remove" onClick={(e) => { e.stopPropagation(); onRemoveFromQueue(t.id); }} onMouseDown={(e) => e.stopPropagation()}>✕</button>
          </button>
        ))
      )}
    </div>
  );
}

// ---------- Track list (reusable) ----------
function TrackList({ tracks, currentTrackId, isPlaying, liked, onPlay, onToggleLike, onAddToQueue, onRemove }: {
  tracks: Track[];
  currentTrackId: number | null;
  isPlaying: boolean;
  liked: Set<number>;
  onPlay: (id: number) => void;
  onToggleLike: (id: number) => void;
  onAddToQueue?: (id: number) => void;
  onRemove?: (id: number) => void;
}) {
  return (
    <div className="sfy2-tracklist">
      <div className="sfy2-tracklist-head">
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span>⏱</span>
        <span></span>
      </div>
      {tracks.map((t, i) => {
        const isCurrent = currentTrackId === t.id;
        return (
          <button
            key={t.id}
            className={`sfy2-trackrow${isCurrent ? ' current' : ''}`}
            onDoubleClick={() => onPlay(t.id)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <span className="sfy2-trackrow-num">
              {isCurrent && isPlaying ? '♪' : i + 1}
            </span>
            <span className="sfy2-trackrow-title">
              <span className="sfy2-trackrow-art" style={{ background: t.bg }}>{t.emoji}</span>
              <span className="sfy2-trackrow-info">
                <span className="sfy2-trackrow-name">{t.title}</span>
                <span className="sfy2-trackrow-artist">{t.artist}</span>
              </span>
            </span>
            <span className="sfy2-trackrow-album">{t.album}</span>
            <span className="sfy2-trackrow-duration">{fmt(t.durationSec)}</span>
            <span className="sfy2-trackrow-actions" onClick={(e) => e.stopPropagation()}>
              <button
                className={`sfy2-trackrow-heart${liked.has(t.id) ? ' liked' : ''}`}
                onClick={(e) => { e.stopPropagation(); onToggleLike(t.id); }}
                title={liked.has(t.id) ? 'Unlike' : 'Like'}
              >{liked.has(t.id) ? '♥' : '♡'}</button>
              <button
                className="sfy2-trackrow-play"
                onClick={(e) => { e.stopPropagation(); onPlay(t.id); }}
                title="Play"
              >▷</button>
              {onAddToQueue && (
                <button
                  className="sfy2-trackrow-queue"
                  onClick={(e) => { e.stopPropagation(); onAddToQueue(t.id); }}
                  title="Add to queue"
                >＋</button>
              )}
              {onRemove && (
                <button
                  className="sfy2-trackrow-remove"
                  onClick={(e) => { e.stopPropagation(); onRemove(t.id); }}
                  title="Remove from playlist"
                >✕</button>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
