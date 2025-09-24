<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import BubbleOrbits from './BubbleOrbits.vue';
import DottedGrid from './DottedGrid.vue';

interface Props {
  height: string;  // control over height type (i.e. px, vh, etc.)
  color: string;
};

const props = withDefaults(defineProps<Props>(), {
  height: '100vh',
  color: '',
});

const herobg_style = computed(() => {
  return {
    height: props.height,
    backgroundColor: `#${props.color}`,
  };
});

const bubble_orbits_dimensions = ref<{ width: number; height: number }>({ width: window.innerWidth, height: window.innerHeight });
const bubble_radii_range = { min: 75, max: 180 };
function resizeOrbits() {
  bubble_orbits_dimensions.value.width = window.innerWidth * 0.8;
  bubble_orbits_dimensions.value.height = window.innerHeight * 0.8;
  bubble_radii_range.min = Math.min(75, window.innerWidth * 0.05);
  bubble_radii_range.max = Math.min(180, window.innerWidth * 0.15);
}

onMounted(() => {
  resizeOrbits();
  window.addEventListener('resize', resizeOrbits);
});
onUnmounted(() => {
  window.removeEventListener('resize', resizeOrbits);
});

</script>

<template>

  <div class="hero-background" :style="herobg_style">
    <DottedGrid :color="'6AFFED'" class="herobg-grid" />
    <BubbleOrbits 
      :count="10"
      :width="bubble_orbits_dimensions.width"
      :height="bubble_orbits_dimensions.height"
      :ang_velocity="{ min: 0.05, max: 0.25 }"
      :bubble_radius="{ min: bubble_radii_range.min, max: bubble_radii_range.max }"
      :orbit_tilt="'random'"
      :zoom="2.5"
    />
  </div>

</template>

<style scoped>
.hero-background {  
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;

  border-bottom: solid 2px #0E6875;
}
.herobg-grid {
  position: absolute;
  -webkit-mask-image: radial-gradient(ellipse, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 1) 75%);
  mask-image: radial-gradient(ellipse, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 1) 75%);
}
</style>