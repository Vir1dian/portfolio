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
  tagline: 'Game Developer',
  hero_text: "Hi, I'm Gavin, a UCLA Computer Science senior (June 2027) who designs and documents game systems before building them, so teams can build faster.",
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
  {
    title: "Spiritide",
    category: 'game',
    role: "Project lead & sole technical owner",
    team: "10+ volunteers for two quarters, now solo", // TODO: add program name once confirmed (SRS official name)
    date: "Oct 2025 – present",
    skills: [SKILLS.unity, SKILLS.csharp, SKILLS.git, SKILLS.figma, SKILLS.trello, SKILLS.python],
    stats: [
      { value: "94%", label: "of ~950 non-merge commits authored" },
      { value: "17", label: "compiler-enforced, acyclic assemblies" },
      { value: "~100", label: "data-driven effect assets" },
      { value: "~116 pp", label: "GDD in 29 version-controlled files" },
      { value: "10+", label: "volunteers onboarded" },
    ],
    content_text: "A top-down action roguelike in Unity 6. This case study covers how the project is designed, built, and run; the game itself stays under wraps for now.",
    highlights: [
      "Maintain the design as a ~116-page GDD split into 29 version-controlled files, with permanent rule IDs cited in code comments so every design change is a reviewable diff.",
      "Architected the Unity/C# codebase as 17 compiler-enforced, acyclic assemblies with a shared gameplay event bus and a single damage pipeline.",
      "Built a data-driven ability system where ScriptableObject actions compose reusable effects and combos are authored as input trees; ~100 effect assets across 3 playable characters and 1 enemy.",
      "Recruited and onboarded 10+ volunteers across art, writing, and development: wrote the onboarding guide (with a first-PR exercise), Git/Unity practices, and asset naming standards, and ran weekly Trello sprints.",
      "Scoped two quarters of content through a team vote on candidates rated 1–3 for code, art, and writing complexity, cutting to 4 characters, 5 enemies, 1 boss, and 1 stage.",
      "Designed an AI-assisted planning workflow: one-page vertical-slice specs with a definition of done and a cut line, capped context, and read-only access to game code, so every change is reviewed and applied by hand.",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "Plan(et) B",
    category: 'game',
    thumbnail: "planetB.png",
    role: "Game design, UI & gameplay programming",
    team: "5-person team, 72-hour jam",
    date: "UCLA Fiat Ludum 2026",
    skills: [SKILLS.unity, SKILLS.csharp],
    content_text: "An asymmetric co-op game: a robot that survives only in daylight and an alien that survives only at night must rebuild their spaceship before the sun swallows the planet.",
    highlights: [
      "Designed the core rules (day/night survival constraints, resource processing, three-stage ship repair) in a planner doc with mechanics diagrams and storyboarded UI flows the team built from.",
      "Tracked ~60 planned assets and set feature and asset deadlines for the 72-hour jam.",
      "Designed and wrote an Overcooked-inspired carry and processing system in C# (one-item carry, processor-based crafting), scoped to fit the jam.",
      "Created every HUD element, integrated them in the Unity editor, and built the game-state manager with seams for transitions and HUD updates.",
    ],
    other_links: [
      { link: "https://itch.io/jam/ucla-fiat-ludum-2026/rate/4474876", icon: "itchio.svg", title: "itch.io" },
    ],
  },
  {
    title: "MonoSpace",
    category: 'game',
    thumbnail: "monospace.png",
    role: "Team organizer, sprite artist & programmer",
    team: "4-person team, 72-hour jam",
    date: "UCLA ACM Studio Jam 2025",
    skills: [SKILLS.unity, SKILLS.csharp, SKILLS.aseprite, SKILLS.git],
    content_text: "A one-button arcade survival game: using only the spacebar, play moves from a random queue to keep a young axolotl ahead of the Big Fish while dodging a heron and a charging carp.",
    highlights: [
      "Recruited the team, assigned roles, scheduled meetings, and trained teammates on Git and Unity.",
      "Created all character animations and sprite variants in Aseprite.",
      "Implemented map decoration and character animation scripts in C#; top contributor with 57 of 109 commits.",
    ],
    repo_link: "https://github.com/Maxwe59/MonoSpace",
    other_links: [
      { link: "https://itch.io/jam/studio-jam-2025/rate/4049412", icon: "itchio.svg", title: "itch.io" },
    ],
  },
  {
    title: "Terrarium",
    category: 'other',
    thumbnail: "terrarium.png",
    role: "Architect: codebase, physics, cameras & UI",
    team: "3-person team",
    date: "UCLA CS 174A Computer Graphics, Winter 2026",
    skills: [SKILLS.threejs, SKILLS.js],
    content_text: "An interactive 3D simulation of a pet praying mantis hunting a boids-driven locust swarm. Teammates built the mantis's procedural animation and the boids AI; I built the foundation they ran on.",
    highlights: [
      "Architected the class-based codebase and shared spatial framework (world bounds, physics, props) that teammates' systems were built on, giving them a working stage and an early demo.",
      "Built raycast-based surface-clinging physics so the mantis walks on walls, ceilings, and props, fixing corner jitter by prioritizing the downward surface.",
      "Implemented isometric, third-person, and first-person cameras in a multi-viewport HUD with per-frame scissor/viewport rendering.",
      "Built a live tuning dashboard (FPS meter and sliders for swarm size, speed, perception, and flocking weights) so users could reshape the boids' behavior in real time, replacing a single add-locust button after peer feedback flagged limited interactivity.",
      "Designed an extensible prop class hierarchy and a lighting rig (ambient, directional, spot) with shadow mapping.",
    ],
    repo_link: "https://github.com/Maxwe59/Terrarium",
    other_links: [
      { link: 'https://docs.google.com/presentation/d/1poVF76AKUVLlwarWX06Z3d2gOsRZuW2Bk0PKL-LvzAU/edit?usp=sharing', title: 'Slideshow Presentation' },
      { link: 'https://drive.google.com/file/d/1aasrduStIDW1XkcC5oRr4FAq9wbyQqyn/view?usp=sharing', title: 'Final Report' },
    ]
  },
  {
    title: "BruinEats",
    category: 'other',
    thumbnail: "bruineats.png",
    role: "Front-end & UI design",
    team: "5-person team",
    date: "UCLA CS 35L Software Construction, Winter 2026",
    skills: [SKILLS.figma, SKILLS.react, SKILLS.js, SKILLS.css, SKILLS.vite],
    content_text: "A mobile-first replacement for UCLA Dining's nested menus: current menus, nutrition, ratings and reviews, favorites, and a per-venue \"where should I eat\" score.",
    highlights: [
      "Designed the complete interactive Figma prototype (a dozen-plus mobile screens) on a mobile-first layout I recommended, annotating each component's logic before implementation began.",
      "Built the dashboard, search/sort/filter, and item detail views, including a double-thumb rating slider, on an atomic-design component structure.",
      "Built a mock data layer with randomized generators so the UI shipped ahead of the backend; the backend team adopted it as their data-structure reference.",
    ],
    repo_link: "https://github.com/julianlaxamana/CS35LProject",
    other_links: [
      { link: 'https://www.figma.com/design/Mm38fFgABTwnSLjrPDqI8J/UCLA-Projects?node-id=0-1', icon: 'figma.svg', title: 'Figma Prototype' },
      { link: 'https://docs.google.com/presentation/d/1FUm7pg--XTwk82oMa1YCyoVUGP-jy_1Upzzf3gEd75o/edit?usp=sharing', title: 'Slideshow Presentation' },
      { link: 'https://drive.google.com/file/d/1sH8pCRhBBo0gw_fKAj3MdgJFium7qGoi/view?usp=sharing', title: 'Final Report' },
    ]
  },
  {
    title: "2D Particle Simulator",
    category: 'other',
    thumbnail: "particle_simulator.png",
    role: "Independent honors project",
    date: "Las Positas College Honors Contract, 2025",
    skills: [SKILLS.ts, SKILLS.js, SKILLS.html, SKILLS.css, SKILLS.vite], // Reference skills from the master list
    content_text: "Browser-based physics simulator in vanilla TypeScript with object-oriented design.\nIncludes real-time rendering, elastic collisions, adjustable parameters, and dynamic input controls and UI components.",
    demo_link: "https://vir1dian.github.io/2D-Particle-Simulator/",
    repo_link: "https://github.com/Vir1dian/2D-Particle-Simulator",
    other_links: [
      { link: 'https://drive.google.com/file/d/1YmdwoyZPKD1tcLbsKLPkwI9yVLSk-Znd/view?usp=sharing', title: 'Honors Report' }
    ]
  },
  {
    title: "Limited Matrix Calculator",
    category: 'other',
    thumbnail: "matrix_calculator.png",
    role: "Independent honors project",
    date: "Las Positas College Honors Contract, 2024",
    skills: [SKILLS.ts, SKILLS.js, SKILLS.html, SKILLS.css, SKILLS.vite],
    content_text: "Calculator with support for gaussian elimination, determinants, and inverse matrices.\nMultiple ways to input matrices for convenience, produces a step-by-step solution.",
    demo_link: "https://vir1dian.github.io/Invertible-Matrix-Calculator/",
    repo_link: "https://github.com/Vir1dian/Invertible-Matrix-Calculator",
    other_links: [
      { link: 'https://drive.google.com/file/d/1zwLgnYZsZQYjs5bEX0u1-RT_ruEFALHs/view?usp=sharing', title: 'Honors Report' }
    ]
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
    // thumbnail: "pilotcity.jpg", // hidden: third-party logo
    title: "PilotCity — Developer (part-time)",
    subtitle: "(Summers 2023 & 2025)",
    content_text: "Designed Figma mockups and built Vue/Vuetify pages in TypeScript for the platform's student internship-placement programs.\nPrototyped multi-agent LLM scripts in Python using CrewAI, OpenAI, and Serper APIs.",
    skills: [SKILLS.vue, SKILLS.ts, SKILLS.figma, SKILLS.crewai, SKILLS.python],
    other_links: [
      { link: 'https://pilotcity.com', icon: '', title: 'PilotCity Homepage' }, 
    ]
  },
  {
    // thumbnail: "laspositascollege.jpg", // hidden: third-party logo
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
    title: "BS: Computer Science, UCLA",
    subtitle: "Expected June 2027",
    content_text: "Relevant coursework: Computer Graphics (CS 174A), Software Construction (CS 35L), Algorithms & Complexity (CS 180), Operating Systems (CS 111), Machine Learning (CS M146)\nIn progress: Computer Networks (CS 118)",
  },
  {
    // thumbnail: "laspositascollege.jpg", // hidden: third-party logo
    title: "AS: Computer Science",
    subtitle: "May 2025",
    content_text: "With highest honors (4.0 GPA)",
  },
  {
    // thumbnail: "laspositascollege.jpg", // hidden: third-party logo
    title: "AA: Mathematics and Science",
    subtitle: "May 2025",
    content_text: "With highest honors (4.0 GPA)",
  },
  {
    // thumbnail: "laspositascollege.jpg", // hidden: third-party logo
    title: "Honors Scholar",
    subtitle: "May 2025",
    content_text: "Completed 5 honors contracts",
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
    link: "https://itch.io/profile/vir1dian",
    icon: "itchio.svg",
    title: "itch.io",
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