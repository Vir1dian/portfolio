<script setup lang="ts">
import { computed } from 'vue';
import LinkChip from '../minis/LinkChip.vue';
import type { LinkItem, ProjectCategory } from '../../data/content';
import { getImagePath } from '../../utilities/utilities';

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
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  category: 'other',
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
});

const thumbnail_path = computed(() => {
  return getImagePath(props.thumbnail);
});

// 'Role · Team · Date', skipping any that are empty
const meta_text = computed(() => {
  return [props.role, props.team, props.date].filter(Boolean).join(' \u00B7 ');
});

const left_style_width = computed(() => {
  if (!props.thumbnail) {
    return {
      width: '100%',
    };
  }
})

</script>

<template>

  <div class="project-card">
    <div class="title-wrapper">
      <div class="title">{{ props.title }}</div>
      <div v-if="meta_text" class="meta">{{ meta_text }}</div>
    </div>
    <div class="content-wrapper">
      <div class="content-left" :style="left_style_width">
        <div v-if="props.skills.length" class="skills">
          <LinkChip 
            v-for="skill in props.skills"
            :key="skill.title"
            :link="skill.link"
            :icon="skill.icon"
            :title="skill.title"
          />
        </div>
        <div v-if="props.content_text" class="content-text">{{ props.content_text }}</div>
        <ul v-if="props.highlights.length" class="highlights">
          <li v-for="(item, i) in props.highlights" :key="i">{{ item }}</li>
        </ul>
        <div class="links">
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
            :link="link_item.link"
            :icon="link_item.icon ? link_item.icon : 'generic_link.svg'"
            :title="link_item.title"
          />

        </div>
      </div>
      <div v-if="props.thumbnail" class="content-right">
        <img :src="thumbnail_path" :alt="props.thumbnail">
      </div>
    </div>
  </div>

</template>

<style scoped>

.project-card {
  display: block;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 32px;

  background-color: #d7fffa;
  border: solid 2px #0E6875;

  text-align: justify;
}
.title-wrapper {
  width: 100%;
  border-bottom: dotted 2px #304654;
  padding-bottom: 8px;
  margin-bottom: 16px;
}
.title {
  font-size: 20px;
}
.meta {
  margin-top: 4px;
  font-size: 16px;
  color: #7d8c79;
  text-align: left;
}
.content-wrapper {
  display: flex;
  justify-content: space-between;
}
.content-left {
  display: inline-flex;
  flex-direction: column;
  width: 60%;
}
.content-text {
  font-size: 18px;
  white-space: pre-line;  /* honor '\n' in content strings */
  text-align: left;
}
.highlights {
  margin: 8px 0 0 0;
  padding-left: 24px;
  font-size: 18px;
  text-align: left;
}
.highlights li {
  margin-bottom: 4px;
}
.skills {
  margin-bottom: 8px;
}
.skills > * {  /* For LinkChip spacing */
  margin-right: 8px;
  margin-bottom: 8px;
}
.links {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min-content;
}
.content-right {
  width: 37.5%;
}
.content-right img {
  max-width: 100%;
}

@media screen and (max-width: 1280px) {
  .title {
    font-size: 18px;
  }
  .meta {
    font-size: 14px;
  }
  .content-text, .highlights {
    font-size: 16px;
  }
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 16px;
  }
  .meta {
    font-size: 12px;
  }
  .content-text, .highlights {
    font-size: 14px;
  }
  .highlights {
    padding-left: 18px;
  }

  .content-wrapper {
    flex-direction: column-reverse;
  }
  .content-left, .content-right {
    width: 100%;
  }
  .content-right {
    margin-bottom: 16px;
  }
  .skills {
    margin-bottom: 0;
  }
  .links {
    margin-top: 8px;
  }
}

</style>