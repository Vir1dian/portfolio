<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import Bubbles from './components/background/Bubbles.vue';
import HeroBg from './components/background/HeroBg.vue';
import DottedGrid from './components/background/DottedGrid.vue';
// import Waves from './components/background/Waves.vue';
import Navbar from './components/content/Navbar.vue';
import Hero from './components/content/Hero.vue';
import SectionHeader from './components/content/SectionHeader.vue';
import ProjectCard from './components/content/ProjectCard.vue';

const SECTION_HEADERS = ref([
  { id: 'projects', title: 'Projects' },
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Contact' },
]);

const HERO_NAV_COLOR = ref<'D7FFFA' | '0E6875'>('D7FFFA');  // light | dark for the hero/nav area, ref because this may become programmatic later on for light/dark mode

const CONTENT_TOP_OFFSET: number = 0;

const is_hero_visible = ref<boolean>(true);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const hero_element = document.getElementById('main-herobg'); // We'll add this ID to your Hero component
  if (hero_element) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          is_hero_visible.value = entry.isIntersecting;
        });
      },
      {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the hero is visible/invisible
      }
    );
    observer.observe(hero_element);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

</script>

<template>
  <div id="page-wrapper">
    <Transition name="slide">
      <Navbar v-if="!is_hero_visible" :color="HERO_NAV_COLOR" :sections="SECTION_HEADERS" />
    </Transition>

    <div id="content" :style="{ paddingTop: `${CONTENT_TOP_OFFSET}px` }">
      <Hero :offset_top="CONTENT_TOP_OFFSET" :sections="SECTION_HEADERS" />
      <section v-for="header in SECTION_HEADERS" :key="header.id">
        <SectionHeader :title="header.title" :id="header.id" />
        <ProjectCard />
        <ProjectCard />
      </section>
    </div>

    <div id="background">
      <Bubbles />
      <HeroBg :color="HERO_NAV_COLOR" id="main-herobg" />
      <DottedGrid />
      <!-- <Waves /> -->
    </div>
  </div>
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

/* Animation specifications for the "fade" transition component */
.slide-enter-from {
  transform: translateY(-100%);
}
.slide-leave-from {
  transform: translateY(0);
}
.slide-enter-active {
  transition: transform 0.2s ease-out;
}
.slide-leave-active {
  transition: transform 0.2s ease-in;
}
.slide-enter-to {
  transform: translateY(0);
}
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
