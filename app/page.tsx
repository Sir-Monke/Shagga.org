'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import XPWindow from '@/components/XPWindow';

// popups
import ShaggaAreaBody from '@/components/ShaggaAreaBody';
import ShaggaAdBody from '@/components/ShaggaAdBody';
import ShaggaHackerBody from '@/components/ShaggaHackerBody';
import ShaggapadBody from '@/components/ShaggapadBody';
import NortonScanBody from '@/components/NortonScanBody';
import LimewireBody from '@/components/LimewireBody';
import VisitorBannerBody from '@/components/VisitorBannerBody';
import WindowsUpdateBody from '@/components/WindowsUpdateBody';
import ChainEmailBody from '@/components/ChainEmailBody';

// apps
import CalculatorBody from '@/components/CalculatorBody';
import MinesweeperBody from '@/components/MinesweeperBody';
import InternetShaggaBody from '@/components/InternetShaggaBody';
import PaintBody from '@/components/PaintBody';
import GoonCalcBody from '@/components/GoonCalcBody';
import WeatherBody from '@/components/WeatherBody';
import SettingsBody, { ShaggaSettings, DEFAULT_SETTINGS } from '@/components/SettingsBody';
import ShaggaGramBody from '@/components/ShaggaGramBody';
import ShwitterBody from '@/components/ShwitterBody';
import ShaggaTubeBody from '@/components/ShaggaTubeBody';
import ShaggaBookBody from '@/components/ShaggaBookBody';
import ShaggaFyBody from '@/components/ShaggaFyBody';
import ShaggaChatBody from '@/components/ShaggaChatBody';
import GalleryBody from '@/components/GalleryBody';
import { MyShaggaBody, RecycleBinBody, TaxReturnsBody } from '@/components/FolderBodies';

// chrome / desktop
import CurvedHero from '@/components/CurvedHero';
import MobileBlock from '@/components/MobileBlock';
import DesktopIcon from '@/components/DesktopIcon';
import Taskbar, { TaskbarItem } from '@/components/Taskbar';
import StartMenu, { StartMenuItem } from '@/components/StartMenu';
import ContextMenu, { ContextMenuItem } from '@/components/ContextMenu';
import BSOD from '@/components/BSOD';
import Clippy from '@/components/Clippy';
import SnagCounter from '@/components/SnagCounter';
import RaveMode from '@/components/RaveMode';
import Toaster from '@/components/Toaster';

import {
  NotepadIcon, NotepadIconLarge, PhotoIcon, MoneyIcon, SkullIcon,
  NortonIcon, LimewireIcon, StarIcon, UpdateIcon, EmailIcon,
  CalculatorIcon, MineIcon, IEIcon, RecycleIcon, RecycleIconLarge,
  FolderIcon, MyShaggaIcon, GameIcon, RunIcon,
  SettingsIcon, GramIcon, ShwitterIcon, TubeIcon, BookIcon, SfyIcon,
  PaintIcon, PaintIconLarge, SunIcon, GoonIcon, ChatIcon, ChatIconLarge, GalleryIcon,
} from '@/components/icons';

import { productsList, shaggasList } from '@/components/imageManifest';

// ====================================================================

type WindowKind =
  | 'area' | 'ad' | 'hacker'
  | 'norton' | 'limewire' | 'chat' | 'visitor' | 'update' | 'chainemail'
  | 'shaggapad' | 'calculator' | 'minesweeper' | 'internetshagga'
  | 'paint' | 'gooncalc' | 'weather' | 'settings' | 'gallery'
  | 'shaggagram' | 'shwitter' | 'shaggatube' | 'shaggabook' | 'shaggafy'
  | 'myshagga' | 'recyclebin' | 'taxreturns';

interface OpenWindow {
  id: string;
  kind: WindowKind;
  title: string;
  iconNode: React.ReactNode;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  resizable: boolean;
  imageSrc?: string;
  shaggapadText?: string;
}

