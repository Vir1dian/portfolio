<script setup lang="ts">
import { ref, computed } from 'vue';
import { getAssetPath, redirectTo } from '../../utilities/utilities';

interface Props {
  copy_to_clipboard?: boolean;
  link?: string;
  icon?: string;
  title?: string;
};

const props = withDefaults(defineProps<Props>(), {
  copy_to_clipboard: false,
  link: '',
  icon: '',
  title: '',
});

const copied = ref(false);

const icon_path = computed(() => {
  return getAssetPath(props.icon, 'icons');
});

const display_text = computed(() => {
  if (copied.value) return 'Copied to clipboard';
  return props.title || props.link;
});

const text_to_copy = computed(() => {
  return props.link || props.title;
});

async function handleClick() {
  if (props.copy_to_clipboard) {
    if (!text_to_copy.value) return;
    try {
      await navigator.clipboard.writeText(text_to_copy.value);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  } else if (props.link) {
    redirectTo(props.link);
  }
};

</script>

<template>

  <div class="shortcut-wrapper" draggable="true" @click="handleClick">
    <div>
      <img v-if="props.icon && !copied" :src="icon_path" :alt="props.icon" class="icon" draggable="false" />
      <img v-if="copied" :src="getAssetPath('generic_copy.svg', 'icons')" :alt="'clipboard'" class="icon" draggable="false" />
    </div>
    <div v-if="display_text" class="title">{{ display_text }}</div>
  </div>

</template>

<style scoped>

.shortcut-wrapper {
  display: flex;
  flex-direction: column;
  padding: 8px;
  border: solid 1px transparent;
}
.shortcut-wrapper:hover:not(:active) {
  background-color: #005cac1a;
  border: solid 1px #005cac44;
}
.icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
}
.title {
  margin-left: 4px;
  margin-right: 4px;
  font-size: 16px;
  width: 80px;
  max-height: 1lh;
  overflow-wrap: break-word;
}

</style>