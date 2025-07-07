<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  color: string;
};

const props = withDefaults(defineProps<Props>(), {
  color: '',
});

const herobg_style = computed(() => {
  return {
    backgroundColor: `#${props.color}`,
  };
});

</script>

<template>

  <div class="hero-background" :style="herobg_style">
    
  </div>

</template>

<style scoped>



</style>