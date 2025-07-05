<script setup lang="ts">
import Bubbles from './components/background/Bubbles.vue';
import CosmeticGrid from './components/background/CosmeticGrid.vue';
import Waves from './components/background/Waves.vue';
import Navbar from './components/content/Navbar.vue';
import ProjectCard from './components/content/ProjectCard.vue';
import SectionHeader from './components/content/SectionHeader.vue';
</script>

<template>
  <div class="page-wrapper">
    <Navbar />

    <div class="content">
      <section v-for="n in 3" :key="n">
        <SectionHeader content="Section Header" />
        <ProjectCard />
        <ProjectCard />
      </section>
    </div>

    <div class="background">
      <Bubbles 
        :count="150" 
        :min_radius="50" 
        :max_radius="150" 
        :color="'8BD3E3'"
      />
      <CosmeticGrid />
      <Waves />
    </div>
  </div>
  <!-- probably have a temporary width of 1000vh or more to test the flow of scrolling through it -->
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.page-wrapper {
  display: grid;
  /* Define a single grid area named 'stack' */
  grid-template-areas: "stack";
  min-height: 100vh; /* Ensure wrapper takes at least full viewport height */
}

.content {
  color: #304654;

  grid-area: stack;
  position: relative; 
  z-index: 1;
  padding: 20px; 
  box-sizing: border-box;

  width: 1080px;  /* 1280, 1140, 1080, 960 */
  margin-left: auto;
  margin-right: auto;
}

.background {
  grid-area: stack;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #b7e8ee;
}

/* Background components, e.g. Bubbles, CosmeticGrid, Waves */
.background > * {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
