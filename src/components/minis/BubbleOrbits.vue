<script setup lang="ts">
import type { BubbleData } from './Bubble.vue';
import Bubble from './Bubble.vue';

interface Props {
  count: number;  // number of bubbles/orbits
  width: number;  // width of space to draw the orbit (to offset by size of bubble)
  height: number;   // height of space to draw the orbit (to offset by size of bubble)
  ang_velocity: number | 'random';  // angular velocity of speed
  bubble_radius: number | 'random';
  orbit_radius: number | 'random';
  orbit_tilt: number | 'random';
};

const props = withDefaults(defineProps<Props>(), {
  
});

// Derivation of orbit illusion (pure math):
// (variables that change to show an illusion of depth while revolving)
// v - apparent velocity (may need to break down into x and y components for the orbit tilt)
// d - apparent distance from center of bubble to origin
// r - apparent radius of bubble
// (constants inherent to the bubble and its orbit)
// V - actual velocity (i.e. angular velocity of bubble in its orbit)
// D - actual distance (i.e. radius of orbit --> amplitude or maximum of apparent distance)
// R - actual radius (when the bubble is exactly the same distance from the observer as the orbit)
// θ - tilt of orbit from the horizontal axis (0rad is perfectly horizontal)
// Formula here:
// ...

</script>

<template>



</template>

<style scoped>



</style>