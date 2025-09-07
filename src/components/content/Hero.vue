<script setup lang="ts">
import { computed } from 'vue';
import HoverBounce from '../minis/HoverMes/HoverBounce.vue';
import type { SectionLink } from './HeroLinks.vue';
import HeroLinks from './HeroLinks.vue';
import { getAssetPath } from '../../utilities/utilities';

interface Props {
  height: string;  // control over height type (i.e. px, vh, etc.)
  offset_top: number;
  sections: SectionLink[];
};

const props = withDefaults(defineProps<Props>(), {
  height: '100vh',
  offset_top: 0,
  sections: () => [],
});

const PADDING_SIZE: number = 16;

const hero_style = computed(() => {
  return {
    height: `calc(${props.height} - ${props.offset_top}px - ${PADDING_SIZE * 3}px)`,
    padding: `${PADDING_SIZE}px`,
  };
});

</script>

<template>

  <div class="hero" :style="hero_style">
    <div class="hero-left">
      <div class="hero-text">
        Hello, my name is Gavin Torrecampo. I'm a Software Engineer!
      </div>
      <div class="hero-moretext">
        <HeroLinks :sections="props.sections" />
      </div>
    </div>
    <div class="hero-right">
      <HoverBounce :grow_to_multiplier="1.1" :max_tilt="5" :frequency="0.25" :enable_always="true">
        <img :src="getAssetPath('minime.png')" alt="My profile picture" class="my-profile-picture">
      </HoverBounce>
    </div>
  </div>

</template>

<style scoped>

.hero {
  display: flex;
  border-radius: 8px;
  margin-bottom: 64px;

  /* border: solid 2px white; */

  justify-content: space-between;
}

.hero-left {
  display: inline-flex;
  width: 60%;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;

  padding: 24px;
}
.hero-text {
  display: block;

  font-size: 40px;
  text-align: justify;
}
.hero-moretext {
  margin-top: 48px;
  font-size: 40px;
}

.hero-right {
  display: inline-flex;
  width: auto;
  height: auto;
  align-items: center;
  justify-content: center;
}
.my-profile-picture {
  height: 300px;
  border-radius: 20%;
}

</style>