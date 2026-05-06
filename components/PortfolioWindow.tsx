'use client';
import React, { useState } from 'react';

/* ============================================================
   PORTFOLIO — /portfolio
   Self-contained. Mobile-first XP window aesthetic, polished.
   All styles in PortfolioWindow.css (prefixed `pf-`).
   ============================================================ */

// --- Content ---------------------------------------------------

interface Skill {
  name: string;
  /** Year I started learning this. Years displayed update automatically each year. */
  startYear: number;
  level: number;
  detail: string;
}

// Auto-increment years based on a fixed anniversary date.
// Display ticks up by 1 each year on the anniversary.
function yearsSince(startYear: number, now: Date = new Date()): number {
  const ANNIV_MONTH = 3; // 0-indexed: 3 = April
  const ANNIV_DAY = 29;
  const thisYear = now.getFullYear();
  let years = thisYear - startYear;
  // If we haven't hit this year's anniversary yet, subtract one
  const passedAnniversary =
    now.getMonth() > ANNIV_MONTH ||
    (now.getMonth() === ANNIV_MONTH && now.getDate() >= ANNIV_DAY);
  if (!passedAnniversary) years -= 1;
  return Math.max(years, 1);
}

function fmtYears(startYear: number): string {
  return `${yearsSince(startYear)}+ yrs`;
}

