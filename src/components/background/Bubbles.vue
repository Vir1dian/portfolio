<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import type { BubbleData } from './Bubble.vue';
import Bubble from './Bubble.vue';

const COLOR_PALETTE: string[] = ["4AD2A9", "38F9E2", "DA1CE0", "DBF1F4", "A9DAE5", "9872DF", "304654", "5894BC", "4E7699", "C99EFE"] as const; 

interface Props {
  count?: number;
  min_radius?: number;
  max_radius?: number;
  scroll_velocity_ratio?: number;  // (scroll velocity / radius)
  color?: typeof COLOR_PALETTE[number] | "random";
};

const props = withDefaults(defineProps<Props>(), {
  count: 100,
  min_radius: 25,
  max_radius: 100,
  velocity_ratio: 1,
  color: "random",
});

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  return COLOR_PALETTE[Math.floor(Math.random()*COLOR_PALETTE.length)];
}

const bubbles_wrapper_element = ref<HTMLElement | null>(null);
const max_y = ref(900);
const updateMaxYPosition = () => {
  if (bubbles_wrapper_element.value) {
    max_y.value = bubbles_wrapper_element.value.clientHeight;
    console.log("updateMaxYPosition " + max_y.value)
  }
};
onMounted(() => {
  updateMaxYPosition();
  window.addEventListener('resize', updateMaxYPosition);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateMaxYPosition);
});


const all_bubbles = computed<BubbleData[]>(() => {
  const bubble_arr: BubbleData[] = [];
  for (let i = 0; i < props.count; i++) {
    const radius = getRandomInt(props.min_radius, props.max_radius);
    const color = props.color === "random" ? getRandomColor() : props.color;
    const vel = radius * props.scroll_velocity_ratio!;

    bubble_arr.push({
      radius: radius,
      position: {   // (s - radius) for cosmetic purposes, just to allow bubbles to clip at most halfway into the edges
        x: getRandomInt(0 - radius, 1600 - radius), 
        y: getRandomInt(0 - radius, max_y.value - radius)
      },
      scroll_velocity: vel,
      color: color,
    });
  }
  return bubble_arr;
});

</script>

<template>

  <div class="bubbles-wrapper" ref="bubbles_wrapper_element">
    <Bubble 
      v-for="(bubble, index) in all_bubbles" 
      :key="index" 
      v-bind="bubble"
    />
  </div>

</template>

<style scoped>

.bubbles-wrapper {
  position: relative;
  width: 100%;
  height: 100%;   /* Inherits the background height */
  overflow: hidden;
}

</style>