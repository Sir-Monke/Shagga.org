'use client';

import React, { useState } from 'react';

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  age: string;
  duration: string;
  thumbBg: string;
  emoji: string;
}

const VIDEOS: Video[] = [
  { id: 1, title: '10 hour magpie attack compilation (you wont believe #7)', channel: 'OUTBACK MAYHEM', views: '4.7M views', age: '3 days ago', duration: '10:00:47', thumbBg: 'linear-gradient(135deg, #1c1c1c 0%, #5a5a5a 100%)', emoji: '🐦‍⬛' },
  { id: 2, title: 'how to put a snag on a sandwich (CORRECT WAY)', channel: 'BunningsTV', views: '892k views', age: '2 weeks ago', duration: '14:22', thumbBg: 'linear-gradient(135deg, #f00 0%, #ff8c00 100%)', emoji: '🌭' },
  { id: 3, title: 'I lived in a Bunnings for 24 hours (NOT clickbait!!)', channel: 'Top Shagga', views: '2.1M views', age: '1 month ago', duration: '23:11', thumbBg: 'linear-gradient(135deg, #00a86b 0%, #0066cc 100%)', emoji: '🔨' },
  { id: 4, title: 'goon of fortune RULES explained (kid friendly version)', channel: 'goonlord3000', views: '47k views', age: '5 months ago', duration: '7:32', thumbBg: 'linear-gradient(135deg, #c4006c 0%, #6c0040 100%)', emoji: '🍷' },
  { id: 5, title: 'every aussie movie ever in 47 seconds', channel: 'shaggatainment', views: '14M views', age: '4 years ago', duration: '0:47', thumbBg: 'linear-gradient(135deg, #fff200 0%, #ff7e2d 100%)', emoji: '🎬' },
  { id: 6, title: 'reacting to my nan reacting to TikTok', channel: 'shagga reacts', views: '128k views', age: '1 day ago', duration: '12:08', thumbBg: 'linear-gradient(135deg, #ff3b6b 0%, #6b1a8c 100%)', emoji: '👵' },
  { id: 7, title: "PUTTING THONGS IN THE MICROWAVE (DO NOT TRY)", channel: 'cooked content', views: '600 views', age: '2 hours ago', duration: '4:12', thumbBg: 'linear-gradient(135deg, #2f4f4f 0%, #696969 100%)', emoji: '🔥' },
  { id: 8, title: 'asmr - reading shagga.txt for 4 hours', channel: 'sleepy shagga', views: '47 views', age: '3 weeks ago', duration: '4:00:00', thumbBg: 'linear-gradient(135deg, #4a148c 0%, #1a237e 100%)', emoji: '😴' },
];

export default function ShaggaTubeBody() {
  const [playing, setPlaying] = useState<Video | null>(null);
  const [search, setSearch] = useState('');

  if (playing) {
    return (
      <div className="xp-content" style={{ padding: 0 }}>
        <div className="ytube-block">
          <div className="ytube-header">
            <button
              className="ytube-back"
              onClick={() => setPlaying(null)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >← Back</button>
            <div className="ytube-logo">▶ ShaggaTube</div>
          </div>
          <div className="ytube-player" style={{ background: playing.thumbBg }}>
            <div className="ytube-player-emoji">{playing.emoji}</div>
            <div className="ytube-buffering">⚠ buffering at 56k... please wait... (this may take 47 hours)</div>
            <div className="ytube-fake-controls">
              <span>⏸</span>
              <div className="ytube-progress"><div className="ytube-progress-bar" /></div>
              <span>0:03 / {playing.duration}</span>
            </div>
          </div>
          <div className="ytube-video-info">
            <h3>{playing.title}</h3>
            <div className="ytube-channel-row">
              <span className="ytube-channel-avatar">📺</span>
              <strong>{playing.channel}</strong>
              <button className="ytube-sub-btn">SUBSCRIBE</button>
            </div>
            <div className="ytube-meta">{playing.views} • {playing.age}</div>
            <div className="ytube-comments-title">Comments</div>
            <div className="ytube-comment">
              <strong>@bigshagga94:</strong> first 🥇
            </div>
            <div className="ytube-comment">
              <strong>@nanofashagga:</strong> please call ur mother
            </div>
            <div className="ytube-comment">
              <strong>@cooked_dave:</strong> who is here in 2003 👀👀
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="ytube-block">
        <div className="ytube-header">
          <div className="ytube-logo">▶ ShaggaTube</div>
          <input
            className="ytube-search"
            placeholder="Search shaggas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          />
        </div>
        <div className="ytube-grid">
          {VIDEOS.map((v) => (
            <button
              key={v.id}
              className="ytube-card"
              onClick={() => setPlaying(v)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <div className="ytube-thumb" style={{ background: v.thumbBg }}>
                <span className="ytube-thumb-emoji">{v.emoji}</span>
                <span className="ytube-duration">{v.duration}</span>
              </div>
              <div className="ytube-card-info">
                <div className="ytube-card-title">{v.title}</div>
                <div className="ytube-card-channel">{v.channel}</div>
                <div className="ytube-card-meta">{v.views} • {v.age}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
