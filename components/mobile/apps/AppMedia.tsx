'use client';
import React, { useState, useEffect, useRef } from 'react';
import { galleryList, shaggasList } from '../../imageManifest';

// ============================================================
// WEATHER
// ============================================================
export const AppWeather: React.FC = () => {
  const hourly = [
    { h: 'Now',  temp: 14, icon: '☁️' },
    { h: '14',   temp: 15, icon: '🌦️' },
    { h: '15',   temp: 14, icon: '🌧️' },
    { h: '16',   temp: 13, icon: '🌧️' },
    { h: '17',   temp: 12, icon: '🌧️' },
    { h: '18',   temp: 12, icon: '☁️' },
    { h: '19',   temp: 11, icon: '☁️' },
    { h: '20',   temp: 10, icon: '🌙' },
    { h: '21',   temp: 10, icon: '🌙' },
  ];
  const days = [
    { d: 'Today',     icon: '🌧️', lo: 10, hi: 15 },
    { d: 'Tomorrow',  icon: '🌦️', lo: 9,  hi: 14 },
    { d: 'Wednesday', icon: '☁️', lo: 11, hi: 16 },
    { d: 'Thursday',  icon: '☁️', lo: 11, hi: 17 },
    { d: 'Friday',    icon: '🌧️', lo: 10, hi: 14 },
    { d: 'Saturday',  icon: '🌧️', lo: 9,  hi: 13 },
    { d: 'Sunday',    icon: '☁️', lo: 10, hi: 15 },
  ];
  return (
    <div className="wx-app">
      <div className="wx-hero">
        <div className="wx-loc">Liverpool</div>
        <div className="wx-temp">14°</div>
        <div className="wx-cond">Overcast · light drizzle</div>
        <div className="wx-hilo">H:15° L:10° · feels like 12°</div>
      </div>
      <div className="wx-card">
        <div className="wx-card-h">⏱ Hourly forecast</div>
        <div className="wx-hourly">
          {hourly.map((h) => (
            <div key={h.h} className="wx-hour">
              <span className="wx-hour-h">{h.h}</span>
              <span className="wx-hour-icon">{h.icon}</span>
              <span className="wx-hour-t">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>
      <div className="wx-card">
        <div className="wx-card-h">📅 7-day forecast</div>
        {days.map((d) => (
          <div key={d.d} className="wx-day">
            <span className="wx-day-name">{d.d}</span>
            <span className="wx-day-icon">{d.icon}</span>
            <div className="wx-day-bar">
              <span className="wx-day-bar-fill" style={{ left: `${(d.lo - 8) / 12 * 100}%`, width: `${(d.hi - d.lo) / 12 * 100}%` }} />
            </div>
            <span className="wx-day-lo">{d.lo}°</span>
            <span className="wx-day-hi">{d.hi}°</span>
          </div>
        ))}
      </div>
      <div className="wx-footer">drizzle. always drizzle. it's liverpool.</div>
    </div>
  );
};

// ============================================================
// STOCKS
// ============================================================
const STOCKS_DATA = [
  { sym: 'STIK',  name: 'Shagga Inc.',          price: 420.69, change:  +12.42, chart: [320, 340, 320, 360, 380, 350, 400, 420] },
  { sym: 'BCKLY', name: 'Buckley Cards Co.',    price:   1.04, change:  -0.02, chart: [1.10, 1.05, 1.08, 1.02, 1.04, 1.06, 1.04, 1.04] },
  { sym: 'PHIL',  name: "Phil's Diesel Group",  price:  88.20, change:  +2.41, chart: [70, 75, 72, 80, 78, 82, 86, 88] },
  { sym: 'BIN',   name: 'Liverpool Bin Co.',    price:  12.40, change:  -0.84, chart: [14, 13.5, 13, 13.2, 12.8, 12.6, 12.4, 12.4] },
  { sym: 'MELT',  name: 'Melt Holdings',        price:   0.04, change:  -0.41, chart: [1, 0.8, 0.6, 0.4, 0.2, 0.1, 0.06, 0.04] },
  { sym: 'GRGS',  name: 'Greggs',               price: 2840.00, change: +14.20, chart: [2700, 2750, 2780, 2790, 2810, 2820, 2830, 2840] },
];
export const AppStocks: React.FC = () => {
  const [active, setActive] = useState(STOCKS_DATA[0]);
  return (
    <div className="stocks-app">
      <div className="stocks-hero">
        <div className="stocks-hero-name">{active.name}</div>
        <div className="stocks-hero-sym">{active.sym}</div>
        <div className="stocks-hero-price">£{active.price.toFixed(2)}</div>
        <div className={`stocks-hero-change ${active.change >= 0 ? 'stocks-up' : 'stocks-down'}`}>
          {active.change >= 0 ? '▲' : '▼'} {active.change >= 0 ? '+' : ''}{active.change.toFixed(2)} ({(active.change / (active.price - active.change) * 100).toFixed(2)}%)
        </div>
        <Sparkline data={active.chart} positive={active.change >= 0} big />
      </div>
      <div className="stocks-list">
        {STOCKS_DATA.map((s) => (
          <button key={s.sym} className={`stocks-row ${s.sym === active.sym ? 'stocks-row-active' : ''}`} onClick={() => setActive(s)}>
            <div className="stocks-row-left">
              <div className="stocks-row-sym">{s.sym}</div>
              <div className="stocks-row-name">{s.name}</div>
            </div>
            <Sparkline data={s.chart} positive={s.change >= 0} />
            <div className={`stocks-row-pct ${s.change >= 0 ? 'stocks-up' : 'stocks-down'}`}>
              {s.change >= 0 ? '+' : ''}{(s.change / (s.price - s.change) * 100).toFixed(2)}%
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const Sparkline: React.FC<{ data: number[]; positive: boolean; big?: boolean }> = ({ data, positive, big }) => {
  const w = big ? 280 : 60, h = big ? 80 : 30;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  const stroke = positive ? '#5fd16f' : '#ff5a5a';
  return (
    <svg className={big ? 'stocks-sparkline-big' : 'stocks-sparkline'} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline fill="none" stroke={stroke} strokeWidth={big ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

// ============================================================
// MAPS
// ============================================================
// ============================================================
// MAPS — list of saved places + tap to open in Google Maps
// (Reviewed = your real maps URLs. Liverpool = stupid joke on tap.)
// ============================================================
import { REVIEWS, CATEGORY_META } from '../../reviewsData';

interface ReviewedPlace {
  name: string;
  area: string;
  emoji: string;
  url: string;
  rating: number;
  badge?: string;
}

interface Landmark {
  name: string;
  area: string;
  emoji: string;
}

const LIVERPOOL_LANDMARKS: Landmark[] = [
  { name: 'Liverpool ONE',         area: 'City Centre · L1', emoji: '🛍️' },
  { name: 'Royal Albert Dock',     area: 'Waterfront · L3',  emoji: '⚓'  },
  { name: 'Anfield Stadium',       area: 'Anfield · L4',     emoji: '⚽'  },
  { name: 'Sefton Park',           area: 'Aigburth · L17',   emoji: '🌳'  },
  { name: 'Bold Street',           area: 'City Centre · L1', emoji: '🍴'  },
  { name: 'Liverpool Lime Street', area: 'City Centre · L1', emoji: '🚆'  },
  { name: 'Crosby Beach',          area: 'Crosby · L23',     emoji: '🏖️'  },
  { name: 'Lidl Speke (middle aisle)', area: 'Speke · L24',  emoji: '🥕' },
  { name: 'Mathew Street',         area: 'City Centre · L2', emoji: '🎸' },
  { name: 'Stanley Park',          area: 'Anfield · L4',     emoji: '🌲' },
];

const STUPID_CAPTIONS = [
  "this is what {name} looks like apparently",
  "shagga.org maps doesn't believe in directions",
  "imagine this is a map of {name}",
  "you're here. somewhere.",
  "if you wanted real directions you'd have a real maps app",
  "{name}? never heard of her",
  "trust me bro, that's {name}",
  "shagga.org legally can't show you a real map. lawyers said no.",
  "this is what came out the random image generator. enjoy {name}.",
  "go outside and look at {name} yourself you absolute melt",
  "{name} is a feeling, not a place",
  "the real {name} was the friends we made along the way",
];

export const AppMaps: React.FC = () => {
  const [tab, setTab] = useState<'reviewed' | 'liverpool'>('reviewed');
  const [search, setSearch] = useState('');
  const [joke, setJoke] = useState<{ src: string; caption: string; landmark: string } | null>(null);
  const galleryImages = galleryList();

  // Reviewed places straight from the user's review data (real Google Maps URLs)
  const reviewedPlaces: ReviewedPlace[] = REVIEWS
    .filter((r) => r.mapUrl)
    .map((r) => ({
      name: r.venue,
      area: r.location,
      emoji: CATEGORY_META[r.category].emoji,
      url: r.mapUrl!,
      rating: r.rating,
      badge: r.badge,
    }))
    .sort((a, b) => b.rating - a.rating);

  const filterFn = <T extends { name: string; area: string }>(arr: T[]): T[] => {
    if (!search.trim()) return arr;
    const q = search.toLowerCase();
    return arr.filter((p) => p.name.toLowerCase().includes(q) || p.area.toLowerCase().includes(q));
  };

  const handleLandmarkTap = (l: Landmark) => {
    if (galleryImages.length === 0) return;
    const src = galleryImages[Math.floor(Math.random() * galleryImages.length)];
    const template = STUPID_CAPTIONS[Math.floor(Math.random() * STUPID_CAPTIONS.length)];
    const caption = template.replace(/\{name\}/g, l.name);
    setJoke({ src, caption, landmark: l.name });
  };

  // Joke overlay: random image fullscreen
  if (joke) {
    return (
      <div className="maps-joke">
        <button className="maps-joke-close" onClick={() => setJoke(null)}>‹ Maps</button>
        <div className="maps-joke-img-wrap">
          <img src={joke.src} alt="" className="maps-joke-img" />
        </div>
        <div className="maps-joke-caption">
          <div className="maps-joke-landmark">📍 {joke.landmark}</div>
          <div className="maps-joke-text">{joke.caption}</div>
          <button className="maps-joke-again" onClick={() => handleLandmarkTap({ name: joke.landmark, area: '', emoji: '' })}>
            try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="maps-app maps-app-v2">
      <div className="maps-search">
        <input
          placeholder={tab === 'reviewed' ? 'Search places' : 'Search Liverpool'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="maps-tabs">
        <button className={tab === 'reviewed' ? 'maps-tab maps-tab-on' : 'maps-tab'} onClick={() => setTab('reviewed')}>
          ⭐ Reviewed ({reviewedPlaces.length})
        </button>
        <button className={tab === 'liverpool' ? 'maps-tab maps-tab-on' : 'maps-tab'} onClick={() => setTab('liverpool')}>
          📍 Liverpool
        </button>
      </div>

      {tab === 'reviewed' && (
        <div className="maps-list">
          {filterFn(reviewedPlaces).length === 0 && (
            <p className="maps-empty">{search ? `No matches for "${search}".` : 'No reviewed places yet.'}</p>
          )}
          {filterFn(reviewedPlaces).map((p) => (
            <a
              key={p.name}
              className="maps-row"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="maps-row-emoji">{p.emoji}</div>
              <div className="maps-row-text">
                <div className="maps-row-name">{p.name}</div>
                <div className="maps-row-area">{p.area}</div>
                {p.badge && <div className="maps-row-badge">{p.badge}</div>}
              </div>
              <div className="maps-row-rating">
                <span>{p.rating.toFixed(1)}</span>
                <span className="maps-row-rating-sub">/10</span>
              </div>
              <span className="maps-row-arrow">›</span>
            </a>
          ))}
        </div>
      )}

      {tab === 'liverpool' && (
        <div className="maps-list">
          {filterFn(LIVERPOOL_LANDMARKS).length === 0 && (
            <p className="maps-empty">No matches for "{search}".</p>
          )}
          {filterFn(LIVERPOOL_LANDMARKS).map((l) => (
            <button
              key={l.name}
              type="button"
              className="maps-row maps-row-button"
              onClick={() => handleLandmarkTap(l)}
            >
              <div className="maps-row-emoji">{l.emoji}</div>
              <div className="maps-row-text">
                <div className="maps-row-name">{l.name}</div>
                <div className="maps-row-area">{l.area}</div>
              </div>
              <span className="maps-row-arrow">›</span>
            </button>
          ))}
        </div>
      )}

      <p className="maps-foot">
        {tab === 'reviewed' ? 'Taps open Google Maps in a new tab.' : 'Taps open a real map of the area. allegedly.'}
      </p>
    </div>
  );
};

// ============================================================
// PHOTOS
// ============================================================
export const AppPhotos: React.FC = () => {
  const photos = galleryList(); // real images from /public/images/gallery
  const [open, setOpen] = useState<number | null>(null);

  if (open !== null) {
    const url = photos[open];
    return (
      <div className="photos-viewer" onClick={() => setOpen(null)}>
        <div className="photos-viewer-bar">‹ Photos</div>
        <div className="photos-viewer-img-wrap">
          <img src={url} alt="" className="photos-viewer-real" />
        </div>
        <div className="photos-viewer-meta">{open + 1} of {photos.length}</div>
      </div>
    );
  }
  return (
    <div className="photos-app">
      <div className="photos-grid">
        {photos.map((src, i) => (
          <button key={i} className="photos-tile photos-tile-real" onClick={() => setOpen(i)}>
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// CAMERA
// ============================================================
export const AppCamera: React.FC = () => {
  const [flashed, setFlashed] = useState(false);
  const [count, setCount] = useState(0);
  const [showRoll, setShowRoll] = useState(false);
  const shutter = () => {
    setFlashed(true);
    setCount((c) => c + 1);
    window.setTimeout(() => setFlashed(false), 280);
  };
  return (
    <div className="cam-app">
      <div className="cam-viewfinder">
        <div className="cam-grid-line cam-grid-line-h" style={{ top: '33%' }} />
        <div className="cam-grid-line cam-grid-line-h" style={{ top: '67%' }} />
        <div className="cam-grid-line cam-grid-line-v" style={{ left: '33%' }} />
        <div className="cam-grid-line cam-grid-line-v" style={{ left: '67%' }} />
        <div className="cam-focus-ring" />
        <div className="cam-hint">camera unavailable on this device · pretend you're an artist</div>
        {flashed && <div className="cam-flash" />}
      </div>
      <div className="cam-controls">
        <button className="cam-roll" onClick={() => setShowRoll(true)}>
          <span>{count}</span>
        </button>
        <button className="cam-shutter" onClick={shutter} aria-label="Take photo" />
        <button className="cam-flip">⟲</button>
      </div>
      {showRoll && (
        <div className="cam-roll-overlay" onClick={() => setShowRoll(false)}>
          <p>{count === 0 ? 'No photos taken yet.' : `${count} ${count === 1 ? 'photo' : 'photos'} this session.`}</p>
          <p className="cam-roll-sub">tap anywhere to dismiss</p>
        </div>
      )}
    </div>
  );
};
