<script setup lang="ts">

interface Props {
  id: string,
  title?: string;
  icon?: string;
  icon_pos?: 'prepend' | 'append';
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  icon: '',
  icon_pos: 'prepend',
});

</script>

<template>

  <!-- initial debug element -->
  <div :id="`section-header-id-${props.id}`" class="section-header">
    <span v-if="props.icon_pos === 'prepend'">{{ props.icon }}</span>
    <span>{{ props.title }}</span>
    <span v-if="props.icon_pos === 'append'">{{ props.icon }}</span>
  </div>

</template>

<style scoped>

.section-header {
  font-size: 32px;
  text-align: justify;
  scroll-margin-top: 64px;
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>