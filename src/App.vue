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
        :velocity_ratio="0.5"
      />
      <!-- <CosmeticGrid /> -->
      <!-- <Waves /> -->
    </div>
  </div>
  <!-- probably have a temporary width of 1000vh or more to test the flow of scrolling through it -->
</template>

<style scoped>
.page-wrapper {
  display: grid;
  grid-template-areas: "stack";
  min-height: 100vh; /* Ensure wrapper takes at least full viewport height */
}

.content {
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

.background {
  grid-area: stack;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #9CF5FF;
}
</style>
