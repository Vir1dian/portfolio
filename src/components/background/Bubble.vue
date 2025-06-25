<script setup lang="ts">
import { computed } from 'vue';

interface BubbleData {
  radius: number;
  position: { x: number, y: number};
  scroll_velocity: number;
  color: string;
};

const props = defineProps<BubbleData>();

const bubble_style = computed(() => { // Now a computed property!
  return {
    borderRadius: '50%',
    width: `${props.radius * 2}px`,
    height: `${props.radius * 2}px`,
    left: `${props.position.x}px`,
    top: `${props.position.y}px`,
    backgroundColor: `#${props.color}`,
    '--bubble-scroll-velocity': props.scroll_velocity, 
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
  opacity: 0.2;

  /* animation: bubble-float linear;
  animation-timeline: scroll(root); */
}

@keyframes bubble-float {
  /* I don't necessarily want a start and end destination for a bubble, just that it moves in some proportion to how much I scroll */
}
</style>