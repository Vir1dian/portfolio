<script setup lang="ts">
const COLOR_PALETTE: string[] = ["4AD2A9", "38F9E2", "DA1CE0", "DBF1F4", "8BD3E3", "9872DF", "304654", "5894BC", "4E7699", "C99EFE"] as const; 

interface Props {
  height?: number;
  crest_count?: number;
  is_symmetrical?: boolean;
  is_inverted?: boolean;
  color?: typeof COLOR_PALETTE[number];
};

const props = withDefaults(defineProps<Props>(), {
  height: 25,
  crest_count: 1,
  is_symmetrical: false,
  is_inverted: false,
  color: "A9DAE5",
});

</script>

<template>

  <!-- initial debug element -->
  <div>
    <!-- IF NOT SOME FORMULA, THEN SOME IMAGES OF A WAVE SHAPE TO BE REUSED -->
    <p>Waves</p>
    <p v-for="(prop, key) in props">{{ key }} : {{ prop }}</p>
  </div>

</template>

<style scoped>



</style>