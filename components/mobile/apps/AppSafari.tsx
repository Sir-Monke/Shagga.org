'use client';
import React, { useState, useCallback } from 'react';

interface Site {
  url: string;
  title: string;
  render: () => React.ReactNode;
}

const SITES: Record<string, Site> = {
  'shagga.org': {
    url: 'shagga.org',
    title: 'shagga.org',
    render: () => (
      <div className="shafari-page">
        <div className="shafari-hero">
          <h1 style={{ fontSize: 36, margin: 0 }}>shagga.org</h1>
          <p style={{ color: '#888', margin: '4px 0 18px' }}>top shagga energy only.</p>
        </div>
        <h2>welcome to the dot org</h2>
        <p>You're on the mobile version. The desktop is a fully working <em>Windows XP</em>. Try it on a laptop.</p>
        <div className="shafari-cards">
          <a className="shafari-card" href="#" onClick={(e) => { e.preventDefault(); (window as any).__shafariNav?.('shagga.org/reviews'); }}>
            <div className="shafari-card-emoji">⭐</div>
            <div className="shafari-card-text">
              <div className="shafari-card-title">Reviews</div>
              <div className="shafari-card-sub">Liverpool feed</div>
            </div>
          </a>
          <a className="shafari-card" href="#" onClick={(e) => { e.preventDefault(); (window as any).__shafariNav?.('shagga.org/portfolio'); }}>
            <div className="shafari-card-emoji">💼</div>
            <div className="shafari-card-text">
              <div className="shafari-card-title">Portfolio</div>
              <div className="shafari-card-sub">For the recruiters</div>
            </div>
          </a>
          <a className="shafari-card" href="#" onClick={(e) => { e.preventDefault(); (window as any).__shafariNav?.('shaggatube.shagga'); }}>
            <div className="shafari-card-emoji">📺</div>
            <div className="shafari-card-text">
              <div className="shafari-card-title">ShaggaTube</div>
              <div className="shafari-card-sub">Top viral content</div>
            </div>
          </a>
          <a className="shafari-card" href="#" onClick={(e) => { e.preventDefault(); (window as any).__shafariNav?.('phildrives.co.uk'); }}>
            <div className="shafari-card-emoji">🚗</div>
            <div className="shafari-card-text">
              <div className="shafari-card-title">Phil's Diesel</div>
              <div className="shafari-card-sub">phildrives.co.uk</div>
            </div>
          </a>
        </div>
        <p style={{ marginTop: 24, color: '#888', fontSize: 12 }}>© Sir Monke. 2026. all wrongs reserved. contact: <a href="mailto:hello@shagga.org">hello@shagga.org</a></p>
      </div>
    ),
  },
  'shagga.org/reviews': {
    url: 'shagga.org/reviews',
    title: 'Reviews · shagga.org',
    render: () => (
      <div className="shafari-page">
        <h1>Reviews</h1>
        <p>You'd be better off opening the Reviews app, lad. The whole point of icons is you don't have to type a URL.</p>
        <p style={{ color: '#888' }}>but here's a teaser:</p>
        <div className="shafari-review-list">
          <div className="shafari-review-item">
            <div className="shafari-review-rating" style={{ background: '#1ed760' }}>9.2</div>
            <div>
              <div className="shafari-review-name">Liverpool Road Social</div>
              <div className="shafari-review-sub">Crosby · HEAVY SCRAN</div>
            </div>
          </div>
          <div className="shafari-review-item">
            <div className="shafari-review-rating" style={{ background: '#4caf50' }}>8.5</div>
            <div>
              <div className="shafari-review-name">Rough Handmade</div>
              <div className="shafari-review-sub">Albert Dock · Elite Bakery</div>
            </div>
          </div>
          <div className="shafari-review-item">
            <div className="shafari-review-rating" style={{ background: '#ffa726' }}>5.5</div>
            <div>
              <div className="shafari-review-name">David Lloyd Speke</div>
              <div className="shafari-review-sub">Speke · Overpriced Gym</div>
            </div>
          </div>
          <div className="shafari-review-item">
            <div className="shafari-review-rating" style={{ background: '#d32f2f' }}>1.5</div>
            <div>
              <div className="shafari-review-name">The BIG Sandwich Club</div>
              <div className="shafari-review-sub">Liverpool · Salty Scran</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  'shagga.org/portfolio': {
    url: 'shagga.org/portfolio',
    title: 'Portfolio · shagga.org',
    render: () => (
      <div className="shafari-page">
        <h1>Sir Monke</h1>
        <p>Cyber security · reverse engineering · systems</p>
        <p>open the proper version on a laptop, or use the Portfolio app on this thing.</p>
        <p>contact: <a href="mailto:hello@shagga.org">hello@shagga.org</a></p>
      </div>
    ),
  },
  'shoogle.com': {
    url: 'shoogle.com',
    title: 'Shoogle',
    render: () => (
      <div className="shafari-page" style={{ textAlign: 'center', paddingTop: 40 }}>
        <h1 style={{ fontSize: 56, margin: 0, fontFamily: 'Helvetica' }}>
          <span style={{ color: '#4285f4' }}>S</span>
          <span style={{ color: '#ea4335' }}>h</span>
          <span style={{ color: '#fbbc05' }}>o</span>
          <span style={{ color: '#4285f4' }}>o</span>
          <span style={{ color: '#34a853' }}>g</span>
          <span style={{ color: '#ea4335' }}>l</span>
          <span style={{ color: '#fbbc05' }}>e</span>
        </h1>
        <p style={{ color: '#888', marginTop: 4, fontSize: 12 }}>not affiliated with anyone</p>
        <input className="shafari-search-bar" placeholder="Search Shoogle or type URL" />
        <div style={{ marginTop: 14, display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button style={{ padding: '6px 14px', border: '1px solid #c0c0c8', background: '#f4f4f7', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Shoogle Search</button>
          <button style={{ padding: '6px 14px', border: '1px solid #c0c0c8', background: '#f4f4f7', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>I'm Feeling Shaggy</button>
        </div>
        <p style={{ marginTop: 30, fontSize: 12, color: '#aaa' }}>privacy · terms · ads · settings</p>
      </div>
    ),
  },
  'phildrives.co.uk': {
    url: 'phildrives.co.uk',
    title: "Phil's Diesel Group",
    render: () => (
      <div className="shafari-page" style={{ background: '#f8f4e8' }}>
        <h1 style={{ color: '#5a3a14' }}>PHIL'S DIESEL GROUP</h1>
        <p style={{ color: '#7a4a08', fontStyle: 'italic' }}>"diesel doesn't stall. it just keeps going."</p>
        <hr />
        <h2>FOR SALE: 1996 Vauxhall Cavalier</h2>
        <ul>
          <li>187,247 miles (and counting)</li>
          <li>One lady owner (deceased)</li>
          <li>Manual handbrake retrofitted to automatic gearbox (FOR THE FEEL)</li>
          <li>Bluetooth gear shift sound effect speaker installed</li>
          <li>Full service history (verbal)</li>
          <li>£800 ono</li>
        </ul>
        <p>contact: phil@philsdiesel.co.uk</p>
      </div>
    ),
  },
  'shaggatube.shagga': {
    url: 'shaggatube.shagga',
    title: 'ShaggaTube',
    render: () => (
      <div className="shafari-page">
        <h1>ShaggaTube</h1>
        <p>Same idea — open the dedicated app for the full thing. This is just a webpage.</p>
        <h2>Trending</h2>
        <ul>
          <li>cards & milkshakes (cooked stream #84) — 47.2M views</li>
          <li>i installed a manual handbrake on my automatic for the FEEL — 8.4M views</li>
          <li>middle aisle full tour — 14M views</li>
        </ul>
      </div>
    ),
  },
  'auntielinda.angelfire.com': {
    url: 'auntielinda.angelfire.com',
    title: '🌹 LINDAS PAGE 🌹',
    render: () => (
      <div className="shafari-page" style={{ background: '#000', color: '#ff80ff', fontFamily: 'Comic Sans MS, cursive' }}>
        <h1 style={{ color: '#ffff00', textAlign: 'center' }}>🌹🌹🌹 WELCOME TO LINDAS PAGE 🌹🌹🌹</h1>
        <p style={{ textAlign: 'center', color: '#80ffff' }}>~* hello angels *~</p>
        <hr style={{ borderColor: '#ff00ff' }} />
        <p>this is my page i made it on my computer. my grandson helped a bit.</p>
        <p>my favourite things:</p>
        <ul>
          <li>my angels</li>
          <li>chain emails (forward 7 times for good luck)</li>
          <li>roses 🌹🌹🌹</li>
          <li>good morning posts</li>
        </ul>
        <p style={{ textAlign: 'center', marginTop: 20, color: '#ffff00' }}>GOD BLESS ❤️❤️❤️</p>
        <p style={{ textAlign: 'center', fontSize: 10, color: '#888' }}>visitor count: 0000000003</p>
      </div>
    ),
  },
};

const HOMEPAGE_URL = 'shagga.org';
const BOOKMARKS = ['shagga.org', 'shagga.org/reviews', 'shagga.org/portfolio', 'shoogle.com', 'phildrives.co.uk', 'auntielinda.angelfire.com'];

export const AppSafari: React.FC = () => {
  const [history, setHistory] = useState<string[]>([HOMEPAGE_URL]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [urlInput, setUrlInput] = useState(HOMEPAGE_URL);
  const [editing, setEditing] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const currentUrl = history[historyIdx];
  const currentSite = SITES[currentUrl];

  const navigate = useCallback((url: string) => {
    const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    setHistory((h) => [...h.slice(0, historyIdx + 1), cleanUrl]);
    setHistoryIdx((i) => i + 1);
    setUrlInput(cleanUrl);
    setEditing(false);
    setShowBookmarks(false);
  }, [historyIdx]);

  // Expose navigation to inline links inside canned pages
  if (typeof window !== 'undefined') {
    (window as any).__shafariNav = navigate;
  }

  const back = () => {
    if (historyIdx > 0) {
      const newIdx = historyIdx - 1;
      setHistoryIdx(newIdx);
      setUrlInput(history[newIdx]);
    }
  };
  const forward = () => {
    if (historyIdx < history.length - 1) {
      const newIdx = historyIdx + 1;
      setHistoryIdx(newIdx);
      setUrlInput(history[newIdx]);
    }
  };

  return (
    <div className="shafari-app">
      <div className="shafari-urlbar">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onFocus={() => setEditing(true)}
          onBlur={() => setTimeout(() => setEditing(false), 150)}
          onKeyDown={(e) => { if (e.key === 'Enter') { navigate(urlInput); (e.target as HTMLInputElement).blur(); } }}
          placeholder="Search or enter address"
        />
        <button className="shafari-go" onClick={() => navigate(urlInput)}>Go</button>
      </div>

      {editing && (
        <div className="shafari-suggestions">
          <div className="shafari-suggestions-h">Bookmarks</div>
          {BOOKMARKS.filter((u) => u.toLowerCase().includes(urlInput.toLowerCase())).map((u) => (
            <button key={u} className="shafari-suggestion" onMouseDown={(e) => { e.preventDefault(); navigate(u); }}>
              <span className="shafari-suggestion-icon">⭐</span>{u}
            </button>
          ))}
        </div>
      )}

      {showBookmarks && (
        <div className="shafari-bookmarks">
          <div className="shafari-suggestions-h">All bookmarks</div>
          {BOOKMARKS.map((u) => (
            <button key={u} className="shafari-suggestion" onClick={() => navigate(u)}>
              <span className="shafari-suggestion-icon">⭐</span>{u}
            </button>
          ))}
        </div>
      )}

      <div className="shafari-content">
        {currentSite ? currentSite.render() : (
          <div className="shafari-page" style={{ textAlign: 'center', paddingTop: 40 }}>
            <h1 style={{ color: '#888' }}>Cannot Open Page</h1>
            <p>Shafari can\u2019t open <strong>{currentUrl}</strong> because the page is, frankly, made up.</p>
            <p style={{ marginTop: 20, fontSize: 13, color: '#aaa' }}>Try shagga.org instead.</p>
            <button onClick={() => navigate(HOMEPAGE_URL)} style={{ marginTop: 14, padding: '8px 18px', background: '#007aff', color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'inherit' }}>Go to shagga.org</button>
          </div>
        )}
      </div>

      <div className="shafari-toolbar">
        <button onClick={back} disabled={historyIdx === 0} className={historyIdx === 0 ? 'shafari-tb-dim' : ''}>‹</button>
        <button onClick={forward} disabled={historyIdx === history.length - 1} className={historyIdx === history.length - 1 ? 'shafari-tb-dim' : ''}>›</button>
        <button onClick={() => navigate(HOMEPAGE_URL)}>🏠</button>
        <button onClick={() => setShowBookmarks((s) => !s)}>📑</button>
        <button onClick={() => navigate(currentUrl)}>↻</button>
      </div>
    </div>
  );
};
