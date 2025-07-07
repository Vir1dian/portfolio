<script setup lang="ts">
import { ref } from 'vue';

import Bubbles from './components/background/Bubbles.vue';
import DottedGrid from './components/background/DottedGrid.vue';
// import Waves from './components/background/Waves.vue';
import Navbar from './components/content/Navbar.vue';
import ProjectCard from './components/content/ProjectCard.vue';
import SectionHeader from './components/content/SectionHeader.vue';

const section_headers = ref([
  { id: 'projects', title: 'Projects' },
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Contact' },
]);

const hero_nav_color = ref<'D7FFFA' | '0E6875'>('D7FFFA');  // light | dark for the hero/nav area

</script>

<template>
  <div id="page-wrapper">
    <Navbar :color="hero_nav_color" :sections="section_headers" />

    <div id="content">
      <section v-for="header in section_headers" :key="header.id">
        <SectionHeader :title="header.title" :id="header.id" />
        <ProjectCard />
        <ProjectCard />
      </section>
    </div>

    <div id="background">
      <Bubbles />
      <DottedGrid />
      <!-- <Waves /> -->
    </div>
  </div>
  <!-- probably have a temporary width of 1000vh or more to test the flow of scrolling through it -->
</template>

<style scoped>
#page-wrapper {
  display: grid;
  grid-template-areas: "stack";
  min-height: 100vh; /* Ensure wrapper takes at least full viewport height */
}

#content {
  color: #304654;

  grid-area: stack;
  position: relative; 
  z-index: 1;
  padding: 20px; 
  padding-top: 64px;
  box-sizing: border-box;

  width: 1080px;  /* 1280, 1140, 1080, 960 */
  margin-left: auto;
  margin-right: auto;

  min-height: calc(100vh - 40px);  /* 100vh minus total vertical padding (currently 20px top and 20px bottom) */
}

#background {
  grid-area: stack;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #d7fffa;
}
</style>
