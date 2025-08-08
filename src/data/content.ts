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
  html: { title: 'HTML', icon: 'html.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  css: { title: 'CSS', icon: 'css.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  // more skills here
};

const PROJECTS: Project[] = [
  {
    title: "2D Particle Simulator",
    thumbnail: "minime.png",
    skills: [SKILLS.js, SKILLS.html, SKILLS.css], // Reference skills from the master list
    content_text: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam.",
    demo_link: "https://vir1dian.github.io/2D-Particle-Simulator/",
    repo_link: "https://github.com/Vir1dian/2D-Particle-Simulator",
  },
  {
    title: "Limited Matrix Calculator",
    thumbnail: "selfie1.png",
    skills: [SKILLS.js],
    content_text: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam.",
    demo_link: "https://vir1dian.github.io/Invertible-Matrix-Calculator/",
    repo_link: "https://github.com/Vir1dian/Invertible-Matrix-Calculator",
  },
  {
    title: "Plant Tracking App",
    thumbnail: "",
    skills: [SKILLS.vue, SKILLS.ts],
    content_text: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam.",
    other_links: [
      { link: 'https://www.wikipedia.org/', icon: 'vue.svg', title: 'Wikipedia' }, 
      { link: 'https://www.thesaurus.com/', title: 'Thesaurus' }
    ]
  },
  {
    title: "...",
    thumbnail: "icons/discord.svg",
    skills: [SKILLS.vue, SKILLS.ts],
    content_text: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam.",
    other_links: [
      { link: 'https://www.thesaurus.com/' }
    ]
  },
  // more projects here
];


export type {
  LinkItem,
  Project,
};
export {
  SKILLS,
  PROJECTS,
};