// Every claim here comes from Suraj's reconciled resume (career-ops/suraj/resumes/_base_v2.tex).
// Keep it that way: if a number isn't on the resume, it doesn't go on the site.

export const profile = {
  name: "Suraj Kumar Marepally",
  shortName: "Suraj Kumar",
  role: "Software Engineer",
  company: "The Hackett Group",
  location: "Hyderabad, India",
  headline: "I build the backend systems that connect enterprise data to the people — and the LLMs — who need it.",
  summary:
    "Software engineer at The Hackett Group, working on SAP-integrated procurement platforms. I shipped a vendor invoice automation platform that reconciles line items against SAP, I'm the primary backend engineer on multi-tenant portals used by 500+ people a month, and I built the Model Context Protocol server that gives LLM clients one authenticated door into client databases and SAP.",
  email: "m.surajk789@gmail.com",
  // Set to a public URL (or "/portfolio/Suraj_Kumar_Resume.pdf" once the PDF is in public/) to show the Résumé button.
  resume: null,
  links: {
    github: "https://github.com/SurajKumar-27",
    linkedin: "https://www.linkedin.com/in/suraj-kumar-686846215/",
    leetcode: "https://leetcode.com/u/MSurajKumar/",
  },
};

export const metrics = [
  { value: "~2,000", label: "invoices processed in the invoice platform's first 20 days" },
  { value: "500+", label: "monthly active users on the Sales Portal I delivered" },
  { value: "100+", label: "field devices managed from one portal, for defence users" },
  { value: "9.24", label: "CGPA, B.E. Computer Science, Osmania University" },
];

export const caseStudies = [
  {
    tag: "The Hackett Group · In production",
    title: "Vendor invoice automation, reconciled against SAP",
    problem:
      "Accounts-payable staff matched every invoice by hand: open the SAP portal, compare each line's price and quantity, then park the document. Slow, repetitive, and easy to get wrong.",
    built:
      "A platform that parses each incoming invoice, reconciles every line item against SAP over OData and RFC, scores the match confidence for a reviewer's sign-off, and posts approved documents straight into SAP.",
    outcome: "~2,000 invoices in its first 20 days — more than 100 a day — with people reviewing a score instead of re-keying lines.",
    stack: ["SAP OData", "SAP RFC", "Document parsing", "Match scoring"],
  },
  {
    tag: "The Hackett Group · Internal platform",
    title: "e-Commerce MCP Server",
    problem:
      "Every new AI feature needed its own bespoke integration into each client's database and SAP system.",
    built:
      "A per-client Model Context Protocol layer in Node.js: one authenticated entry point through which LLM clients reach client databases and SAP OData/RFC services. On top of it I'm building a natural-language data assistant (Python, FastAPI).",
    outcome:
      "Consumers integrate once instead of per system. The assistant lets non-technical users answer their own data questions in the portal, instead of raising a ticket for a developer to write SQL.",
    stack: ["Node.js", "Model Context Protocol", "SAP", "Python", "FastAPI"],
  },
  {
    tag: "The Hackett Group · Team of 4",
    title: "Multi-tenant procurement portals",
    problem:
      "Client-facing sales and vendor portals running on bare-metal Tomcat, with manual builds and uploads for every release.",
    built:
      "As primary backend engineer, delivered the Sales Portal revamp and now lead backend on the Vendor Portal, setting the service architecture with the engineering manager. Implemented JWT auth with configurable role-based access (2–3 role tiers per client) to keep tenants isolated.",
    outcome:
      "Sales Portal serving 500+ monthly active users. Releases moved to Docker on AWS, where shipping is now a Git pull and a restart.",
    stack: ["JWT", "RBAC", "Multi-tenancy", "Docker", "AWS"],
  },
  {
    tag: "STUAM Technologies · Defence",
    title: "Real-time Network Management System",
    problem:
      "Operators needed to monitor and configure in-house telephony and microcontroller hardware spread across field sites.",
    built:
      "A Node.js portal to monitor and remotely configure every device, plus the device communication platform itself: device-to-device and conference calling, call recording and push-to-talk, with a React and Node.js control layer.",
    outcome: "100+ devices monitored and configured from one portal, used by defence customers.",
    stack: ["Node.js", "React", "Real-time systems", "Telephony"],
  },
];

