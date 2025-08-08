<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  link?: string;
  icon?: string;
  title?: string;
  tooltip_text?: string;
  color?: string;
};

const props = withDefaults(defineProps<Props>(), {
  link: '',
  icon: '',
  title: '',
  tooltip_text: '',
  color: '304654',
});

const icon_path = computed(() => {
  return new URL(`../../assets/icons/${props.icon}`, import.meta.url).href;
});

const wrapper_style = computed(() => {
  return {
    color: `#${props.color}`,
    border: `solid 2px #${props.color}`,
  };
})

</script>

<template>

  <!-- initial debug element -->
  <div class="icon-wrapper" :style="wrapper_style">
    <img v-if="props.icon" :src="icon_path" :alt="props.icon" class="icon"></img>
    <div v-if="props.title" class="icon-title">{{ props.title }}</div>
  </div>

</template>

<style scoped>

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 18px;
  min-height: 22px;
  min-width: 22px;
  width: min-content;
}
.icon {
  height: 18px;
}
.icon-title {
  margin-left: 4px;
  margin-right: 4px;
  font-size: 18px;
}

</style>