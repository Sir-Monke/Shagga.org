'use client';
import React, { memo, useMemo, useState } from 'react';
import {
  PROJECTS, SKILLS, SOCIALS,
  filterProjects, projectCategories, computeStats, fmtYears,
  type Project, type Skill, type Social, type FilterCategory,
} from './portfolioData';
import { ContactIcon } from './ContactIcon';

/* ============================================================
   PORTFOLIO — /portfolio
   Self-contained. Mobile-first XP window aesthetic.
   Data lives in `portfolioData.ts`; icons in `ContactIcon.tsx`.
   All external links use `rel="noopener noreferrer"`.
   ============================================================ */

type Tab = 'about' | 'skills' | 'projects' | 'contact';
const TABS: readonly Tab[] = ['about', 'skills', 'projects', 'contact'];

/** Hardened anchor: only accepts http(s):// or mailto:; never opens about:blank with referrer. */
function ExternalLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const isHttp = href.startsWith('http://') || href.startsWith('https://');
  const isMailto = href.startsWith('mailto:');
  if (!isHttp && !isMailto) return <span className={className}>{children}</span>;
  return (
    <a
      className={className}
      href={href}
      target={isHttp ? '_blank' : undefined}
      rel={isHttp ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

export default function PortfolioWindow() {
  const [tab, setTab] = useState<Tab>('about');
  const [filter, setFilter] = useState<FilterCategory>('all');

  return (
    <div className="pf-page">
      <div className="pf-window">
        <TitleBar />
        <MenuBar />
        <TabBar tab={tab} onSelect={setTab} />
        <div className="pf-body" role="tabpanel">
          {tab === 'about'    && <AboutPanel />}
          {tab === 'skills'   && <SkillsPanel />}
          {tab === 'projects' && <ProjectsPanel filter={filter} setFilter={setFilter} />}
          {tab === 'contact'  && <ContactPanel />}
        </div>
        <StatusBar />
      </div>
    </div>
  );
}

// ---- Chrome ------------------------------------------------------

const TitleBar = memo(function TitleBar() {
  return (
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
  );
});

const MenuBar = memo(function MenuBar() {
  return (
    <div className="pf-menubar">
      {['File', 'Edit', 'View', 'Help'].map((m) => (
        <span key={m} className="pf-menu-item">{m}</span>
      ))}
    </div>
  );
});

function TabBar({ tab, onSelect }: { tab: Tab; onSelect: (t: Tab) => void }) {
  return (
    <div className="pf-tabs" role="tablist">
      {TABS.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          className={`pf-tab ${tab === t ? 'pf-active' : ''}`}
          onClick={() => onSelect(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}

const StatusBar = memo(function StatusBar() {
  return (
    <div className="pf-statusbar">
      <span className="pf-status-cell">Ready</span>
      <span className="pf-status-cell pf-grow pf-center">shagga.org/portfolio</span>
      <span className="pf-status-cell">UK</span>
    </div>
  );
});

// ---- Panels ------------------------------------------------------

function AboutPanel() {
  // Stats are pure / cheap; useMemo keeps them stable across re-renders.
  const stats = useMemo(() => computeStats(), []);
  return (
    <div className="pf-panel">
      <Hero />
      <div className="pf-stats">
        <Stat num={`${stats.total}+`} label="Projects Built" />
        <Stat num={stats.production}  label="In Production" />
        <Stat num={stats.research}    label="Research" />
        <Stat num={`${stats.yearsCoding}+`} label="Years Coding" />
      </div>

      <h2 className="pf-section-h">About</h2>
      <p className="pf-prose">
        Self-taught developer based in the UK. I work across the full stack — from kernel drivers and assembly,
        through reverse engineering and AI-driven security tooling, all the way up to smart contracts and
        production web apps. I&apos;ve done independent vulnerability research on widely-used platforms, and
        I&apos;m currently building a Linux-based streaming OS targeting low-cost hardware.
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
        <ExternalLink className="pf-link" href="https://github.com/Sir-Monke">my GitHub</ExternalLink>.
      </p>
    </div>
  );
}

function Hero() {
  return (
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
          {['C / C++', 'Python', 'x86 / x64 ASM', 'Kernel', 'AI Tooling', 'Solidity'].map((t) => (
            <span key={t} className="pf-hero-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ num, label }: { num: number | string; label: string }) {
  return (
    <div className="pf-stat">
      <div className="pf-stat-num">{num}</div>
      <div className="pf-stat-label">{label}</div>
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
        {SKILLS.map((s) => <SkillRow key={s.name} skill={s} />)}
      </div>
    </div>
  );
}

const SkillRow = memo(function SkillRow({ skill }: { skill: Skill }) {
  return (
    <div className="pf-skill-row">
      <div className="pf-skill-head">
        <span className="pf-skill-name">{skill.name}</span>
        <span className="pf-skill-years">{fmtYears(skill.startYear)}</span>
      </div>
      <div className="pf-skill-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
        <div className="pf-skill-fill" style={{ width: `${skill.level}%` }} />
      </div>
      <p className="pf-skill-detail">{skill.detail}</p>
    </div>
  );
});

function ProjectsPanel({ filter, setFilter }: { filter: FilterCategory; setFilter: (f: FilterCategory) => void }) {
  const cats = useMemo(() => projectCategories(), []);
  const visible = useMemo(() => filterProjects(filter), [filter]);

  return (
    <div className="pf-panel">
      <h2 className="pf-section-h">Projects</h2>
      <p className="pf-prose pf-dim">
        A curated selection from 40+ projects across public and private repos. Recent work is in private repos
        and won&apos;t link out to source. Older educational projects on{' '}
        <ExternalLink className="pf-link" href="https://github.com/Sir-Monke">github.com/Sir-Monke</ExternalLink>.
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
        {visible.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>

      {visible.length === 0 && (
        <p className="pf-prose pf-dim">No projects in this category yet.</p>
      )}
    </div>
  );
}

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  const statusClass = `pf-badge-${project.status.toLowerCase().replace(/\s/g, '-')}`;
  return (
    <article className="pf-project-card">
      <header className="pf-project-head">
        <h3 className="pf-project-title">{project.title}</h3>
        <span className={`pf-badge ${statusClass}`}>
          {project.status === 'Hidden' ? '🤫' : project.status}
        </span>
      </header>
      <div className="pf-project-meta">
        <span>{project.year}</span>
        <span className="pf-meta-dot">•</span>
        <span>{project.category}</span>
        {project.privateRepo && (
          <>
            <span className="pf-meta-dot">•</span>
            <span className="pf-meta-private">🔒 Private</span>
          </>
        )}
      </div>
      {project.blurb && <p className="pf-project-blurb">{project.blurb}</p>}
      {project.stack.length > 0 && (
        <div className="pf-stack">
          {project.stack.map((tech) => <span key={tech} className="pf-tech-tag">{tech}</span>)}
        </div>
      )}
    </article>
  );
});

function ContactPanel() {
  return (
    <div className="pf-panel">
      <h2 className="pf-section-h">Get in touch</h2>
      <p className="pf-prose">
        Best places to reach me are below. For detailed work conversations, Discord or email is fastest.
      </p>
      <div className="pf-contacts-grid">
        {SOCIALS.map((s) => <ContactCard key={s.label} social={s} />)}
      </div>
      <hr className="pf-hr" />
      <p className="pf-prose pf-dim">
        I read everything. Replies come fastest on Discord. Email works for slower threads.
      </p>
    </div>
  );
}

const ContactCard = memo(function ContactCard({ social }: { social: Social }) {
  return (
    <ExternalLink className="pf-contact-card" href={social.url}>
      <span className="pf-contact-icon">
        <ContactIcon name={social.icon} />
      </span>
      <div className="pf-contact-text">
        <span className="pf-contact-label">{social.label}</span>
        <span className="pf-contact-value">{social.display}</span>
      </div>
    </ExternalLink>
  );
});
