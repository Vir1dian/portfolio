<script setup lang="ts">
import Bubbles from './components/background/Bubbles.vue';
import CosmeticGrid from './components/background/CosmeticGrid.vue';
import Waves from './components/background/Waves.vue';
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/starstruck.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <Bubbles />
  <CosmeticGrid />
  <Waves />
  <HelloWorld />
  <!-- probably have a temporary width of 1000vh or more to test the flow of scrolling through it -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
