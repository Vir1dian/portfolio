<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  
};

const props = withDefaults(defineProps<Props>(), {
  
});


// allow for various hover animations because I want to 
// mode 1: bounce (tilts 15 degrees left and right, grows and shrinks slightly, repeatedly while hovering) (like the terraria menu screen title)
// mode 2: slam (grows like a fist punching you, tilting slightly to the left on hover)
// mode 3: flow (what we first implemented for the nav links, a gradiant that shifts on hover)
// if I really like all of them, separate them into multiple files in a folder called HoverMes for optimization

</script>

<template>

  <div class="hoverable-area">
    <div class="hover-slam" :style="style">
      <slot></slot>
    </div>
  </div>

</template>

<style scoped>



</style>