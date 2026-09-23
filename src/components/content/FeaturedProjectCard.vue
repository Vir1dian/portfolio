<script setup lang="ts">
import { computed } from 'vue';
import LinkChip from '../minis/LinkChip.vue';
import type { LinkItem, ProjectCategory, Stat } from '../../data/content';
import { getImagePath } from '../../utilities/utilities';

// Large case-study variant of ProjectCard. Same fields, plus a stats strip
// and an optional diagram. Fed from FEATURED in data/content.ts.
interface Props {
  title?: string;
  category?: ProjectCategory;
  thumbnail?: string;
  role?: string;
  team?: string;
  date?: string;
  skills?: LinkItem[];
  content_text?: string;
  highlights?: string[];
  demo_link?: string;
  repo_link?: string;
  other_links?: LinkItem[];
  stats?: Stat[];
  diagram?: string;
  diagram_caption?: string;
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  category: 'game',
  thumbnail: '',
  role: '',
  team: '',
  date: '',
  skills: () => [],
  content_text: '',
  highlights: () => [],
  demo_link: '',
  repo_link: '',
  other_links: () => [],
  stats: () => [],
  diagram: '',
  diagram_caption: '',
});

const meta_text = computed(() => {
  return [props.role, props.team, props.date].filter(Boolean).join(' \u00B7 ');
});

const has_links = computed(() => {
  return !!(props.demo_link || props.repo_link || props.other_links.length);
});

</script>

<template>

  <div class="featured-card">
    <div class="header">
      <div class="header-text">
        <div class="eyebrow">Featured</div>
        <div class="title">{{ props.title }}</div>
        <div v-if="meta_text" class="meta">{{ meta_text }}</div>
      </div>
      <img v-if="props.thumbnail" :src="getImagePath(props.thumbnail)" :alt="props.title" class="thumbnail" />
    </div>

    <div v-if="props.stats.length" class="stats">
      <div v-for="stat in props.stats" :key="stat.label" class="stat">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>

    <div v-if="props.content_text" class="content-text">{{ props.content_text }}</div>

    <ul v-if="props.highlights.length" class="highlights">
      <li v-for="(item, i) in props.highlights" :key="i">{{ item }}</li>
    </ul>

    <figure v-if="props.diagram" class="diagram">
      <img :src="getImagePath(props.diagram)" :alt="props.diagram_caption || props.title" />
      <figcaption v-if="props.diagram_caption">{{ props.diagram_caption }}</figcaption>
    </figure>

    <div v-if="props.skills.length" class="skills">
      <LinkChip
        v-for="skill in props.skills"
        :key="skill.title"
        :link="skill.link"
        :icon="skill.icon"
        :title="skill.title"
      />
    </div>

    <div v-if="has_links" class="links">
      <LinkChip
        v-if="props.demo_link"
        :link="props.demo_link"
        icon="generic_play.svg"
        title="Demo"
      />
      <LinkChip
        v-if="props.repo_link"
        :link="props.repo_link"
        icon="github.svg"
        title="Repository"
      />
      <LinkChip
        v-for="link_item in props.other_links"
        :key="link_item.link"
        :link="link_item.link"
        :icon="link_item.icon ? link_item.icon : 'generic_link.svg'"
        :title="link_item.title"
      />
    </div>
  </div>

</template>

<style scoped>

.featured-card {
  display: block;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;

  background-color: #d7fffa;
  border: solid 3px #0E6875;
  box-shadow: 6px 6px 0 #BD82E5;

  text-align: left;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  border-bottom: dotted 2px #304654;
  padding-bottom: 12px;
  margin-bottom: 16px;
}
.eyebrow {
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #BD82E5;
}
.title {
  font-size: 28px;
  font-weight: bolder;
}
.meta {
  margin-top: 4px;
  font-size: 16px;
  color: #7d8c79;
}
.thumbnail {
  max-height: 96px;
  max-width: 35%;
  border-radius: 8px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}
.stat {
  border: solid 2px #0E6875;
  border-radius: 8px;
  background-color: #95fff2;
  padding: 8px 12px;
}
.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #0E6875;
}
.stat-label {
  font-size: 14px;
}

.content-text {
  font-size: 18px;
  white-space: pre-line;
}
.highlights {
  margin: 8px 0 0 0;
  padding-left: 24px;
  font-size: 18px;
}
.highlights li {
  margin-bottom: 6px;
}

.diagram {
  margin: 16px 0 0 0;
}
.diagram img {
  max-width: 100%;
  border: solid 2px #0E6875;
  border-radius: 8px;
  background-color: white;
}
.diagram figcaption {
  margin-top: 4px;
  font-size: 14px;
  color: #7d8c79;
}

.skills {
  margin-top: 16px;
}
.skills > * {  /* For LinkChip spacing */
  margin-right: 8px;
  margin-bottom: 8px;
}
.links {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media screen and (max-width: 1280px) {
  .title {
    font-size: 24px;
  }
  .stat-value {
    font-size: 24px;
  }
  .content-text, .highlights {
    font-size: 16px;
  }
}
@media screen and (max-width: 768px) {
  .featured-card {
    padding: 16px;
    box-shadow: 4px 4px 0 #BD82E5;
  }
  .header {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .thumbnail {
    max-width: 100%;
  }
  .title {
    font-size: 20px;
  }
  .meta, .stat-label {
    font-size: 12px;
  }
  .stat-value {
    font-size: 20px;
  }
  .content-text, .highlights {
    font-size: 14px;
  }
  .highlights {
    padding-left: 18px;
  }
}

</style>
