import { useCallback, useEffect, useRef, useState } from 'react';
import photo from './images/suraj.jpg';
import {
  profile, specs, work, revisions, projects, bom, education, achievements,
} from './data/content';

const SHEETS = [
  ['about', 'About'],
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
];
const TOTAL = String(SHEETS.length).padStart(2, '0');
const sheetNo = id => String(SHEETS.findIndex(([s]) => s === id) + 1).padStart(2, '0');

const Icon = {
  github: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>,
  leetcode: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.22l-2.3 2.46a5.8 5.8 0 0 0-.24 7.68l.13.16 4.34 4.37a5.8 5.8 0 0 0 8.1.06l2.6-2.53a1.37 1.37 0 1 0-1.92-1.96l-2.6 2.53a3.06 3.06 0 0 1-4.24-.03l-4.3-4.33a3.1 3.1 0 0 1 .07-4.1l4.62-4.95 3.43-3.67A1.37 1.37 0 0 0 13.48 0Zm-2.5 13.1a1.37 1.37 0 1 0 0 2.75h9.63a1.37 1.37 0 1 0 0-2.75H10.98Z"/></svg>,
  mail: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 6.5h18v11H3zM3.5 7l8.5 6.5L20.5 7"/></svg>,
  arrow: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>,
  greenhouse: <svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"><path d="M6 42V24a18 16 0 0 1 36 0v18"/><path d="M3 42h42M14.5 42V12M33.5 42V12"/><path d="M24 42V31"/><path d="M24 34c-4.5 0-7.5-2.6-7.5-6.5 4.5 0 7.5 2.6 7.5 6.5Z"/><path d="M24 31.5c0-4.6 2.8-7.5 7-7.5 0 4.6-2.8 7.5-7 7.5Z"/></g></svg>,
  calendar: <svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"><rect x="6" y="10" width="36" height="32" rx="2"/><path d="M6 19h36M15 6v8M33 6v8M6 27h36M6 35h36M15 19v23M24 19v23M33 19v23"/><path d="M26.5 29.5l2.5 2.5 5-5" /></g></svg>,
  cube: <svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M24 5l16 9v20l-16 9-16-9V14Z"/><path d="M24 23l16-9M24 23v20M24 23L8 14"/><path strokeDasharray="2 3" d="M24 5v18M8 34l16-11 16 11"/></g></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7.5"/></svg>,
};

/* ---------- hooks ---------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('print') || 'blueprint'; } catch (e) { return 'blueprint'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('print', theme); } catch (e) {}
  }, [theme]);
  const toggle = useCallback(() => setTheme(t => (t === 'blueprint' ? 'whiteprint' : 'blueprint')), []);
  return [theme, toggle];
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- drafting furniture ---------- */

