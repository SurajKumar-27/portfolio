import { useEffect, useState } from 'react';
import photo from './images/suraj.jpg';
import {
  profile, metrics, caseStudies, experience, earlier,
  projects, skills, education, achievements,
} from './data/content';

const NAV = [
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
];

const Icon = {
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
  ),
  leetcode: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.22l-2.3 2.46a5.8 5.8 0 0 0-.24 7.68l.13.16 4.34 4.37a5.8 5.8 0 0 0 8.1.06l2.6-2.53a1.37 1.37 0 1 0-1.92-1.96l-2.6 2.53a3.06 3.06 0 0 1-4.24-.03l-4.3-4.33a3.1 3.1 0 0 1 .07-4.1l4.62-4.95 3.43-3.67A1.37 1.37 0 0 0 13.48 0Zm-2.5 13.1a1.37 1.37 0 1 0 0 2.75h9.63a1.37 1.37 0 1 0 0-2.75H10.98Z"/></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 6.5h18v11H3zM3.5 7l8.5 6.5L20.5 7"/></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g></svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>
  ),
};

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
    } catch (e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);
  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))];
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-row">
        <a href="#top" className="brand">{profile.shortName}</a>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Sections">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? Icon.sun : Icon.moon}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Menu">
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero container" id="top">
      <div className="hero-text">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          {profile.role} · {profile.company} · {profile.location}
        </p>
        <h1>{profile.headline}</h1>
        <p className="lede">{profile.summary}</p>
        <div className="cta-row">
          <a className="btn primary" href="#work">See my work</a>
          {profile.resume && (
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>
          )}
          <a className="btn" href={`mailto:${profile.email}`}>Get in touch</a>
        </div>
        <div className="social">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">{Icon.github}</a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">{Icon.linkedin}</a>
          <a href={profile.links.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">{Icon.leetcode}</a>
          <a href={`mailto:${profile.email}`} aria-label="Email">{Icon.mail}</a>
        </div>
      </div>
      <div className="hero-photo">
        <img src={photo} alt={`Portrait of ${profile.name}`} width="622" height="720" />
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="container" aria-label="Highlights">
      <dl className="metrics reveal">
        {metrics.map(m => (
          <div key={m.label} className="metric">
            <dt>{m.value}</dt>
            <dd>{m.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SectionHead({ index, title, note }) {
  return (
    <div className="section-head reveal">
      <span className="section-index">{index}</span>
      <h2>{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}

function Work() {
  return (
    <section className="section container" id="work">
      <SectionHead
        index="01"
        title="Selected work"
        note="Client and employer systems. The code is proprietary, so here's the problem, what I built, and what changed."
      />
      <div className="cases">
        {caseStudies.map(c => (
          <article key={c.title} className="case reveal">
            <p className="case-tag">{c.tag}</p>
            <h3>{c.title}</h3>
            <div className="case-grid">
              <div><h4>Problem</h4><p>{c.problem}</p></div>
              <div><h4>What I built</h4><p>{c.built}</p></div>
              <div className="outcome"><h4>Outcome</h4><p>{c.outcome}</p></div>
            </div>
            <ul className="chips">{c.stack.map(s => <li key={s}>{s}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section container" id="experience">
      <SectionHead index="02" title="Experience" />
      <ol className="timeline">
        {experience.map(e => (
          <li key={e.company} className="role reveal">
            <div className="role-meta">
              <span className="period">{e.period}</span>
              <span className="muted">{e.location}</span>
            </div>
            <div>
              <h3>{e.role} <span className="at">· {e.company}</span></h3>
              <ul className="points">{e.points.map(p => <li key={p}>{p}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
      <div className="earlier reveal">
        <h3 className="subhead">Internships</h3>
        <div className="earlier-grid">
          {earlier.map(e => (
            <div key={e.company} className="earlier-item">
              <p className="period">{e.period}</p>
              <p className="earlier-title">{e.role}, {e.company}</p>
              <p className="muted">{e.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section container" id="projects">
      <SectionHead index="03" title="Projects" note="Open source, from university and my own time." />
      <div className="projects">
        {projects.map(p => (
          <a key={p.title} className="project reveal" href={p.url} target="_blank" rel="noreferrer">
            <div className="project-top">
              <span className="badge">{p.badge}</span>
              <span className="project-arrow">{Icon.arrow}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul className="chips">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
          </a>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section container" id="skills">
      <SectionHead index="04" title="Skills & background" />
      <div className="skills reveal">
        {skills.map(g => (
          <div key={g.group} className="skill-row">
            <h3>{g.group}</h3>
            <ul className="chips">{g.items.map(s => <li key={s}>{s}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="background">
        <div className="edu reveal">
          <h3 className="subhead">Education</h3>
          <p className="edu-school">{education.school}</p>
          <p>{education.degree}</p>
          <p className="muted">{education.period} · <strong>{education.grade}</strong></p>
        </div>
        <div className="achievements reveal">
          <h3 className="subhead">Recognition</h3>
          <ul>
            {achievements.map(a => (
              <li key={a.title}><strong>{a.title}</strong><span className="muted">{a.detail}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section container" id="contact">
      <div className="contact reveal">
        <p className="eyebrow">05 · Contact</p>
        <h2>Building something that has to talk to SAP, a legacy system, or an LLM? Let's talk.</h2>
        <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <div className="cta-row">
          <a className="btn primary" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          {profile.resume && (
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>
          )}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useReveal();
  return (
    <>
      <a className="skip" href="#work">Skip to content</a>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Metrics />
        <Work />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="footer container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="muted">{profile.location}</span>
      </footer>
    </>
  );
}
