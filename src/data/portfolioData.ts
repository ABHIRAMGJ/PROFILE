import {
  ProjectItem,
  FocusArea,
  SkillCategory,
  TimelineItem,
  EducationItem,
  CertificateItem,
  PublicationItem,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  fullName: 'Gummaraju Jaswanth Abhiram',
  displayName: 'G. J. Abhiram',
  headline: 'Software Engineer Building Intelligent Digital Products',
  subheadline: 'Full-Stack Development · Backend Systems · Applied AI',
  bio: 'A software engineer who prefers building the parts of a product that make it reliable, fast, and scalable — robust REST APIs, resilient data models, and practical AI systems that solve real user challenges.',
  location: 'Tirupati, India',
  email: 'gjaviram001@gmail.com',
  alternateEmail: 'gjabhiram001@gmail.com',
  phone: '+91 90320 68128',
  github: 'https://github.com/ABHIRAMGJ',
  linkedin: 'https://www.linkedin.com/in/gummaraju-jaswanth-abhiram-50547b289/',
  leetcode: 'https://leetcode.com/u/gjabhiram001/',
  resumeFileName: 'ABHIRAM_GUMMARAJU.pdf',
  openToWork: true,
  openLabel: 'Open to Work — SDE & Software Engineer Roles',
};

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 0,
    label: 'Full-Stack Development',
    shortLabel: 'Full-Stack',
    description: 'React client front ends on Node.js or FastAPI back ends with secure authentication, session management, and responsive UIs.',
    keyProjects: ['AppendUs', 'CivicFix', 'User Management'],
  },
  {
    id: 1,
    label: 'Backend Engineering',
    shortLabel: 'Backend',
    description: 'High-throughput services, role-based access control, schema architecture, and robust query optimization.',
    keyProjects: ['CertificateFlow', 'ApexPlanet Intern Work'],
  },
  {
    id: 2,
    label: 'AI & Retrieval Systems (RAG)',
    shortLabel: 'AI & RAG',
    description: 'Evidence-grounded document analysis, vector embeddings, semantic ranking, and hallucination-free AI generation.',
    keyProjects: ['AppendUs', 'ATS Resume Analyzer'],
  },
  {
    id: 3,
    label: 'REST API Architecture',
    shortLabel: 'REST APIs',
    description: 'Disciplined API design, versioned endpoints, strict validation contracts, and integration workflows.',
    keyProjects: ['AppendUs', 'SkillForge Intern Work'],
  },
  {
    id: 4,
    label: 'LLM & Multimodal Integrations',
    shortLabel: 'LLMs',
    description: 'Gemini Text & Vision API integrations, prompt engineering pipelines, and real-time structured output extraction.',
    keyProjects: ['CivicFix', 'CertificateFlow', 'Daybreak'],
  },
  {
    id: 5,
    label: 'Database Systems & Data Modeling',
    shortLabel: 'Databases',
    description: 'PostgreSQL, MySQL, and MongoDB schemas with ACID integrity, indexing, deduplication, and query audits.',
    keyProjects: ['CertificateFlow', 'CivicFix', 'ApexPlanet'],
  },
  {
    id: 6,
    label: 'SDE Core & Problem Solving',
    shortLabel: 'SDE Roles',
    description: '160+ LeetCode DSA solutions in Java & SQL, CI/CD automation with GitHub Actions, clean architecture, and SDLC practices.',
    keyProjects: ['Deloitte Selected', 'Game Arena'],
  },
];

