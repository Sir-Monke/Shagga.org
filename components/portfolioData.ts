// ============================================================
// PORTFOLIO DATA
// Pure data + lightweight pure functions. No React imports here
// so the bundler can tree-shake aggressively and the values can
// be unit-tested in isolation if it ever becomes worth it.
// ============================================================

export type ProjectCategory =
  | 'Security'
  | 'AI / Automation'
  | 'Web'
  | 'Web3'
  | 'Systems'
  | 'Tooling'
  | 'Game Dev';

export type ProjectStatus =
  | 'Production'
  | 'Research'
  | 'Personal'
  | 'Coursework'
  | 'Archived'
  | 'In Development'
  | 'Hidden';

export interface Project {
  title: string;
  year: string;
  category: ProjectCategory;
  status: ProjectStatus;
  blurb: string;
  stack: readonly string[];
  privateRepo: boolean;
}

export interface Skill {
  name: string;
  /** Year I picked it up. The "+ yrs" is computed live so it stays accurate. */
  startYear: number;
  level: number;
  detail: string;
}

export interface Social {
  label: 'GitHub' | 'Discord' | 'Instagram' | 'Email';
  url: string;
  display: string;
  icon: 'github' | 'discord' | 'instagram' | 'email';
}

// ---- Live-ticking years-of-experience helper ---------------------
// Pure & deterministic given a `now`, easy to test.
const ANNIV_MONTH = 3; // April (0-indexed)
const ANNIV_DAY = 29;

export function yearsSince(startYear: number, now: Date = new Date()): number {
  const passed =
    now.getMonth() > ANNIV_MONTH ||
    (now.getMonth() === ANNIV_MONTH && now.getDate() >= ANNIV_DAY);
  const years = now.getFullYear() - startYear - (passed ? 0 : 1);
  return Math.max(years, 1);
}

export function fmtYears(startYear: number): string {
  return `${yearsSince(startYear)}+ yrs`;
}

// ---- Skills ------------------------------------------------------

export const SKILLS: readonly Skill[] = [
  { name: 'C / C++',                startYear: 2020, level: 90, detail: 'Low-level systems, memory analysis, hooking, DLL injection, internal frameworks. My main weapon.' },
  { name: 'Python',                 startYear: 2018, level: 92, detail: 'Automation, scripting, AI/ML tooling, trading systems, scraping, data pipelines.' },
  { name: 'Reverse Engineering',    startYear: 2020, level: 82, detail: 'Static and dynamic analysis of Windows binaries with IDA Pro, Hex-Rays, Ghidra, x64dbg, and a wider toolbelt. Deep low-level memory work — how a system actually handles memory and where it can be manipulated. Function detours, pattern scanning, adaptive AI-driven workflows.' },
  { name: 'Memory Internals',       startYear: 2020, level: 85, detail: 'Deep familiarity with how operating systems handle memory — virtual address spaces, paging, allocators, stack/heap layout — and how that handling can be observed and manipulated at runtime.' },
  { name: 'Decompilation Tooling',  startYear: 2021, level: 80, detail: 'Daily-driver fluency with IDA Pro (Hex-Rays), Ghidra, x64dbg, and a wide range of supporting analysis tools across the RE workflow.' },
  { name: 'Assembly (x86 / x64)',   startYear: 2021, level: 75, detail: 'Reading and writing x86/x64 ASM. Trampoline hooks, inline patches, calling convention work.' },
  { name: 'Kernel Development',     startYear: 2022, level: 65, detail: 'Windows / Linux kernel drivers. Ring 0 work, IOCTL handlers, custom Linux distributions.' },
  { name: 'Solidity / Web3',        startYear: 2023, level: 60, detail: 'Smart contract development on EVM chains. Full-stack dApps with on-chain integration.' },
  { name: 'TypeScript / Next.js',   startYear: 2022, level: 75, detail: 'Production web apps, UI/UX, marketing sites, dashboards.' },
  { name: 'React',                  startYear: 2021, level: 78, detail: 'Component-driven UIs, state management, animations, complex frontends.' },
  { name: 'C#',                     startYear: 2022, level: 65, detail: 'WinForms apps, .NET tooling, A-level Computer Science NEA.' },
  { name: 'Lua',                    startYear: 2022, level: 60, detail: 'Game scripting, runtime modification.' },
];

// ---- Projects ----------------------------------------------------

