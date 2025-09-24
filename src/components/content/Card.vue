<script setup lang="ts">
import { computed } from 'vue';
import LinkChip from '../minis/LinkChip.vue';
import type { LinkItem } from '../../data/content';
import { getAssetPath } from '../../utilities/utilities';

interface Props {
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  content_text?: string;
  skills?: LinkItem[];
  other_links?: LinkItem[];
};

const props = withDefaults(defineProps<Props>(), {
  thumbnail: '',
  title: '',
  subtitle: '',
  content_text: '',
  skills: () => [],
  other_links: () => [],
});

const thumbnail_path = computed(() => {
  return getAssetPath(props.thumbnail);
});

</script>

<template>

  <div class="card">
    <div class="content-top">
      <img v-if="props.thumbnail" :src="thumbnail_path" :alt="props.thumbnail" class="thumbnail" />
      <div class="title-wrapper">
        <div class="title">{{ props.title || 'Card Title' }}</div>
        <div class="subtitle">{{ props.subtitle }}</div>
      </div>
    </div>
    <div class="content">
      <div class="content-text">{{ props.content_text }}</div>
      <div v-if="props.skills.length" class="skills">
        <LinkChip 
          v-for="skill in props.skills"
          v-bind="skill"
        />
      </div>
      <div class="links" v-if="props.other_links.length">
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

  container-type: inline-size;  
  /* For container query */
}
.content-top {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.thumbnail {
  height: 48px;
  margin-right: 16px;
}
.title {
  font-size: 28px;
  font-weight: bolder;
  text-align: left;
}
.subtitle {
  color: #7d8c79;
}
.content {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.content-text {
  font-size: 18px;
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

@media screen and (max-width: 1920px) {
  .title {
    font-size: 24px;
  }
}
@media screen and (max-width: 1280px) {
  .title {
    font-size: 20px;
  }
  .content-text {
    font-size: 16px;
  }
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 16px;
  }
  .content-text {
    font-size: 14px;
  }
  .skills {
    margin-top: 8px;
  }
}

@container (max-width: 168px) {
  .content-top {
    flex-direction: column;
  }
  .thumbnail {
    margin-right: 0;
    margin-bottom: 8px;
  }
}

</style>