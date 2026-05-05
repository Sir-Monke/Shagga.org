'use client';

import React, { useEffect, useState } from 'react';

interface Toast {
  id: number;
  icon: string;
  title: string;
  body: string;
  app?: string;
}

// Running gags — same characters, same energy across messages.
// These should land for anyone, not just Aussies.
const SHAGGA_EVENTS: Omit<Toast, 'id'>[] = [
  // Margaret (Nan) — 90, has lost her phone but is also using it
  { icon: '📱', title: 'Margaret (Nan)', app: 'Messages',  body: 'has anyone found my phone i think i left it at the post office xx love nan' },
  { icon: '👵', title: 'Margaret (Nan)', app: 'ShaggaBook',  body: 'tagged you in 47 photos from 2003. all are sideways.' },
  { icon: '👵', title: 'Margaret (Nan)', app: 'Messages',  body: 'pls call ur mother she is worried sick' },
  { icon: '👵', title: 'Margaret (Nan)', app: 'Voicemail', body: '"hello? hello? is this thing on? david its grandma. *fumbling* david-"  [4 minutes 47 seconds]' },
  { icon: '👵', title: 'Margaret (Nan)', app: 'Email',     body: 'Subject: FWD: FWD: FWD: FWD: FWD: GOOD MORNING ANGEL ❤️🌹💐🌻' },
  { icon: '👵', title: 'Margaret (Nan)', app: 'Siri',      body: 'asked Siri "what\'s the weather" and accidentally ended a phone call. has not recovered.' },

  // Phil — keeps modifying his car in absurd ways
  { icon: '🚗', title: 'Phil',           app: 'Group chat',body: 'lads my car can do 90mph in first gear. no redline. it just keeps going.' },
  { icon: '🚙', title: 'Phil',           app: 'Group chat',body: 'installed a manual handbrake on the automatic. for the feel of it.' },
  { icon: '🏎️', title: 'Phil',           app: 'Group chat',body: 'car now legally a manual, automatic, AND paddle shift simultaneously. mechanic refused service.' },
  { icon: '🚗', title: 'Phil',           app: 'Group chat',body: 'plays "gear shift sound effect" from a bluetooth speaker when changing gears in his automatic. idiot.' },
  { icon: '🛞', title: 'Phil',           app: 'Group chat',body: 'discovered his car has a "sport mode". has not driven in any other mode since 2019.' },
  { icon: '⛽', title: 'Phil',           app: 'Group chat',body: 'put diesel in his petrol car for the third time. blames the pump.' },

  // Uncle Dave — wholesome but reads emojis wrong
  { icon: '🧓', title: 'Uncle Dave',     app: 'ShaggaBook',  body: 'reacted 👍 to a death announcement. genuinely thinks it\'s supportive.' },
  { icon: '🧓', title: 'Uncle Dave',     app: 'ShaggaBook',  body: "wished aunt sheila happy birthday. she's been gone 3 years. nobody has the heart." },
  { icon: '🧓', title: 'Uncle Dave',     app: 'Messages',  body: 'sent "thumbs up" to "we need to talk". confused why his daughter isn\'t replying.' },

  // Auntie Linda — emoji chaos
  { icon: '💃', title: 'Auntie Linda',   app: 'Group chat',body: '🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹' },
  { icon: '💃', title: 'Auntie Linda',   app: 'Group chat',body: 'sent the same minion meme. fourth time today.' },
  { icon: '💃', title: 'Auntie Linda',   app: 'Group chat',body: 'has been scrolling her own profile for 3 hours thinking it\'s the home page.' },

  // Mom — terse, devastating
  { icon: '👩', title: 'Mom',            app: 'Messages',  body: '"k"' },
  { icon: '👩', title: 'Mom',            app: 'Messages',  body: '"call me when you get a chance"  ←  this is never good' },
  { icon: '👩', title: 'Mom',            app: 'Messages',  body: '"k."  ← the period. somehow worse.' },

  // Dad — accidental vibe
  { icon: '👨', title: 'Dad',            app: 'Messages',  body: 'sent: "Sent from my Phone"  *no other content*' },
  { icon: '👨', title: 'Dad',            app: 'Photos',    body: 'photo of his thumb. blurry. uploaded to Facebook profile picture.' },
  { icon: '👨', title: 'Dad',            app: 'Browser',   body: 'has 247 tabs open. claims he\'ll get to them. won\'t.' },

  // System / OS jokes
  { icon: '🔋', title: 'System',         app: 'Battery',   body: '20% battery. you have ignored 47 of these. proud of you.' },
  { icon: '🌐', title: 'Network',        app: 'WiFi',      body: 'disconnected. then reconnected. then disconnected. living its truth.' },
  { icon: '⚠️', title: 'Windows',        app: 'System',    body: 'an update is available. it will install at the worst possible moment.' },
  { icon: '🖨️', title: 'Printer',        app: 'Drivers',   body: 'is offline. has been offline since 2014. nobody has tried to fix it.' },
  { icon: '💾', title: 'ShaggaDrive',    app: 'Sync',      body: 'is "syncing". 0% complete. has been syncing for 6 hours.' },

  // Hacker / classic shagga-OS lore (revived)
  { icon: '🦹', title: 'Hacker_Shagga',  app: 'Terminal',  body: 'I AM IN YOUR FILES. password is "shagga". you should change it.' },
  { icon: '🦹', title: 'Hacker_Shagga',  app: 'Terminal',  body: 'i have downloaded ur browser history. it is mostly cooking videos. respect.' },
  { icon: '🛡️', title: 'Norton AntiShagga', app: 'Scan',   body: 'detected 47 files behaving suspiciously. all of them are .txt files. flagged anyway.' },
  { icon: '🛡️', title: 'Norton AntiShagga', app: 'Scan',   body: 'subscription expired. renewing automatically for £247/year.' },
  { icon: '🎵', title: 'LimeShagga',     app: 'Download',  body: '"smash_mouth_-_all_star.mp3" — 2 hours remaining. estimated bandwidth: dialup.' },
  { icon: '🎵', title: 'LimeShagga',     app: 'Download',  body: 'download complete: "free_microsoft_office_2003.exe" (47KB)' },

  // Chain emails / forwards
  { icon: '📧', title: 'Margaret (Nan)', app: 'Email',     body: 'FWD: FWD: FWD: FWD: FWD: FWD: 🌹💐 GOOD MORNING ANGEL — IF U DONT FORWARD THIS TO 47 PEOPLE U WILL HAVE BAD LUCK FOR 7 YEARS' },
  { icon: '📧', title: 'Auntie Linda',   app: 'Email',     body: 'FWD: FWD: an angel got her wings when u opened this email. share with 12 friends or she dies again 👼' },
  { icon: '📧', title: 'Uncle Dave',     app: 'Email',     body: 'FWD: FWD: FWD: see picture below — "TOTALLY REAL UFO PHOTO 1947" (it is a frisbee)' },
  { icon: '📧', title: 'Sharon from Accounts', app: 'Email', body: 'ALL: please disregard the previous email. and the one before that. and the one i am about to send. — Sharon' },
  { icon: '📧', title: 'Mailer-Daemon',  app: 'Bounce',    body: 'your email to "your_dad@aol.com" was returned. reason: he is in the kitchen.' },

  // Visitor / chat / popups returning
  { icon: '👋', title: 'shaggalover_69',  app: 'MSN',       body: 'hey 😉 just wanted to let u know u are visitor #1,000,000! claim ur prize' },
  { icon: '🎉', title: 'shagga.org',      app: 'Banner',    body: '★★★ CONGRATULATIONS!!! YOU ARE THE 1,000,000TH VISITOR ★★★ click here to claim 100 free shaggas' },
  { icon: '💬', title: 'big_shagga_94',   app: 'MSN',       body: 'has just signed in. the door wails open. (no message yet, just the sound)' },
  { icon: '💬', title: 'cooked_dave',     app: 'MSN',       body: 'is typing...' },
  { icon: '💬', title: 'cooked_dave',     app: 'MSN',       body: 'has stopped typing.' },
  { icon: '🦷', title: 'tooth.exe',       app: 'Reminder',  body: 'reminder from 2019: book a dentist appointment. snoozed 47 times.' },

  // Generic absurdity
  { icon: '☕', title: 'Kitchen',        app: 'Notice',    body: 'someone has put cornflakes in the kettle. again.' },
  { icon: '📦', title: 'Snagazon',         app: 'Delivery',  body: 'your package was delivered to "the person who looks like you down the road".' },
  { icon: '📺', title: 'Shagflix',        app: 'Are you?',  body: '"Are you still watching?" — yes. obviously. you knew that.' },
  { icon: '🍕', title: 'Pizza Place',      app: 'Tracker',   body: 'your pizza is being prepared by "Greg". Greg is having a rough day.' },
  { icon: '🛒', title: 'Mid-Aisle',           app: 'Notice',    body: 'middle aisle now has: a kayak, a chainsaw, 47 gnomes, one (1) astronaut suit.' },
  { icon: '📱', title: 'Phone',         app: 'Reminder',  body: '"call dentist" — 4 weeks overdue. snoozed 47 times.' },
  { icon: '🎮', title: 'Smeam',          app: 'Update',    body: 'a game you haven\'t played in 6 years has a 47GB update.' },
  { icon: '📨', title: 'ShaggedIn',       app: 'Endorsement',body: 'someone you went to school with endorsed you for "Word Documents".' },
  { icon: '🔔', title: 'Calendar',       app: 'Reminder',  body: 'meeting in 2 minutes. you forgot. it\'s on Shagga Teams. you don\'t have Shagga Teams installed.' },
];

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [used, setUsed] = useState<Set<number>>(new Set());

  useEffect(() => {
    function spawn() {
      // Pick an event we haven't used recently
      let pool = SHAGGA_EVENTS.map((_, i) => i).filter((i) => !used.has(i));
      if (pool.length === 0) {
        setUsed(new Set());
        pool = SHAGGA_EVENTS.map((_, i) => i);
      }
      const idx = pool[Math.floor(Math.random() * pool.length)];
      setUsed((u) => new Set(u).add(idx));
      const ev = SHAGGA_EVENTS[idx];
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { ...ev, id }]);
      // Auto-dismiss after 8s
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 8000);
    }

    // First one quickly so user sees it works, then every 25-50s randomly
    const initial = setTimeout(spawn, 12000);
    const interval = setInterval(() => {
      if (Math.random() < 0.65) spawn();
    }, 28000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [used]);

  const dismiss = (id: number) =>
    setToasts((ts) => ts.filter((x) => x.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className="toast" onClick={() => dismiss(t.id)}>
          <span className="toast-icon">{t.icon}</span>
          <div className="toast-body">
            <div className="toast-meta">
              <span className="toast-title">{t.title}</span>
              {t.app && <span className="toast-app">via {t.app}</span>}
            </div>
            <div className="toast-text">{t.body}</div>
          </div>
          <button
            className="toast-close"
            onClick={(e) => { e.stopPropagation(); dismiss(t.id); }}
            aria-label="Dismiss"
          >×</button>
        </div>
      ))}
    </div>
  );
}
