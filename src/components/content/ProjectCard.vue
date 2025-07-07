<script setup lang="ts">

interface Props {
  title?: string;
  thumbnail?: string;
  content?: string;
  link?: string;
  demo?: string;
  repo_link?: string;
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  thumbnail: '',
  content: '',
  link: '',
  demo: '',
  repo_link: '',
});

</script>

<template>

  <!-- initial debug element -->
  <div class="project-card">
    <p>ProjectCard</p>
    <p v-for="(prop, key) in props">{{ key }} : {{ prop }}</p>
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

</style>