const RANDOM_POPUP_KINDS: WindowKind[] = ['area', 'ad', 'hacker', 'norton', 'limewire', 'chat', 'visitor', 'update', 'chainemail'];
const POPUP_WEIGHTS: Record<string, number> = {
  area: 4, ad: 4, hacker: 1, norton: 1.5, limewire: 1.5, msn: 2, visitor: 1, update: 1.5, chainemail: 1.5,
};

const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function weightedRandomKind(): WindowKind {
  const total = RANDOM_POPUP_KINDS.reduce((sum, k) => sum + POPUP_WEIGHTS[k], 0);
  let r = Math.random() * total;
  for (const k of RANDOM_POPUP_KINDS) {
    r -= POPUP_WEIGHTS[k];
    if (r <= 0) return k;
  }
  return 'area';
}

function randomPosition(width: number, height: number) {
  if (typeof window === 'undefined') return { x: 100, y: 100 };
  const margin = 20;
  const taskbarHeight = 30;
  const maxX = Math.max(margin, window.innerWidth - width - margin);
  const maxY = Math.max(margin, window.innerHeight - height - taskbarHeight - margin);
  return {
    x: Math.floor(Math.random() * maxX) + margin,
    y: Math.floor(Math.random() * maxY) + margin,
  };
}

function detectMobileLikeDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const nav: any = navigator;
  const touchPoints: number = nav.maxTouchPoints ?? 0;
  const isPhone = /iPhone|Android.+Mobile|Mobile.+Firefox|webOS|IEMobile|BlackBerry|Opera Mini/i.test(ua);
  if (isPhone) return true;
  if (/iPad/i.test(ua)) return false;
  if (/Macintosh/i.test(ua) && touchPoints > 1) return false;
  if (/Android/i.test(ua) && window.innerWidth >= 720) return false;
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w > h && h < 500) return true;
  return w < 760;
}

// ====================================================================

