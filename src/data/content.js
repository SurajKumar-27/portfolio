// Every claim here comes from Suraj's reconciled resume (career-ops/suraj/resumes/_base_v2.tex).
// Keep it that way: if a number isn't on the resume, it doesn't go on the site.

export const profile = {
  name: "Suraj Kumar Marepally",
  first: "Suraj Kumar",
  last: "Marepally",
  role: "Software Engineer",
  company: "The Hackett Group",
  location: "Hyderabad, India",
  headline: "I build the backend systems that connect enterprise data to people — and to LLMs.",
  summary:
    "Software engineer at The Hackett Group, working on SAP-integrated procurement platforms. I shipped a vendor invoice automation platform that reconciles line items against SAP, I'm the primary backend engineer on multi-tenant portals used by 500+ people a month, and I built the Model Context Protocol server that gives LLM clients one authenticated door into client databases and SAP.",
  email: "m.surajk789@gmail.com",
  // Set to a public URL (or "/portfolio/Suraj_Kumar_Resume.pdf" once the PDF is in public/) to show the Résumé link.
  resume: null,
  links: {
    github: "https://github.com/SurajKumar-27",
    linkedin: "https://www.linkedin.com/in/suraj-kumar-686846215/",
    leetcode: "https://leetcode.com/u/MSurajKumar/",
  },
};

export const specs = [
  { value: "~2,000", label: "invoices processed in the invoice platform's first 20 days" },
  { value: "500+", label: "monthly active users on the Sales Portal I delivered" },
  { value: "100+", label: "field devices managed from one portal, for defence users" },
  { value: "9.24", label: "CGPA, B.E. Computer Science, Osmania University" },
];

export const work = [
  {
    detail: "A",
    tag: "The Hackett Group · In production",
    title: "Vendor invoice automation, reconciled against SAP",
    problem:
      "Accounts-payable staff matched every invoice by hand: open the SAP portal, compare each line's price and quantity, then park the document.",
    built:
      "A platform that parses each incoming invoice, reconciles every line item against SAP over OData and RFC, scores the match for a reviewer's sign-off, and posts approved documents straight into SAP.",
    outcome: "~2,000 invoices in its first 20 days — more than 100 a day — with people reviewing a score instead of re-keying lines.",
    materials: ["SAP OData", "SAP RFC", "Document parsing", "Match scoring"],
  },
  {
    detail: "B",
    tag: "The Hackett Group · Internal platform",
    title: "e-Commerce MCP Server",
    problem:
      "Every new AI feature needed its own bespoke integration into each client's database and SAP system.",
    built:
      "A per-client Model Context Protocol layer in Node.js: one authenticated entry point through which LLM clients reach client databases and SAP services. On top of it I'm building a natural-language data assistant in Python and FastAPI.",
    outcome:
      "Consumers integrate once instead of per system, and non-technical users can ask their own data questions instead of raising tickets.",
    materials: ["Node.js", "Model Context Protocol", "SAP", "Python", "FastAPI"],
  },
  {
    detail: "C",
    tag: "The Hackett Group · Team of 4",
    title: "Multi-tenant procurement portals",
    problem:
      "Client-facing sales and vendor portals ran on bare-metal Tomcat, with manual builds and uploads for every release.",
    built:
      "As primary backend engineer I delivered the Sales Portal revamp and now lead backend on the Vendor Portal. Implemented JWT auth with configurable role-based access to keep tenants isolated.",
    outcome:
      "Sales Portal serving 500+ monthly active users. Releases moved to Docker on AWS — shipping is now a Git pull and a restart.",
    materials: ["JWT", "RBAC", "Multi-tenancy", "Docker", "AWS"],
  },
  {
    detail: "D",
    tag: "STUAM Technologies · Defence",
    title: "Real-time Network Management System",
    problem:
      "Operators needed to monitor and configure in-house telephony and microcontroller hardware spread across field sites.",
    built:
      "A Node.js portal to monitor and remotely configure every device, plus the communication platform itself: device and conference calling, call recording and push-to-talk.",
    outcome: "100+ devices monitored and configured from one portal, used by defence customers.",
    materials: ["Node.js", "React", "Real-time systems", "Telephony"],
  },
];

