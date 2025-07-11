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
    <div id="hero-left">Welcome, my name is Gavin Torrecampo. I'm a Student Developer! Projects About Contact</div>
    <div id="hero-right">
      <img src="../../assets/minime.png" alt="My profile picture" id="my-profile-picture">
    </div>
  </div>

</template>

<style scoped>

.hero {
  display: flex;
  border-radius: 8px;
  margin-bottom: 32px;

  /* border: solid 2px white; */

  text-align: justify;
}

#hero-left {
  display: inline-block;
  width: 60%;
}
#hero-right {
  display: inline-block;
  width: auto;
}

#my-profile-picture {
  height: 300px;
}

</style>