<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { addAnimationCallback, removeAnimationCallback } from '../../utilities/animation';
import type { BubbleData } from '../minis/Bubble.vue';
import Bubble from '../minis/Bubble.vue';

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
  velocity_ratio: 0.5,
  velocity_scroll_multiplier: 10,  // 1: does not affect the base speed when scrolling, >1: speeds up in the same direction, <1 slows down, <0: speeds up in the opposite direction
  color: "random",
});

onMounted(() => {
  syncContentDimensions();

  window.addEventListener('resize', syncContentDimensions);
  window.addEventListener('scroll', handleScroll);

  addAnimationCallback(animateBubbles);
});
onUnmounted(() => {
  removeAnimationCallback(animateBubbles);

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

interface BubbleDataWithVelocity extends BubbleData {
  velocity: number;  // base speed of bubble when not scrolling
}
const animated_bubbles = ref<BubbleDataWithVelocity[]>([]);
function generateBubbles() {
  const bubble_arr: BubbleDataWithVelocity[] = [];
  for (let i = 0; i < props.count; i++) {
    const radius = getRandomInt(props.min_radius, props.max_radius);
    const position = {
      x: getRandomInt(0, viewport_width.value), // bubbles may clip up to half into left or right walls of the page
      y: getRandomInt(0, viewport_height.value)
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
// to be used within animateBubbles()
function move(bubble: BubbleDataWithVelocity, dt: number, multiplier: number) {
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

// BUBBLE SCROLL ANIMATION (SCROLLING)
const curr_scroll_y = ref(0);
let prev_scroll_y = 0;
const velocity_multiplier = ref(1);

const SCROLL_ACCELERATION = 0.1;

function handleScroll() {
  curr_scroll_y.value = window.scrollY;
};

// to be used within animateBubbles()
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

function animateBubbles(dt: number) {
  setVelocityMultiplier();

  animated_bubbles.value.forEach(bubble => {
    move(bubble, dt, velocity_multiplier.value);
  });
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