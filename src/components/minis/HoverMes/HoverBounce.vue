<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  grow_to_multiplier?: number;  // the maximum proportional size that the hoverme grows by
  max_tilt?: number;            // the maximum angle that the hoverme tilts to either side in the bounce, in DEGREES
  frequency?: number;           // the number of times the hoverme bounces to a side in a second
  enable_always?: boolean;      // true: animation will keep running even when hoverme is not hovered
};

const props = withDefaults(defineProps<Props>(), {
  grow_to_multiplier: 1.2,
  max_tilt: 15,
  frequency: 0.5,
  enable_always: false,
});

// hoverme animation 1: bounce (tilts by some angle left and right, grows and shrink back to normal, repeatedly while hovering)
// NOTE: best used on text blocks when they are center aligned!

const style = computed(() => {
  return {
    '--grow-to-multiplier': props.grow_to_multiplier,
    '--right-tilt-angle': `${props.max_tilt}deg`,
    '--left-tilt-angle': `${-props.max_tilt}deg`,
    '--animation-duration': `${props.frequency > 0 ? (1 / props.frequency) : 0}s`,
    // 'transform-origin': 'center bottom',
  };
});

</script>

<template>

  <div class="hoverable-area">
    <div
      class="hover-bounce"
      :class="{ 'always-on': props.enable_always }"
      :style="style"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

.hover-bounce {
  transform: rotate(0deg) scale(1);
  /* transform-origin: center bottom;  */
  transition: transform 0.5s ease-out;
  animation: none;
}

.hoverable-area:hover .hover-bounce:not(.always-on) {
  animation: hoverbounce var(--animation-duration) ease-in-out infinite running;
  cursor: pointer;
}

.hover-bounce.always-on {
  animation: hoverbounce var(--animation-duration) ease-in-out infinite running;
}

@keyframes hoverbounce {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(var(--right-tilt-angle)) scale(var(--grow-to-multiplier));
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(var(--left-tilt-angle)) scale(var(--grow-to-multiplier));
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

</style>