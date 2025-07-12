<script setup lang="ts">
import { computed } from 'vue';
import BubbleOrbits from './BubbleOrbits.vue';
import DottedGrid from './DottedGrid.vue';

interface Props {
  color: string;
};

const props = withDefaults(defineProps<Props>(), {
  color: '',
});

const herobg_style = computed(() => {
  return {
    backgroundColor: `#${props.color}`,
  };
});

</script>

<template>

  <div class="hero-background" :style="herobg_style">
    <DottedGrid :color="'6AFFED'" class="herobg-grid" />
    <BubbleOrbits 
      :count="10"
      :width="1440"
      :height="650"
      :ang_velocity="{ min: 0.05, max: 0.25 }"
      :bubble_radius="{ min: 75, max: 180 }"
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
  height: 100vh;
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