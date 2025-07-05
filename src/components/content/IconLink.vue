<script setup lang="ts">

interface Props {
  link?: string;
  icon?: string;
  tooltip_text?: string;
  color?: string;
};

const props = withDefaults(defineProps<Props>(), {
  
});

</script>

<template>

  <!-- initial debug element -->
  <div>
    <p>IconLink</p>
    <p v-for="(prop, key) in props">{{ key }} : {{ prop }}</p>
  </div>

</template>

<style scoped>



</style>