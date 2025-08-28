interface LinkItem {
  link?: string;
  icon?: string;
  title?: string;
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
  vue: { title: 'Vue.js', icon: 'vue.svg', link: 'https://vuejs.org/' },
  ts: { title: 'TypeScript', icon: 'typescript.svg', link: 'https://www.typescriptlang.org/' },
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
  // skill: { title: 'skillname', icon: 'skill.svg', link: 'https://skill.com' },
};

const PROJECTS: Project[] = [
  {
    title: "2D Particle Simulator",
    thumbnail: "particle_simulator.png",
    skills: [SKILLS.ts, SKILLS.js, SKILLS.html, SKILLS.css], // Reference skills from the master list
    content_text: "Browser-based physics simulator in vanilla TypeScript with object-oriented design.\nIncludes real-time rendering, elastic collisions, adjustable parameters, and dynamic input controls and UI components.",
    demo_link: "https://vir1dian.github.io/2D-Particle-Simulator/",
    repo_link: "https://github.com/Vir1dian/2D-Particle-Simulator",
  },
  {
    title: "Limited Matrix Calculator",
    thumbnail: "matrix_calculator.png",
    skills: [SKILLS.ts, SKILLS.js, SKILLS.html, SKILLS.css],
    content_text: "Calculator with support for gaussian elimination, determinants, and inverse matrices.\nMultiple ways to input matrices for convenience, produces a step-by-step solution.",
    demo_link: "https://vir1dian.github.io/Invertible-Matrix-Calculator/",
    repo_link: "https://github.com/Vir1dian/Invertible-Matrix-Calculator",
  },
  {
    title: "Plant Tracking App",
    thumbnail: "",
    skills: [SKILLS.php, SKILLS.js],
    content_text: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam.",
    other_links: [
      { link: 'https://www.wikipedia.org/', icon: 'vue.svg', title: 'Wikipedia' }, 
      { link: 'https://www.thesaurus.com/', title: 'Thesaurus' }
    ]
  },
  {
    title: "...",
    thumbnail: "ideateassistantdemo.png",
    skills: [SKILLS.cpp, SKILLS.java, SKILLS.python, SKILLS.vite, SKILLS.vscode, SKILLS.nodejs, SKILLS.alanai, SKILLS.xampp],
    content_text: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam.",
    other_links: [
      { link: 'https://www.thesaurus.com/' }
    ]
  },
  // more projects here
];

const EXPERIENCE: Project[] = [
  {
    title: "PilotCity — Developer",
    thumbnail: "",
    skills: [SKILLS.php, SKILLS.js],
    content_text: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam.",
    other_links: [
      { link: 'https://www.wikipedia.org/', icon: 'vue.svg', title: 'Wikipedia' }, 
      { link: 'https://www.thesaurus.com/', title: 'Thesaurus' }
    ]
  },
];

const LINKS: { [key: string]: LinkItem } = {
  test: { title: '', icon: '', link: 'https://www.google.com/' },
};

export type {
  LinkItem,
  Project,
};
export {
  SKILLS,
  PROJECTS,
  LINKS,
};