<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { BubbleData } from './Bubble.vue';
import Bubble from './Bubble.vue';

const COLOR_PALETTE: string[] = ["f1fffd", "befff7", "95fff2", "6affed"] as const; 
// see https://www.color-hex.com/color-palette/13978

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
  velocity_scroll_multiplier: 10,  // 1: does not affect the base speed when scrolling, >1: speeds up when scrolling, <1: slows down when scrolling
  color: "random",
});

onMounted(() => {
  syncContentDimensions();

  window.addEventListener('resize', syncContentDimensions);
  window.addEventListener('scroll', handleScroll);
  startAnimation();
});
onUnmounted(() => {
  stopAnimation();
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', syncContentDimensions);
});


// BUBBLE GENERATION
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
    const velocity = (radius ** 1.3) * props.velocity_ratio!;
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


// BUBBLE BASE ANIMATION (NOT SCROLLING)
let frame_id: number | undefined = undefined;
let previous_time: DOMHighResTimeStamp = 0;

function step(timestamp: DOMHighResTimeStamp) {

  if (!previous_time) previous_time = timestamp;
  const dt = Math.min((timestamp - previous_time) / 1000, 1 / 60);
  previous_time = timestamp;

  setVelocityMultiplier();

  animated_bubbles.value.forEach(bubble => {
    move(bubble, dt, velocity_multiplier.value);
  });
  
  frame_id = requestAnimationFrame(step);
}

function move(bubble: BubbleData, dt: number, multiplier: number) {
  const displacement = bubble.velocity * multiplier * dt;
  bubble.position.y -= displacement;  // move upward (smaller y, closer to top)

  if (bubble.position.y < -(bubble.radius * 2)) {   // if outside of screen, cycle back to the bottom
    bubble.position.y = viewport_height.value + bubble.radius * 2;
    bubble.position.x = getRandomInt(0 - bubble.radius, viewport_width.value - bubble.radius);
  }
  else if (bubble.position.y > viewport_height.value + (bubble.radius * 2)) {   // if outside of screen, cycle back to the bottom
    bubble.position.y = -(bubble.radius * 2);
    bubble.position.x = getRandomInt(0 - bubble.radius, viewport_width.value - bubble.radius);
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


// BUBBLE SCROLL ANIMATION (SCROLLING)
const curr_scroll_y = ref(0);
let prev_scroll_y = 0;
const velocity_multiplier = ref(1);

const SCROLL_ACCELERATION = 0.1;

function handleScroll() {
  curr_scroll_y.value = window.scrollY;
};

// to be used within step()
function setVelocityMultiplier() {
  const scroll_delta = curr_scroll_y.value - prev_scroll_y;
  prev_scroll_y = curr_scroll_y.value; // Update previous for next frame request

  if (scroll_delta > 0) {  // scrolling down, approach + velocity_scroll_multiplier
    velocity_multiplier.value = Math.min(
      velocity_multiplier.value + SCROLL_ACCELERATION, 
      props.velocity_scroll_multiplier
    )
  } else if (scroll_delta < 0) {  // scrolling up, approach - velocity_scroll_multiplier
    velocity_multiplier.value = Math.max(
      velocity_multiplier.value - SCROLL_ACCELERATION, 
      -props.velocity_scroll_multiplier
    )
  } else {  // not scrolling, gradually return back to 1 (multiplier to maintain base speed)
    if (velocity_multiplier.value > 1) {
      velocity_multiplier.value = Math.max(
        velocity_multiplier.value - SCROLL_ACCELERATION, 
        1
      )
    } else if (velocity_multiplier.value < 1) {
      velocity_multiplier.value = Math.min(
        velocity_multiplier.value + SCROLL_ACCELERATION, 
        1
      )
    }
  }
}

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