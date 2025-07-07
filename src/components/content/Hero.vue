<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  offset_top: number;
};

const props = withDefaults(defineProps<Props>(), {
  offset_top: 0,
});

const PADDING_SIZE: number = 16;

const hero_style = computed(() => {
  return {
    height: `calc(100vh - ${props.offset_top}px - ${PADDING_SIZE * 3}px)`,
    padding: `${PADDING_SIZE}px`,
  };
});

</script>

<template>

  <div class="hero" :style="hero_style">
    This is the hero
  </div>

</template>

<style scoped>

.hero {
  display: block;
  border-radius: 8px;
  margin-bottom: 32px;

  /* border: solid 2px white; */

  text-align: justify;
}

</style>