export const PROJECTS: readonly Project[] = [
  // Active commercial / product work
  { title: 'Custom Streaming OS',         year: '2026',      category: 'Systems',         status: 'In Development', blurb: 'A purpose-built Linux distribution for video-streaming hardware. Custom-compiled kernel, hand-picked package set, and a stripped-down userland targeting sub-5-second boot on low-cost hardware.', stack: ['Linux', 'C', 'Kernel', 'Custom Build'],     privateRepo: true },
  { title: 'DeepScope',                   year: '2025',      category: 'AI / Automation', status: 'In Development', blurb: 'Windows-only AI-driven cybersecurity platform. Automates reverse engineering and behavioural analysis of Windows binaries using an adaptive OODA-loop decision architecture, with deobfuscation and static-analysis pipelines.', stack: ['Python', 'AI', 'Win32', 'OODA Loop', 'Static Analysis'], privateRepo: true },

  // Production / live
  { title: 'PropertyDealFinder',          year: '2026',      category: 'AI / Automation', status: 'Production',     blurb: 'AI-powered UK property deal finder. Automated scraping, analysis, and scoring across listing sources.', stack: ['TypeScript', 'AI', 'Scraping', 'Scoring'], privateRepo: true },
  { title: 'Automated Trading Bot',       year: '2025',      category: 'AI / Automation', status: 'Production',     blurb: 'Day trading bot for IG Markets. Technical-indicator strategy with built-in risk management.',           stack: ['Python', 'IG API', 'TA', 'Risk Mgmt'],     privateRepo: true },

  // Personal / private builds
  { title: 'MyBox OS',                    year: '2026',      category: 'Web',             status: 'Personal',       blurb: 'Web-based operating system experience. Cross-platform — desktop web, Android 2GB build, mobile-first frontend.', stack: ['TypeScript', 'HTML', 'PWA'], privateRepo: true },
  { title: 'Interior Design App',         year: '2026',      category: 'AI / Automation', status: 'Personal',       blurb: 'AI-assisted interior design tool. Concept work around visual generation and product matching.',         stack: ['JavaScript', 'AI', 'Computer Vision'],     privateRepo: true },
  { title: 'IKEA API Test',               year: '2026',      category: 'Tooling',         status: 'Personal',       blurb: 'Reverse-engineered IKEA product data pipeline. Catalogue scraping and structuring for downstream apps.', stack: ['TypeScript', 'API', 'Scraping'], privateRepo: true },
  { title: 'Smart Contract Suite',        year: '2023',      category: 'Web3',            status: 'Personal',       blurb: 'Full-stack dApp with custom Solidity contracts on EVM chains. Front-end, on-chain logic, wallet integration end-to-end.', stack: ['Solidity', 'TypeScript', 'EVM', 'ethers.js'], privateRepo: true },

  // Security research
  { title: 'Web Vulnerability Research',  year: '2026',      category: 'Security',        status: 'Research',       blurb: 'Independent vulnerability research on production web platforms. Focused on input validation, auth flow flaws, and business-logic gaps. Findings handled through responsible disclosure where applicable. Specifics shared privately on request.', stack: ['Web Security', 'OWASP', 'Disclosure'], privateRepo: true },
  { title: 'Anti-Cheat Mechanics',        year: '2023–2025', category: 'Security',        status: 'Research',       blurb: 'Studied modern anti-cheat detection mechanisms — kernel hooks, behavioural fingerprinting, integrity checks. Bypass research strictly for security learning.', stack: ['C++', 'Kernel', 'Reverse Engineering'], privateRepo: true },
  { title: 'Anti-Cheat Internals',        year: '2025',      category: 'Security',        status: 'Research',       blurb: 'Deep-dive into anti-cheat architectures end-to-end — kernel-mode protections, integrity checks, behavioural detection, hypervisor-assisted enforcement. Educational research into how these systems are designed and where their assumptions break down. No public tooling.', stack: ['Kernel', 'Anti-Cheat', 'Reverse Engineering'], privateRepo: true },
  { title: 'Sniper Elite Reversal',       year: '2025',      category: 'Security',        status: 'Research',       blurb: 'Active reverse-engineering project. Learning, documenting, building tools as I go.', stack: ['C++', 'Reverse Engineering'], privateRepo: true },
  { title: 'Windows Kernel Drivers',      year: '2022',      category: 'Systems',         status: 'Personal',       blurb: 'Ring-0 driver development. IOCTL handlers, kernel-mode hooking, system-level instrumentation for security tooling.', stack: ['C', 'WDK', 'Win32', 'Kernel'], privateRepo: true },

  // Game security / RE (older public)
  { title: 'Sauerbraten Internal',        year: '2024',      category: 'Security',        status: 'Archived',       blurb: 'Internal game-security research project for the Sauerbraten engine. ImGui-driven UI, custom rendering hooks. Educational.', stack: ['C++', 'ImGui', 'Hooking'], privateRepo: false },
  { title: 'EPQ — Assault Cube Research', year: '2024',      category: 'Security',        status: 'Coursework',     blurb: 'A-level Extended Project Qualification: internal game-security framework with ImGui front-end. Memory analysis, ESP rendering, system-level hooks.', stack: ['C++', 'ImGui', 'Memory Analysis'], privateRepo: false },
  { title: 'CS:S Research Project',       year: '2024',      category: 'Security',        status: 'Archived',       blurb: 'Counter-Strike: Source aim-assist research. Vector math, view-angle calculations, runtime memory inspection.', stack: ['C++', 'Linear Algebra'], privateRepo: false },
  { title: 'InjectorGUI',                 year: '2024',      category: 'Tooling',         status: 'Personal',       blurb: 'WinForms-based DLL injector. Process enumeration, manual mapping, basic UI.', stack: ['C#', 'WinForms', 'Win32'], privateRepo: false },
  { title: 'Simple DLL Injector',         year: '2024',      category: 'Tooling',         status: 'Personal',       blurb: 'Minimal C++ DLL injector — clean, focused implementation for learning Win32 injection mechanics.', stack: ['C++', 'Win32'], privateRepo: false },
  { title: 'Function Detours',            year: '2024',      category: 'Security',        status: 'Personal',       blurb: 'Function-detour / trampoline-hook learning project. Used in early reverse-engineering experiments.', stack: ['C++', 'Hooking'], privateRepo: false },
  { title: 'Function Calls (Signatures)', year: '2023',      category: 'Security',        status: 'Personal',       blurb: 'Calling functions by signature/pattern instead of hardcoded offsets. Resilient to binary updates.', stack: ['C++', 'Pattern Matching'], privateRepo: false },

  // Apps / coursework
  { title: 'Chat App (NEA)',              year: '2024',      category: 'Web',             status: 'Coursework',     blurb: 'A-level Computer Science NEA. Real-time messaging app with custom backend and UI.', stack: ['C#', 'Networking', 'UI'], privateRepo: false },
  { title: 'ChatApp (Python)',            year: '2023',      category: 'Web',             status: 'Personal',       blurb: 'Earlier Python prototype of a chat application — sockets, simple protocol, basic GUI.', stack: ['Python', 'Sockets'], privateRepo: false },
  { title: 'Human Benchmark Bot',         year: '2023',      category: 'Tooling',         status: 'Personal',       blurb: 'Automation scripts for humanbenchmark.com — reaction time, sequence memory, visual memory. For fun.', stack: ['Python', 'Automation'], privateRepo: false },
  { title: 'GTA V Online Lua Script',     year: '2022',      category: 'Game Dev',        status: 'Archived',       blurb: 'Early Lua scripting project for GTA Online. Runtime hooks, simple UI menu.', stack: ['Lua'], privateRepo: false },
  { title: 'Trampoline Hook Demo',        year: '2022',      category: 'Security',        status: 'Archived',       blurb: 'Educational x86 trampoline hook implementation. Memory editing fundamentals.', stack: ['C++', 'x86'], privateRepo: false },
  { title: 'Python DOS Script',           year: '2023',      category: 'Security',        status: 'Archived',       blurb: 'Educational denial-of-service script. For research only — never used in anger.', stack: ['Python'], privateRepo: false },

  // Stealth
  { title: 'MyCoolGame',                  year: '🤫',        category: 'Game Dev',        status: 'Hidden',         blurb: '🤫', stack: [], privateRepo: true },
];

