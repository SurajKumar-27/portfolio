import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import photo from './images/suraj.jpg';
import { profile, stats, stack, experience, projects, education } from './data/content';

const NAV = [['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['contact', 'Contact']];
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Icon = {
  github: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>,
  leetcode: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.22l-2.3 2.46a5.8 5.8 0 0 0-.24 7.68l.13.16 4.34 4.37a5.8 5.8 0 0 0 8.1.06l2.6-2.53a1.37 1.37 0 1 0-1.92-1.96l-2.6 2.53a3.06 3.06 0 0 1-4.24-.03l-4.3-4.33a3.1 3.1 0 0 1 .07-4.1l4.62-4.95 3.43-3.67A1.37 1.37 0 0 0 13.48 0Zm-2.5 13.1a1.37 1.37 0 1 0 0 2.75h9.63a1.37 1.37 0 1 0 0-2.75H10.98Z"/></svg>,
  mail: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 6.5h18v11H3zM3.5 7l8.5 6.5L20.5 7"/></svg>,
  arrow: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>,
  pin: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>,
  cap: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" d="m2 9 10-5 10 5-10 5L2 9Zm4 2.2V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.8"/></svg>,
  sun: <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g></svg>,
  moon: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>,
  search: <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></g></svg>,
};

/* ---------- hooks ---------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark'; } catch (e) { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);
  return [theme, useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), [])];
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -6% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Cursor-following glow on cards.
const spot = e => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

/* ---------- hero pieces ---------- */

// A drifting graph of nodes that reaches toward the cursor — a nod to connected systems.
function NetworkCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w, h, dpr, nodes, raf, visible = true;
    const mouse = { x: -9999, y: -9999 };
    const color = () => getComputedStyle(document.documentElement).getPropertyValue('--node').trim() || '140,160,255';

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const draw = () => {
      const c = color();
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${c},${0.16 * (1 - d / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 190) {
          ctx.strokeStyle = `rgba(${c},${0.5 * (1 - dm / 190)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${c},${dm < 190 ? 0.9 : 0.45})`;
        ctx.beginPath(); ctx.arc(a.x, a.y, dm < 190 ? 2.2 : 1.5, 0, Math.PI * 2); ctx.fill();
      }
    };

    const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop); };
    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });

    resize();
    if (reducedMotion()) { draw(); } else { loop(); }
    io.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);
  return <canvas ref={ref} className="network" aria-hidden="true" />;
}

// Types and deletes each phrase in turn.
function Rotator({ words }) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (reducedMotion()) return;
    let i = 0, len = words[0].length, typing = false, t;
    const tick = () => {
      if (!typing) {
        len--;
        if (len === 0) { typing = true; i = (i + 1) % words.length; }
        setText(words[i].slice(0, len));
        t = setTimeout(tick, 38);
      } else {
        len++;
        setText(words[i].slice(0, len));
        if (len === words[i].length) { typing = false; t = setTimeout(tick, 2200); }
        else t = setTimeout(tick, 70);
      }
    };
    t = setTimeout(tick, 2200);
    return () => clearTimeout(t);
  }, [words]);
  return <span className="rotator"><span className="grad">{text}</span><span className="caret" aria-hidden="true" /></span>;
}

/* ---------- command palette ---------- */

