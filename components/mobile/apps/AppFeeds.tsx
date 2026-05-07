'use client';
import React, { useState } from 'react';
import { shaggasList } from '../../imageManifest';

// ============================================================
// SHWITTER — twitter-style feed
// ============================================================
const SHWEETS = [
  { handle: 'phil_drives',    name: 'Phil Drives',    body: 'lads i have just discovered my car can do 90mph in first gear. it has no redline. it just keeps going. golden', time: '12m', likes: 89724, retweets: 12847, replies: 4002, hue: 0 },
  { handle: 'concerned_mum',  name: 'Mum',            body: 'k', time: '30m', likes: 89724, retweets: 14728, replies: 8472, hue: 200 },
  { handle: 'auntie_linda',   name: 'Auntie Linda',   body: '🌹🌹🌹🌹🌹🌹🌹🌹🌹 GOOD MORNING ANGELS 🌹🌹🌹🌹🌹🌹🌹🌹🌹 GOD BLESS ❤️❤️❤️❤️❤️', time: '47m', likes: 412, retweets: 47, replies: 234, hue: 320 },
  { handle: 'tech_helpline',  name: 'Tech Helpline',  body: 'have you tried turning it off and on again', time: '1h 30m', likes: 47281, retweets: 8472, replies: 234, hue: 220 },
  { handle: 'big_shagga_94',  name: 'Big Shagga',     body: 'found out my dad has been searching things by typing them into the address bar AND the search engine. like a relay system. unstoppable', time: '2h', likes: 12847, retweets: 4128, replies: 891, hue: 30 },
  { handle: 'midaisle_middle',name: 'Middle Aisle Mike', body: 'this week in the middle aisle: a kayak, a chainsaw, 47 garden gnomes, and one (1) astronaut suit. £14.99 each.', time: '3h', likes: 47281, retweets: 12847, replies: 1247, hue: 60 },
  { handle: 'doreen_57',      name: 'Doreen',         body: 'sent from my iphone', time: '4h', likes: 89, retweets: 12, replies: 47, hue: 280 },
  { handle: 'shaggacouncil',  name: 'Shagga Council', body: 'BREAKING: the council has voted. you cannot reply "k" to "we need to talk". effective immediately.', time: '8h', likes: 47281, retweets: 8472, replies: 2104, hue: 130 },
  { handle: 'phil_drives',    name: 'Phil Drives',    body: 'i now play "gear shift sound effect" from a bluetooth speaker when i shift in my automatic. for immersion.', time: '6h', likes: 8472, retweets: 1247, replies: 412, hue: 0 },
  { handle: 'margaret_90',    name: 'Margaret',       body: 'has anyone found my phone i lost it again. love nan x', time: '1d', likes: 14728, retweets: 4128, replies: 891, hue: 90 },
];

