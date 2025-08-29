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
import Card from './components/content/Card.vue';
import LinkChip from './components/minis/LinkChip.vue';

import { SKILLS, PROJECTS, EXPERIENCE, ACADEMICS } from './data/content';

// Used both by SectionHeader and Navbar components to sync scroll-to features
const SECTION_HEADERS = ref([
  { id: 'projects', title: 'Projects' },
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Contact' },
]);

const HERO_NAV_COLOR = ref<'D7FFFA' | '0E6875'>('D7FFFA');  // light | dark for the hero/nav area, ref because this may become programmatic later on for light/dark mode
const HERO_HEIGHT = '100vh';

const CONTENT_TOP_OFFSET: number = 0;

const is_hero_visible = ref<boolean>(true);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const hero_element = document.getElementById('main-herobg');
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

// Used in skills list
const SKILLS_KEYS = Object.keys(SKILLS);
const COLUMN_COUNT = ref<number>(5);  

</script>

<template>
  <div id="page-wrapper">
    <Transition name="slide">
      <Navbar v-if="!is_hero_visible" :color="HERO_NAV_COLOR" :sections="SECTION_HEADERS" />
    </Transition>

    <div id="content" :style="{ paddingTop: `${CONTENT_TOP_OFFSET}px` }">
      <Hero :height="HERO_HEIGHT" :offset_top="CONTENT_TOP_OFFSET" :sections="SECTION_HEADERS" />

      <!-- PROJECTS -->
      <SectionHeader :title="SECTION_HEADERS[0].title" :id="SECTION_HEADERS[0].id" />
      <ProjectCard 
        v-for="project in PROJECTS"
        :key="project.title"
        v-bind="project"
      />


      <!-- ABOUT -->
      <SectionHeader :title="SECTION_HEADERS[1].title" :id="SECTION_HEADERS[1].id" />

      <SectionHeader :title="'Experience'" :id="'experience'" :hierarchy="2" />
      <Card
        v-for="role in EXPERIENCE"
        :key="role.title"
        v-bind="role"
      />

      <SectionHeader :title="'Technical Skills'" :id="'skills'" :hierarchy="2" />
      <table id="skills-list">
        <tbody>
          <tr v-for="row in Math.ceil(SKILLS_KEYS.length / COLUMN_COUNT)" :key="row">
            <td v-for="col in COLUMN_COUNT" :key="col">
              <LinkChip 
                v-if="(row - 1) * COLUMN_COUNT + (col - 1) < SKILLS_KEYS.length"
                v-bind="SKILLS[SKILLS_KEYS[(row - 1) * COLUMN_COUNT + (col - 1)]]" 
              />
            </td>
          </tr>
        </tbody>
      </table>

      <SectionHeader :title="'Academics and Awards'" :id="'academics'" :hierarchy="2" />
      <!-- <Card 
        v-for="academic in ACADEMICS" 
        :key="academic.title"
        v-bind="academic"
      /> -->
      <table id="academics-list">
        <tbody>
          <tr v-for="row in Math.ceil(ACADEMICS.length / 2)" :key="row">
            <td v-for="col in 2" :key="col">
              <Card 
                v-if="(row - 1) * 2 + (col - 1) < ACADEMICS.length"
                v-bind="ACADEMICS[(row - 1) * 2 + (col - 1)]" 
              />
            </td>
          </tr>
        </tbody>
      </table>
      

      <!-- CONTACT -->
      <SectionHeader :title="SECTION_HEADERS[2].title" :id="SECTION_HEADERS[2].id" />
      <SectionHeader :title="'Hello World'" :id="'test1'" :hierarchy="2" />
      <SectionHeader :title="'Hello World 2'" :id="'test2'" :hierarchy="3" />


    </div>

    <div id="background">
      <Bubbles />
      <HeroBg :height="HERO_HEIGHT" :color="HERO_NAV_COLOR" id="main-herobg" />
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
#skills-list {
  border-collapse: collapse;
  text-align: left;
  table-layout: fixed;
  width: 100%;
}
#academics-list {
  border-collapse: collapse;
  text-align: left;
  table-layout: fixed;
  width: 100%;
}
#academics-list td {
  vertical-align: bottom;
}
#academics-list td > * {
  margin-bottom: 0;
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
