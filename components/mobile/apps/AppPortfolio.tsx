'use client';
import React, { useState } from 'react';

interface Skill { name: string; level: number; since: number; detail: string }
interface Project { title: string; year: string; category: string; status: string; blurb: string; stack: string[] }

const SKILLS: Skill[] = [
  { name: 'C / C++',                level: 90, since: 2020, detail: 'Low-level systems, memory analysis, hooking, DLL injection, internal frameworks. My main weapon.' },
  { name: 'Python',                 level: 92, since: 2018, detail: 'Automation, scripting, AI/ML tooling, trading systems, scraping, data pipelines.' },
  { name: 'Reverse Engineering',    level: 82, since: 2020, detail: 'Static and dynamic analysis of Windows binaries with IDA Pro, Hex-Rays, Ghidra, x64dbg, and a wider toolbelt. Function detours, pattern scanning, adaptive AI-driven workflows.' },
  { name: 'Memory Internals',       level: 85, since: 2020, detail: 'Deep familiarity with how OSs handle memory — virtual address spaces, paging, allocators, stack/heap layout — and how that handling can be observed and manipulated at runtime.' },
  { name: 'Decompilation Tooling',  level: 80, since: 2021, detail: 'Daily-driver fluency with IDA Pro (Hex-Rays), Ghidra, x64dbg, and a wide range of supporting analysis tools.' },
  { name: 'Assembly (x86 / x64)',   level: 75, since: 2021, detail: 'Reading and writing x86/x64 ASM. Trampoline hooks, inline patches, calling convention work.' },
  { name: 'Kernel Development',     level: 65, since: 2022, detail: 'Windows / Linux kernel drivers. Ring 0 work, IOCTL handlers, custom Linux distributions.' },
  { name: 'Solidity / Web3',        level: 60, since: 2023, detail: 'Smart contract development on EVM chains. Full-stack dApps with on-chain integration.' },
  { name: 'TypeScript / Next.js',   level: 75, since: 2022, detail: 'Production web apps, UI/UX, marketing sites, dashboards.' },
  { name: 'React',                  level: 78, since: 2021, detail: 'Component-driven UIs, state management, animations, complex frontends.' },
  { name: 'C#',                     level: 65, since: 2022, detail: 'WinForms apps, .NET tooling, A-level Computer Science NEA.' },
  { name: 'Lua',                    level: 60, since: 2022, detail: 'Game scripting, runtime modification.' },
];