export const AppShwitter: React.FC = () => {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const toggleLike = (i: number) => setLiked((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
  return (
    <div className="shwit-app">
      {SHWEETS.map((s, i) => (
        <article key={i} className="shwit-card">
          <div className="shwit-row">
            <div className="shwit-avatar" style={{ background: `linear-gradient(135deg, hsl(${s.hue},65%,55%), hsl(${(s.hue+40)%360},55%,40%))` }}>
              {s.name.slice(0, 1)}
            </div>
            <div className="shwit-content">
              <div className="shwit-meta">
                <span className="shwit-name">{s.name}</span>
                <span className="shwit-handle">@{s.handle}</span>
                <span className="shwit-time">· {s.time}</span>
              </div>
              <div className="shwit-body">{s.body}</div>
              <div className="shwit-actions">
                <button className="shwit-action">💬 {fmt(s.replies)}</button>
                <button className="shwit-action">🔁 {fmt(s.retweets)}</button>
                <button className={`shwit-action ${liked.has(i) ? 'shwit-liked' : ''}`} onClick={() => toggleLike(i)}>
                  {liked.has(i) ? '❤️' : '🤍'} {fmt(s.likes + (liked.has(i) ? 1 : 0))}
                </button>
                <button className="shwit-action">📤</button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

// ============================================================
// SHAGGA-GRAM — photo feed
// ============================================================
const POSTS = [
  { user: 'phil_drives',     caption: 'her after I told her about the bluetooth gear shift speaker', likes: 8421 },
  { user: 'ross_buckley',    caption: 'cards. milkshakes. shagga shagga shagga 💜', likes: 142847 },
  { user: 'midaisle_mike',   caption: 'this weeks Lidl middle aisle haul. 47 garden gnomes for £700.', likes: 4218 },
  { user: 'shagga_official', caption: 'top shagga energy only', likes: 89724 },
  { user: 'phil_drives',     caption: '90mph in first. she didnt even break a sweat. 1996 cavalier never dies', likes: 24102 },
  { user: 'auntie_linda',    caption: 'good morning angels 🌹🌹🌹', likes: 412 },
  { user: 'big_shagga_94',   caption: 'sausage sizzle saturday. onions UNDER. fight me.', likes: 18247 },
  { user: 'snaggas_brand',   caption: 'special this week: 4 snags + 1 onion = £3.50. unbeatable.', likes: 9412 },
  { user: 'goonlord3000',    caption: 'goon of fortune season 47 starts saturday. byo peg.', likes: 3147 },
  { user: 'tradies_anon',    caption: 'shell be right mate', likes: 47218 },
  { user: 'concerned_mum',   caption: 'k.', likes: 89 },
  { user: 'phil_drives',     caption: 'detail wash. £4.99 of armor all on the dash. spotless.', likes: 6224 },
  { user: 'midaisle_mike',   caption: 'spotted: full size pinball machine in middle aisle. £249. what is going on.', likes: 11892 },
  { user: 'shagga_council',  caption: 'OFFICIAL: pineapple on pizza is YES. case closed.', likes: 218472 },
  { user: 'cookedcontent',   caption: 'put a thong in the microwave again. smoke alarm still going. day 3.', likes: 1287 },
  { user: 'ross_buckley',    caption: 'gave a lad 10p today. he cried. shagga 💜', likes: 472481 },
  { user: 'top_shagga',      caption: 'rated my mates BBQs. dave got a 2/10. sorry dave.', likes: 84218 },
  { user: 'auntie_linda',    caption: 'forwarded this 7 times. good luck for life now 🌹🌹🌹', likes: 218 },
  { user: 'phil_drives',     caption: 'cavalier just hit 188,000 miles. she keeps going.', likes: 14821 },
  { user: 'sleepy_shagga',   caption: 'lo-fi shagga to cook a snag to. now streaming on shagga-fy.', likes: 12471 },
];
export const AppShaggaGram: React.FC = () => {
  const images = shaggasList();
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setLiked((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
  return (
    <div className="sgram-app">
      {POSTS.map((p, i) => {
        const img = images[i % images.length];
        return (
          <article key={i} className="sgram-post">
            <div className="sgram-head">
              <div className="sgram-avatar" style={{ background: `linear-gradient(135deg, hsl(${(i * 60) % 360},70%,55%), hsl(${(i * 60 + 50) % 360},60%,40%))` }}>
                {p.user.slice(0, 1).toUpperCase()}
              </div>
              <div className="sgram-handle">{p.user}</div>
              <span className="sgram-dots">⋯</span>
            </div>
            <div className="sgram-image-wrap">
              <img src={img} alt="" className="sgram-image-real" loading="lazy" />
            </div>
            <div className="sgram-actions">
              <button onClick={() => toggle(i)} className="sgram-act">{liked.has(i) ? '❤️' : '🤍'}</button>
              <button className="sgram-act">💬</button>
              <button className="sgram-act">📤</button>
            </div>
            <div className="sgram-likes">{fmt(p.likes + (liked.has(i) ? 1 : 0))} likes</div>
            <div className="sgram-caption"><strong>{p.user}</strong> {p.caption}</div>
          </article>
        );
      })}
    </div>
  );
};

// ============================================================
// SHAGGABOOK — facebook-style feed
// ============================================================
const POSTS_FB = [
  { name: 'Auntie Linda',       group: 'Liverpool Mums',   ago: '2h',  body: '🌹🌹🌹🌹🌹🌹🌹🌹\nGOOD MORNING TO ALL MY ANGELS WHO MIGHT SEE THIS\n\nIF YOU FORWARD THIS TO 7 PEOPLE YOU WILL HAVE GOOD LUCK FOR LIFE\n\nGOD BLESS\n🌹🌹🌹🌹🌹🌹🌹🌹', reactions: 412, comments: 47, shares: 234 },
  { name: 'Phil Drives',        group: '',                 ago: '4h',  body: 'CAR FOR SALE: 1996 cavalier. 187,000 miles. one lady owner (deceased). manual handbrake retrofitted to automatic. comes with bluetooth gear shift speaker.\n\n£800 ono.', reactions: 47, comments: 12, shares: 4 },
  { name: 'Margaret',           group: '',                 ago: '6h',  body: 'has anyone found my phone i lost it again. last seen on the kitchen table or the bathroom or the bus. love nan x', reactions: 28, comments: 47, shares: 0 },
  { name: 'Sharon Morris',      group: '',                 ago: 'Yesterday', body: 'PSA to my colleagues: please stop replying all to the lunch order email. it is ONE order. for ONE meeting. not 47 separate orders.', reactions: 142, comments: 24, shares: 8 },
  { name: 'midaisle_mike',      group: 'Lidl Middle Aisle Watch', ago: 'Yesterday', body: 'TODAY IN THE MIDDLE AISLE\n• kayak (£89)\n• chainsaw (£34)\n• 47 garden gnomes (£0.99 each)\n• one (1) astronaut suit (£14.99)\n\nWHO is buying these', reactions: 4218, comments: 247, shares: 1247 },
];
export const AppShaggaBook: React.FC = () => {
  return (
    <div className="sbook-app">
      <div className="sbook-composer">
        <div className="sbook-avatar">U</div>
        <input placeholder="What's on your mind?" disabled />
      </div>
      {POSTS_FB.map((p, i) => (
        <article key={i} className="sbook-post">
          <div className="sbook-head">
            <div className="sbook-avatar">{p.name.slice(0, 1)}</div>
            <div>
              <div className="sbook-name">{p.name}{p.group && <span className="sbook-group"> ▸ {p.group}</span>}</div>
              <div className="sbook-time">{p.ago} · 🌐</div>
            </div>
          </div>
          <div className="sbook-body">{p.body}</div>
          <div className="sbook-stats">
            <span>👍❤️😆 {p.reactions}</span>
            <span>{p.comments} comments · {p.shares} shares</span>
          </div>
          <div className="sbook-actions">
            <button>👍 Like</button>
            <button>💬 Comment</button>
            <button>📤 Share</button>
          </div>
        </article>
      ))}
    </div>
  );
};