// Skills — startYear is when I picked it up. The "+ yrs" display
// in the UI is computed live, so it stays accurate forever.
const SKILLS: Skill[] = [
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

interface Project {
  title: string;
  year: string;
  category: 'Security' | 'AI / Automation' | 'Web' | 'Web3' | 'Systems' | 'Tooling' | 'Game Dev';
  status: 'Production' | 'Research' | 'Personal' | 'Coursework' | 'Archived' | 'In Development' | 'Hidden';
  blurb: string;
  stack: string[];
  privateRepo: boolean;
}

const PROJECTS: Project[] = [
  // --- Active commercial / product work ---
  { title: 'Custom Streaming OS',        year: '2026',      category: 'Systems',         status: 'In Development', blurb: 'A purpose-built Linux distribution for video-streaming hardware. Custom-compiled kernel, hand-picked package set, and a stripped-down userland targeting sub-5-second boot on low-cost hardware. In-progress as the first product of my own company.', stack: ['Linux', 'C', 'Kernel', 'Custom Build'],     privateRepo: true },
  { title: 'DeepScope',                  year: '2025',      category: 'AI / Automation', status: 'In Development', blurb: 'Windows-only AI-driven cybersecurity platform. Automates reverse engineering and behavioural analysis of Windows binaries using an adaptive OODA-loop decision architecture, with deobfuscation and static-analysis pipelines. Being developed as a sellable product.',          stack: ['Python', 'AI', 'Win32', 'OODA Loop', 'Static Analysis'], privateRepo: true },

  // --- Production / live ---
  { title: 'PropertyDealFinder',         year: '2026',      category: 'AI / Automation', status: 'Production', blurb: 'AI-powered UK property deal finder. Automated scraping, analysis, and scoring across listing sources.',                                                                                            stack: ['TypeScript', 'AI', 'Scraping', 'Scoring'],  privateRepo: true },
  { title: 'Automated Trading Bot',      year: '2025',      category: 'AI / Automation', status: 'Production', blurb: 'Day trading bot for IG Markets. Technical-indicator strategy with built-in risk management.',                                                                                                      stack: ['Python', 'IG API', 'TA', 'Risk Mgmt'],      privateRepo: true },

  // --- Personal / private builds ---
  { title: 'MyBox OS',                   year: '2026',      category: 'Web',             status: 'Personal',   blurb: 'Web-based operating system experience. Cross-platform — desktop web, Android 2GB build, mobile-first frontend.',                                                                                    stack: ['TypeScript', 'HTML', 'PWA'],                privateRepo: true },
  { title: 'Interior Design App',        year: '2026',      category: 'AI / Automation', status: 'Personal',   blurb: 'AI-assisted interior design tool. Concept work around visual generation and product matching.',                                                                                                     stack: ['JavaScript', 'AI', 'Computer Vision'],      privateRepo: true },
  { title: 'IKEA API Test',              year: '2026',      category: 'Tooling',         status: 'Personal',   blurb: 'Reverse-engineered IKEA product data pipeline. Catalogue scraping and structuring for downstream apps.',                                                                                            stack: ['TypeScript', 'API', 'Scraping'],            privateRepo: true },
  { title: 'Smart Contract Suite',       year: '2023',      category: 'Web3',            status: 'Personal',   blurb: 'Full-stack dApp with custom Solidity contracts on EVM chains. Front-end, on-chain logic, wallet integration end-to-end.',                                                                          stack: ['Solidity', 'TypeScript', 'EVM', 'ethers.js'], privateRepo: true },

  // --- Security research ---
  { title: 'Web Vulnerability Research', year: '2026',      category: 'Security',        status: 'Research',   blurb: 'Independent vulnerability research on production web platforms. Focused on input validation, auth flow flaws, and business-logic gaps. Findings handled through responsible disclosure where applicable. Specifics shared privately on request.', stack: ['Web Security', 'OWASP', 'Disclosure'], privateRepo: true },
  { title: 'Anti-Cheat Mechanics',       year: '2023–2025', category: 'Security',        status: 'Research',   blurb: 'Studied modern anti-cheat detection mechanisms — kernel hooks, behavioural fingerprinting, integrity checks. Bypass research strictly for security learning.', stack: ['C++', 'Kernel', 'Reverse Engineering'],     privateRepo: true },
  { title: 'Anti-Cheat Internals',       year: '2025',      category: 'Security',        status: 'Research',   blurb: 'Deep-dive into anti-cheat architectures end-to-end — kernel-mode protections, integrity checks, behavioural detection, hypervisor-assisted enforcement. Educational research into how these systems are designed and where their assumptions break down. No public tooling.', stack: ['Kernel', 'Anti-Cheat', 'Reverse Engineering'], privateRepo: true },
  { title: 'Sniper Elite Reversal',      year: '2025',      category: 'Security',        status: 'Research',   blurb: 'Active reverse-engineering project. Learning, documenting, building tools as I go.',                                                                                                                stack: ['C++', 'Reverse Engineering'],               privateRepo: true },
  { title: 'Windows Kernel Drivers',     year: '2022',      category: 'Systems',         status: 'Personal',   blurb: 'Ring-0 driver development. IOCTL handlers, kernel-mode hooking, system-level instrumentation for security tooling.',                                                                              stack: ['C', 'WDK', 'Win32', 'Kernel'],              privateRepo: true },

  // --- Game security / RE (older public) ---
  { title: 'Sauerbraten Internal',       year: '2024', category: 'Security',  status: 'Archived',  blurb: 'Internal game-security research project for the Sauerbraten engine. ImGui-driven UI, custom rendering hooks. Educational.', stack: ['C++', 'ImGui', 'Hooking'],         privateRepo: false },
  { title: 'EPQ — Assault Cube Research',year: '2024', category: 'Security',  status: 'Coursework',blurb: 'A-level Extended Project Qualification: internal game-security framework with ImGui front-end. Memory analysis, ESP rendering, system-level hooks.', stack: ['C++', 'ImGui', 'Memory Analysis'], privateRepo: false },
  { title: 'CS:S Research Project',      year: '2024', category: 'Security',  status: 'Archived',  blurb: 'Counter-Strike: Source aim-assist research. Vector math, view-angle calculations, runtime memory inspection.', stack: ['C++', 'Linear Algebra'],           privateRepo: false },
  { title: 'InjectorGUI',                year: '2024', category: 'Tooling',   status: 'Personal',  blurb: 'WinForms-based DLL injector. Process enumeration, manual mapping, basic UI.',                                  stack: ['C#', 'WinForms', 'Win32'],         privateRepo: false },
  { title: 'Simple DLL Injector',        year: '2024', category: 'Tooling',   status: 'Personal',  blurb: 'Minimal C++ DLL injector — clean, focused implementation for learning Win32 injection mechanics.',           stack: ['C++', 'Win32'],                    privateRepo: false },
  { title: 'Function Detours',           year: '2024', category: 'Security',  status: 'Personal',  blurb: 'Function-detour / trampoline-hook learning project. Used in early reverse-engineering experiments.',          stack: ['C++', 'Hooking'],                  privateRepo: false },
  { title: 'Function Calls (Signatures)',year: '2023', category: 'Security',  status: 'Personal',  blurb: 'Calling functions by signature/pattern instead of hardcoded offsets. Resilient to binary updates.',         stack: ['C++', 'Pattern Matching'],         privateRepo: false },

  // --- Apps / coursework ---
  { title: 'Chat App (NEA)',             year: '2024', category: 'Web',       status: 'Coursework',blurb: 'A-level Computer Science NEA. Real-time messaging app with custom backend and UI.',                            stack: ['C#', 'Networking', 'UI'],          privateRepo: false },
  { title: 'ChatApp (Python)',           year: '2023', category: 'Web',       status: 'Personal',  blurb: 'Earlier Python prototype of a chat application — sockets, simple protocol, basic GUI.',                       stack: ['Python', 'Sockets'],               privateRepo: false },
  { title: 'Human Benchmark Bot',        year: '2023', category: 'Tooling',   status: 'Personal',  blurb: 'Automation scripts for humanbenchmark.com — reaction time, sequence memory, visual memory. For fun.',         stack: ['Python', 'Automation'],            privateRepo: false },
  { title: 'GTA V Online Lua Script',    year: '2022', category: 'Game Dev',  status: 'Archived',  blurb: 'Early Lua scripting project for GTA Online. Runtime hooks, simple UI menu.',                                   stack: ['Lua'],                             privateRepo: false },
  { title: 'Trampoline Hook Demo',       year: '2022', category: 'Security',  status: 'Archived',  blurb: 'Educational x86 trampoline hook implementation. Memory editing fundamentals.',                                 stack: ['C++', 'x86'],                      privateRepo: false },
  { title: 'Python DOS Script',          year: '2023', category: 'Security',  status: 'Archived',  blurb: 'Educational denial-of-service script. For research only — never used in anger.',                              stack: ['Python'],                          privateRepo: false },

  // --- Stealth ---
  { title: 'MyCoolGame',                 year: '🤫',   category: 'Game Dev',  status: 'Hidden',    blurb: '🤫',                                                                                                                                                            stack: [],                                  privateRepo: true },
];

const SOCIALS = [
  { label: 'GitHub',    url: 'https://github.com/Sir-Monke',          display: 'github.com/Sir-Monke',     icon: 'github'    },
  { label: 'Discord',   url: 'https://discord.gg/RJeHhmtKx6',         display: 'discord.gg/RJeHhmtKx6',    icon: 'discord'   },
  { label: 'Instagram', url: 'https://www.instagram.com/wi1l.c',      display: 'instagram.com/wi1l.c',     icon: 'instagram' },
  { label: 'Email',     url: 'mailto:hello@shagga.org',               display: 'hello@shagga.org',         icon: 'email'     },
];

// --- Component -------------------------------------------------

type Tab = 'about' | 'skills' | 'projects' | 'contact';

export default function PortfolioWindow() {
  const [tab, setTab] = useState<Tab>('about');
  const [filter, setFilter] = useState<'all' | Project['category']>('all');

  const totalProjects = PROJECTS.length;
  const productionCount = PROJECTS.filter((p) => p.status === 'Production').length;
  const researchCount = PROJECTS.filter((p) => p.status === 'Research').length;
  // Years coding tracks my longest-running skill, ticks up automatically.
  const yearsCoding = Math.max(...SKILLS.map((s) => yearsSince(s.startYear)));

  return (
    <div className="pf-page">
      <div className="pf-window">
        {/* Title bar */}
        <div className="pf-titlebar">
          <div className="pf-titlebar-left">
            <div className="pf-favicon">
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                <defs>
                  <linearGradient id="pf-fav" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5b9eef" />
                    <stop offset="100%" stopColor="#1f5fb8" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="3" fill="url(#pf-fav)" />
                <text x="12" y="17" textAnchor="middle" fontFamily="Tahoma, sans-serif" fontWeight="900" fontSize="13" fill="#fff">M</text>
              </svg>
            </div>
            <span className="pf-title-text">Sir Monke — Portfolio.exe</span>
          </div>
          <div className="pf-titlebar-buttons" aria-hidden>
            <button className="pf-tb-btn" tabIndex={-1}>_</button>
            <button className="pf-tb-btn" tabIndex={-1}>▢</button>
            <button className="pf-tb-btn pf-close" tabIndex={-1}>✕</button>
          </div>
        </div>

        {/* Menu bar */}
        <div className="pf-menubar">
          <span className="pf-menu-item">File</span>
          <span className="pf-menu-item">Edit</span>
          <span className="pf-menu-item">View</span>
          <span className="pf-menu-item">Help</span>
        </div>

        {/* Tabs */}
        <div className="pf-tabs" role="tablist">
          {(['about', 'skills', 'projects', 'contact'] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={`pf-tab ${tab === t ? 'pf-active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="pf-body" role="tabpanel">
          {tab === 'about' && (
            <AboutPanel
              total={totalProjects}
              production={productionCount}
              research={researchCount}
              yearsCoding={yearsCoding}
            />
          )}
          {tab === 'skills' && <SkillsPanel />}
          {tab === 'projects' && <ProjectsPanel filter={filter} setFilter={setFilter} />}
          {tab === 'contact' && <ContactPanel />}
        </div>

        {/* Status bar */}
        <div className="pf-statusbar">
          <span className="pf-status-cell">Ready</span>
          <span className="pf-status-cell pf-grow pf-center">shagga.org/portfolio</span>
          <span className="pf-status-cell">UK</span>
        </div>
      </div>
    </div>
  );
}

// --- Panels ----------------------------------------------------

function AboutPanel({ total, production, research, yearsCoding }: { total: number; production: number; research: number; yearsCoding: number }) {
  return (
    <div className="pf-panel">
      <div className="pf-hero">
        <div className="pf-hero-avatar">
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden style={{ display: 'block' }}>
            <defs>
              <linearGradient id="pf-av-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7b61ff" />
                <stop offset="100%" stopColor="#1ca0fb" />
              </linearGradient>
              <radialGradient id="pf-av-shine" cx="0.3" cy="0.2" r="0.6">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" rx="14" fill="url(#pf-av-bg)" />
            <rect width="100" height="100" rx="14" fill="url(#pf-av-shine)" />
            <text x="50" y="68" textAnchor="middle" fontFamily="Tahoma, sans-serif" fontWeight="900" fontSize="50" fill="#fff" letterSpacing="-2">M</text>
          </svg>
        </div>
        <div className="pf-hero-text">
          <h1 className="pf-hero-name">Sir Monke</h1>
          <p className="pf-hero-role">Security Research · Kernel · Reverse Engineering · Full-Stack</p>
          <p className="pf-hero-loc">📍 United Kingdom</p>
          <div className="pf-hero-tags">
            <span className="pf-hero-tag">C / C++</span>
            <span className="pf-hero-tag">Python</span>
            <span className="pf-hero-tag">x86 / x64 ASM</span>
            <span className="pf-hero-tag">Kernel</span>
            <span className="pf-hero-tag">AI Tooling</span>
            <span className="pf-hero-tag">Solidity</span>
          </div>
        </div>
      </div>

      <div className="pf-stats">
        <div className="pf-stat">
          <div className="pf-stat-num">{total}+</div>
          <div className="pf-stat-label">Projects Built</div>
        </div>
        <div className="pf-stat">
          <div className="pf-stat-num">{production + research}</div>
          <div className="pf-stat-label">Active Now</div>
        </div>
        <div className="pf-stat">
          <div className="pf-stat-num">{yearsCoding}+</div>
          <div className="pf-stat-label">Years Coding</div>
        </div>
      </div>

      <h2 className="pf-section-h">About</h2>
      <p className="pf-prose">
        Self-taught developer based in the UK. I work across the full stack — from kernel drivers and assembly,
        through reverse engineering and AI-driven security tooling, all the way up to smart contracts and
        production web apps. I&apos;ve done independent vulnerability research on widely-used platforms, and
        I&apos;m currently building a Linux-based streaming OS as the first product of my own company.
        Most of my recent work lives in private repos — happy to walk through it in person.
      </p>

      <h2 className="pf-section-h">What I focus on</h2>
      <ul className="pf-bullets">
        <li><b>Low-level systems</b> — C/C++, x86/x64 assembly, Win32, kernel drivers, custom Linux distributions. Heavy emphasis on memory management — how a system actually handles memory and where it can be manipulated.</li>
        <li><b>Reverse engineering</b> — IDA Pro, Hex-Rays, Ghidra, x64dbg, and a wider toolbelt. Static and dynamic analysis, function detours, trampoline hooks, signature-based binary calls.</li>
        <li><b>Security research</b> — independent vulnerability research, anti-cheat internals, behavioural analysis, AI-driven reverse engineering with OODA-loop architectures.</li>
        <li><b>Automation &amp; trading</b> — production Python systems with proper risk management.</li>
        <li><b>Web3 &amp; full-stack</b> — Solidity smart contracts, on-chain dApps, TypeScript / React / Next.js for the bits people actually see.</li>
      </ul>

      <h2 className="pf-section-h">Source code</h2>
      <p className="pf-prose pf-dim">
        Most of my recent work lives in private repos. I&apos;m happy to walk through specific projects in person
        or on a call — what they do, how they&apos;re built, what I learned. Older educational and learning
        projects are public on{' '}
        <a className="pf-link" href="https://github.com/Sir-Monke" target="_blank" rel="noopener noreferrer">my GitHub</a>.
      </p>
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="pf-panel">
      <h2 className="pf-section-h">Skills</h2>
      <p className="pf-prose pf-dim">
        Years roughly indicate when I started. Levels are honest self-assessments — what I&apos;m
        confident shipping in production today.
      </p>

      <div className="pf-skills-list">
        {SKILLS.map((s) => (
          <div key={s.name} className="pf-skill-row">
            <div className="pf-skill-head">
              <span className="pf-skill-name">{s.name}</span>
              <span className="pf-skill-years">{fmtYears(s.startYear)}</span>
            </div>
            <div className="pf-skill-bar" role="progressbar" aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100}>
              <div className="pf-skill-fill" style={{ width: `${s.level}%` }} />
            </div>
            <p className="pf-skill-detail">{s.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPanel({ filter, setFilter }: { filter: 'all' | Project['category']; setFilter: (f: 'all' | Project['category']) => void }) {
  const cats: Array<'all' | Project['category']> = ['all', 'Security', 'Systems', 'AI / Automation', 'Web3', 'Web', 'Tooling', 'Game Dev'];
  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="pf-panel">
      <h2 className="pf-section-h">Projects</h2>
      <p className="pf-prose pf-dim">
        Selected work, public and private. Recent projects are in private repos and won&apos;t link out to source.
        Older educational projects on{' '}
        <a className="pf-link" href="https://github.com/Sir-Monke" target="_blank" rel="noopener noreferrer">github.com/Sir-Monke</a>.
      </p>

      <div className="pf-filters">
        {cats.map((c) => (
          <button
            key={c}
            className={`pf-pill ${filter === c ? 'pf-pill-active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c === 'all' ? `All (${PROJECTS.length})` : c}
          </button>
        ))}
      </div>

      <div className="pf-projects-grid">
        {visible.map((p) => (
          <article key={p.title} className="pf-project-card">
            <header className="pf-project-head">
              <h3 className="pf-project-title">{p.title}</h3>
              <span className={`pf-badge pf-badge-${p.status.toLowerCase().replace(/\s/g, '-')}`}>{p.status === 'Hidden' ? '🤫' : p.status}</span>
            </header>
            <div className="pf-project-meta">
              <span>{p.year}</span>
              <span className="pf-meta-dot">•</span>
              <span>{p.category}</span>
              {p.privateRepo && (
                <>
                  <span className="pf-meta-dot">•</span>
                  <span className="pf-meta-private">🔒 Private</span>
                </>
              )}
            </div>
            {p.blurb && <p className="pf-project-blurb">{p.blurb}</p>}
            {p.stack.length > 0 && (
              <div className="pf-stack">
                {p.stack.map((tech) => (
                  <span key={tech} className="pf-tech-tag">{tech}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="pf-prose pf-dim">No projects in this category yet.</p>
      )}
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="pf-panel">
      <h2 className="pf-section-h">Get in touch</h2>
      <p className="pf-prose">
        Best places to reach me are below. For detailed work conversations, Discord or email is fastest.
      </p>

      <div className="pf-contacts-grid">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            className="pf-contact-card"
            href={s.url}
            target={s.url.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
          >
            <span className="pf-contact-icon">
              <ContactIcon name={s.icon} />
            </span>
            <div className="pf-contact-text">
              <span className="pf-contact-label">{s.label}</span>
              <span className="pf-contact-value">{s.display}</span>
            </div>
          </a>
        ))}
      </div>

      <hr className="pf-hr" />

      <p className="pf-prose pf-dim">
        I read everything. Replies come fastest on Discord. Email works for slower threads.
      </p>
    </div>
  );
}

// --- Icons -----------------------------------------------------

function ContactIcon({ name }: { name: string }) {
  const props = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const;
  switch (name) {
    case 'github':
      return (
        <svg {...props}>
          <path d="M12 0c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" />
        </svg>
      );
    case 'discord':
      return (
        <svg {...props}>
          <path d="M20.3 4.4c-1.5-.7-3.1-1.2-4.8-1.5-.2.4-.5.9-.7 1.3-1.8-.3-3.5-.3-5.3 0-.2-.4-.5-.9-.7-1.3-1.7.3-3.3.8-4.8 1.5C.9 9 .1 13.4.5 17.7c2 1.5 3.9 2.4 5.8 3 .5-.6.9-1.3 1.2-2-.7-.3-1.4-.6-2-1 .2-.1.3-.2.5-.3 3.9 1.8 8.1 1.8 12 0 .2.1.3.2.5.3-.6.4-1.3.7-2 1 .4.7.8 1.4 1.2 2 1.9-.6 3.8-1.5 5.8-3 .5-5-.8-9.4-3.2-13.3zM8.5 15c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3zm7 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...props}>
          <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1M12 0C8.7 0 8.3 0 7.1.1 5.8.1 5 .3 4.2.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.2.3 5 .1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.1.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.6.5 2.9.6 1.2.1 1.6.1 4.8.1s3.7 0 4.9-.1c1.3-.1 2.1-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.6.6-2.9.1-1.2.1-1.6.1-4.8s0-3.7-.1-4.9c-.1-1.3-.3-2.1-.6-2.9-.3-.8-.7-1.5-1.4-2.2-.7-.7-1.4-1.1-2.2-1.4-.8-.3-1.6-.5-2.9-.6C15.7 0 15.3 0 12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.8c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z" />
        </svg>
      );
    case 'email':
      return (
        <svg {...props}>
          <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
        </svg>
      );
    default:
      return null;
  }
}
