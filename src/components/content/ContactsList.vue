<script setup lang="ts">
import Shortcut from '../minis/Shortcut.vue';
import { CONTACTS } from '../../data/content';

// interface Props {};
// const props = withDefaults(defineProps<Props>(), {});

</script>

<template>

  <div class="wrapper">
    <Shortcut 
      v-for="contact in CONTACTS" 
      :key="contact.title"
      v-bind="contact"
    />
  </div>

</template>

<style scoped>

.wrapper {
  display: flex;
  margin-bottom: 32px;
}

</style>