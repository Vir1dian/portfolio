<script setup lang="ts">
import { SKILLS } from '../../data/content';

// interface Props {};
// const props = withDefaults(defineProps<Props>(), {});

function getIconPath(name: string) {
  return new URL(`../../assets/icons/${name}`, import.meta.url).href;
};

function redirectTo(link: string | undefined) {
  if (link) window.open(link, '_blank');
}

</script>

<template>

  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th colspan="2">Name</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="skill in SKILLS" 
          @click="redirectTo(skill.link)"
          :key="skill.title"
        >
          <td class="item-icon">
            <img v-if="skill.icon" :src="getIconPath(skill.icon)" :alt="skill.icon" class="icon" />
            <img v-else :src="getIconPath('generic_link.svg')" :alt="'icon'" class="icon" />
          </td>
          <td class="item-title">{{ skill.title }}</td>
          <td class="item-link">{{ skill.link }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>

.wrapper {
  display: block;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 32px;

  background-color: #d7fffa80;
  border: solid 2px #0E6875;

  text-align: justify;
}
table {
  border-collapse: collapse;
}
th {
  color: #7d8c79;
}
th:not(:first-child) {
  border-left: solid 1px #7d8c79;
}
tr:not(thead tr):hover {
  background-color: #95fff2;
  cursor: default;
}
td, th {
  padding: 2px;
  padding-left: 8px;
  vertical-align: middle;
}
.item-icon {
  justify-items: center;
}
.item-title {
  padding-right: 16px;
}
.item-link {
  font-weight: lighter;
  font-family: monospace;
  color: #7d8c79;
}
.icon {
  height: 24px;
  display: flex;
}

</style>