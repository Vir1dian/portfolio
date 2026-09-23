// ==========================================================================
// TYPES
// ==========================================================================

interface LinkItem {
  link?: string;
  icon?: string;
  title?: string;
}

// Groups mirror the resume's Skills section. A skill with no group can still
// be used as a chip on project/experience cards but is hidden from the
// Technical Skills table.
const SKILL_GROUPS = ['Languages', 'Engines & Frameworks', 'Tools'] as const;
type SkillGroup = typeof SKILL_GROUPS[number];

interface Skill extends LinkItem {
  group?: SkillGroup;
}

interface CardItem {
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  content_text?: string;     // short summary; '\n' renders as a line break
  highlights?: string[];     // rendered as a bullet list under content_text
  skills?: LinkItem[];
  other_links?: LinkItem[];
}

type ProjectCategory = 'game' | 'other';

interface Project {
  title?: string;
  category?: ProjectCategory;  // 'game' -> Game Projects, anything else -> Other Projects
  thumbnail?: string;          // file in src/assets, or 'projects/<file>' for src/assets/projects
  role?: string;               // e.g. 'Game design & UI'
  team?: string;               // e.g. '5-person team, 72-hour jam'
  date?: string;               // e.g. 'UCLA Fiat Ludum 2026'
  skills?: LinkItem[];
  content_text?: string;       // one- or two-line summary; '\n' renders as a line break
  highlights?: string[];       // bullet list of what YOU did
  demo_link?: string;
  repo_link?: string;
  other_links?: LinkItem[];
}

interface Stat {
  value: string;   // e.g. '94%'
  label: string;   // e.g. 'of non-merge commits'
}

interface FeaturedProject extends Project {
  stats?: Stat[];            // scale-numbers strip
  diagram?: string;          // same path rules as thumbnail
  diagram_caption?: string;
}

// Site-wide text, read by Hero, Navbar, and the document title.
interface SiteText {
  name: string;
  tagline: string;
  hero_text: string;
}

// ==========================================================================
// CONTENT
// ==========================================================================

const SITE: SiteText = {
  name: 'Gavin Torrecampo',
  tagline: 'Student Developer',
  hero_text: "Hello, my name is Gavin Torrecampo. I'm a Software Developer!",
};

const SKILLS: { [key: string]: Skill } = {
  // --- Languages ---
  csharp: { title: 'C#', icon: 'csharp.svg', link: 'https://learn.microsoft.com/en-us/dotnet/csharp', group: 'Languages' },
  cpp: { title: 'C++', icon: 'cpp.svg', link: 'https://cplusplus.com', group: 'Languages' },
  ts: { title: 'TypeScript', icon: 'typescript.svg', link: 'https://www.typescriptlang.org', group: 'Languages' },
  js: { title: 'JavaScript', icon: 'javascript.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', group: 'Languages' },
  python: { title: 'Python', icon: 'python.svg', link: 'https://www.python.org', group: 'Languages' },
  html: { title: 'HTML', icon: 'html5.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML', group: 'Languages' },
  css: { title: 'CSS', icon: 'css.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS', group: 'Languages' },

  // --- Engines & Frameworks ---
  unity: { title: 'Unity', icon: 'unity.svg', link: 'https://unity.com', group: 'Engines & Frameworks' },
  threejs: { title: 'Three.js', icon: 'threejs.svg', link: 'https://threejs.org', group: 'Engines & Frameworks' },
  react: { title: 'React', icon: 'react.svg', link: 'https://react.dev', group: 'Engines & Frameworks' },
  vue: { title: 'Vue', icon: 'vue.svg', link: 'https://vuejs.org', group: 'Engines & Frameworks' },
  vite: { title: 'Vite', icon: 'vite.svg', link: 'https://v2.vitejs.dev', group: 'Engines & Frameworks' },

  // --- Tools ---
  git: { title: 'Git', icon: 'git.svg', link: 'https://git-scm.com', group: 'Tools' },
  figma: { title: 'Figma', icon: 'figma.svg', link: 'https://www.figma.com', group: 'Tools' },
  aseprite: { title: 'Aseprite', icon: 'aseprite.svg', link: 'https://www.aseprite.org', group: 'Tools' },
  trello: { title: 'Trello', icon: 'trello.svg', link: 'https://trello.com', group: 'Tools' },

  // --- Chip-only (no group: hidden from the Technical Skills table) ---
  php: { title: 'PHP', icon: 'php.svg', link: 'https://www.php.net' },
  java: { title: 'Java', icon: 'java.svg', link: 'https://java.com/en' },
  nodejs: { title: 'NodeJS', icon: 'nodejs.svg', link: 'https://nodejs.org/docs/latest/api' },
  expo: { title: 'Expo', icon: 'expo.svg', link: 'https://docs.expo.dev' },
  docker: { title: 'Docker', icon: 'docker.svg', link: 'https://docs.docker.com' },
  postman: { title: 'Postman', icon: 'postman.svg', link: 'https://www.postman.com/product/what-is-postman' },
  xampp: { title: 'XAMPP', icon: 'xampp.png', link: 'https://www.apachefriends.org' },
  vscode: { title: 'VSCode', icon: 'vscode.svg', link: 'https://code.visualstudio.com' },
  mariadb: { title: 'MariaDB', icon: 'mariadb.svg', link: 'https://mariadb.com' },
  appwrite: { title: 'Appwrite', icon: 'appwrite.svg', link: 'https://appwrite.io'},
  dbml: { title: 'DBML', icon: 'dbml.png', link: 'https://dbml.dbdiagram.io/home' },
  alanai: { title: 'Alan AI', icon: 'alanai.png', link: 'https://www.alan.app/docs' },
  crewai: { title: 'CrewAI', icon: 'crewai-short.svg', link: 'https://docs.crewai.com/en/introduction' },
  openai: { title: 'OpenAI', icon: 'openai.svg', link: 'https://platform.openai.com/docs/overview' },
  serper: { title: 'Serper', icon: 'serper.png', link: 'https://serper.dev' },
  formspree: { title: 'Formspree', icon: 'formspree.svg', link: 'https://formspree.io' },
  // skill: { title: 'skillname', icon: 'skill.svg', link: 'https://skill.com', group: 'Tools' },
};