// Career as a drawing's revision history — newest revision first.
export const revisions = [
  {
    rev: "E",
    period: "Mar 2025 — Present",
    role: "Software Engineer",
    company: "The Hackett Group",
    current: true,
    points: [
      "Shipped a production vendor invoice automation platform integrated with SAP (OData, RFC).",
      "Primary backend engineer on multi-tenant procurement portals; leading backend on the Vendor Portal.",
      "Built the e-Commerce MCP Server and a natural-language data assistant on top of it.",
      "Moved releases from bare-metal Tomcat to Docker on AWS.",
    ],
  },
  {
    rev: "D",
    period: "May 2024 — Mar 2025",
    role: "Software Engineer",
    company: "STUAM Technologies",
    points: [
      "Built a real-time Network Management System for 100+ telephony and microcontroller devices.",
      "Developed the device communication platform: calling, conferencing, recording, push-to-talk.",
      "Delivered in Agile sprints with Git, Jira and CI/CD on Linux.",
    ],
  },
  {
    rev: "C",
    period: "Jan 2024 — Apr 2024",
    role: "SRISHTI '24 Intern",
    company: "i-Hub, IIIT Hyderabad",
    note: "Hands-on internship in neural networks and LLMs, after completing the i-Hub AI/ML trainee programme.",
  },
  {
    rev: "B",
    period: "Dec 2023 — Apr 2024",
    role: "AI/ML Intern",
    company: "ZOICX Technologies",
    note: "Built a multi-class image dataset from scratch and fine-tuned YOLO object-detection models on it.",
  },
  {
    rev: "A",
    period: "May 2023 — Jul 2023",
    role: "Intern",
    company: "Coresonant Systems",
    note: "Evaluated face detection, recognition and tracking models — MediaPipe, MTCNN, RetinaFace, YOLOv8, DeepSORT.",
  },
];

export const projects = [
  {
    title: "Green Globe",
    icon: "greenhouse",
    badge: "Best Project Award",
    description:
      "IoT greenhouse platform with CNN models for predictive plant analytics. Automated alerting cut crop-anomaly response time by 50%.",
    materials: ["Python", "FastAPI", "Computer Vision", "Supabase", "TypeScript"],
    url: "https://github.com/SurajKumar-27/GREENGLOBE",
  },
  {
    title: "University Timetable System",
    icon: "calendar",
    badge: "Deployed at Osmania University",
    description:
      "Full-stack timetable software used by 200+ faculty and students, taking scheduling from days of manual work to minutes.",
    materials: ["React", "Node.js", "Express", "MySQL"],
    url: "https://github.com/SurajKumar-27/UCETT",
  },
  {
    title: "3D MRI Reconstruction",
    icon: "cube",
    badge: "Deep learning",
    description:
      "Detects and segments brain tumours in MRI scans, then reconstructs the tumour as a 3D model to support diagnosis and treatment planning.",
    materials: ["Python", "TensorFlow", "Keras", "3D U-Net"],
    url: "https://github.com/SurajKumar-27/3D-MRI-Reconstruction",
  },
];

// Skills as a bill of materials.
export const bom = [
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
  grade: "9.24",
};

export const achievements = [
  { title: "Smart India Hackathon 2023", detail: "1st place, college-level selection round" },
  { title: "Best Project Award", detail: "Green Globe, IoT greenhouse platform" },
  { title: "Chairperson, IEEE Computer Society", detail: "IEEE Student Branch, OUCE · 2023–24" },
  { title: "Machine Learning Specialization", detail: "Stanford University & DeepLearning.AI" },
  { title: "500+ problems solved", detail: "Data structures & algorithms, LeetCode and GeeksforGeeks" },
];
