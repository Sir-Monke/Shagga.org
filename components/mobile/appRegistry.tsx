// ============================================================
// MOBILE APP REGISTRY — Phase 1B
// All 21 apps wired to real working components.
// ============================================================

import React from 'react';
import {
  PhoneIcon, MailIcon, SafariIcon, ShaggaFyIcon,
  TextIcon, CalendarIcon, PhotosIcon, CameraIcon,
  ShaggaTubeIcon, StocksIcon, MapsIcon, WeatherIcon,
  ClockIcon, CalculatorIcon, NotesIcon, SettingsIcon,
  ShaggaReviewsIcon, ShwitterIcon, ShaggaGramIcon, ShaggaBookIcon,
  GamesIcon,
} from './MobileIcons';

import { AppCalculator } from './apps/AppCalculator';
import { AppSettings } from './apps/AppSettings';
import { AppReviews } from './apps/AppReviews';
import { AppNotes } from './apps/AppNotes';
import { AppPhone } from './apps/AppPhone';
import { AppMail } from './apps/AppMail';
import { AppSafari } from './apps/AppSafari';
import { AppCalendar } from './apps/AppCalendar';
import { AppClock } from './apps/AppClock';
import { AppWeather, AppStocks, AppMaps, AppPhotos, AppCamera } from './apps/AppMedia';
import { AppShaggaTube, AppShaggaFy, AppText } from './apps/AppSocial';
import { AppShwitter, AppShaggaGram, AppShaggaBook } from './apps/AppFeeds';
import { AppGames } from './apps/AppGames';

export type MobileAppKind =
  | 'phone' | 'mail' | 'safari' | 'shaggafy'
  | 'text' | 'calendar' | 'photos' | 'camera'
  | 'shaggatube' | 'stocks' | 'maps' | 'weather'
  | 'clock' | 'calculator' | 'notes' | 'settings'
  | 'reviews' | 'shwitter' | 'shaggagram' | 'shaggabook'
  | 'games';

export interface MobileApp {
  kind: MobileAppKind;
  name: string;
  icon: React.FC;
  page: 0 | 1 | 'dock';
  navTitle?: string;
  navTheme?: 'dark' | 'light';
  Body: React.FC;
}

export const MOBILE_APPS: MobileApp[] = [
  // Dock
  { kind: 'phone',      name: 'Phone',      icon: PhoneIcon,         page: 'dock', navTheme: 'light', Body: AppPhone },
  { kind: 'mail',       name: 'Mail',       icon: MailIcon,          page: 'dock', navTheme: 'light', Body: AppMail },
  { kind: 'safari',     name: 'Safari',     icon: SafariIcon,        page: 'dock', navTheme: 'light', Body: AppSafari },
  { kind: 'shaggafy',   name: 'Shagga-fy',  icon: ShaggaFyIcon,      page: 'dock', navTheme: 'light', Body: AppShaggaFy },

  // Page 0 — built-ins
  { kind: 'text',       name: 'Text',       icon: TextIcon,          page: 0, navTheme: 'light', Body: AppText },
  { kind: 'calendar',   name: 'Calendar',   icon: CalendarIcon,      page: 0, navTheme: 'light', Body: AppCalendar },
  { kind: 'photos',     name: 'Photos',     icon: PhotosIcon,        page: 0, navTheme: 'light', Body: AppPhotos },
  { kind: 'camera',     name: 'Camera',     icon: CameraIcon,        page: 0, navTheme: 'dark',  Body: AppCamera },
  { kind: 'shaggatube', name: 'ShaggaTube', icon: ShaggaTubeIcon,    page: 0, navTheme: 'light', Body: AppShaggaTube },
  { kind: 'stocks',     name: 'Stocks',     icon: StocksIcon,        page: 0, navTheme: 'dark',  Body: AppStocks },
  { kind: 'maps',       name: 'Maps',       icon: MapsIcon,          page: 0, navTheme: 'light', Body: AppMaps },
  { kind: 'weather',    name: 'Weather',    icon: WeatherIcon,       page: 0, navTheme: 'dark',  Body: AppWeather },
  { kind: 'clock',      name: 'Clock',      icon: ClockIcon,         page: 0, navTheme: 'dark',  Body: AppClock },
  { kind: 'calculator', name: 'Calculator', icon: CalculatorIcon,    page: 0, navTheme: 'dark',  Body: AppCalculator },
  { kind: 'notes',      name: 'Notes',      icon: NotesIcon,         page: 0, navTheme: 'light', Body: AppNotes },
  { kind: 'settings',   name: 'Settings',   icon: SettingsIcon,      page: 0, navTheme: 'light', Body: AppSettings },

  // Page 1 — shagga apps
  { kind: 'reviews',    name: 'Reviews',    icon: ShaggaReviewsIcon, page: 1, navTheme: 'light', Body: AppReviews },
  { kind: 'shwitter',   name: 'Shwitter',   icon: ShwitterIcon,      page: 1, navTheme: 'light', Body: AppShwitter },
  { kind: 'shaggagram', name: 'Shagga-gram',icon: ShaggaGramIcon,    page: 1, navTheme: 'light', Body: AppShaggaGram },
  { kind: 'shaggabook', name: 'ShaggaBook', icon: ShaggaBookIcon,    page: 1, navTheme: 'light', Body: AppShaggaBook },
  { kind: 'games',      name: 'Games',      icon: GamesIcon,         page: 1, navTheme: 'dark',  Body: AppGames },
];

export function findApp(kind: MobileAppKind): MobileApp | undefined {
  return MOBILE_APPS.find((a) => a.kind === kind);
}

export const PAGE_COUNT = 2;
