<script setup lang="ts">
import type { BubbleData } from './Bubble.vue';
import Bubble from './Bubble.vue';

const COLOR_PALETTE: string[] = ["f1fffd", "befff7", "95fff2", "6affed"] as const; 

interface Props {
  count?: number;  // number of bubbles/orbits
  width?: number;  // width of space to draw the orbit (to offset by size of bubble) - in px
  height?: number;   // height of space to draw the orbit (to offset by size of bubble) - in px
  ang_velocity?: number | 'random';  // angular velocity of speed, in rad/s
  bubble_radius?: number | 'random';  // starting bubble radius (how big the bubble appears to be is at phi = 0) in px
  orbit_radius?: 'random' | 'fit-maximum';  // in px
  orbit_tilt?: number | 'random';  // in rad (0.5 for perfectly vertical, 1 for flipped upside down, error handle as you would with angles above 2 rad)
  color?: typeof COLOR_PALETTE[number] | "random";
};

const props = withDefaults(defineProps<Props>(), {
  count: 5,
  width: 800,
  height: 450,
  ang_velocity: 1,
  bubble_radius: 15,
  orbit_radius: 'fit-maximum',
  orbit_tilt: 0,
  color: 'random',
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

const OB_ZOOM = 1;  // multiplier for how far the observer is relative to the orbit origin. D_0 >> D must always be true

// ANIMATION DRIVER
let frame_id: number | undefined = undefined;
let previous_time: DOMHighResTimeStamp = 0;

function step(timestamp: DOMHighResTimeStamp) {

  if (!previous_time) previous_time = timestamp;
  const dt = Math.min((timestamp - previous_time) / 1000, 1 / 60);
  previous_time = timestamp;

  // animated_bubbles.value.forEach(bubble => {
  //   move(bubble, dt, velocity_multiplier.value);
  // });
  
  frame_id = requestAnimationFrame(step);
}

function move(bubble: BubbleData, dt: number) {
  
}

function startAnimation() {
  if (!frame_id) {
    frame_id = 0; // Reset last frame time for smooth start
    frame_id = requestAnimationFrame(step);
  }
};

function stopAnimation() {
  if (frame_id) {
    cancelAnimationFrame(frame_id);
    frame_id = undefined;
  }
};

</script>

<template>

  <div class="orbits-wrapper">

  </div>

</template>

<style scoped>



</style>