export default function Home() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shaggapadText, setShaggapadText] = useState<string>('');
  const idCounterRef = useRef(0);

  // chrome state
  const [startOpen, setStartOpen] = useState(false);
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const [bsodActive, setBsodActive] = useState(false);
  const [raveActive, setRaveActive] = useState(false);
  const [clippyHidden, setClippyHidden] = useState(false);

  // settings (persisted to localStorage)
  const [settings, setSettings] = useState<ShaggaSettings>(DEFAULT_SETTINGS);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('shagga-settings');
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch {}
    setSettingsLoaded(true);
  }, []);

  useEffect(() => {
    if (!settingsLoaded) return;
    try { localStorage.setItem('shagga-settings', JSON.stringify(settings)); } catch {}
  }, [settings, settingsLoaded]);

  const products = useMemo(() => productsList(), []);
  const shaggas = useMemo(() => shaggasList(), []);

  useEffect(() => {
    setMounted(true);
    setIsMobile(detectMobileLikeDevice());
    const onResize = () => setIsMobile(detectMobileLikeDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;
    fetch('/shagga.txt')
      .then((r) => r.text())
      .then((t) => setShaggapadText(t))
      .catch(() => setShaggapadText("couldnt load shagga.txt mate"));
  }, [mounted, isMobile]);

  // ----- window management -----
  const focus = useCallback((id: string) => {
    setActiveId(id);
    setWindows((ws) => {
      const idx = ws.findIndex((w) => w.id === id);
      if (idx === -1) return ws;
      const next = ws.map((w) => (w.id === id ? { ...w, minimized: false } : w));
      const [moved] = next.splice(idx, 1);
      next.push(moved);
      return next;
    });
  }, []);

  const close = useCallback((id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const minimize = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const maximize = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
    focus(id);
  }, [focus]);

  const toggleFromTaskbar = useCallback((id: string) => {
    setWindows((ws) => {
      const w = ws.find((x) => x.id === id);
      if (!w) return ws;
      if (w.minimized) {
        const idx = ws.findIndex((x) => x.id === id);
        const next = ws.map((x) => (x.id === id ? { ...x, minimized: false } : x));
        const [moved] = next.splice(idx, 1);
        next.push(moved);
        setActiveId(id);
        return next;
      }
      if (activeId === id) {
        setActiveId(null);
        return ws.map((x) => (x.id === id ? { ...x, minimized: true } : x));
      }
      const idx = ws.findIndex((x) => x.id === id);
      const next = [...ws];
      const [moved] = next.splice(idx, 1);
      next.push(moved);
      setActiveId(id);
      return next;
    });
  }, [activeId]);

  // ----- spawning -----
  const buildWindow = useCallback((kind: WindowKind, opts: Partial<OpenWindow> = {}): OpenWindow => {
    idCounterRef.current += 1;
    const id = `win-${idCounterRef.current}`;
    const baseDefaults: Record<WindowKind, { title: string; icon: React.ReactNode; w: number; h: number; resizable?: boolean }> = {
      area:           { title: "Top Shagga's In Your Area!",     icon: <PhotoIcon />,     w: 320, h: 380 },
      ad:             { title: 'Shagga Item For Sale!',          icon: <MoneyIcon />,     w: 320, h: 420 },
      hacker:         { title: 'h4ck4_5h4gg4.exe',               icon: <SkullIcon />,     w: 380, h: 280 },
      norton:         { title: 'Norton AntiShagga 2003',         icon: <NortonIcon />,    w: 360, h: 340 },
      limewire:       { title: 'LimeShagga 4.18.8',              icon: <LimewireIcon />,  w: 460, h: 260 },
      chat:           { title: 'Shagga Chat',                    icon: <ChatIcon />,      w: 560, h: 420 },
      visitor:        { title: 'CONGRATULATIONS!!!',             icon: <StarIcon />,      w: 300, h: 360 },
      update:         { title: 'ShaggaOS Update',                icon: <UpdateIcon />,    w: 360, h: 320 },
      chainemail:     { title: 'FWD: FWD: FWD: ⚠ READ NOW',     icon: <EmailIcon />,     w: 380, h: 440 },
      shaggapad:      { title: 'shagga.txt - Shaggapad',         icon: <NotepadIcon />,   w: 540, h: 460 },
      calculator:     { title: 'Calculator',                     icon: <CalculatorIcon />,w: 220, h: 280, resizable: false },
      minesweeper:    { title: 'Punt Sweeper',                   icon: <MineIcon />,      w: 248, h: 320, resizable: false },
      internetshagga: { title: 'Internet Shagga',                icon: <IEIcon />,        w: 640, h: 480 },
      paint:          { title: 'Shagga-Paint',                   icon: <PaintIcon />,     w: 540, h: 460 },
      gooncalc:       { title: 'Goon Calculator',                icon: <GoonIcon />,      w: 320, h: 320, resizable: false },
      weather:        { title: 'Shagga Weather',                 icon: <SunIcon />,       w: 280, h: 320, resizable: false },
      settings:       { title: 'Shagga Control Panel',           icon: <SettingsIcon />,  w: 460, h: 540 },
      gallery:        { title: 'Shagga Gallery',                 icon: <GalleryIcon />,   w: 600, h: 480 },
      shaggagram:     { title: 'Shagga-gram',                    icon: <GramIcon />,      w: 380, h: 540 },
      shwitter:       { title: 'Shwitter',                       icon: <ShwitterIcon />,  w: 480, h: 540 },
      shaggatube:     { title: 'ShaggaTube',                     icon: <TubeIcon />,      w: 880, h: 600 },
      shaggabook:     { title: 'ShaggaBook',                     icon: <BookIcon />,      w: 640, h: 520 },
      shaggafy:       { title: 'Shagga-fy',                      icon: <SfyIcon />,       w: 920, h: 640 },
      myshagga:       { title: 'My Shagga',                      icon: <MyShaggaIcon size={16} />,    w: 460, h: 380 },
      recyclebin:     { title: 'Recycle Bin',                    icon: <RecycleIcon />,   w: 460, h: 320 },
      taxreturns:     { title: 'tax_returns_DO_NOT_OPEN',        icon: <FolderIcon size={16} />,      w: 360, h: 280 },
    };
    const def = baseDefaults[kind];
    const w = opts.width ?? def.w;
    const h = opts.height ?? def.h;
    const { x, y } = randomPosition(w, h);
    return {
      id,
      kind,
      title: opts.title ?? def.title,
      iconNode: opts.iconNode ?? def.icon,
      initialX: opts.initialX ?? x,
      initialY: opts.initialY ?? y,
      width: w,
      height: h,
      minimized: false,
      maximized: false,
      resizable: opts.resizable ?? def.resizable ?? true,
      imageSrc: opts.imageSrc,
      shaggapadText: opts.shaggapadText,
    };
  }, []);

  const open = useCallback((kind: WindowKind, opts: Partial<OpenWindow> = {}) => {
    const win = buildWindow(kind, opts);
    setWindows((ws) => [...ws, win]);
    setActiveId(win.id);
    return win.id;
  }, [buildWindow]);

  const openOrFocus = useCallback((kind: WindowKind, opts: Partial<OpenWindow> = {}) => {
    const existing = windows.find((w) => w.kind === kind);
    if (existing) {
      focus(existing.id);
      return existing.id;
    }
    return open(kind, opts);
  }, [windows, focus, open]);

  const spawnRandom = useCallback(() => {
    const kind = weightedRandomKind();
    const opts: Partial<OpenWindow> = {};
    if (kind === 'area') opts.imageSrc = random(shaggas);
    if (kind === 'ad') opts.imageSrc = random(products);
    open(kind, opts);
  }, [open, products, shaggas]);

  // auto-spawn loop
  useEffect(() => {
    if (!mounted || isMobile) return;
    if (!settings.popupsEnabled) return;
    const rateMap = {
      slow:   { min: 8000,  range: 7000 },
      normal: { min: 4000,  range: 5000 },
      fast:   { min: 1500,  range: 2500 },
    };
    const { min, range } = rateMap[settings.spawnRate];
    const first = setTimeout(spawnRandom, 1300);
    let cancelled = false;
    function loop() {
      if (cancelled) return;
      const delay = min + Math.random() * range;
      setTimeout(() => {
        if (cancelled) return;
        setWindows((cur) => {
          if (cur.length < 12) queueMicrotask(spawnRandom);
          return cur;
        });
        loop();
      }, delay);
    }
    loop();
    return () => { cancelled = true; clearTimeout(first); };
  }, [mounted, isMobile, spawnRandom, settings.popupsEnabled, settings.spawnRate]);

  // periodic random BSOD
  useEffect(() => {
    if (!mounted || isMobile) return;
    if (!settings.bsodEnabled) return;
    function schedule() {
      const delay = 240_000 + Math.random() * 240_000; // 4-8 min
      return setTimeout(() => {
        setBsodActive(true);
      }, delay);
    }
    const id = schedule();
    return () => clearTimeout(id);
  }, [mounted, isMobile, bsodActive, settings.bsodEnabled]);

  // ----- desktop icons -----
  const openShaggapad   = useCallback(() => openOrFocus('shaggapad', { shaggapadText }), [openOrFocus, shaggapadText]);
  const openMyShagga    = useCallback(() => openOrFocus('myshagga'), [openOrFocus]);
  const openRecycleBin  = useCallback(() => openOrFocus('recyclebin'), [openOrFocus]);
  const openTaxReturns  = useCallback(() => openOrFocus('taxreturns'), [openOrFocus]);
  const openCalculator  = useCallback(() => openOrFocus('calculator'), [openOrFocus]);
  const openMinesweeper = useCallback(() => openOrFocus('minesweeper'), [openOrFocus]);
  const openIE          = useCallback(() => openOrFocus('internetshagga'), [openOrFocus]);
  const openPaint       = useCallback(() => openOrFocus('paint'), [openOrFocus]);
  const openGoonCalc    = useCallback(() => openOrFocus('gooncalc'), [openOrFocus]);
  const openWeather     = useCallback(() => openOrFocus('weather'), [openOrFocus]);
  const openSettings    = useCallback(() => openOrFocus('settings'), [openOrFocus]);
  const openChat        = useCallback(() => openOrFocus('chat'), [openOrFocus]);
  const openGallery     = useCallback(() => openOrFocus('gallery'), [openOrFocus]);
  const openShaggaGram  = useCallback(() => openOrFocus('shaggagram'), [openOrFocus]);
  const openShwitter    = useCallback(() => openOrFocus('shwitter'), [openOrFocus]);
  const openShaggaTube  = useCallback(() => openOrFocus('shaggatube'), [openOrFocus]);
  const openShaggaBook  = useCallback(() => openOrFocus('shaggabook'), [openOrFocus]);
  const openShaggaFy    = useCallback(() => openOrFocus('shaggafy'), [openOrFocus]);

  // ----- konami code -----
  useEffect(() => {
    const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    function onKey(e: KeyboardEvent) {
      const expected = sequence[idx];
      if (e.key === expected || e.key.toLowerCase() === expected.toLowerCase()) {
        idx++;
        if (idx === sequence.length) {
          setRaveActive(true);
          idx = 0;
        }
      } else {
        idx = 0;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ----- type "shagga" easter egg -----
  useEffect(() => {
    let buffer = '';
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      // Don't capture when user is typing in inputs
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-6);
      if (buffer === 'shagga') {
        // chaos: spawn 5 random popups + one rave
        for (let i = 0; i < 5; i++) {
          setTimeout(() => spawnRandom(), i * 250);
        }
        setRaveActive(true);
        buffer = '';
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [spawnRandom]);

  // ----- noon snag (12:00-12:59 every day = snag wallpaper class on body) -----
  useEffect(() => {
    function check() {
      const h = new Date().getHours();
      if (h === 12) document.body.classList.add('noon-snag');
      else document.body.classList.remove('noon-snag');
    }
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  // ----- apply wallpaper class to body -----
  useEffect(() => {
    const cls = `wp-${settings.wallpaper}`;
    // Remove any existing wp-* class then add the current one.
    document.body.className = document.body.className
      .split(' ').filter((c) => !c.startsWith('wp-')).join(' ').trim();
    document.body.classList.add(cls);
  }, [settings.wallpaper]);

  // ----- start menu -----
  const startLeft: StartMenuItem[] = [
    { id: 'ie',     label: 'Internet Shagga',    icon: <IEIcon size={20} />,         onClick: openIE, bold: true },
    { id: 'chat',   label: 'Shagga Chat',        icon: <ChatIcon size={20} />,       onClick: openChat, bold: true },
    { id: 'gram',   label: 'Shagga-gram',        icon: <GramIcon size={20} />,       onClick: openShaggaGram, bold: true },
    { id: 'shw',    label: 'Shwitter',           icon: <ShwitterIcon size={20} />,   onClick: openShwitter },
    { id: 'tube',   label: 'ShaggaTube',         icon: <TubeIcon size={20} />,       onClick: openShaggaTube },
    { id: 'fbook',  label: 'ShaggaBook',         icon: <BookIcon size={20} />,       onClick: openShaggaBook },
    { id: 'sfy',    label: 'Shagga-fy',          icon: <SfyIcon size={20} />,        onClick: openShaggaFy },
    { id: 'pad',    label: 'Shaggapad',          icon: <NotepadIcon size={20} />,    onClick: openShaggapad },
    { id: 'calc',   label: 'Calculator',         icon: <CalculatorIcon size={20} />, onClick: openCalculator },
    { id: 'mine',   label: 'Punt Sweeper',       icon: <MineIcon size={20} />,       onClick: openMinesweeper },
    { id: 'paint',  label: 'Shagga-Paint',       icon: <PaintIcon size={20} />,      onClick: openPaint },
    { id: 'gallery',label: 'Shagga Gallery',     icon: <GalleryIcon size={20} />,    onClick: openGallery },
    { id: 'goon',   label: 'Goon Calculator',    icon: <GoonIcon size={20} />,       onClick: openGoonCalc },
    { id: 'weather',label: 'Shagga Weather',     icon: <SunIcon size={20} />,        onClick: openWeather },
    { id: 'norton', label: 'Norton AntiShagga',  icon: <NortonIcon size={20} />,     onClick: () => open('norton') },
  ];
  const startRight: StartMenuItem[] = [
    { id: 'myshagga', label: 'My Shagga',     icon: <MyShaggaIcon size={20} />,    onClick: openMyShagga },
    { id: 'recycle',  label: 'Recycle Bin',   icon: <RecycleIcon size={20} />,     onClick: openRecycleBin },
    { id: 'tax',      label: 'tax_returns',   icon: <FolderIcon size={20} />,      onClick: openTaxReturns },
    { id: 'run',      label: 'Run...',        icon: <RunIcon size={20} />,         onClick: () => open('hacker') },
    { id: 'update',   label: 'Windows Update',icon: <UpdateIcon size={20} />,      onClick: () => open('update') },
    { id: 'settings', label: 'Control Panel', icon: <SettingsIcon size={20} />,    onClick: openSettings },
  ];

  // ----- context menu -----
  const ctxItems: ContextMenuItem[] = [
    { label: 'View', disabled: true },
    { label: 'Sort By', disabled: true },
    { label: 'Refresh', onClick: () => spawnRandom() },
    { divider: true, label: '' },
    { label: 'Paste', disabled: true },
    { label: 'Paste Shortcut', disabled: true },
    { divider: true, label: '' },
    { label: 'New ▶', disabled: true },
    { divider: true, label: '' },
    { label: 'Crash Computer', onClick: () => setBsodActive(true) },
    { label: 'Engage Rave Mode', onClick: () => setRaveActive(true) },
    { label: 'Show Clippy', onClick: () => setClippyHidden(false) },
    { divider: true, label: '' },
    { label: 'Properties', bold: true, onClick: openMyShagga },
  ];

  const taskbarItems: TaskbarItem[] = windows.map((w) => ({
    id: w.id,
    title: w.title,
    icon: w.iconNode,
    active: activeId === w.id,
    minimized: w.minimized,
  }));

  // ----- render -----
  if (!mounted) return null;
  if (isMobile) return <MobileBlock />;

  return (
    <main
      style={{ position: 'fixed', inset: 0 }}
      onContextMenu={(e) => {
        // Only react when right-click is on the desktop background, not on a window
        if ((e.target as HTMLElement).closest('.xp-window, .ctx-menu, .start-menu, .clippy-wrap')) return;
        e.preventDefault();
        const x = Math.min(e.clientX, window.innerWidth - 220);
        const y = Math.min(e.clientY, window.innerHeight - 360);
        setCtx({ x, y });
      }}
      onClick={() => {
        if (startOpen) setStartOpen(false);
      }}
    >
      <CurvedHero />
      <SnagCounter />

      {/* Desktop icons (left column) */}
      <DesktopIcon label="shagga.txt"   icon={<NotepadIconLarge />}  x={20}  y={20}  onOpen={openShaggapad} />
      <DesktopIcon label="My Shagga"    icon={<MyShaggaIcon />}       x={20}  y={120} onOpen={openMyShagga} />
      <DesktopIcon label="Internet Shagga" icon={
        <svg width="48" height="48" viewBox="0 0 48 48"><text x="24" y="38" textAnchor="middle" fontFamily="Times New Roman" fontWeight="bold" fontSize="40" fill="#0066ff">e</text><ellipse cx="24" cy="24" rx="18" ry="8" fill="none" stroke="#ffaa00" strokeWidth="2.4" transform="rotate(-20 24 24)" /></svg>
      } x={20} y={220} onOpen={openIE} />
      <DesktopIcon label="tax_returns" icon={<FolderIcon />}          x={20}  y={320} onOpen={openTaxReturns} />

      {/* Desktop icons (right column) */}
      <DesktopIcon label="Recycle Bin"  icon={<RecycleIconLarge />}   x={20}  y={420} onOpen={openRecycleBin} />

      {/* Desktop icons (second column - parody apps) */}
      <DesktopIcon label="Shagga-gram" icon={<GramIcon size={48} />}     x={120} y={20}  onOpen={openShaggaGram} />
      <DesktopIcon label="Shwitter"    icon={<ShwitterIcon size={48} />} x={120} y={120} onOpen={openShwitter} />
      <DesktopIcon label="ShaggaTube"  icon={<TubeIcon size={48} />}     x={120} y={220} onOpen={openShaggaTube} />
      <DesktopIcon label="ShaggaBook"  icon={<BookIcon size={48} />}     x={120} y={320} onOpen={openShaggaBook} />
      <DesktopIcon label="Shagga-fy"   icon={<SfyIcon size={48} />}      x={120} y={420} onOpen={openShaggaFy} />
      <DesktopIcon label="Settings"    icon={<SettingsIcon size={48} />} x={220} y={20}  onOpen={openSettings} />

      {/* Open windows */}
      {windows.map((w, idx) => {
        const z = 100 + idx;
        const isActive = activeId === w.id;
        return (
          <XPWindow
            key={w.id}
            id={w.id}
            title={w.title}
            iconSvg={w.iconNode}
            initialX={w.initialX}
            initialY={w.initialY}
            width={w.width}
            height={w.height}
            minimized={w.minimized}
            maximized={w.maximized}
            resizable={w.resizable}
            zIndex={z}
            isActive={isActive}
            onClose={() => close(w.id)}
            onMinimize={() => minimize(w.id)}
            onMaximize={() => maximize(w.id)}
            onFocus={() => focus(w.id)}
          >
            {w.kind === 'area' && w.imageSrc && <ShaggaAreaBody imageSrc={w.imageSrc} />}
            {w.kind === 'ad' && w.imageSrc && <ShaggaAdBody imageSrc={w.imageSrc} />}
            {w.kind === 'hacker' && <ShaggaHackerBody />}
            {w.kind === 'norton' && <NortonScanBody />}
            {w.kind === 'limewire' && <LimewireBody />}
            {w.kind === 'chat' && <ShaggaChatBody />}
            {w.kind === 'visitor' && <VisitorBannerBody />}
            {w.kind === 'update' && <WindowsUpdateBody />}
            {w.kind === 'chainemail' && <ChainEmailBody />}
            {w.kind === 'shaggapad' && <ShaggapadBody text={w.shaggapadText ?? shaggapadText} />}
            {w.kind === 'calculator' && <CalculatorBody />}
            {w.kind === 'minesweeper' && <MinesweeperBody />}
            {w.kind === 'internetshagga' && <InternetShaggaBody />}
            {w.kind === 'paint' && <PaintBody />}
            {w.kind === 'gooncalc' && <GoonCalcBody />}
            {w.kind === 'weather' && <WeatherBody />}
            {w.kind === 'settings' && <SettingsBody settings={settings} onChange={setSettings} />}
            {w.kind === 'gallery' && <GalleryBody />}
            {w.kind === 'shaggagram' && <ShaggaGramBody />}
            {w.kind === 'shwitter' && <ShwitterBody />}
            {w.kind === 'shaggatube' && <ShaggaTubeBody />}
            {w.kind === 'shaggabook' && <ShaggaBookBody />}
            {w.kind === 'shaggafy' && <ShaggaFyBody />}
            {w.kind === 'myshagga' && <MyShaggaBody />}
            {w.kind === 'recyclebin' && <RecycleBinBody />}
            {w.kind === 'taxreturns' && <TaxReturnsBody />}
          </XPWindow>
        );
      })}

      {settings.clippyEnabled && !clippyHidden && <Clippy onClose={() => setClippyHidden(true)} />}

      <Taskbar
        items={taskbarItems}
        onTaskClick={toggleFromTaskbar}
        onStartClick={() => setStartOpen((o) => !o)}
        startOpen={startOpen}
      />

      <StartMenu
        open={startOpen}
        leftItems={startLeft}
        rightItems={startRight}
        onClose={() => setStartOpen(false)}
        onTurnOff={() => setBsodActive(true)}
        onLogOff={() => setBsodActive(true)}
      />

      {ctx && (
        <ContextMenu x={ctx.x} y={ctx.y} items={ctxItems} onClose={() => setCtx(null)} />
      )}

      {bsodActive && <BSOD onComplete={() => setBsodActive(false)} />}
      {raveActive && <RaveMode onClose={() => setRaveActive(false)} />}
      <Toaster />
    </main>
  );
}
