<script setup lang="ts">
import { computed } from 'vue';
import LinkChip from '../minis/LinkChip.vue';
import type { LinkItem } from '../../data/content';

interface Props {
  thumbnail?: string;
  title?: string;
  content_text?: string;
  skills?: LinkItem[];
  other_links?: LinkItem[];
};

const props = withDefaults(defineProps<Props>(), {
  thumbnail: '',
  title: '',
  content_text: '',
  skills: () => [],
  other_links: () => [],
});

const thumbnail_path = computed(() => {
  return new URL(`../../assets/${props.thumbnail}`, import.meta.url).href;
});

</script>

<template>

  <div class="card">
    <div class="content-top">
      <img v-if="props.thumbnail" :src="thumbnail_path" :alt="props.thumbnail" class="thumbnail" />
      <div class="title">{{ props.title ?? 'Card Title' }}</div>
    </div>
    <div class="content">
      <div class="content-text">{{ props.content_text }}</div>
      <div v-if="props.skills" class="skills">
        <LinkChip 
          v-for="skill in props.skills"
          v-bind="skill"
        />
      </div>
      <div class="links">
        <LinkChip 
          v-for="link_item in props.other_links"
          :link="link_item.link"
          :icon="link_item.icon ? link_item.icon : 'generic_link.svg'"
          :title="link_item.title"
        />

      </div>
    </div>
  </div>

</template>

<style scoped>

.card {
  display: block;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 32px;

  background-color: #d7fffa;
  border: solid 2px #0E6875;

  text-align: justify;
}
.content-top {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.thumbnail {
  height: 40px;
  margin-right: 16px;
}
.title {
  width: min-content;
  font-size: 32px;
  font-weight: bolder;
}
.content {
  display: flex;
  flex-direction: column;
}
.skills {
  margin-top: 16px;
  border-bottom: dotted 2px #304654;
}
.skills > * {  /* For LinkChip spacing */
  margin-right: 8px;
  margin-bottom: 8px;
}
.links {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min-content;
}

</style>