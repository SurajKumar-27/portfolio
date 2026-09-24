import { useEffect, useState } from 'react';
import photo from './images/suraj.jpg';
import { profile, experience, projects, skills, education, achievements } from './data/content';

const SECTIONS = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
];

const Icon = {
  github: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>,
  leetcode: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.22l-2.3 2.46a5.8 5.8 0 0 0-.24 7.68l.13.16 4.34 4.37a5.8 5.8 0 0 0 8.1.06l2.6-2.53a1.37 1.37 0 1 0-1.92-1.96l-2.6 2.53a3.06 3.06 0 0 1-4.24-.03l-4.3-4.33a3.1 3.1 0 0 1 .07-4.1l4.62-4.95 3.43-3.67A1.37 1.37 0 0 0 13.48 0Zm-2.5 13.1a1.37 1.37 0 1 0 0 2.75h9.63a1.37 1.37 0 1 0 0-2.75H10.98Z"/></svg>,
  mail: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 6.5h18v11H3zM3.5 7l8.5 6.5L20.5 7"/></svg>,
  arrow: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>,
};

// Highlights the sidebar link for the section currently on screen.
function useActiveSection() {
  const [active, setActive] = useState('about');
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function Sidebar({ active }) {
  return (
    <header className="sidebar">
      <div>
        <img className="avatar" src={photo} alt={`Portrait of ${profile.name}`} width="88" height="88" />
        <h1>{profile.name}</h1>
        <p className="title">{profile.role} at {profile.company}</p>
        <p className="tagline">{profile.tagline}</p>
        <nav className="toc" aria-label="Sections">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : undefined}>
              <span className="toc-line" />{label}
            </a>
          ))}
        </nav>
      </div>
      <div className="side-links">
        <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">{Icon.github}</a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">{Icon.linkedin}</a>
        <a href={profile.links.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">{Icon.leetcode}</a>
        <a href={`mailto:${profile.email}`} aria-label="Email">{Icon.mail}</a>
        {profile.resume && (
          <a className="resume-link" href={profile.resume} target="_blank" rel="noreferrer">Résumé {Icon.arrow}</a>
        )}
      </div>
    </header>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section" aria-label={title}>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const active = useActiveSection();
  return (
    <div className="layout">
      <Sidebar active={active} />
      <main className="content">
        <Section id="about" title="About">
          {profile.about.map(p => <p key={p} className="prose">{p}</p>)}
        </Section>

        <Section id="experience" title="Experience">
          <ol className="list">
            {experience.map(e => (
              <li key={e.company} className="item">
                <p className="item-period">{e.period}</p>
                <div>
                  <h3>{e.role} <span className="at">· {e.company}</span></h3>
                  <ul className="bullets">{e.points.map(p => <li key={p}>{p}</li>)}</ul>
                  <ul className="tags">{e.tags.map(t => <li key={t}>{t}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title="Projects">
          <ol className="list">
            {projects.map(p => (
              <li key={p.title} className="item">
                <p className="item-period">{p.note}</p>
                <div>
                  <h3>
                    <a href={p.url} target="_blank" rel="noreferrer" className="item-link">
                      {p.title} {Icon.arrow}
                    </a>
                  </h3>
                  <p className="item-text">{p.description}</p>
                  <ul className="tags">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
          <a className="more" href={profile.links.github} target="_blank" rel="noreferrer">
            View all projects on GitHub {Icon.arrow}
          </a>
        </Section>

        <Section id="skills" title="Skills & Education">
          <dl className="skills">
            {skills.map(g => (
              <div key={g.group} className="skill-row">
                <dt>{g.group}</dt>
                <dd>{g.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
          <div className="edu">
            <div>
              <h3>{education.school}</h3>
              <p className="item-text">{education.degree} · {education.grade}</p>
            </div>
            <p className="item-period">{education.period}</p>
          </div>
          <ul className="achievements">
            {achievements.map(a => <li key={a}>{a}</li>)}
          </ul>
        </Section>

        <Section id="contact" title="Contact">
          <p className="prose">
            I'm open to new opportunities and always happy to talk about backend engineering,
            integrations or interesting problems. The best way to reach me is by email.
          </p>
          <a className="btn" href={`mailto:${profile.email}`}>{Icon.mail} {profile.email}</a>
        </Section>

        <footer className="footer">© {new Date().getFullYear()} {profile.name}</footer>
      </main>
    </div>
  );
}
