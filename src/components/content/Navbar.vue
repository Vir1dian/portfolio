<script setup lang="ts">
interface SectionLink {
  id: string;
  title: string;
}

interface Props {
  sections: SectionLink[];
};

const props = withDefaults(defineProps<Props>(), {
  sections: () => [],
});

</script>

<template>

  <!-- initial debug element -->
  <nav>
    <div id="nav-left">
      <div>Gavin Torrecampo | Student Developer</div>
    </div>
    <div id="nav-right">
      <div>
        <a
          v-for="section in props.sections"
          :key="section.id"
          :href="`#section-header-id-${section.id}`"
        >
          {{ section.title }}
        </a>
      </div>
    </div>
  </nav>

</template>

<style scoped>

#nav-left {
  display: inline-block;
  width: 50%;
}

#nav-right {
  display: inline-block;
  width: 50%;
}
#nav-right a {
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

  background-color: #d7fffa;
  border-bottom: solid 2px #2B6BA3;

  font-size: 24px;

  z-index: 999;
}

nav a {
  background: linear-gradient(90deg, #2B6BA3, #C99EFE, #C99EFE, #2B6BA3);
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
</style>