<script setup lang="ts">
import HoverSlam from '../minis/HoverMes/HoverSlam.vue';


export interface SectionLink {
  id: string;
  title: string;
}

interface Props {
  sections: SectionLink[];
};

const props = withDefaults(defineProps<Props>(), {
  sections: () => [],
});

function scrollToSection(id: string) {
  if (id === '_start') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    history.pushState(null, '', window.location.pathname);
  }
  const section_header = document.getElementById(`section-header-id-${id}`);
  if (section_header) {
    section_header.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', `#${section_header.id}`);
  }
}

</script>

<template>

  <div class="hero-links-container">
    <div v-for="section in props.sections" :key="section.id" class="link-block">
      <HoverSlam :max_tilt="5">
        <a 
          :href="`#section-header-id-${section.id}`" 
          @click.prevent="scrollToSection(section.id)"
        >
          {{ section.title }}
        </a>
      </HoverSlam>
    </div>
  </div>

</template>

<style scoped>

.hero-links-container {
  display: flex;
  justify-content: space-around;
}
.link-block {
  display: inline-block;
}

.link-block a {
  background: linear-gradient(90deg, #BD82E5, #C99EFE, #C99EFE, #BD82E5);
  background-size: 200% 100%;
  background-position: 0% 0%;
  background-clip: text;
  color: transparent;
  text-decoration: none;

  animation: fancy-highlight-reversed 0.25s ease-out forwards;
}

.link-block a:hover {
  animation: fancy-highlight 0.25s ease-out forwards;
}

@keyframes fancy-highlight {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: -100% 0%;
    font-weight: 900;
  }
}

@keyframes fancy-highlight-reversed {
  from {
    background-position: -100% 0%;
    font-weight: 900;
  }
  to {
    background-position: 0% 0%;
  }
}

</style>