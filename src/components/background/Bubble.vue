<script setup lang="ts">
import { computed } from 'vue';

interface BubbleData {
  radius: number;
  position: { x: number, y: number};
  scroll_velocity: number;  // used for the parallax effect
  color: string;
};
interface Props extends BubbleData {
  animation_scroll_height: number;
}

const props = defineProps<Props>();

const bubble_style = computed(() => {
  return {
    borderRadius: '50%',
    width: `${props.radius * 2}px`,
    height: `${props.radius * 2}px`,
    left: `${props.position.x}px`,
    top: `${props.position.y}px`,
    backgroundColor: `#${props.color}`,
    '--bubble-parallax-multiplier': props.scroll_velocity, 
    '--animation-scroll-distance-px': `${props.animation_scroll_height}px`, 
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

  animation: bubble-float linear;
  animation-timeline: scroll(root);
}

@keyframes bubble-float {
  from {
    transform: translate(-50%, -50%);
  }
  to {
    transform: translate(
      -50%, 
      calc(-50% + (var(--bubble-parallax-multiplier) * var(--animation-scroll-distance-px) * -1))
    );
  }
}
</style>