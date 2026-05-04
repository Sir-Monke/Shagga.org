'use client';

import React, { useState } from 'react';

export default function InternetShaggaBody() {
  const [url, setUrl] = useState('http://www.shagga.org/~bazza/index.html');
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="ie-block">
        <div className="ie-toolbar">
          <button className="ie-btn">⬅ Back</button>
          <button className="ie-btn">➡ Fwd</button>
          <button className="ie-btn" onClick={() => setRefreshKey((k) => k + 1)}>↻</button>
          <button className="ie-btn">🏠</button>
        </div>
        <div className="ie-addr">
          <span className="ie-addr-label">Address</span>
          <input
            className="ie-addr-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          />
          <button className="ie-go">Go</button>
        </div>
        <div className="ie-page" key={refreshKey}>
          <div className="geocities">
            <h1 className="geocities-h1">
              <span style={{ color: 'red' }}>★</span>
              <span style={{ color: 'orange' }}>~</span>
              <span style={{ color: 'magenta' }}>♥</span>
              <span> WELCOME TO BAZZA&apos;S SHAGGA SHRINE </span>
              <span style={{ color: 'magenta' }}>♥</span>
              <span style={{ color: 'orange' }}>~</span>
              <span style={{ color: 'red' }}>★</span>
            </h1>

            <div className="geocities-marquee">
              <span className="geocities-marquee-inner">
                ✦ This site is best viewed in Netscape Navigator 4.0 at 800x600 ✦
                You are visitor #00047 ✦ Last updated: 12 March 1998 ✦
                ✦ This site is best viewed in Netscape Navigator 4.0 at 800x600 ✦
              </span>
            </div>

            <div className="geocities-flame">🔥🔥🔥 NEW!!! 🔥🔥🔥</div>

            <p className="geocities-p">
              G&apos;day mate!!! welcome 2 my homepage!!! this is the BEST site
              on the world wide web abuot top shaggas. plz sign my guestbook
              <span className="blink">!!!!</span>
            </p>

            <div className="geocities-section">
              <h2>★ ABOUT ME ★</h2>
              <p>name: Bazza<br/>
                age: shagga<br/>
                hobbies: barbie, footy, magpie avoidance, bein top<br/>
                fav band: <span style={{ background: 'yellow' }}>SHAGGA &amp; THE SNAGS</span>
              </p>
            </div>

            <div className="geocities-section">
              <h2>★ MY LINKS ★</h2>
              <ul className="geocities-links">
                <li>🔗 <a href="#">Top Shagga Webring</a></li>
                <li>🔗 <a href="#">Bazza&apos;s GIF collection</a></li>
                <li>🔗 <a href="#">Free MIDI files</a></li>
                <li>🔗 <a href="#">Hot Cheats for Doom 2</a></li>
                <li>🔗 <a href="#">My mate Daz&apos;s page</a></li>
              </ul>
            </div>

            <div className="geocities-section">
              <h2>★ GUESTBOOK ★</h2>
              <div className="geocities-entry">
                <strong>Daz</strong>: epic site mate
              </div>
              <div className="geocities-entry">
                <strong>top_shagga_88</strong>: 5 stars / 5
              </div>
              <div className="geocities-entry">
                <strong>nan</strong>: bazza what is this
              </div>
            </div>

            <div className="geocities-counter">
              <strong>VISITORS:</strong> [0][0][0][4][7]
            </div>

            <p className="geocities-p" style={{ textAlign: 'center', fontSize: 11, marginTop: 12 }}>
              this page hosted by <span style={{ color: 'orange', fontWeight: 'bold' }}>SHAGGA-CITIES</span>™
              — get ur own free homepage today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
