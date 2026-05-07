'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { MobileStatusBar } from './MobileStatusBar';
import { MobileHomeScreen } from './MobileHomeScreen';
import { MobileLockScreen } from './MobileLockScreen';
import { MobileAppShell } from './MobileAppShell';
import { MobileNotifications, pickRandomNotif, type MobileNotification } from './MobileNotifications';
import { findApp, type MobileAppKind } from './appRegistry';
import { loadSettings } from './apps/AppSettings';

interface Props {
  autoLaunch?: MobileAppKind | null; // for /reviews etc deep linking
  startUnlocked?: boolean;
}

const NOTIF_INTERVAL_MS = 22000; // Gentle. ~3 per minute, not the XP chaos.

export const MobileOS: React.FC<Props> = ({ autoLaunch = null, startUnlocked = false }) => {
  // Lock state — locked at first visit, unlocked persists in session
  const [unlocked, setUnlocked] = useState(startUnlocked);
  // Current app kind (null = home screen)
  const [currentApp, setCurrentApp] = useState<MobileAppKind | null>(autoLaunch);
  // Notifications
  const [notifs, setNotifs] = useState<MobileNotification[]>([]);
  // Settings (read live so home indicator etc. respect Settings toggles)
  const [settings, setSettings] = useState(() => loadSettings());

  // Time + date for lock screen
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const hh = h === 0 ? 12 : h > 12 ? h - 12 : h;
      setTime(`${hh}:${String(m).padStart(2, '0')}`);
      setDate(now.toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateClock();
    const id = setInterval(updateClock, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  // Listen for settings changes (from AppSettings)
  useEffect(() => {
    const onSettingsEvent = () => setSettings(loadSettings());
    window.addEventListener('shagga:settings', onSettingsEvent);
    // Also re-read on focus/visibility (in case user changed in another tab)
    const onVis = () => { if (!document.hidden) setSettings(loadSettings()); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('shagga:settings', onSettingsEvent);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // Random notification ticker (only when unlocked + setting enabled)
  useEffect(() => {
    if (!unlocked || !settings.showNotifications) return;
    const id = setInterval(() => {
      // Limit total visible at any time
      setNotifs((curr) => {
        if (curr.length >= 3) return curr;
        return [...curr, pickRandomNotif()];
      });
    }, NOTIF_INTERVAL_MS);
    return () => clearInterval(id);
  }, [unlocked, settings.showNotifications]);

  const dismissNotif = useCallback((id: string) => {
    setNotifs((curr) => curr.filter((n) => n.id !== id));
  }, []);

  const launch = useCallback((kind: MobileAppKind) => {
    setCurrentApp(kind);
  }, []);

  const goHome = useCallback(() => {
    setCurrentApp(null);
  }, []);

  // Theme for status bar: depends on what's on screen
  const activeApp = currentApp ? findApp(currentApp) : null;
  const navTheme = activeApp?.navTheme ?? 'dark';
  const statusBarTheme = activeApp ? (navTheme === 'dark' ? 'dark' : 'light') : 'dark';

  // Wallpaper class hook (Settings can choose)
  const wallpaperClass = `ios-os-wp-${settings.wallpaper}`;

  return (
    <div className={`ios-os ${wallpaperClass}`}>
      {/* Lock screen overlay */}
      {!unlocked && (
        <>
          <MobileStatusBar theme="dark" />
          <MobileLockScreen
            onUnlock={() => setUnlocked(true)}
            time={time}
            date={date}
          />
        </>
      )}

      {/* Main OS (only visible when unlocked) */}
      {unlocked && (
        <>
          <MobileStatusBar theme={statusBarTheme} />

          {/* Home screen always rendered behind the app shell */}
          <div className="ios-os-screen">
            <MobileHomeScreen onLaunch={launch} />
          </div>

          {/* Open app slides in over home */}
          {activeApp && (
            <MobileAppShell app={activeApp} onClose={goHome} />
          )}

          <MobileNotifications notifications={notifs} onDismiss={dismissNotif} />
        </>
      )}
    </div>
  );
};