export const experience = [
  {
    company: "The Hackett Group",
    role: "Software Engineer",
    period: "Mar 2025 — Present",
    location: "Hyderabad",
    points: [
      "Shipped a production vendor invoice automation platform integrated with SAP (OData, RFC).",
      "Primary backend engineer on multi-tenant procurement portals; leading backend on the Vendor Portal.",
      "Built the e-Commerce MCP Server and a natural-language data assistant on top of it.",
      "Moved releases from bare-metal Tomcat to Docker on AWS.",
    ],
  },
  {
    company: "STUAM Technologies Pvt Ltd",
    role: "Software Engineer",
    period: "May 2024 — Mar 2025",
    location: "Hyderabad",
    points: [
      "Built a real-time Network Management System for 100+ telephony and microcontroller devices.",
      "Developed the device communication platform: calling, conferencing, recording, push-to-talk.",
      "Delivered in Agile sprints with Git, Jira and CI/CD on Linux.",
    ],
  },
];

export const earlier = [
  { company: "ZOICX Technologies", role: "AI/ML Intern", period: "Dec 2023 — Apr 2024", note: "Built a multi-class image dataset from scratch and fine-tuned YOLO object-detection models on it." },
  { company: "i-Hub, IIIT Hyderabad", role: "SRISHTI '24 Intern", period: "Jan 2024 — Apr 2024", note: "Hands-on internship in neural networks and LLMs, after completing the i-Hub AI/ML trainee programme." },
  { company: "Coresonant Systems", role: "Intern", period: "May 2023 — Jul 2023", note: "Evaluated face detection, recognition and tracking models — MediaPipe, MTCNN, RetinaFace, YOLOv8, DeepSORT." },
];

export const projects = [
  {
    title: "Green Globe",
    badge: "Best Project Award",
    description:
      "IoT greenhouse platform with CNN models for predictive plant analytics. Automated alerting cut crop-anomaly response time by 50%; sensor data in Supabase with a live TypeScript dashboard.",
    stack: ["Python", "FastAPI", "Computer Vision", "Supabase", "TypeScript"],
    url: "https://github.com/SurajKumar-27/GREENGLOBE",
  },
  {
    title: "University Timetable System",
    badge: "Deployed at Osmania University",
    description:
      "Full-stack timetable software used by 200+ faculty and students, taking scheduling from days of manual work to minutes.",
    stack: ["React", "Node.js", "Express", "MySQL"],
    url: "https://github.com/SurajKumar-27/UCETT",
  },
  {
    title: "3D MRI Reconstruction",
    badge: "Deep learning",
    description:
      "Detects and segments brain tumours in MRI scans, then reconstructs the tumour as a 3D model to support diagnosis and treatment planning.",
    stack: ["Python", "TensorFlow", "Keras", "3D U-Net"],
    url: "https://github.com/SurajKumar-27/3D-MRI-Reconstruction",
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "TypeScript", "JavaScript", "Python", "SQL"] },
  { group: "Backend & Web", items: ["Spring Boot", "Node.js", "Express", "FastAPI", "React", "REST APIs", "Microservices"] },
  { group: "Enterprise & AI", items: ["SAP OData", "SAP RFC", "Model Context Protocol", "RAG pipelines", "LLM orchestration", "Document parsing"] },
  { group: "Data & Cloud", items: ["PostgreSQL", "MySQL", "Redis", "Supabase", "AWS (EC2, S3)", "Docker"] },
  { group: "Practice", items: ["Git", "CI/CD", "Linux", "Jira", "Agile / Scrum", "Postman"] },
];

export const education = {
  school: "University College of Engineering, Osmania University",
  degree: "B.E., Computer Science and Engineering",
  period: "2020 — 2024",
  grade: "CGPA 9.24 / 10",
};

export const achievements = [
  { title: "Smart India Hackathon 2023", detail: "1st place, college-level selection round" },
  { title: "Best Project Award", detail: "Green Globe, IoT greenhouse platform" },
  { title: "Chairperson, IEEE Computer Society", detail: "IEEE Student Branch, OUCE · 2023–24" },
  { title: "Machine Learning Specialization", detail: "Stanford University & DeepLearning.AI" },
  { title: "500+ problems solved", detail: "Data structures & algorithms, LeetCode and GeeksforGeeks" },
];