// ---- Socials -----------------------------------------------------

export const SOCIALS: readonly Social[] = [
  { label: 'GitHub',    url: 'https://github.com/Sir-Monke',     display: 'github.com/Sir-Monke',  icon: 'github'    },
  { label: 'Discord',   url: 'https://discord.gg/RJeHhmtKx6',    display: 'discord.gg/RJeHhmtKx6', icon: 'discord'   },
  { label: 'Instagram', url: 'https://www.instagram.com/wi1l.c', display: 'instagram.com/wi1l.c',  icon: 'instagram' },
  { label: 'Email',     url: 'mailto:hello@shagga.org',          display: 'hello@shagga.org',      icon: 'email'     },
];

// ---- Filter category list (derived from PROJECTS, no duplication) ----

export type FilterCategory = 'all' | ProjectCategory;

/** Categories actually present in PROJECTS, in insertion-order, prefixed with 'all'. */
export function projectCategories(): readonly FilterCategory[] {
  const seen = new Set<ProjectCategory>();
  const out: FilterCategory[] = ['all'];
  for (const p of PROJECTS) if (!seen.has(p.category)) { seen.add(p.category); out.push(p.category); }
  return out;
}

/** Pure filter — returns the original array reference for 'all' to keep referential equality. */
export function filterProjects(filter: FilterCategory): readonly Project[] {
  return filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
}

// ---- Aggregate stats -----------------------------------------

export interface PortfolioStats {
  total: number;
  production: number;
  research: number;
  yearsCoding: number;
}

export function computeStats(): PortfolioStats {
  let production = 0;
  let research = 0;
  for (const p of PROJECTS) {
    if (p.status === 'Production') production += 1;
    else if (p.status === 'Research') research += 1;
  }
  // Total tracks longer-tail GitHub work, not just curated entries
  const total = Math.max(40, PROJECTS.length);
  // Years coding ticks up automatically from the longest-running skill
  let yearsCoding = 0;
  for (const s of SKILLS) {
    const y = yearsSince(s.startYear);
    if (y > yearsCoding) yearsCoding = y;
  }
  return { total, production, research, yearsCoding };
}
