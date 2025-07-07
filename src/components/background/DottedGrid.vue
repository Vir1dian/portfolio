<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  radius?: number;
  width?: number;
  height?: number;
  color?: string;
};

const props = withDefaults(defineProps<Props>(), {
  radius: 2,
  width: 50,
  height: 50,
  color: "C99EFE",
});

const grid_style = computed(() => {
  return {
    backgroundImage: `radial-gradient(circle at ${props.radius * 2}px ${props.radius * 2}px, #${props.color} ${props.radius}px, transparent 0)`,
    backgroundSize: `${props.width}px ${props.height}px`,
  };
});

</script>

<template>

  <!-- initial debug element -->
  <div class="cosmetic-grid-wrapper" :style="grid_style">
  </div>

</template>

<style scoped>

.cosmetic-grid-wrapper {  
  width: 100%;
  height: 100%
}
</style>