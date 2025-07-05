<script setup lang="ts">

interface Props {
  content?: string;
  icon?: string;
  icon_pos?: 'prepend' | 'append';
};

const props = withDefaults(defineProps<Props>(), {
  content: '',
  icon: '',
  icon_pos: 'prepend',
});

</script>

<template>

  <!-- initial debug element -->
  <div class="section-header">
    <span v-if="props.icon_pos === 'prepend'">{{ props.icon }}</span>
    <span>{{ props.content }}</span>
    <span v-if="props.icon_pos === 'append'">{{ props.icon }}</span>
  </div>

</template>

<style scoped>

.section-header {
  font-size: 32px;
  text-align: justify;
}

</style>