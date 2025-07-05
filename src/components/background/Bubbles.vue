<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { BubbleData } from './Bubble.vue';
import Bubble from './Bubble.vue';

const COLOR_PALETTE: string[] = ["8BD3E3", "C99EFE", "5894BC", "4AD2A9"] as const; 

interface Props {
  count?: number;
  min_radius?: number;
  max_radius?: number;
  velocity_ratio?: number;  // (scroll velocity / radius)
  velocity_scroll_multiplier?: number;
  color?: typeof COLOR_PALETTE[number] | "random";
};

const props = withDefaults(defineProps<Props>(), {
  count: 50,
  min_radius: 25,
  max_radius: 75,
  velocity_ratio: 1,
  velocity_scroll_multiplier: 2,  // 1: does not affect the base speed when scrolling, >1: speeds up when scrolling, <1: slows down when scrolling
  color: "random",
});

onMounted(() => {
  syncContentDimensions();
  window.addEventListener('resize', syncContentDimensions);
  startAnimation();
});
onUnmounted(() => {
  stopAnimation();
  window.removeEventListener('resize', syncContentDimensions);
});



function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
  return COLOR_PALETTE[Math.floor(Math.random()*COLOR_PALETTE.length)];
}

const viewport_width = ref(0);
const viewport_height = ref(0);

const syncContentDimensions = () => {
  viewport_width.value = window.innerWidth;
  viewport_height.value = window.innerHeight;
  generateBubbles();  // regenerate bubble range to match dimensions
};

const animated_bubbles = ref<BubbleData[]>([]);
function generateBubbles() {
  const bubble_arr: BubbleData[] = [];
  for (let i = 0; i < props.count; i++) {
    const radius = getRandomInt(props.min_radius, props.max_radius);
    const position = {
      x: getRandomInt(0 - radius, viewport_width.value - radius), // bubbles may clip up to half into left or right walls of the page
      y: getRandomInt(0 - radius, viewport_height.value - radius)
    };
    const velocity = radius * props.velocity_ratio!;
    const color = props.color === "random" ? getRandomColor() : props.color;

    bubble_arr.push({
      radius: radius,
      position: position,
      velocity: velocity,
      color: color,
    });
  }
  bubble_arr.sort((a, b) => a.radius - b.radius);

  animated_bubbles.value = bubble_arr;
}

let frame_id: number | undefined = undefined;
let previous_time: DOMHighResTimeStamp = 0;

function step(timestamp: DOMHighResTimeStamp) {
  if (!previous_time) previous_time = timestamp;
  const dt = Math.min((timestamp - previous_time) / 1000, 1 / 60);
  previous_time = timestamp;

  animated_bubbles.value.forEach(bubble => {
    move(bubble, dt);
  });
  
  frame_id = requestAnimationFrame(step);
}

function move(bubble: BubbleData, dt: number) {
  const displacement = bubble.velocity * dt;
  bubble.position.y -= displacement;  // move upward (smaller y, closer to top)

  if (bubble.position.y < -(bubble.radius * 2)) {   // if outside of screen, cycle back to the bottom
    bubble.position.y = viewport_height.value + bubble.radius * 2;
    // bubble.position.x = getRandomInt(0 - bubble.radius, viewport_width.value - bubble.radius);
  }
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

  <div class="bubbles-wrapper">
    <Bubble 
      v-for="(bubble, index) in animated_bubbles" 
      :key="index" 
      v-bind="bubble"
    />
  </div>

</template>

<style scoped>

.bubbles-wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  overflow: hidden;
}

</style>