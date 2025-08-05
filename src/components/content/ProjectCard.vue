<script setup lang="ts">
import { computed } from 'vue';
import IconLink from '../minis/IconLink.vue';

interface Props {
  title?: string;
  thumbnail?: string;
  content_text?: string;
  demo?: string;
  repo_link?: string;
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  thumbnail: '',
  content_text: '',
  demo: '',
  repo_link: '',
});

const thumbnail_path = computed(() => {
  return new URL(`../../assets/${props.thumbnail}`, import.meta.url).href;
});

</script>

<template>

  <div class="project-card">
    <div class="title">{{ props.title }}</div>
    <div class="content-wrapper">
      <div class="content-left">
        <div class="content-text">{{ props.content_text }}</div>
        <div class="links">
          <!-- ADD v-if for the IconLink components if theres even existing repo/demo links -->
          <IconLink
            link=""
            icon="play_icon.svg"
            title="Demo"
          />
          <IconLink
            link=""
            icon="github_icon.svg"
            title="Repository"
          />

        </div>
      </div>
      <div class="content-right">
        <img v-if="props.thumbnail" :src="thumbnail_path" :alt="props.thumbnail">
      </div>
    </div>
  </div>

</template>

<style scoped>

.project-card {
  display: block;
  width: inherit;
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
.links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min-content;
  margin-top: 16px;
}
.content-right {
  width: 37.5%;
}
.content-right img {
  max-width: 100%;
}

</style>