// ALL projects from desktop portfolio
const PROJECTS: Project[] = [
  { title: 'Custom Streaming OS',         year: '2026',      category: 'Systems',         status: 'In Development', stack: ['Linux','C','Kernel','Custom Build'],     blurb: 'Purpose-built Linux distribution for video-streaming hardware. Custom-compiled kernel, hand-picked package set, sub-5-second boot on low-cost hardware. First product of my own company.' },
  { title: 'DeepScope',                   year: '2025',      category: 'AI / Automation', status: 'In Development', stack: ['Python','AI','Win32','OODA Loop'],       blurb: 'Windows-only AI-driven cybersecurity platform. Automates RE and behavioural analysis of Windows binaries using an adaptive OODA-loop architecture.' },
  { title: 'PropertyDealFinder',          year: '2026',      category: 'AI / Automation', status: 'Production',     stack: ['TypeScript','AI','Scraping','Scoring'],  blurb: 'AI-powered UK property deal finder. Automated scraping, analysis, scoring across listing sources.' },
  { title: 'Automated Trading Bot',       year: '2025',      category: 'AI / Automation', status: 'Production',     stack: ['Python','IG API','TA','Risk Mgmt'],      blurb: 'Day trading bot for IG Markets. Technical-indicator strategy with built-in risk management.' },
  { title: 'MyBox OS',                    year: '2026',      category: 'Web',             status: 'Personal',       stack: ['TypeScript','HTML','PWA'],               blurb: 'Web-based operating system experience. Cross-platform — desktop web, Android 2GB build, mobile-first frontend.' },
  { title: 'Interior Design App',         year: '2026',      category: 'AI / Automation', status: 'Personal',       stack: ['JavaScript','AI','Computer Vision'],     blurb: 'AI-assisted interior design tool. Concept work around visual generation and product matching.' },
  { title: 'IKEA API Test',               year: '2026',      category: 'Tooling',         status: 'Personal',       stack: ['TypeScript','API','Scraping'],           blurb: 'Reverse-engineered IKEA product data pipeline. Catalogue scraping and structuring for downstream apps.' },
  { title: 'Smart Contract Suite',        year: '2023',      category: 'Web3',            status: 'Personal',       stack: ['Solidity','TypeScript','EVM','ethers'],  blurb: 'Full-stack dApp with custom Solidity contracts on EVM. Front-end, on-chain logic, wallet integration end-to-end.' },
  { title: 'Web Vulnerability Research',  year: '2026',      category: 'Security',        status: 'Research',       stack: ['Web Security','OWASP','Disclosure'],     blurb: 'Independent vulnerability research on production web platforms. Auth flow flaws, business-logic gaps. Responsible disclosure where applicable.' },
  { title: 'Anti-Cheat Mechanics',        year: '2023–2025', category: 'Security',        status: 'Research',       stack: ['C++','Kernel','RE'],                     blurb: 'Studied modern anti-cheat detection — kernel hooks, behavioural fingerprinting, integrity checks. Bypass research strictly for security learning.' },
  { title: 'Anti-Cheat Internals',        year: '2025',      category: 'Security',        status: 'Research',       stack: ['Kernel','Anti-Cheat','RE'],              blurb: 'End-to-end anti-cheat architecture deep-dive — kernel-mode protections, behavioural detection, hypervisor-assisted enforcement. Educational only, no public tooling.' },
  { title: 'Sniper Elite Reversal',       year: '2025',      category: 'Security',        status: 'Research',       stack: ['C++','RE'],                              blurb: 'Active reverse-engineering project. Learning, documenting, building tools as I go.' },
  { title: 'Windows Kernel Drivers',      year: '2022',      category: 'Systems',         status: 'Personal',       stack: ['C','WDK','Win32','Kernel'],              blurb: 'Ring-0 driver development. IOCTL handlers, kernel-mode hooking, system-level instrumentation for security tooling.' },
  { title: 'Sauerbraten Internal',        year: '2024',      category: 'Security',        status: 'Archived',       stack: ['C++','ImGui','Hooking'],                 blurb: 'Internal game-security research project for the Sauerbraten engine. ImGui-driven UI, custom rendering hooks. Educational.' },
  { title: 'EPQ — Assault Cube Research', year: '2024',      category: 'Security',        status: 'Coursework',     stack: ['C++','ImGui','Memory Analysis'],         blurb: 'A-level Extended Project Qualification: internal game-security framework with ImGui front-end. Memory analysis, ESP rendering, system-level hooks.' },
  { title: 'CS:S Research Project',       year: '2024',      category: 'Security',        status: 'Archived',       stack: ['C++','Linear Algebra'],                  blurb: 'Counter-Strike: Source aim-assist research. Vector math, view-angle calculations, runtime memory inspection.' },
  { title: 'InjectorGUI',                 year: '2024',      category: 'Tooling',         status: 'Personal',       stack: ['C#','WinForms','Win32'],                 blurb: 'WinForms-based DLL injector. Process enumeration, manual mapping, basic UI.' },
  { title: 'Simple DLL Injector',         year: '2024',      category: 'Tooling',         status: 'Personal',       stack: ['C++','Win32'],                           blurb: 'Minimal C++ DLL injector — clean, focused implementation for learning Win32 injection mechanics.' },
  { title: 'Function Detours',            year: '2024',      category: 'Security',        status: 'Personal',       stack: ['C++','Hooking'],                         blurb: 'Function-detour / trampoline-hook learning project. Used in early reverse-engineering experiments.' },
  { title: 'Function Calls (Signatures)', year: '2023',      category: 'Security',        status: 'Personal',       stack: ['C++','Pattern Matching'],                blurb: 'Calling functions by signature/pattern instead of hardcoded offsets. Resilient to binary updates.' },
  { title: 'Chat App (NEA)',              year: '2024',      category: 'Web',             status: 'Coursework',     stack: ['C#','Networking','UI'],                  blurb: 'A-level Computer Science NEA. Real-time messaging app with custom backend and UI.' },
  { title: 'ChatApp (Python)',            year: '2023',      category: 'Web',             status: 'Personal',       stack: ['Python','Sockets'],                      blurb: 'Earlier Python prototype of a chat application — sockets, simple protocol, basic GUI.' },
  { title: 'Human Benchmark Bot',         year: '2023',      category: 'Tooling',         status: 'Personal',       stack: ['Python','Automation'],                   blurb: 'Automation scripts for humanbenchmark.com — reaction time, sequence memory, visual memory. For fun.' },
];

