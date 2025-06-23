<script setup lang="ts">
const COLOR_PALETTE: string[] = ["4AD2A9", "38F9E2", "DA1CE0", "DBF1F4", "A9DAE5", "9872DF", "304654", "5894BC", "4E7699", "C99EFE"] as const; 

interface Props {
  min_radius?: number;
  max_radius?: number;
  color?: typeof COLOR_PALETTE[number] | "random";
  velocity_ratio?: number;
};

const props = withDefaults(defineProps<Props>(), {
  min_radius: 25,
  max_radius: 100,
  color: "random",
  velocity_ratio: 1,
});

if (props.color === "random") {
  const color = COLOR_PALETTE[Math.floor(Math.random()*COLOR_PALETTE.length)];
  console.warn(color);
}

</script>

<template>

  <!-- initial debug element -->
  <div>
    <p>Bubbles</p>
    <p v-for="(prop, key) in props">{{ key }} : {{ prop }}</p>
  </div>

</template>

<style>



</style>