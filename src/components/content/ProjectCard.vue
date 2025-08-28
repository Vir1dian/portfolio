<script setup lang="ts">
import { computed } from 'vue';
import LinkChip from '../minis/LinkChip.vue';
import type { LinkItem } from '../../data/content';

interface Props {
  title?: string;
  thumbnail?: string;
  skills?: LinkItem[];
  content_text?: string;
  demo_link?: string;
  repo_link?: string;
  other_links?: LinkItem[];
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  thumbnail: '',
  skills: () => [],
  content_text: '',
  demo_link: '',
  repo_link: '',
  other_links: () => [],
});

const thumbnail_path = computed(() => {
  return new URL(`../../assets/${props.thumbnail}`, import.meta.url).href;
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
    <div class="title">{{ props.title }}</div>
    <div class="content-wrapper">
      <div class="content-left" :style="left_style_width">
        <div v-if="props.skills" class="skills">
          <LinkChip 
            v-for="skill in props.skills"
            v-bind="skill"
          />
        </div>
        <div class="content-text">{{ props.content_text }}</div>
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
.title {
  width: 100%;
  border-bottom: dotted 2px #304654;
  padding-bottom: 8px;
  margin-bottom: 16px;
  font-size: 20px;
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

</style>