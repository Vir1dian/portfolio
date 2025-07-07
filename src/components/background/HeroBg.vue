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
.hero-background {  
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;

  border-bottom: solid 2px #0E6875;
}
</style>