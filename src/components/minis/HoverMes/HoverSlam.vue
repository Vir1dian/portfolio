<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  grow_to_multiplier?: number;  // the maximum proportional size that the hoverme grows by
  max_tilt?: number;            // the maximum angle that the hoverme tilts to either side in the bounce, in DEGREES
  speed?: number;               // how many seconds it takes for the slam animation to finish
};

const props = withDefaults(defineProps<Props>(), {
  grow_to_multiplier: 1.2,
  max_tilt: 10,
  speed: 0.05,
});

// hoverme animation 2: bounce (grows like a fist suddenly punching you, tilting slightly to the left on hover)

const style = computed(() => {
  return {
    '--grow-to-multiplier': props.grow_to_multiplier,
    '--tilt-angle': `${-props.max_tilt}deg`,
    '--animation-duration': `${props.speed}s`,
  };
});

</script>

<template>

  <div class="hoverable-area">
    <div class="hover-slam" :style="style">
      <slot></slot>
    </div>
  </div>

</template>

<style scoped>

.hover-slam {
  transform: rotate(0deg) scale(1);
  transition: transform 0.5s ease-out;
  animation: none;
}

.hoverable-area:hover .hover-slam {
  animation: hoverslam var(--animation-duration) cubic-bezier(.34,.18,1,.54) forwards;
  cursor: pointer;
}

@keyframes hoverslam {
  to {
    transform: rotate(var(--tilt-angle)) scale(var(--grow-to-multiplier));
  }
}

</style>