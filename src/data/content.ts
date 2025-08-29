interface LinkItem {
  link?: string;
  icon?: string;
  title?: string;
}

interface CardItem {
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  content_text?: string;
  skills?: LinkItem[];
  other_links?: LinkItem[];
}

interface Project {
  title?: string;
  thumbnail?: string;
  skills?: LinkItem[];
  content_text?: string;
  demo_link?: string;
  repo_link?: string;
  other_links?: LinkItem[];
}

const SKILLS: { [key: string]: LinkItem } = {
  vue: { title: 'Vue', icon: 'vue.svg', link: 'https://vuejs.org' },
  ts: { title: 'TypeScript', icon: 'typescript.svg', link: 'https://www.typescriptlang.org' },
  js: { title: 'JavaScript', icon: 'javascript.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  html: { title: 'HTML', icon: 'html5.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  css: { title: 'CSS', icon: 'css.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  php: { title: 'PHP', icon: 'php.svg', link: 'https://www.php.net' },
  cpp: { title: 'C++', icon: 'cpp.svg', link: 'https://cplusplus.com' },
  java: { title: 'Java', icon: 'java.svg', link: 'https://java.com/en' },
  python: { title: 'Python', icon: 'python.svg', link: 'https://www.python.org' },

  nodejs: { title: 'NodeJS', icon: 'nodejs.svg', link: 'https://nodejs.org/docs/latest/api' },
  vite: { title: 'Vite', icon: 'vite.svg', link: 'https://v2.vitejs.dev' },
  vscode: { title: 'VSCode', icon: 'vscode.svg', link: 'https://code.visualstudio.com' },

  alanai: { title: 'Alan AI', icon: 'alanai.png', link: 'https://www.alan.app/docs' },
  xampp: { title: 'XAMPP', icon: 'xampp.png', link: 'https://www.apachefriends.org' },
  mariadb: { title: 'MariaDB', icon: 'mariadb.svg', link: 'https://mariadb.com' },
  crewai: { title: 'CrewAI', icon: 'crewai-short.svg', link: 'https://docs.crewai.com/en/introduction' },
  openai: { title: 'OpenAI', icon: 'openai.svg', link: 'https://platform.openai.com/docs/overview' },
  serper: { title: 'Serper', icon: 'serper.png', link: 'https://serper.dev' },

  figma: { title: 'Figma', icon: 'figma.svg', link: 'https://www.figma.com' },
  docker: { title: 'Docker', icon: 'docker.svg', link: 'https://docs.docker.com' },
  postman: { title: 'Postman', icon: 'postman.svg', link: 'https://www.postman.com/product/what-is-postman' },
  // skill: { title: 'skillname', icon: 'skill.svg', link: 'https://skill.com' },
};

const PROJECTS: Project[] = [
  {
    title: "2D Particle Simulator",
    thumbnail: "particle_simulator.png",
    skills: [SKILLS.ts, SKILLS.js, SKILLS.html, SKILLS.css, SKILLS.vite], // Reference skills from the master list
    content_text: "Browser-based physics simulator in vanilla TypeScript with object-oriented design.\nIncludes real-time rendering, elastic collisions, adjustable parameters, and dynamic input controls and UI components.",
    demo_link: "https://vir1dian.github.io/2D-Particle-Simulator/",
    repo_link: "https://github.com/Vir1dian/2D-Particle-Simulator",
  },
  {
    title: "Limited Matrix Calculator",
    thumbnail: "matrix_calculator.png",
    skills: [SKILLS.ts, SKILLS.js, SKILLS.html, SKILLS.css, SKILLS.vite],
    content_text: "Calculator with support for gaussian elimination, determinants, and inverse matrices.\nMultiple ways to input matrices for convenience, produces a step-by-step solution.",
    demo_link: "https://vir1dian.github.io/Invertible-Matrix-Calculator/",
    repo_link: "https://github.com/Vir1dian/Invertible-Matrix-Calculator",
  },
  {
    title: "Plant Tracking App",
    thumbnail: "",
    skills: [SKILLS.php, SKILLS.js, SKILLS.xampp, SKILLS.mariadb],
    content_text: "Full-stack plant tracking web application.\nRelational database to manage plant care information and user accounts.\nCRUD operations for plant profiles, database queries connected to user-facing features.",
    other_links: [
      { link: 'https://youtu.be/McTq_UwB-OU', title: 'Demo Video' }
    ]
  },
  {
    title: "Assistant Chef",
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
    title: "PilotCity — Software Developer",
    subtitle: "(July 2023 - present)",
    content_text: "Designed and developed components for PilotCity\'s website using Vue and Typescript to expand its services to cater for both student and employers. R&D role: developed pipelines for AI assistant models using CrewAI with Python to improve user participation and retention in PilotCity\'s website.",
    skills: [SKILLS.vue, SKILLS.ts, SKILLS.crewai, SKILLS.python, SKILLS.docker, SKILLS.html, SKILLS.js, SKILLS.css],
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

const LINKS: { [key: string]: LinkItem } = {
  test: { title: '', icon: '', link: 'https://www.google.com/' },
};

export type {
  LinkItem,
  Project,
  CardItem,
};
export {
  SKILLS,
  PROJECTS,
  EXPERIENCE,
  ACADEMICS,
  LINKS,
};