function CommandPalette({ open, setOpen, toggleTheme }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef(null);

  const commands = useMemo(() => [
    ...NAV.map(([id, label]) => ({ group: 'Go to', label, hint: `#${id}`, run: () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) })),
    { group: 'Actions', label: 'Copy email address', hint: profile.email, run: () => {
      navigator.clipboard?.writeText(profile.email).then(() => { setToast('Email copied'); setTimeout(() => setToast(''), 1800); });
    } },
    { group: 'Actions', label: 'Send an email', hint: 'mailto', run: () => { window.location.href = `mailto:${profile.email}`; } },
    { group: 'Actions', label: 'Toggle light / dark', hint: 'theme', run: toggleTheme },
    ...(profile.resume ? [{ group: 'Links', label: 'Résumé', hint: 'PDF', run: () => window.open(profile.resume, '_blank') }] : []),
    { group: 'Links', label: 'GitHub', hint: 'SurajKumar-27', run: () => window.open(profile.links.github, '_blank') },
    { group: 'Links', label: 'LinkedIn', hint: 'in/suraj-kumar', run: () => window.open(profile.links.linkedin, '_blank') },
    { group: 'Links', label: 'LeetCode', hint: 'MSurajKumar', run: () => window.open(profile.links.leetcode, '_blank') },
  ], [toggleTheme]);

  const results = commands.filter(c => (c.label + ' ' + c.group).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 10); }
  }, [open]);

  const run = c => { setOpen(false); c.run(); };
  const onKeyDown = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === 'Enter' && results[active]) run(results[active]);
  };

  let lastGroup = null;
  return (
    <>
      {open && (
        <div className="palette-backdrop" onMouseDown={() => setOpen(false)}>
          <div className="palette" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={e => e.stopPropagation()}>
            <div className="palette-input">
              {Icon.search}
              <input
                ref={inputRef} value={q} placeholder="Type a command or search…"
                onChange={e => { setQ(e.target.value); setActive(0); }} onKeyDown={onKeyDown}
                aria-label="Search commands"
              />
              <kbd>esc</kbd>
            </div>
            <ul className="palette-list" role="listbox">
              {results.length === 0 && <li className="palette-empty">No results</li>}
              {results.map((c, i) => {
                const head = c.group !== lastGroup ? (lastGroup = c.group) : null;
                return (
                  <li key={c.label} role="presentation">
                    {head && <p className="palette-group">{head}</p>}
                    <button
                      role="option" aria-selected={i === active}
                      className={i === active ? 'palette-item active' : 'palette-item'}
                      onMouseEnter={() => setActive(i)} onClick={() => run(c)}
                    >
                      <span>{c.label}</span><span className="palette-hint">{c.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

/* ---------- sections ---------- */

function Header({ theme, toggleTheme, openPalette }) {
  return (
    <header className="header">
      <div className="container header-row">
        <a href="#top" className="brand"><span className="logo">SK</span></a>
        <nav className="nav" aria-label="Sections">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="kbd-btn" onClick={openPalette} aria-label="Open command menu">
            {Icon.search}<span className="kbd-label">{isMac ? '⌘' : 'Ctrl'} K</span>
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? Icon.sun : Icon.moon}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ openPalette }) {
  return (
    <section className="hero" id="top">
      <NetworkCanvas />
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <p className="pill"><span className="dot" />{profile.role} @ {profile.company}</p>
        <h1>
          Hi, I'm {profile.first}.<br />
          I build <Rotator words={profile.rotating} />
        </h1>
        <p className="lede">{profile.intro}</p>
        <div className="cta-row">
          <a className="btn primary" href="#projects">View my work</a>
          <a className="btn" href="#contact">Get in touch</a>
        </div>
        <button className="palette-hint-btn" onClick={openPalette}>
          or press <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd> to explore
        </button>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to about"><span /></a>
    </section>
  );
}

function About() {
  return (
    <section className="section container" id="about">
      <h2 className="section-title reveal"><span>01</span>About</h2>
      <div className="bento">
        <div className="card photo-card reveal" onPointerMove={spot}>
          <img src={photo} alt={`Portrait of ${profile.name}`} width="622" height="720" loading="lazy" />
        </div>
        <div className="card intro-card reveal" onPointerMove={spot}>
          <p className="card-label">Currently</p>
          <p className="big">{profile.role} at <span className="grad">{profile.company}</span></p>
          <p className="muted row">{Icon.pin}{profile.location}</p>
        </div>
        {stats.map(s => (
          <div key={s.label} className="card stat-card reveal" onPointerMove={spot}>
            <p className="stat">{s.value}</p>
            <p className="muted">{s.label}</p>
          </div>
        ))}
        <div className="card edu-card reveal" onPointerMove={spot}>
          <span className="edu-icon">{Icon.cap}</span>
          <div>
            <p className="strong">{education.degree}</p>
            <p className="muted">{education.school} · {education.grade}</p>
          </div>
        </div>
        <div className="card stack-card reveal" onPointerMove={spot}>
          <p className="card-label">Stack</p>
          <div className="marquee" aria-label={stack.join(', ')}>
            <div className="marquee-track">
              {[...stack, ...stack].map((s, i) => <span key={i} aria-hidden={i >= stack.length}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section container" id="experience">
      <h2 className="section-title reveal"><span>02</span>Experience</h2>
      <ol className="xp">
        {experience.map(e => (
          <li key={e.company} className="xp-row reveal">
            <span className="xp-period">{e.period}</span>
            <div>
              <p className="xp-title">{e.role} <span className="muted">· {e.company}</span></p>
              <p className="muted">{e.line}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Projects() {
  return (
    <section className="section container" id="projects">
      <h2 className="section-title reveal"><span>03</span>Projects</h2>
      <div className="projects">
        {projects.map(p => (
          <a key={p.title} className="card project reveal" href={p.url} target="_blank" rel="noreferrer" onPointerMove={spot}>
            <div className="project-top">
              <span className="badge">{p.badge}</span>
              <span className="project-arrow">{Icon.arrow}</span>
            </div>
            <h3>{p.title}</h3>
            <p className="muted">{p.line}</p>
            <div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
          </a>
        ))}
      </div>
      <a className="more-link reveal" href={profile.links.github} target="_blank" rel="noreferrer">
        More on GitHub {Icon.arrow}
      </a>
    </section>
  );
}

function Contact() {
  return (
    <section className="section container" id="contact">
      <div className="contact reveal">
        <h2>Let's build something <span className="grad">great</span>.</h2>
        <p className="muted">Open to new opportunities and interesting problems.</p>
        <div className="cta-row center">
          <a className="btn primary" href={`mailto:${profile.email}`}>{Icon.mail}Say hello</a>
          {profile.resume && <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>}
        </div>
        <div className="social">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">{Icon.github}</a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">{Icon.linkedin}</a>
          <a href={profile.links.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">{Icon.leetcode}</a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  useReveal();
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} openPalette={openPalette} />
      <main>
        <Hero openPalette={openPalette} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="footer container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="muted">Built with React</span>
      </footer>
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} toggleTheme={toggleTheme} />
    </>
  );
}