// Large case-study cards shown above all other projects. Empty = section hidden.
const FEATURED: FeaturedProject[] = [
  // featured projects here
];

const PROJECTS: Project[] = [
  {
    title: "2D Particle Simulator",
    category: 'other',
    thumbnail: "particle_simulator.png",
    skills: [SKILLS.ts, SKILLS.js, SKILLS.html, SKILLS.css, SKILLS.vite], // Reference skills from the master list
    content_text: "Browser-based physics simulator in vanilla TypeScript with object-oriented design.\nIncludes real-time rendering, elastic collisions, adjustable parameters, and dynamic input controls and UI components.",
    demo_link: "https://vir1dian.github.io/2D-Particle-Simulator/",
    repo_link: "https://github.com/Vir1dian/2D-Particle-Simulator",
  },
  {
    title: "Limited Matrix Calculator",
    category: 'other',
    thumbnail: "matrix_calculator.png",
    skills: [SKILLS.ts, SKILLS.js, SKILLS.html, SKILLS.css, SKILLS.vite],
    content_text: "Calculator with support for gaussian elimination, determinants, and inverse matrices.\nMultiple ways to input matrices for convenience, produces a step-by-step solution.",
    demo_link: "https://vir1dian.github.io/Invertible-Matrix-Calculator/",
    repo_link: "https://github.com/Vir1dian/Invertible-Matrix-Calculator",
  },
  {
    title: "Plant Tracking App",
    category: 'other',
    thumbnail: "",
    skills: [SKILLS.php, SKILLS.js, SKILLS.xampp, SKILLS.mariadb],
    content_text: "Full-stack plant tracking web application.\nRelational database to manage plant care information and user accounts.\nCRUD operations for plant profiles, database queries connected to user-facing features.",
    other_links: [
      { link: 'https://youtu.be/McTq_UwB-OU', title: 'Demo Video' }
    ]
  },
  {
    title: "Assistant Chef",
    category: 'other',
    thumbnail: "",
    skills: [SKILLS.alanai, SKILLS.js, SKILLS.html, SKILLS.css],
    content_text: "Small-scale web application featuring voice commands, powered by Alan AI API.\nRecipe browsing and filtering from a data set, text-to-speech capabilities, and timer control.\nCollaborated project.",
    other_links: [
      { link: 'https://youtu.be/tZiAHS_4ay0', title: 'Demo Video' }
    ]
  },
  // more projects here
];

