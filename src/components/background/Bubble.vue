<script setup lang="ts">
import { computed } from 'vue';

interface BubbleData {
  radius: number;
  position: { x: number, y: number};
  velocity: number;  // base speed of bubble when not scrolling
  color: string;
};

const props = defineProps<BubbleData>();

const bubble_style = computed(() => {
  return {
    borderRadius: '50%',
    width: `${props.radius * 2}px`,
    height: `${props.radius * 2}px`,
    left: `${props.position.x}px`,
    top: `${props.position.y}px`,
    backgroundColor: `#${props.color}`,
  };
});

export type { BubbleData };

</script>

<template>

  <div class="bubble" :style="bubble_style"></div>

</template>

<style scoped>

.bubble {
  position: absolute;
  pointer-events: none;
  opacity: 1;
}

</style>