export const TAG_TO_AREA_MAP: Record<string, number[]> = {
  React: [0],
  'React.js': [0],
  JavaScript: [0],
  HTML5: [0],
  CSS3: [0],
  Bootstrap: [0],
  'Node.js': [1, 3],
  'Express.js': [1, 3],
  FastAPI: [1, 3],
  'REST APIs': [3],
  'API Design': [3],
  'API Integration': [3],
  'Role-based access control': [1],
  PostgreSQL: [5],
  MySQL: [5],
  MongoDB: [5],
  SQL: [5],
  'Generative AI': [2, 4],
  'LLM Applications': [2, 4],
  RAG: [2],
  'Prompt Engineering': [4],
  'Gemini API': [2, 4],
  'Gemini Vision': [2, 4],
  Python: [1, 2],
  Java: [6],
  'Data Structures & Algorithms': [6],
  'GitHub Actions': [6],
  'Docker (Basics)': [6],
  'Weather APIs': [3],
  Firebase: [0, 5],
  'Real-time': [0, 1],
  JWT: [1],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-appendus',
    slug: 'appendus',
    name: 'AppendUs',
    title: 'AI Career Guidance & Interview Preparation Platform',
    categories: ['ai', 'full', 'featured'],
    liveUrl: 'https://appendus.lovable.app',
    githubUrl: 'https://github.com/ABHIRAMGJ/AppendUs',
    featured: true,
    accentHue: 215,
    stack: ['React', 'FastAPI', 'RAG', 'Gemini API', 'PostgreSQL'],
    description:
      'Guides users from target role discovery to polished job application across 12+ modules: semantic resume analysis, adaptive career paths, personalized mock interviews, and automated learning tracks.',
    highlights: [
      'Engineered an evidence-grounded RAG resume analyzer that cross-checks candidate experience against job descriptions without fabricating skills.',
      'Developed interactive multi-round AI mock interviews (Technical, HR, and Coding) with 4-criterion feedback scoring: correctness, clarity, structure, and confidence.',
      'Built adaptive 30-to-180 day learning roadmaps with automated code reviews and user-controlled data privacy controls.',
      'Reduced initial page load time by 25% through lazy route splitting and asset compression.',
    ],
    caseStudy: {
      subtitle: 'Full-Stack Applied-AI Career Platform',
      objective: 'Eliminate arbitrary applicant rejection by offering evidence-backed resume matching and realistic interview preparation.',
      problem:
        'Standard ATS tools output opaque percentages without telling candidates why they failed to qualify, often missing legitimate transferable skills because of literal keyword mismatch.',
      approach:
        'A FastAPI backend parses resumes into semantic vectors, utilizes RAG retrieval over targeted criteria, and prompts the Gemini API to surface line-item evidence for each qualification alongside actionable rewrite advice.',
      architecture:
        'Client React SPA communicates with modular FastAPI REST endpoints. Document parsing extracts structured sections into a retrieval vector pipeline, referencing PostgreSQL for user tracking and interview transcripts.',
      challenges:
        'Balancing semantic similarity against false claims — ensuring the AI highlights genuine experience while refusing to hallucinate competencies the applicant has never demonstrated.',
      outcome:
        'Shipped 12+ production modules serving live users with sub-800ms analysis times and 25% faster front-end performance.',
      flows: [
        {
          title: 'Resume Analysis (RAG Pipeline)',
          steps: [
            { stepNumber: 1, name: 'Input Ingestion', description: 'User submits resume alongside specific job posting requirements.' },
            { stepNumber: 2, name: 'Semantic Retrieval', description: 'RAG extracts pertinent candidate bullets matched to each core skill.' },
            { stepNumber: 3, name: 'Evidence Verification', description: 'Every qualification match shows the exact supporting quote from the resume.' },
            { stepNumber: 4, name: 'Gap & Weak Bullet Flagging', description: 'Missing competencies and vague phrasing are highlighted.' },
            { stepNumber: 5, name: 'Grounded Rewrites', description: 'Generates impactful rewrite suggestions without inventing experience.' },
          ],
        },
        {
          title: 'Mock Interview Simulation',
          steps: [
            { stepNumber: 1, name: 'Track Selection', description: 'Candidate selects Technical, HR, or Coding assessment round.' },
            { stepNumber: 2, name: 'Dynamic Follow-ups', description: 'Interviewer prompts adaptive questions based on previous answers.' },
            { stepNumber: 3, name: 'Response Submission', description: 'Candidate records audio or text answers in timed session.' },
            { stepNumber: 4, name: 'Four-Pillar Scoring', description: 'Scored across Correctness, Clarity, Structure, and Confidence.' },
          ],
        },
      ],
      implementedFeatures: [
        '12+ modular application workflows with unified authentication',
        'Multi-round AI mock interviews with structured evaluations',
        'User-controlled GDPR-style data deletion',
        '25% initial page load reduction via asset pipelines',
      ],
    },
  },
  {
    id: 'proj-civicfix',
    slug: 'civicfix',
    name: 'CivicFix',
    title: 'Smart City Issue Management & Verification Platform',
    categories: ['ai', 'full'],
    liveUrl: 'https://civicfix0.ai.studio',
    githubUrl: 'https://github.com/ABHIRAMGJ/civicfix-smart-city',
    accentHue: 160,
    stack: ['React', 'Firebase', 'PostgreSQL', 'Gemini Vision', 'GitHub Actions'],
    description:
      'Full-stack citizen civic portal to report, automatically categorize, assign, and resolve municipal problems with interactive GIS maps, live updates, and role-based permissions.',
    highlights: [
      'Role-based access control (RBAC) supporting 3 distinct roles: Citizens, Municipal Officers, and City Commissioners via Firebase Google Sign-In and PostgreSQL.',
      'Gemini Vision integration automatically classifies pothole, garbage, and streetlight issues from uploaded photos, routing them to the correct department.',
      'Enforces before/after photo evidence verification before tickets can transition to resolved status.',
      'Automated CI pipeline configured with GitHub Actions for linting and deployment tests.',
    ],
    caseStudy: {
      subtitle: 'AI-Powered Smart Municipal Dispatch',
      objective: 'Transform public municipal grievance tracking from unaccountable paperwork into a verified digital workflow.',
      problem:
        'Citizens report urban issues that get lost in departmental silos without photo verification, clear ownership, or transparency.',
      approach:
        'Citizens take a photo which Gemini Vision instantly classifies and geo-tags. PostgreSQL tracks ticket lifecycle states across authenticated department dispatchers.',
      architecture:
        'React frontend with Leaflet mapping connected to a REST API. Images are processed via Gemini Vision; Firebase authenticates roles, backed by PostgreSQL relational persistence.',
      challenges:
        'Handling poor camera lighting and unusual municipal scenarios with Gemini Vision while keeping ticket creation accessible on mobile devices.',
      outcome:
        'A comprehensive 3-role portal deployed with end-to-end audit trails and automated GitHub Actions verification.',
      flows: [
        {
          title: 'Ticket Lifecycle & Dispatch',
          steps: [
            { stepNumber: 1, name: 'Citizen Report', description: 'Citizen uploads an issue photo with geolocation coordinates.' },
            { stepNumber: 2, name: 'Multimodal Analysis', description: 'Gemini Vision identifies issue severity and department taxonomy.' },
            { stepNumber: 3, name: 'Department Routing', description: 'Work order is routed to the municipal engineering team.' },
            { stepNumber: 4, name: 'Field Dispatch', description: 'Field crew receives work order on mobile interface.' },
            { stepNumber: 5, name: 'Verified Proof', description: 'Crew submits resolution photograph for commissioner sign-off.' },
          ],
        },
      ],
      implementedFeatures: [
        '3-tier role-based access control with Firebase Auth',
        'Multimodal photo classification with Gemini Vision',
        'Interactive map view with ticket density clustering',
        'GitHub Actions automated CI workflows',
      ],
    },
  },
  {
    id: 'proj-certificateflow',
    slug: 'certificateflow',
    name: 'CertificateFlow',
    title: 'Bulk Certificate Generation & Verification Engine',
    categories: ['ai', 'full'],
    githubUrl: 'https://github.com/ABHIRAMGJ/CERTIFICATE-GENERATOR',
    statusNote: 'Live demo coming soon',
    accentHue: 28,
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'Gemini API', 'QR Codes'],
    description:
      'Enterprise platform to design custom certificate templates, send them through multi-level executive approvals, and generate verifiable PDF certificates in bulk from Excel/CSV data.',
    highlights: [
      'Gemini API smart schema mapping automatically detects and aligns spreadsheet column names with template placeholder fields.',
      'Automated batch PDF rendering with unique tamper-resistant QR codes linking directly to a public verification endpoint.',
      'Complex PostgreSQL validation queries detect duplicates, missing metadata, and invalid email entries prior to generation.',
      'Automated SMTP delivery pipeline with real-time delivery status logging and audit metrics.',
    ],
    caseStudy: {
      subtitle: 'Batch Certificate Issuance with Cryptographic QR Verification',
      objective: 'Automate manual certificate generation for educational institutions while preventing fraudulent credentials.',
      problem:
        'Manual template merging from messy Excel spreadsheets frequently introduces typos, duplicated certificates, and unverified paper records.',
      approach:
        'Node.js backend accepts spreadsheet uploads, queries PostgreSQL to deduplicate records, employs Gemini to map unstructured header rows, and generates signed PDFs with embedded verification QR codes.',
      architecture:
        'Express.js backend with PostgreSQL relational storage, automated headless PDF generation, and public tokenized QR verification routes.',
      challenges:
        'Generating hundreds of high-resolution print-quality PDFs without choking memory, solved via streaming worker queues.',
      outcome:
        'Zero-error bulk issuances with instantaneous mobile QR verification.',
      flows: [
        {
          title: 'Approval & Batch Generation',
          steps: [
            { stepNumber: 1, name: 'Template Design', description: 'Admin configures dynamic typography, logos, and signature fields.' },
            { stepNumber: 2, name: 'Multi-Level Approval', description: 'Department heads authorize issuance with OTP confirmation.' },
            { stepNumber: 3, name: 'Spreadsheet Upload', description: 'CSV/Excel recipient list uploaded for batch ingestion.' },
            { stepNumber: 4, name: 'AI Column Mapping', description: 'Gemini maps ambiguous header columns to template variables.' },
            { stepNumber: 5, name: 'Secure Delivery', description: 'PDFs generated with signed QR codes and delivered via email.' },
          ],
        },
      ],
      implementedFeatures: [
        'Smart column mapping with Gemini API',
        'Multi-stage administrative approval pipeline',
        'Cryptographic QR code verification',
        'PostgreSQL duplicate detection queries',
      ],
    },
  },
  {
    id: 'proj-game-arena',
    slug: 'game-arena',
    name: 'Game Arena',
    title: 'Real-Time Multiplayer & Bot Gaming Platform',
    categories: ['web', 'full'],
    liveUrl: 'https://gamepro.ai.studio',
    githubUrl: 'https://github.com/ABHIRAMGJ/GAME',
    accentHue: 262,
    stack: ['JavaScript', 'Node.js', 'WebSockets', 'Canvas API', 'State Sync'],
    description:
      'Rich web gaming platform featuring 20 distinct games including Chess, Tetris Battle, Carrom, Battleship, Air Hockey, and an original Card Battle system with real-time multiplayer synchronization.',
    highlights: [
      '20 fully playable games with both responsive single-player AI bots and synchronized real-time multiplayer matches.',
      'Custom room management system with private match codes, friend invites, and spectator capabilities.',
      'Comprehensive player account system with match history, achievement unlock badges, and global leaderboards.',
      'Zero-latency canvas-based rendering with optimized state delta interpolation.',
    ],
  },
  {
    id: 'proj-ats-analyzer',
    slug: 'resume-analyzer',
    name: 'AI-Powered ATS Resume Analyzer',
    title: 'Evidence-Grounded Candidate Evaluation Engine',
    categories: ['ai'],
    githubUrl: 'https://github.com/ABHIRAMGJ/AI-RESUME-ANALYZER',
    accentHue: 235,
    stack: ['Python', 'FastAPI', 'Gemini API', 'MongoDB', 'RAG'],
    description:
      'Evaluates candidates against target job descriptions using semantic similarity, entity extraction, and skill-gap identification — explaining every score component rather than yielding an opaque number.',
    highlights: [
      'Underlying methodology and empirical evaluation published at an IEEE International Conference in 2026.',
      'MongoDB stores parsed candidate portfolios and job embeddings for low-latency contextual search.',
      'FastAPI microservice isolates ingestion, semantic ranking, and explanation generation.',
      'Strict hallucination guardrails guarantee matching scores are grounded in verifiable resume text.',
    ],
  },
  {
    id: 'proj-daybreak',
    slug: 'daybreak',
    name: 'Daybreak',
    title: 'AI Daily Companion & Travel Intelligence System',
    categories: ['ai', 'web'],
    liveUrl: 'https://makeubetter.lovable.app',
    githubUrl: 'https://github.com/ABHIRAMGJ/MAKEUBETTER',
    accentHue: 190,
    stack: ['React', 'Gemini API', 'Weather APIs', 'Geolocation'],
    description:
      'An intelligent morning companion combining schedule optimization, real-time meteorological intelligence, and smart itinerary planning in a cohesive dashboard.',
    highlights: [
      'Smart Daily Planner tailored to user schedule constraints and high-priority milestones.',
      'Weather Intelligence featuring radar visuals, temperature projections, and severe condition warnings.',
      'Global Travel Planner calculating transit routes, estimated fares, and climate-tailored outfit recommendations.',
      'Seamless calendar export and persistent offline storage.',
    ],
  },
  {
    id: 'proj-user-management',
    slug: 'user-management',
    name: 'Full-Stack User Management System',
    title: 'Role-Based Authentication & Admin Hub',
    categories: ['full'],
    githubUrl: 'https://github.com/ABHIRAMGJ/SWAMI-FULLSTACK',
    accentHue: 200,
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    description:
      'End-to-end secure user administration hub featuring password hashing, JWT session verification, role hierarchies, and granular CRUD permissions.',
    highlights: [
      'JWT authentication with refresh token rotation and protected HTTP-only cookie transport.',
      'Granular administrative dashboard for auditing accounts, editing roles, and managing sessions.',
    ],
  },
  {
    id: 'proj-voting',
    slug: 'voting',
    name: 'Online Voting System',
    title: 'Tamper-Resistant Ballot Platform',
    categories: ['web'],
    githubUrl: 'https://github.com/ABHIRAMGJ/VOTING-APPLICATION',
    accentHue: 285,
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Authentication'],
    description:
      'Auditable browser-based voting application with authenticated voter sessions designed to keep ballot logic simple, transparent, and verifiable.',
    highlights: [
      'Strict single-vote validation per verified credential.',
      'Real-time anonymous ballot tallying with instant statistical breakdown.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'Java', areaIds: [6] },
      { name: 'Python', areaIds: [1, 2] },
      { name: 'SQL', areaIds: [5] },
      { name: 'C', isBasic: true, areaIds: [6] },
    ],
  },
  {
    name: 'Frontend Development',
    skills: [
      { name: 'React.js', areaIds: [0] },
      { name: 'JavaScript (ES6+)', areaIds: [0] },
      { name: 'HTML5', areaIds: [0] },
      { name: 'CSS3', areaIds: [0] },
      { name: 'Bootstrap', areaIds: [0] },
    ],
  },
  {
    name: 'Backend Development',
    skills: [
      { name: 'Node.js', areaIds: [1, 3] },
      { name: 'Express.js', areaIds: [1, 3] },
      { name: 'FastAPI', areaIds: [1, 3] },
      { name: 'REST APIs', areaIds: [3] },
      { name: 'API Design', areaIds: [3] },
      { name: 'API Integration', areaIds: [3] },
      { name: 'Role-Based Access Control', areaIds: [1] },
    ],
  },
  {
    name: 'Databases & Storage',
    skills: [
      { name: 'PostgreSQL', areaIds: [5] },
      { name: 'MySQL', areaIds: [5] },
      { name: 'MongoDB', areaIds: [5] },
    ],
  },
  {
    name: 'AI & Generative AI',
    skills: [
      { name: 'Generative AI', areaIds: [2, 4] },
      { name: 'LLM Applications', areaIds: [2, 4] },
      { name: 'RAG (Retrieval-Augmented Gen)', areaIds: [2] },
      { name: 'Prompt Engineering', areaIds: [4] },
      { name: 'Gemini API (Text & Vision)', areaIds: [2, 4] },
      { name: 'Machine Learning', isBasic: true, areaIds: [2] },
    ],
  },
  {
    name: 'DevOps & Tooling',
    skills: [
      { name: 'Git & GitHub', areaIds: [6] },
      { name: 'GitHub Actions (CI/CD)', areaIds: [6] },
      { name: 'Docker', isBasic: true, areaIds: [6] },
      { name: 'Linux CLI', areaIds: [6] },
      { name: 'VS Code', areaIds: [6] },
      { name: 'Agile Methodologies', areaIds: [6] },
    ],
  },
  {
    name: 'Quality & Testing',
    skills: [
      { name: 'Manual Testing', isBasic: true, areaIds: [6] },
      { name: 'Test Case Design', areaIds: [6] },
      { name: 'API Testing & Validation', areaIds: [3, 6] },
    ],
  },
  {
    name: 'Core Computer Science',
    skills: [
      { name: 'Data Structures & Algorithms', areaIds: [6] },
      { name: 'Object-Oriented Programming (OOP)', areaIds: [6] },
      { name: 'DBMS', areaIds: [5, 6] },
      { name: 'Operating Systems', areaIds: [6] },
      { name: 'Computer Networks', areaIds: [6] },
      { name: 'Cyber Security', isBasic: true, areaIds: [6] },
    ],
  },
];