const EXPERIENCE: CardItem[] = [
  {
    thumbnail: "pilotcity.jpg",
    title: "PilotCity — Developer (part-time)",
    subtitle: "(Summers 2023 & 2025)",
    content_text: "Designed Figma mockups and built Vue/Vuetify pages in TypeScript for the platform's student internship-placement programs.\nPrototyped multi-agent LLM scripts in Python using CrewAI, OpenAI, and Serper APIs.",
    skills: [SKILLS.vue, SKILLS.ts, SKILLS.figma, SKILLS.crewai, SKILLS.python],
    other_links: [
      { link: 'https://pilotcity.com', icon: '', title: 'PilotCity Homepage' }, 
    ]
  },
  {
    thumbnail: "laspositascollege.jpg",
    title: "Las Positas — Honors Contract Developer",
    subtitle: "(January 2024 - May 2025)",
    content_text: "Designed and implemented independent software projects under faculty mentorship, applying classroom theory to real-world problems, completing 5 projects over 3 semesters.\nOutlined project scope, milestones, deliverables, and bi-weekly meetings with faculty for semester-based contracts.\nProduced technical documentation and delivered project demonstrations.",
    skills: [SKILLS.cpp, SKILLS.python, SKILLS.ts, SKILLS.html, SKILLS.js, SKILLS.css],
    other_links: [ 
      { link: 'https://www.laspositascollege.edu/honors', icon: '', title: 'LPC Honors Program' }, 
      { link: 'https://drive.google.com/drive/folders/1IlT5RfkyBX8W9OiY_PbvvroIF9RUwjIL?usp=sharing', icon: '', title: 'My Honors Projects' },
    ]
  },
];

const ACADEMICS: CardItem[] = [
  {
    thumbnail: "laspositascollege.jpg",
    title: "AS: Computer Science",
    subtitle: "May 2025",
    content_text: "With highest honors (4.0 GPA)",
  },
  {
    thumbnail: "laspositascollege.jpg",
    title: "AA: Mathematics and Science",
    subtitle: "May 2025",
    content_text: "With highest honors (4.0 GPA)",
  },
  {
    thumbnail: "laspositascollege.jpg",
    title: "Honors Scholar",
    subtitle: "May 2025",
    content_text: "Completed 5 honors contracts",
  },
  {
    title: "Highschool Diploma",
    subtitle: "May 2023",
    content_text: "John C Kimball Highschool — 4.4 GPA",
  },
  {
    title: "Highschool Department Award for Mathematics",
    subtitle: "May 2023",
    content_text: "Single awardee for 2023",
  },
  {
    title: "Avinash Raina Math Competition Podium",
    subtitle: "April 2023",
    content_text: "3rd Place Calculus Winner, representing John C Kimball High",
  },
];

const CONTACTS: (LinkItem & { copy_to_clipboard?: boolean })[] = [
  {
    link: "4088599853",
    icon: "sms.svg",
    title: "Text",
    copy_to_clipboard: true,
  },
  {
    link: "https://www.linkedin.com/in/gavin-torrecampo-a93164267",
    icon: "linkedin.png",
    title: "LinkedIn",
    copy_to_clipboard: false,
  },
  {
    link: "https://github.com/Vir1dian",
    icon: "github.svg",
    title: "GitHub",
    copy_to_clipboard: false,
  },
  {
    link: "gav.torrecampo@gmail.com",
    icon: "gmail.svg",
    title: "Gmail",
    copy_to_clipboard: true,
  },
  // {
  //   link: "",
  //   icon: "generic_link.svg",
  //   title: "TEEEEEEEEEEEEEEEEEEEEEST",
  //   copy_to_clipboard: true,
  // },
]

const LINKS: { [key: string]: LinkItem } = {
  test: { title: '', icon: '', link: 'https://www.google.com/' },
};

export type {
  LinkItem,
  Skill,
  SkillGroup,
  Project,
  ProjectCategory,
  FeaturedProject,
  Stat,
  CardItem,
  SiteText,
};
export {
  SITE,
  SKILL_GROUPS,
  SKILLS,
  FEATURED,
  PROJECTS,
  EXPERIENCE,
  ACADEMICS,
  CONTACTS,
  LINKS,
};