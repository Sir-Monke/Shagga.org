'use client';
import React, { useEffect, useState, useCallback } from 'react';

export interface MobileNotification {
  id: string;
  appName: string;
  title: string;
  body: string;
  emoji?: string;
}

interface Props {
  notifications: MobileNotification[];
  onDismiss: (id: string) => void;
}

const AUTO_DISMISS_MS = 4500;

export const MobileNotifications: React.FC<Props> = ({ notifications, onDismiss }) => {
  return (
    <div className="ios-notifs" aria-live="polite">
      {notifications.map((n) => (
        <NotificationBanner key={n.id} notif={n} onDismiss={() => onDismiss(n.id)} />
      ))}
    </div>
  );
};

const NotificationBanner: React.FC<{ notif: MobileNotification; onDismiss: () => void }> = ({ notif, onDismiss }) => {
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(onDismiss, 280);
  }, [onDismiss]);

  useEffect(() => {
    const t = window.setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(t);
  }, [dismiss]);

  return (
    <div
      className={`ios-notif ${exiting ? 'ios-notif-exit' : ''}`}
      onClick={dismiss}
      role="button"
      tabIndex={0}
    >
      <span className="ios-notif-emoji" aria-hidden>{notif.emoji ?? '🔔'}</span>
      <div className="ios-notif-text">
        <div className="ios-notif-app">{notif.appName}</div>
        <div className="ios-notif-title">{notif.title}</div>
        <div className="ios-notif-body">{notif.body}</div>
      </div>
    </div>
  );
};

// ---------- Random comedy notification source ----------
// Mirrors the XP popup chaos but as gentle iOS banners.
const NOTIFS_POOL: Array<Omit<MobileNotification, 'id'>> = [
  { appName: 'Mail',         title: 'Auntie Linda',  body: 'Fwd: Fwd: Fwd: AMAZING — you must read this',     emoji: '📧' },
  { appName: 'Messages',     title: 'Phil',          body: 'sausage roll situation. need backup.',             emoji: '💬' },
  { appName: 'Shagga-fy',    title: 'Now Playing',   body: 'Ross Buckley — Cards & Milkshakes (album)',        emoji: '🎵' },
  { appName: 'Maps',         title: 'Recommended',   body: 'You\u2019ve walked past 4 Greggs today. Try one.', emoji: '🗺️' },
  { appName: 'Weather',      title: 'Liverpool',     body: 'Currently: drizzle. Always: drizzle.',             emoji: '🌧' },
  { appName: 'Stocks',       title: 'STIK \u00b7 \u00a3420', body: '\u2191 +42% today. moon imminent.',        emoji: '📈' },
  { appName: 'Reminders',    title: 'shagga.org',    body: 'have you watered the plants legend',               emoji: '✅' },
  { appName: 'ShaggaTube',   title: 'New from\u2026', body: 'Cards & Milkshakes (Cooked Stream #84)',          emoji: '📺' },
  { appName: 'Calendar',     title: 'Today',         body: 'Nothing on. best day of the week.',                emoji: '📅' },
  { appName: 'Mail',         title: 'Sharon@accounts',body: '[REPLY ALL] Re: Re: lunch order — please stop',   emoji: '📧' },
];

export function pickRandomNotif(): MobileNotification {
  const base = NOTIFS_POOL[Math.floor(Math.random() * NOTIFS_POOL.length)];
  return { ...base, id: Math.random().toString(36).slice(2, 9) };
}