// CAD-style cursor readout in the corner of the screen.
function CoordReadout() {
  const ref = useRef(null);
  useEffect(() => {
    let x = 0, y = 0, raf = 0;
    const pad = n => String(Math.max(0, Math.round(n))).padStart(4, '0');
    const paint = () => {
      raf = 0;
      if (!ref.current) return;
      ref.current.textContent = `X ${pad(x)}   Y ${pad(y + window.scrollY)}`;
      ref.current.parentNode.classList.toggle('away', window.scrollY > window.innerHeight * 0.6);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const onMove = e => { x = e.clientX; y = e.clientY; schedule(); };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="coords" aria-hidden="true">
      <span ref={ref}>X 0000   Y 0000</span>
      <span className="coords-scale">SCALE 1:1</span>
    </div>
  );
}

function SheetHead({ id, title, note }) {
  const no = sheetNo(id);
  return (
    <div className="sheet-head reveal">
      <span className="marker" aria-hidden="true"><span>{no}</span><span>{TOTAL}</span></span>
      <div>
        <p className="kicker">Sheet {no} of {TOTAL}</p>
        <h2>{title}</h2>
      </div>
      {note && <p className="hand sheet-note" aria-hidden="true">{note}</p>}
    </div>
  );
}

/* ---------- hero ---------- */

// Fig. 1: the systems Suraj has built, drawn as a block diagram.
const BOXES = [
  { x: 10, y: 44, w: 150, t: 'LLM clients', s: 'AI assistants' },
  { x: 185, y: 44, w: 150, t: 'Portal users', s: '500+ / month' },
  { x: 360, y: 44, w: 150, t: 'Vendor invoices', s: '100+ / day' },
  { x: 10, y: 192, w: 150, t: 'MCP server', s: 'Node.js', mine: true },
  { x: 185, y: 192, w: 150, t: 'Portals', s: 'JWT · RBAC', mine: true },
  { x: 360, y: 192, w: 150, t: 'Invoice engine', s: 'parse · match · score', mine: true },
  { x: 10, y: 340, w: 150, t: 'Client databases', s: 'per tenant' },
  { x: 185, y: 340, w: 325, t: 'SAP', s: 'OData · RFC' },
];
const WIRES = [
  { d: 'M85 102V192', label: 'MCP', lx: 92, ly: 152 },
  { d: 'M260 102V192', label: 'HTTPS', lx: 267, ly: 152 },
  { d: 'M435 102V192', label: 'PDF', lx: 442, ly: 152 },
  { d: 'M85 250V340' },
  { d: 'M130 250V296H222V340' },
  { d: 'M298 250V340', label: 'OData', lx: 305, ly: 300 },
  { d: 'M435 250V340', label: 'RFC', lx: 442, ly: 300 },
];

function Schematic() {
  return (
    <figure className="schematic">
      <svg viewBox="0 0 520 452" role="img"
        aria-label="Block diagram: LLM clients, portal users and vendor invoices flow into three systems Suraj built — an MCP server, multi-tenant portals and an invoice engine — which connect to client databases and SAP.">
        <defs>
          <marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path className="arrowhead" d="M0 0L10 5L0 10Z" />
          </marker>
        </defs>
        <text className="fig-title" x="10" y="18">FIG. 1 — SYSTEMS I BUILD</text>
        <text className="fig-title" x="510" y="18" textAnchor="end">SCALE: N.T.S.</text>
        <line className="fig-rule" x1="10" y1="28" x2="510" y2="28" />

        {WIRES.map((w, i) => (
          <g key={w.d} className="wire" style={{ '--d': `${1.1 + i * 0.08}s` }}>
            <path d={w.d} markerEnd="url(#arrowhead)" />
            <path className="flow" d={w.d} />
            {w.label && <text x={w.lx} y={w.ly} className="wire-label">{w.label}</text>}
          </g>
        ))}

        {BOXES.map((b, i) => (
          <g key={b.t} className={b.mine ? 'box mine' : 'box'} style={{ '--d': `${0.15 + i * 0.09}s` }}>
            {b.mine && <rect className="box-fill" x={b.x} y={b.y} width={b.w} height="58" />}
            <rect className="box-line" x={b.x} y={b.y} width={b.w} height="58" pathLength={b.mine ? 1 : undefined} />
            {b.mine && <rect className="box-inner" x={b.x + 4} y={b.y + 4} width={b.w - 8} height="50" pathLength="1" />}
            <text className="box-title" x={b.x + b.w / 2} y={b.y + 26} textAnchor="middle">{b.t.toUpperCase()}</text>
            <text className="box-sub" x={b.x + b.w / 2} y={b.y + 43} textAnchor="middle">{b.s}</text>
          </g>
        ))}

        <g className="legend">
          <rect className="legend-mine" x="10" y="424" width="16" height="12" />
          <text x="34" y="434">BUILT BY ME</text>
          <rect className="legend-ext" x="136" y="424" width="16" height="12" />
          <text x="160" y="434">EXTERNAL / CLIENT</text>
        </g>
      </svg>
      <figcaption className="hand fig-note">the highlighted blocks are the ones I built ↑</figcaption>
    </figure>
  );
}

function Hero() {
  const ref = useRef(null);
  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--cx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--cy', `${e.clientY - r.top}px`);
  };
  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onMove}>
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="kicker">DWG. SK-001 · Portfolio · Rev E</p>
          <h1 className="title">
            <span>{profile.first}</span>
            <span>{profile.last}</span>
          </h1>
          <div className="dimension" aria-hidden="true">
            <span className="dim-arrow l" /><span className="dim-arrow r" />
            <span className="dim-label">{profile.role} · {profile.company}</span>
          </div>
          <p className="lede">{profile.headline}</p>
          <div className="cta-row">
            <a className="btn primary" href="#work">See the drawings</a>
            <a className="btn" href={`mailto:${profile.email}`}>Get in touch</a>
          </div>
          <div className="social">
            <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">{Icon.github}</a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">{Icon.linkedin}</a>
            <a href={profile.links.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">{Icon.leetcode}</a>
            <a href={`mailto:${profile.email}`} aria-label="Email">{Icon.mail}</a>
            <span className="loc">{profile.location}</span>
          </div>
        </div>
        <Schematic />
      </div>
    </section>
  );
}

