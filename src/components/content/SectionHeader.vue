<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id: string,
  title?: string;
  hierarchy?: 1 | 2 | 3;
  icon?: string;
  icon_pos?: 'prepend' | 'append';
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  hierarchy: 1,
  icon: '',
  icon_pos: 'prepend',
});

const icon_path = computed(() => {
  return new URL(`../../assets/icons/${props.icon}`, import.meta.url).href;
});

</script>

<template>

  <div :id="`section-header-id-${props.id}`" :class="`section-header heirarchy-${props.hierarchy}`">
    <span class="heirarchy-indicator">{{ '\u2217'.repeat(props.hierarchy) }}</span>
    <img v-if="props.icon && props.icon_pos === 'prepend'" :src="icon_path" :alt="props.icon" class="icon" />
    <span>{{ props.title }}</span>
    <img v-if="props.icon && props.icon_pos === 'append'" :src="icon_path" :alt="props.icon" class="icon" />
  </div>

</template>

<style scoped>

.section-header {
  position: relative;
  text-align: justify;
  scroll-margin-top: 64px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.heirarchy-1 {
  font-size: 40px;
  border-bottom: dotted 2px #304654;
}
.heirarchy-2 {
  font-size: 32px;
  font-weight: bold;
}
.heirarchy-3 {
  font-size: 24px;
}

.heirarchy-indicator {
  position: absolute;
  transform: translate(-100%, -50%);
  top: 50%;
  left: -8px;

  font-size: 40px;
  font-weight: bold;
  text-align: center;
}

</style>