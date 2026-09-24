// Every claim here comes from Suraj's reconciled resume (career-ops/suraj/resumes/_base_v2.tex).
// Keep it that way: if a number isn't on the resume, it doesn't go on the site.

export const profile = {
  name: "Suraj Kumar Marepally",
  role: "Software Engineer",
  company: "The Hackett Group",
  location: "Hyderabad, India",
  tagline: "I build reliable backend systems, enterprise integrations and AI-enabled tools.",
  about: [
    "I'm a software engineer at The Hackett Group, where I work on enterprise procurement platforms. My work sits where business systems meet modern software: services that integrate with SAP, portals used by hundreds of people every month, and tooling that lets LLMs work safely with company data.",
    "Before that I built real-time device management software at STUAM Technologies. I graduated in Computer Science from Osmania University with a 9.24 CGPA, and I enjoy turning messy, manual processes into software that simply works.",
  ],
  email: "m.surajk789@gmail.com",
  // Set to a public URL (or "/portfolio/Suraj_Kumar_Resume.pdf" once the PDF is in public/) to show the Résumé link.
  resume: null,
  links: {
    github: "https://github.com/SurajKumar-27",
    linkedin: "https://www.linkedin.com/in/suraj-kumar-686846215/",
    leetcode: "https://leetcode.com/u/MSurajKumar/",
  },
};

export const experience = [
  {
    period: "Mar 2025 — Present",
    role: "Software Engineer",
    company: "The Hackett Group",
    points: [
      "Shipped a vendor invoice automation platform that reconciles invoice line items against SAP and posts approved documents, processing ~2,000 invoices in its first 20 days.",
      "Primary backend engineer on multi-tenant procurement portals; delivered the Sales Portal revamp used by 500+ monthly active users and now lead backend on the Vendor Portal.",
      "Built a Model Context Protocol (MCP) server that gives LLM clients one secure entry point to client databases and SAP services.",
    ],
    tags: ["Node.js", "Python", "FastAPI", "SAP", "Docker", "AWS"],
  },
  {
    period: "May 2024 — Mar 2025",
    role: "Software Engineer",
    company: "STUAM Technologies",
    points: [
      "Built a real-time Network Management System to monitor and configure 100+ telephony and microcontroller devices for defence customers.",
      "Developed the device communication platform — calling, conferencing, recording and push-to-talk — with a React and Node.js control layer.",
    ],
    tags: ["Node.js", "React", "Linux"],
  },
  {
    period: "2023 — 2024",
    role: "Internships",
    company: "ZOICX · i-Hub IIIT Hyderabad · Coresonant",
    points: [
      "Fine-tuned YOLO object-detection models on a custom dataset (ZOICX), trained in neural networks and LLMs (IIIT Hyderabad), and evaluated face detection and tracking models (Coresonant).",
    ],
    tags: ["Python", "Computer Vision", "Deep Learning"],
  },
];

export const projects = [
  {
    title: "Green Globe",
    note: "Best Project Award",
    description:
      "IoT greenhouse platform using CNN models for plant analytics. Automated alerts cut crop-anomaly response time by 50%.",
    tags: ["Python", "FastAPI", "Supabase", "TypeScript"],
    url: "https://github.com/SurajKumar-27/GREENGLOBE",
  },
  {
    title: "University Timetable System",
    note: "Deployed at Osmania University",
    description:
      "Full-stack scheduling software used by 200+ faculty and students, reducing timetable preparation from days to minutes.",
    tags: ["React", "Node.js", "Express", "MySQL"],
    url: "https://github.com/SurajKumar-27/UCETT",
  },
  {
    title: "3D MRI Reconstruction",
    note: "Deep learning",
    description:
      "Detects and segments brain tumours in MRI scans and reconstructs them as 3D models to support diagnosis.",
    tags: ["Python", "TensorFlow", "3D U-Net"],
    url: "https://github.com/SurajKumar-27/3D-MRI-Reconstruction",
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "TypeScript", "JavaScript", "Python", "SQL"] },
  { group: "Frameworks", items: ["Spring Boot", "Node.js", "Express", "FastAPI", "React"] },
  { group: "Data & Cloud", items: ["PostgreSQL", "MySQL", "Redis", "AWS", "Docker"] },
  { group: "Integration & AI", items: ["REST APIs", "SAP OData / RFC", "MCP", "RAG"] },
];

export const education = {
  school: "University College of Engineering, Osmania University",
  degree: "B.E. Computer Science and Engineering",
  period: "2020 — 2024",
  grade: "CGPA 9.24 / 10",
};

export const achievements = [
  "Smart India Hackathon 2023 — 1st place, college-level round",
  "Chairperson, IEEE Computer Society, OUCE (2023–24)",
  "Machine Learning Specialization — Stanford & DeepLearning.AI",
  "500+ data structures & algorithms problems solved",
];
