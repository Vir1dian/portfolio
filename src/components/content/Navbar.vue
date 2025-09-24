<script setup lang="ts">
import { computed } from 'vue';

interface SectionLink {
  id: string;
  title: string;
}

interface Props {
  color: string;
  sections: SectionLink[];
};

const props = withDefaults(defineProps<Props>(), {
  color: '',
  sections: () => [],
});

const nav_style = computed(() => {
  return {
    backgroundColor: `#${props.color}`,
  };
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

  <!-- initial debug element -->
  <nav :style="nav_style">
    <div class="subwrapper">
      <div class="nav-left">
        <div>
          <a
            href="/"
            @click.prevent="scrollToSection('_start')"
            class="full-title"
          >
            Gavin Torrecampo | Student Developer
          </a>
          <a
            href="/"
            @click.prevent="scrollToSection('_start')"
            class="half-title"
          >
            Gavin Torrecampo
          </a>
          <a
            href="/"
            @click.prevent="scrollToSection('_start')"
            class="mini-title"
          >
            Gavin T
          </a>
        </div>
      </div>
      <div class="nav-right">
        <div>
          <a
            v-for="section in props.sections"
            :key="section.id"
            :href="`#section-header-id-${section.id}`"
            @click.prevent="scrollToSection(section.id)"
          >
            {{ section.title }}
          </a>
        </div>
      </div>
    </div>
  </nav>

</template>

<style scoped>

.subwrapper {
  width: 60%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-left {
  display: inline-block;
}
.full-title {
  display: inline-block;
}
.half-title, .mini-title {
  display: none;
}

.nav-right {
  display: inline-block;
}
.nav-right a:not(:first-child) {
  margin-left: 16px;
}

nav {
  position: fixed;
  top: 0;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px;

  background-color: #0E6875;
  border-bottom: solid 2px #0E6875;

  font-size: 24px;

  z-index: 999;
}

nav a {
  background: linear-gradient(90deg, #BD82E5, #C99EFE, #C99EFE, #BD82E5);
  background-size: 200% 100%;
  background-position: 0% 0%;
  background-clip: text;
  color: transparent;
  text-decoration: none;

  animation: fancy-highlight-reversed 0.5s ease-out forwards;
}

nav a:hover {
  animation: fancy-highlight 0.5s ease-out forwards;
}

@keyframes fancy-highlight {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: -100% 0%;
  }
}

@keyframes fancy-highlight-reversed {
  from {
    background-position: -100% 0%;
  }
  to {
    background-position: 0% 0%;
  }
}

@media screen and (max-width: 1920px) {
  .subwrapper {
    width: 70%;
  }
}
@media screen and (max-width: 1280px) {
  nav {
    font-size: 18px;
  }
  .subwrapper {
    width: 80%;
  }
}
@media screen and (max-width: 768px) {
  nav {
    font-size: 14px;
  }
  .subwrapper {
    width: 90%;
  }
}
@media screen and (max-width: 540px) {
  .full-title {
    display: none;
  }
  .half-title {
    display: inline-block;  
  }
}
@media screen and (max-width: 364px) {
  .half-title {
    display: none;
  }
  .mini-title {
    display: inline-block;  
  }
  .nav-right a:not(:first-child) {
    margin-left: 8px;
  }
}
</style>