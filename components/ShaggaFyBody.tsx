'use client';

import React, { useEffect, useState } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  emoji: string;
}

const PLAYLISTS = [
  { name: 'Top Shagga 2003', emoji: '🌭', tracks: [0, 1, 2, 3] },
  { name: 'Bunnings Bangers', emoji: '🔨', tracks: [4, 5, 0, 7] },
  { name: 'Cooked Sunday Vibes', emoji: '🍺', tracks: [6, 2, 1, 5] },
  { name: 'Maggie Swoop Season', emoji: '🐦‍⬛', tracks: [3, 7, 6, 4] },
  { name: 'Goon Bag Gold', emoji: '🍷', tracks: [1, 5, 7, 0] },
];

const TRACKS: Track[] = [
  { id: 0, title: 'Down Under (but cooked)',         artist: 'Men At Snag',         duration: '3:47', emoji: '🌭' },
  { id: 1, title: 'Goon of Fortune',                 artist: 'The Hills Hoists',    duration: '4:12', emoji: '🍷' },
  { id: 2, title: 'Sausage Sizzle Saturday',         artist: 'Bunnings Boys',       duration: '2:58', emoji: '🔨' },
  { id: 3, title: 'Maggie Swoop Anthem',             artist: 'Beak Riot',           duration: '5:03', emoji: '🪶' },
  { id: 4, title: "She'll Be Right (Extended Mix)",  artist: 'Tradies Anonymous',   duration: '7:47', emoji: '🛠️' },
  { id: 5, title: 'Yeah Nah Yeah Nah',               artist: 'The Bazzas',          duration: '2:31', emoji: '🤙' },
  { id: 6, title: 'Top Shagga (Radio Edit)',         artist: 'Big Shagga',          duration: '3:21', emoji: '🤠' },
  { id: 7, title: 'Cooked at the Dam',               artist: 'Cooked Dave',         duration: '4:56', emoji: '🌊' },
];

export default function ShaggaFyBody() {
  const [activePlaylist, setActivePlaylist] = useState(0);
  const [playing, setPlaying] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 200);
    return () => clearInterval(id);
  }, [isPlaying]);

  const playlist = PLAYLISTS[activePlaylist];
  const current = TRACKS[playing];
  const tracksInPlaylist = playlist.tracks.map((id) => TRACKS[id]);

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="sfy-block">
        <div className="sfy-sidebar">
          <div className="sfy-logo">▶ Shagga-fy</div>
          <div className="sfy-nav">
            <div className="sfy-nav-item active">🏠 Home</div>
            <div className="sfy-nav-item">🔍 Search</div>
            <div className="sfy-nav-item">📚 Library</div>
          </div>
          <div className="sfy-playlists-title">YA PLAYLISTS</div>
          {PLAYLISTS.map((p, i) => (
            <button
              key={p.name}
              className={`sfy-playlist${i === activePlaylist ? ' active' : ''}`}
              onClick={() => setActivePlaylist(i)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <span>{p.emoji}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        <div className="sfy-main">
          <div className="sfy-banner">
            <div className="sfy-banner-art">{playlist.emoji}</div>
            <div>
              <div className="sfy-banner-label">PLAYLIST</div>
              <div className="sfy-banner-title">{playlist.name}</div>
              <div className="sfy-banner-meta">{tracksInPlaylist.length} tracks · about a billion hours of pure shagga</div>
            </div>
          </div>
          <div className="sfy-tracks">
            {tracksInPlaylist.map((t, i) => (
              <button
                key={t.id}
                className={`sfy-track${playing === t.id ? ' playing' : ''}`}
                onClick={() => { setPlaying(t.id); setIsPlaying(true); setProgress(0); }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <span className="sfy-track-num">{i + 1}</span>
                <span className="sfy-track-emoji">{t.emoji}</span>
                <span className="sfy-track-title">{t.title}</span>
                <span className="sfy-track-artist">{t.artist}</span>
                <span className="sfy-track-duration">{t.duration}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sfy-player">
          <div className="sfy-player-info">
            <span className="sfy-player-art">{current.emoji}</span>
            <div>
              <div className="sfy-player-title">{current.title}</div>
              <div className="sfy-player-artist">{current.artist}</div>
            </div>
          </div>
          <div className="sfy-player-controls">
            <div className="sfy-controls-row">
              <button onClick={() => setPlaying((p) => Math.max(0, p - 1))} onMouseDown={(e) => e.stopPropagation()}>⏮</button>
              <button
                className="sfy-play"
                onClick={() => setIsPlaying((p) => !p)}
                onMouseDown={(e) => e.stopPropagation()}
              >{isPlaying ? '⏸' : '▶'}</button>
              <button onClick={() => setPlaying((p) => Math.min(TRACKS.length - 1, p + 1))} onMouseDown={(e) => e.stopPropagation()}>⏭</button>
            </div>
            <div className="sfy-progress">
              <div className="sfy-progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="sfy-volume">🔊 ▮▮▮▮▮▯▯▯</div>
        </div>
      </div>
    </div>
  );
}
