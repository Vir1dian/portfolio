<script setup lang="ts">
import { computed } from 'vue';
import { SKILLS } from '../../data/content';
import type { LinkItem } from '../../data/content';
import { getAssetPath, redirectTo, getRandomString } from '../../utilities/utilities';

// interface Props {};
// const props = withDefaults(defineProps<Props>(), {});



const search_text = defineModel({ default: '' });
const filtered_skills = computed<{ [key: string]: LinkItem }>(() => {
  if (!search_text.value) {
    return SKILLS;
  }
  const filtered_set: { [key: string]: LinkItem } = {};
  const search_text_lower = search_text.value.toLowerCase();
  Object.keys(SKILLS).forEach(key => {
    const skill_name_lower = SKILLS[key].title?.toLowerCase();
    if (skill_name_lower?.includes(search_text_lower)) filtered_set[key] = SKILLS[key];
  });
  return filtered_set;
});

</script>

<template>

  <div class="wrapper">
    <div id="searchbar-wrapper">
      <img src="../../assets/icons/generic_search.svg" alt="search" class="icon" />
      <span class="full-searchbar-filler">Gavin Torrecampo/About/Technical Skills/</span>
      <span class="half-searchbar-filler">../Technical Skills/</span>
      <span class="mini-searchbar-filler">../</span>
      <input type="text" v-model="search_text" />
    </div>
    <table>
      <thead>
        <tr>
          <th colspan="2">Name</th>
          <th>Link</th>
          <th>Date Modified</th>
          <th>Type</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="skill in filtered_skills" 
          @click="redirectTo(skill.link)"
          :key="skill.title"
        >
          <td class="item-icon">
            <img v-if="skill.icon" :src="getAssetPath(skill.icon, 'icons')" :alt="skill.icon" class="icon" />
            <img v-else :src="getAssetPath('generic_link.svg', 'icons')" :alt="'icon'" class="icon" />
          </td>
          <td class="item-title">{{ skill.title }}</td>
          <td class="item-link">{{ skill.link }}</td>
          <td class="item-filler">{{ getRandomString(13) }}</td>
          <td class="item-filler">{{ getRandomString(6) }}</td>
          <td class="item-filler">{{ getRandomString(6) }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>
@font-face {
  font-family: 'SGA';
  src: url('../../assets/fonts/robotica-sga.otf'); 
}

.wrapper {
  display: block;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 32px;

  background-color: #d7fffa80;
  border: solid 2px #0E6875;

  text-align: justify;
}
#searchbar-wrapper {
  display: inline-flex;
  border-radius: 8px; 
  padding-left: 4px;
  margin-bottom: 8px;

  align-items: center;

  background-color: white;
  border: solid 2px #0E6875;

  font-size: 18px;
}
#searchbar-wrapper input {
  outline: none;
  border: none;

  margin-right: 4px;

  font-family: Freemono, monospace;
  font-size: 18px;
  color: #0E6875;
}
.full-searchbar-filler {
  display: inline;
}
.half-searchbar-filler, .mini-searchbar-filler {
  display: none;
}

table {
  border-collapse: collapse;
}
th {
  color: #c5cec3;
}
th:not(:first-child) {
  border-left: solid 1px #7d8c79;
}
tr:not(thead tr):hover {
  background-color: #95fff380;
  cursor: default;
}
td, th {
  padding: 2px;
  padding-left: 8px;
  padding-right: 8px;
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
.item-filler {
  font-family: SGA;
  font-size: 12px;
  color: #c5cec380;
}
.icon {
  height: 24px;
  display: flex;
}


@media screen and (max-width: 1024px) {
  th:nth-child(3),  /* th is one off due to the first th being colspan=2 */
  td:nth-child(4) {
    display: none;
  }
}
@media screen and (max-width: 864px) {
  .full-searchbar-filler, .mini-searchbar-filler {
    display: none;
  }
  .half-searchbar-filler {
    display: inline;
  }
  th:nth-child(4), th:nth-child(5),  /* th is one off due to the first th being colspan=2 */
  td:nth-child(5), td:nth-child(6) {
    display: none;
  }
}
@media screen and (max-width: 584px) {
  .full-searchbar-filler, .half-searchbar-filler {
    display: none;
  }
  .mini-searchbar-filler {
    display: inline;
  }
  th:nth-child(2),
  td:nth-child(3) {
    display: none;
  }
}

</style>