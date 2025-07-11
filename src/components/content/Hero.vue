<script setup lang="ts">
import { computed } from 'vue';
import HoverBounce from '../minis/HoverMes/HoverBounce.vue';
import HoverSlam from '../minis/HoverMes/HoverSlam.vue';

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
    <div id="hero-left">
      Welcome, my name is Gavin Torrecampo. I'm a Student Developer!
      <div style="display: inline-flex;">
        <HoverSlam>
          <span>Projects</span>
        </HoverSlam>
      </div>
      <HoverSlam>
        <span>About</span>
      </HoverSlam>
      <HoverSlam>
        <span>Contact</span>
      </HoverSlam>
    </div>
    <div id="hero-right">
      <HoverBounce :grow_to_multiplier="1.1" :max_tilt="5" :frequency="0.25" :enable_always="true">
        <img src="../../assets/minime.png" alt="My profile picture" id="my-profile-picture">
      </HoverBounce>
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
  display: inline-flex;
  width: auto;
  height: auto;
  align-items: center;
  justify-content: center;
}

#my-profile-picture {
  height: 300px;
  border-radius: 50%;
}

</style>