<script setup lang="ts">
const COLOR_PALETTE: string[] = ["4AD2A9", "38F9E2", "DA1CE0", "DBF1F4", "A9DAE5", "9872DF", "304654", "5894BC", "4E7699", "C99EFE"] as const;

interface Props {
  width?: number;
  include_edges?: boolean;
  color?: typeof COLOR_PALETTE[number];
  type?: "lines" | "dots";
};

const props = withDefaults(defineProps<Props>(), {
  width: 50,
  include_edges: false,
  color: "304654",
  type: "dots",
});

</script>

<template>

  <!-- initial debug element -->
  <div>
    <p>Cosmetic Grid</p>
    <p v-for="(prop, key) in props">{{ key }} : {{ prop }}</p>
  </div>

</template>

<style scoped>
/* 
Background components, e.g. Bubbles, CosmeticGrid, Waves (stolen from parent App.vue)
.background > * {  <-- rename background > * to whatever the div for this background component will be
  position: relative;  (had to remove from App.vue because this styling conflicts with Bubble's unique dynamic behavior)
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
} */
</style>