/* ---------- sheets ---------- */

function About() {
  return (
    <section className="sheet container" id="about">
      <SheetHead id="about" title="About" />
      <div className="about-grid">
        <figure className="portrait reveal">
          <div className="crop">
            <img src={photo} alt={`Portrait of ${profile.name}`} width="622" height="720" loading="lazy" />
          </div>
          <figcaption>
            <span className="kicker">Detail — the engineer</span>
            <span className="hand portrait-note">that's me!</span>
          </figcaption>
        </figure>
        <div className="about-text reveal">
          <p className="about-lede">{profile.summary}</p>
          <dl className="specs">
            {specs.map((s, i) => (
              <div key={s.label} className="spec">
                <dt>
                  <span className="kicker">Spec {String(i + 1).padStart(2, '0')}</span>
                  <span className="spec-value">{s.value}</span>
                </dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="sheet container" id="work">
      <SheetHead id="work" title="Selected work" note="client systems — code is proprietary, so here are the drawings" />
      <div className="details">
        {work.map(w => (
          <article key={w.title} className="detail reveal">
            <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
            <header className="detail-head">
              <span className="bubble" aria-hidden="true">{w.detail}</span>
              <div>
                <p className="kicker">Detail {w.detail} · {w.tag}</p>
                <h3>{w.title}</h3>
              </div>
            </header>
            <div className="detail-grid">
              <div><h4>Problem</h4><p>{w.problem}</p></div>
              <div><h4>What I built</h4><p>{w.built}</p></div>
              <div className="outcome"><h4>Outcome</h4><p>{w.outcome}</p></div>
            </div>
            <p className="materials">
              <span className="kicker">Materials</span>
              {w.materials.map(m => <span key={m} className="part">{m}</span>)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="sheet container" id="experience">
      <SheetHead id="experience" title="Revision history" note="every revision added something" />
      <div className="rev-table reveal">
        <div className="rev-head" aria-hidden="true"><span>Rev</span><span>Date</span><span>Description</span></div>
        <ol>
          {revisions.map(r => (
            <li key={r.rev} className={r.current ? 'rev current' : 'rev'}>
              <span className="rev-letter" aria-label={`Revision ${r.rev}`}>{r.rev}</span>
              <span className="rev-date">{r.period}</span>
              <div className="rev-body">
                <h3>{r.role} <span className="at">· {r.company}</span></h3>
                {r.points
                  ? <ul className="points">{r.points.map(p => <li key={p}>{p}</li>)}</ul>
                  : <p className="rev-note">{r.note}</p>}
              </div>
              {r.current && <span className="stamp">Current</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="sheet container" id="projects">
      <SheetHead id="projects" title="Prototypes" note="built at university & on my own time" />
      <div className="protos">
        {projects.map(p => (
          <a key={p.title} className="proto reveal" href={p.url} target="_blank" rel="noreferrer">
            <span className="proto-icon">{Icon[p.icon]}</span>
            <p className="kicker proto-badge">{p.badge}</p>
            <h3>{p.title}</h3>
            <p className="proto-text">{p.description}</p>
            <p className="proto-materials">{p.materials.join(' / ')}</p>
            <span className="proto-link">View source {Icon.arrow}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="sheet container" id="skills">
      <SheetHead id="skills" title="Bill of materials" />
      <table className="bom reveal">
        <thead>
          <tr><th scope="col">Item</th><th scope="col">Assembly</th><th scope="col">Parts</th></tr>
        </thead>
        <tbody>
          {bom.map((g, i) => (
            <tr key={g.group}>
              <td className="bom-item">{String(i + 1).padStart(2, '0')}</td>
              <th scope="row">{g.group}</th>
              <td>{g.items.map(s => <span key={s} className="part">{s}</span>)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="certs">
        <div className="cert edu reveal">
          <p className="kicker">Education · {education.period}</p>
          <h3>{education.school}</h3>
          <p>{education.degree}</p>
          <span className="stamp big" aria-label={`CGPA ${education.grade} out of 10`}>
            <small>CGPA</small>{education.grade}<small>/ 10</small>
          </span>
        </div>
        <div className="cert reveal">
          <p className="kicker">Recognition</p>
          <ul className="checks">
            {achievements.map(a => (
              <li key={a.title}>{Icon.check}<span><strong>{a.title}</strong><span className="muted">{a.detail}</span></span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const year = new Date().getFullYear();
  const cells = [
    ['Drawn by', profile.name, true],
    ['Role', `${profile.role}, ${profile.company}`, true],
    ['Email', <a href={`mailto:${profile.email}`}>{profile.email}</a>, true],
    ['GitHub', <a href={profile.links.github} target="_blank" rel="noreferrer">SurajKumar-27</a>],
    ['LinkedIn', <a href={profile.links.linkedin} target="_blank" rel="noreferrer">suraj-kumar</a>],
    ['Location', profile.location],
    ['Dwg. no.', 'SK-001'],
    ['Rev', 'E'],
    ['Date', String(year)],
  ];
  return (
    <section className="sheet container" id="contact">
      <SheetHead id="contact" title="Title block" />
      <div className="contact reveal">
        <div className="contact-pitch">
          <h3>Have a system that needs building?</h3>
          <p className="hand contact-note">let's draw it up together →</p>
          <div className="cta-row">
            <a className="btn primary" href={`mailto:${profile.email}`}>{Icon.mail} Say hello</a>
            {profile.resume && <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>}
            <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <dl className="titleblock">
          {cells.map(([k, v, wide]) => (
            <div key={k} className={wide ? 'tb-cell wide' : 'tb-cell'}>
              <dt>{k}</dt><dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-row">
        <a href="#top" className="brand">
          <span className="brand-mark">SK</span>
          <span className="brand-text">Suraj Kumar<small>Portfolio · Rev E</small></span>
        </a>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Sheets">
          {SHEETS.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              <span className="nav-no">{sheetNo(id)}</span>{label}
            </a>
          ))}
        </nav>
        <button className="print-toggle" onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'blueprint' ? 'whiteprint' : 'blueprint'}`}>
          <span className={theme === 'blueprint' ? 'swatch on' : 'swatch'} />
          <span className={theme === 'whiteprint' ? 'swatch white on' : 'swatch white'} />
          <span className="print-label">{theme}</span>
        </button>
        <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Menu">
          <span /><span />
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useReveal();
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="footer container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Drawn in React · Not to scale</span>
      </footer>
      <CoordReadout />
    </>
  );
}
