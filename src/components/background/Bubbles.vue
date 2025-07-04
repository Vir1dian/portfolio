<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import type { BubbleData } from './Bubble.vue';
import Bubble from './Bubble.vue';

const COLOR_PALETTE: string[] = ["4AD2A9", "38F9E2", "DA1CE0", "8BD3E3", "9872DF", "304654", "5894BC", "4E7699", "C99EFE"] as const; 

interface Props {
  count?: number;
  min_radius?: number;
  max_radius?: number;
  scroll_velocity_ratio?: number;  // (scroll velocity / radius)
  color?: typeof COLOR_PALETTE[number] | "random";
};

const props = withDefaults(defineProps<Props>(), {
  count: 50,
  min_radius: 25,
  max_radius: 100,
  scroll_velocity_ratio: 0.025,
  color: "random",
});

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  return COLOR_PALETTE[Math.floor(Math.random()*COLOR_PALETTE.length)];
}

const bubbles_wrapper_element = ref<HTMLElement | null>(null);
const wrapper_width = ref(0);
const wrapper_height = ref(0);
const total_scroll_height = ref(0);
const viewport_height = ref(0);

const syncContentDimensions = () => {
  if (bubbles_wrapper_element.value) {
    wrapper_width.value = bubbles_wrapper_element.value.clientWidth;
    wrapper_height.value = bubbles_wrapper_element.value.clientHeight;
  }
  total_scroll_height.value = document.documentElement.scrollHeight;
  viewport_height.value = window.innerHeight;
  // console.log("Wrapper Height: " + wrapper_height.value);
  // console.log("Total Document Scroll Height:", total_scroll_height.value);
  // console.log("Viewport Height:", viewport_height.value);
};
onMounted(() => {
  syncContentDimensions();
  window.addEventListener('resize', syncContentDimensions);
});
onUnmounted(() => {
  window.removeEventListener('resize', syncContentDimensions);
});

const effective_scroll_height = computed(() => {
  return Math.max(0, total_scroll_height.value - viewport_height.value);
});

const all_bubbles = computed<BubbleData[]>(() => {
  const bubble_arr: BubbleData[] = [];
  for (let i = 0; i < props.count; i++) {
    const radius = getRandomInt(props.min_radius, props.max_radius);
    const color = props.color === "random" ? getRandomColor() : props.color;
    const vel = radius * props.scroll_velocity_ratio!;
    const adjusted_wrapper_height = (1 + 0.5 * vel) * wrapper_height.value;

    bubble_arr.push({
      radius: radius,
      position: {   // (s - radius) for cosmetic purposes, just to allow bubbles to clip at most halfway into the edges
        x: getRandomInt(0 - radius, wrapper_width.value), 
        y: getRandomInt(0 - radius, adjusted_wrapper_height - radius)
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
      :animation_scroll_height="effective_scroll_height"
    />
  </div>

</template>

<style scoped>

.bubbles-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>