type Tab = 'about' | 'projects' | 'skills' | 'contact';

export const AppPortfolio: React.FC = () => {
  const [tab, setTab] = useState<Tab>('about');
  const [openSkill, setOpenSkill] = useState<number | null>(null);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | string>('all');

  const categories = Array.from(new Set(PROJECTS.map((p) => p.category)));
  const visibleProjects = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="port-app">
      <div className="port-content">
        {tab === 'about' && (
          <div className="port-about">
            <div className="port-hero">
              <div className="port-avatar">SM</div>
              <div>
                <h1 className="port-name">Sir Monke</h1>
                <p className="port-tag">Cyber security · reverse engineering · systems</p>
              </div>
            </div>
            <div className="port-card">
              <h3>About</h3>
              <p>19. Started programming aged 12. Ten years deep at this point.</p>
              <p>Live in C, C++, and Python. Comfortable in IDA, Ghidra, x64dbg. Build production web apps in Next.js when I'm not in a debugger.</p>
              <p>Building a streaming OS as the first product of my own company. Everything else here is what got me there.</p>
            </div>
            <div className="port-card">
              <h3>Quick stats</h3>
              <div className="port-stats">
                <div className="port-stat"><span className="port-stat-num">10+</span><span className="port-stat-label">years coding</span></div>
                <div className="port-stat"><span className="port-stat-num">42</span><span className="port-stat-label">repos</span></div>
                <div className="port-stat"><span className="port-stat-num">{PROJECTS.length}</span><span className="port-stat-label">projects shipped</span></div>
                <div className="port-stat"><span className="port-stat-num">{SKILLS.length}</span><span className="port-stat-label">stacks</span></div>
              </div>
            </div>
            <div className="port-card port-card-cta">
              <h3>open the laptop version</h3>
              <p>shagga.org/portfolio on a laptop is the proper recruiter view. this is the iPhone OS 1 demake.</p>
            </div>
          </div>
        )}

        {tab === 'projects' && (
          openProject !== null ? (() => {
            const p = visibleProjects[openProject];
            return (
              <div className="port-project-detail">
                <button className="port-back" onClick={() => setOpenProject(null)}>‹ Projects</button>
                <h2>{p.title}</h2>
                <div className="port-project-meta">
                  <span className="port-pill">{p.category}</span>
                  <span className="port-pill port-pill-status">{p.status}</span>
                  <span>{p.year}</span>
                </div>
                <p className="port-project-blurb">{p.blurb}</p>
                <h3>Stack</h3>
                <div className="port-stack">
                  {p.stack.map((s) => <span key={s} className="port-stack-tag">{s}</span>)}
                </div>
              </div>
            );
          })() : (
            <>
              <div className="port-filter-pills">
                <button className={filter === 'all' ? 'port-pill-btn port-pill-btn-active' : 'port-pill-btn'} onClick={() => setFilter('all')}>All ({PROJECTS.length})</button>
                {categories.map((c) => (
                  <button key={c} className={filter === c ? 'port-pill-btn port-pill-btn-active' : 'port-pill-btn'} onClick={() => setFilter(c)}>{c}</button>
                ))}
              </div>
              <div className="port-projects">
                {visibleProjects.map((p, i) => (
                  <button key={p.title} className="port-project-row" onClick={() => setOpenProject(i)}>
                    <div className="port-project-row-left">
                      <div className="port-project-row-title">{p.title}</div>
                      <div className="port-project-row-sub">{p.category} · {p.year} · {p.status}</div>
                    </div>
                    <span className="port-chev">›</span>
                  </button>
                ))}
              </div>
            </>
          )
        )}

        {tab === 'skills' && (
          <div className="port-skills">
            {SKILLS.map((s, i) => (
              <div key={s.name} className={openSkill === i ? 'port-skill port-skill-open' : 'port-skill'}>
                <button className="port-skill-head" onClick={() => setOpenSkill((c) => c === i ? null : i)}>
                  <div className="port-skill-top">
                    <span className="port-skill-name">{s.name}</span>
                    <span className="port-skill-lvl">{s.level}%</span>
                  </div>
                  <div className="port-skill-bar"><span style={{ width: `${s.level}%` }} /></div>
                </button>
                {openSkill === i && (
                  <div className="port-skill-detail">
                    <span className="port-skill-since">since {s.since}</span>
                    <p>{s.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'contact' && (
          <div className="port-contact">
            <div className="port-card">
              <h3>get in touch</h3>
              <a className="port-contact-row" href="mailto:hello@shagga.org">
                <span className="port-contact-icon">✉️</span>
                <div>
                  <div className="port-contact-label">Email</div>
                  <div className="port-contact-value">hello@shagga.org</div>
                </div>
                <span className="port-chev">›</span>
              </a>
              <a className="port-contact-row" href="https://github.com" target="_blank" rel="noopener noreferrer">
                <span className="port-contact-icon">🐙</span>
                <div>
                  <div className="port-contact-label">GitHub</div>
                  <div className="port-contact-value">42 repos · public + private</div>
                </div>
                <span className="port-chev">›</span>
              </a>
              <a className="port-contact-row" href="https://shagga.org/portfolio">
                <span className="port-contact-icon">💼</span>
                <div>
                  <div className="port-contact-label">Full portfolio</div>
                  <div className="port-contact-value">shagga.org/portfolio</div>
                </div>
                <span className="port-chev">›</span>
              </a>
            </div>
            <div className="port-card">
              <h3>good fit for</h3>
              <ul>
                <li>cyber security freelance work</li>
                <li>RE / malware research engagements</li>
                <li>Windows internals consulting</li>
                <li>AI-augmented security tooling</li>
                <li>Custom streaming or embedded Linux work</li>
              </ul>
            </div>
            <p className="port-contact-foot">i read everything sent to hello@shagga.org. reply within a day for serious enquiries.</p>
          </div>
        )}
      </div>

      <div className="port-tabbar">
        <button className={tab === 'about' ? 'port-tab port-tab-active' : 'port-tab'} onClick={() => setTab('about')}>👤<br /><span>About</span></button>
        <button className={tab === 'projects' ? 'port-tab port-tab-active' : 'port-tab'} onClick={() => { setTab('projects'); setOpenProject(null); }}>📁<br /><span>Projects</span></button>
        <button className={tab === 'skills' ? 'port-tab port-tab-active' : 'port-tab'} onClick={() => setTab('skills')}>⚙️<br /><span>Skills</span></button>
        <button className={tab === 'contact' ? 'port-tab port-tab-active' : 'port-tab'} onClick={() => setTab('contact')}>✉️<br /><span>Contact</span></button>
      </div>
    </div>
  );
};