export const WORK_EXPERIENCE: TimelineItem[] = [
  {
    id: 'exp-deloitte',
    role: 'Analyst Trainee',
    organization: 'Deloitte',
    period: 'Selected · Future Intake',
    isFeatured: true,
    areaIds: [6],
    tag: 'Featured Career Achievement',
    bullets: [
      'Selected for the Analyst Trainee role at Deloitte following competitive technical assessments and multi-round interviews evaluating problem-solving, algorithmic rigor, and systems acumen.',
    ],
  },
  {
    id: 'exp-apexplanet',
    role: 'Web Developer Intern (Backend & SQL)',
    organization: 'ApexPlanet Software Pvt. Ltd.',
    period: 'Aug 2025 – Oct 2025',
    areaIds: [1, 3, 5, 6],
    bullets: [
      'Engineered PHP and MySQL backend functionality including CRUD endpoints, normalized relational schemas, and query optimization routines to enhance operational throughput.',
      'Developed reusable modules strictly adhering to software development life cycle (SDLC) best practices and continuous debugging.',
      'Built responsive interfaces and integrated RESTful APIs, cutting initial page load times by 25% through asset optimization.',
    ],
  },
  {
    id: 'exp-skillforge',
    role: 'Web Developer Intern',
    organization: 'SkillForge',
    period: 'Jan 2024 – Feb 2024',
    areaIds: [0, 3, 5, 6],
    bullets: [
      'Architected responsive React.js web interfaces, reducing initial load latency by 25% via asset bundling and reload optimization.',
      'Connected React components to backend RESTful endpoints to stream real-time data across Agile sprint deliverables.',
      'Constructed database operations supporting dynamic web views with clean, maintainable code structures.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    period: '2022 – 2026',
    institution: 'Mohan Babu University',
    score: 'CGPA 9.31 / 10',
  },
  {
    degree: 'Intermediate (MPC)',
    period: '2020 – 2022',
    institution: 'Sri Chaitanya College',
    score: '94% Aggregate',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    period: '2020',
    institution: "Dr. K.K.R.'s Gowtham High School (E.M.)",
    score: '100% (10.0 GPA)',
  },
];

export const PUBLICATION: PublicationItem = {
  title: 'Role-Based Resume Analysis Using Retrieval-Augmented Generation and Large Language Models',
  venue: 'IEEE International Conference Publication',
  year: 2026,
  authors: ['Gummaraju Jaswanth Abhiram', 'Research Collaborators'],
  summary:
    'Investigates the design and empirical evaluation of an automated, hallucination-resistant resume scoring framework. Combines dense vector retrieval over structured resume segments with prompt-engineered LLM reasoning, ensuring that every qualification claim is explicitly grounded in candidate-supplied text.',
  highlights: [
    'Proposed a segmented RAG architecture reducing unsupported skill assertions to near zero.',
    'Formulated empirical scoring rubrics that outperform traditional keyword-matching ATS engines in identifying transferable competencies.',
    'Presented at IEEE conference proceedings (2026).',
  ],
};

export const CERTIFICATES: CertificateItem[] = [
  // Programming & development
  {
    id: 'cert-web-skillforge',
    title: 'Web Development Certification',
    organization: 'SkillForge',
    category: 'programming',
  },
  {
    id: 'cert-web-apexplanet',
    title: 'Web Developer — PHP & MySQL',
    organization: 'ApexPlanet Software',
    category: 'programming',
  },
  {
    id: 'cert-java-gfg',
    title: 'Java Programming',
    organization: 'GeeksforGeeks',
    category: 'programming',
  },
  {
    id: 'cert-sql-hackerrank',
    title: 'SQL (Basic) Certified',
    organization: 'HackerRank',
    category: 'programming',
  },
  // AI, data science & cybersecurity
  {
    id: 'cert-python-1-cisco',
    title: 'Python Essentials 1',
    organization: 'Cisco Networking Academy',
    category: 'ai_ds_cyber',
  },
  {
    id: 'cert-python-2-cisco',
    title: 'Python Essentials 2',
    organization: 'Cisco Networking Academy',
    category: 'ai_ds_cyber',
  },
  {
    id: 'cert-cyber-cisco',
    title: 'Introduction to Cyber Security',
    organization: 'Cisco',
    category: 'ai_ds_cyber',
  },
  {
    id: 'cert-excel-ms',
    title: 'Microsoft Excel Advanced',
    organization: 'Microsoft / Coursera',
    category: 'ai_ds_cyber',
  },
  // Professional & communication
  {
    id: 'cert-tata-genai',
    title: 'Generative AI Masterclass',
    organization: 'TATA',
    category: 'professional',
  },
  {
    id: 'cert-da-deloitte',
    title: 'Data Analytics Job Simulation',
    organization: 'Deloitte',
    category: 'professional',
  },
  {
    id: 'cert-pm',
    title: 'Product Management Fundamentals',
    organization: 'Professional Training',
    category: 'professional',
  },
  {
    id: 'cert-tech-explorer',
    title: 'Tech Explorer — Levels 1 to 10',
    organization: 'Engineering Guild',
    category: 'professional',
  },
];

export const STATS = [
  { value: 25, unit: '%', label: 'Faster Initial Page Load', sub: 'Asset & bundle optimizations' },
  { value: 160, unit: '+', label: 'LeetCode Problems Solved', sub: 'DSA in Java & SQL' },
  { value: 4, unit: ' shipped', label: 'Live Products Deployed', sub: 'AppendUs, CivicFix, Game Arena, Daybreak' },
  { customText: 'Deloitte', label: 'Analyst Trainee Selected', sub: 'Competitive recruitment' },
  { value: 1, unit: '×', label: 'IEEE Published Paper', sub: 'RAG & LLM evaluation (2026)' },
  { value: 2, unit: '+', label: 'Internships Completed', sub: 'ApexPlanet & SkillForge' },
];

export const ENGINEERING_PRINCIPLES = [
  {
    id: 'principle-1',
    num: '01',
    title: 'Ground AI Output in Evidence',
    subtitle: 'Every AI score or recommendation can be traced to verifiable source text.',
    whereItShows: 'AppendUs · RAG Resume Analyzer',
    projectSlug: 'appendus',
    caseStudyName: 'AppendUs',
    steps: [
      { step: 'Ingest', detail: 'Parse structured resume bullets and job requirement lines.' },
      { step: 'Retrieve', detail: 'RAG semantic vectors retrieve matching experience fragments.' },
      { step: 'Cross-Check', detail: 'Every requirement is compared against retrieved source quotes.' },
      { step: 'Evidence Tag', detail: 'Display verified quote citation alongside match rating.' },
      { step: 'Grounded Rewrites', detail: 'Provide phrasing enhancements without inventing fake experience.' },
    ],
    result: 'Zero unsupported assertions. Transparent reasoning that recruiters and candidates can verify.',
  },
  {
    id: 'principle-2',
    num: '02',
    title: 'Validate at the Boundary',
    subtitle: 'Filter and sanitize untrusted inputs immediately upon arrival.',
    whereItShows: 'CertificateFlow · Bulk Excel Processing',
    projectSlug: 'certificateflow',
    caseStudyName: 'CertificateFlow',
    steps: [
      { step: 'Upload Ingest', detail: 'Process raw CSV or Excel recipient spreadsheets.' },
      { step: 'Schema Mapping', detail: 'Gemini maps ambiguous header columns to standard template keys.' },
      { step: 'Database Check', detail: 'SQL queries identify duplicate entries, missing emails, or invalid characters.' },
      { step: 'PDF Generation', detail: 'Approved records render with tamper-resistant signed QR codes.' },
      { step: 'Audit Delivery', detail: 'Dispatch certificates with per-recipient delivery confirmation logs.' },
    ],
    result: 'Invalid records are blocked before PDF generation begins, eliminating post-issuance recalls.',
  },
  {
    id: 'principle-3',
    num: '03',
    title: 'Make State Changes Auditable',
    subtitle: 'Every workflow step produces permanent, verifiable proof of execution.',
    whereItShows: 'CivicFix · Issue Resolution Flow',
    projectSlug: 'civicfix',
    caseStudyName: 'CivicFix',
    steps: [
      { step: 'Citizen Report', detail: 'Citizen captures problem photo with GPS coordinates.' },
      { step: 'AI Classification', detail: 'Gemini Vision categorizes severity and assigns municipal department.' },
      { step: 'Field Ticket', detail: 'Dispatch ticket assigned with immutable status logging in PostgreSQL.' },
      { step: 'Work Execution', detail: 'Municipal crew performs physical repair on site.' },
      { step: 'Visual Proof', detail: 'Resolution confirmed only after uploading after-photo for commissioner sign-off.' },
    ],
    result: 'No ticket can be marked resolved without photographic evidence and supervisor sign-off.',
  },
];
