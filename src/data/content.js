// Every claim here comes from Suraj's reconciled resume (career-ops/suraj/resumes/_base_v2.tex).
// Keep it that way: if a number isn't on the resume, it doesn't go on the site.

export const profile = {
  name: "Suraj Kumar Marepally",
  first: "Suraj",
  role: "Software Engineer",
  company: "The Hackett Group",
  location: "Hyderabad, India",
  rotating: ["scalable backends", "enterprise integrations", "AI-powered tools", "clean APIs"],
  intro: "Software engineer who turns complex systems into products that just work.",
  email: "m.surajk789@gmail.com",
  // Set to a public URL (or "/portfolio/Suraj_Kumar_Resume.pdf" once the PDF is in public/) to show the Résumé button.
  resume: null,
  links: {
    github: "https://github.com/SurajKumar-27",
    linkedin: "https://www.linkedin.com/in/suraj-kumar-686846215/",
    leetcode: "https://leetcode.com/u/MSurajKumar/",
  },
};

export const stats = [
  { value: "500+", label: "monthly users on a portal I shipped" },
  { value: "~2k", label: "invoices processed in 20 days" },
  { value: "500+", label: "DSA problems solved" },
];

export const stack = [
  "Java", "Spring Boot", "Node.js", "TypeScript", "Python", "FastAPI", "React",
  "PostgreSQL", "Redis", "Docker", "AWS", "SAP", "MCP", "REST APIs",
];

export const experience = [
  { company: "The Hackett Group", role: "Software Engineer", period: "2025 — Now", line: "Enterprise platforms, SAP integrations and LLM tooling." },
  { company: "STUAM Technologies", role: "Software Engineer", period: "2024 — 2025", line: "Real-time device management and communication systems." },
  { company: "ZOICX · IIIT Hyderabad · Coresonant", role: "Intern", period: "2023 — 2024", line: "Computer vision and machine learning." },
];

export const projects = [
  {
    title: "Green Globe",
    badge: "Best Project Award",
    line: "IoT greenhouse platform with CNN-based plant analytics and live alerts.",
    stack: ["Python", "FastAPI", "Supabase"],
    url: "https://github.com/SurajKumar-27/GREENGLOBE",
  },
  {
    title: "Timetable System",
    badge: "Used by 200+ people",
    line: "Scheduling software deployed at Osmania University.",
    stack: ["React", "Node.js", "MySQL"],
    url: "https://github.com/SurajKumar-27/UCETT",
  },
  {
    title: "3D MRI Reconstruction",
    badge: "Deep learning",
    line: "Segments brain tumours and rebuilds them as 3D models.",
    stack: ["TensorFlow", "3D U-Net"],
    url: "https://github.com/SurajKumar-27/3D-MRI-Reconstruction",
  },
];

export const education = {
  school: "Osmania University",
  degree: "B.E. Computer Science",
  grade: "9.24 CGPA",
};
