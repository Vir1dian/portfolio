import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { SITE } from './data/content'

// Keep the tab title in sync with data/content.ts. index.html holds a static
// fallback for crawlers and link previews; update it when SITE changes.
document.title = `${SITE.name} | ${SITE.tagline}`;

createApp(App).mount('#app')
