<script setup lang="ts">
import { ref } from 'vue';
// interface Props {};
// const props = withDefaults(defineProps<Props>(), {});

const sender = ref('');
const subject = ref('');
const content = ref('');

function emptyFields() {
  sender.value = '';
  subject.value = '';
  content.value = '';
}

async function handleSubmit(event: Event) {
  const form_data = new FormData(event.target as HTMLFormElement);
  try {
    const response = await fetch('https://formspree.io/f/mnnblyzy', {
      method: 'POST',
      body: form_data,
      headers: {
        'Accept': 'application/json' // Formspree needs this to reply with JSON
      }
    });
    if (response.ok) {
      emptyFields();
    } else {
      console.error('Submission error.');
    }
  } catch (error) {
    console.error('Submission error:', error);
  }
}

</script>

<template>

  <form 
    id="message-form"
    @submit.prevent="handleSubmit"
  >
    <div class="wrapper">
        <button type="submit" form="message-form">Send</button>
        <!-- <button>Save Draft</button> Idea: Save drafts using local storage -->
        <button type="button" @click="emptyFields">Cancel</button>
        <div class="wrapper-2">
          <div class="label-wrapper">
            <label for="sender">From:</label>
            <input type="text" id="sender" name="sender" v-model="sender" required>
          </div>
          <div class="label-wrapper">
            <!-- Cosmetic field to complete the email look -->
            <label for="reciever">To:</label>
            <input type="text" id="reciever" value="Gavin Torrecampo" readonly>
          </div>
          <div class="label-wrapper">
            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" v-model="subject" required>
          </div>
          <!-- Cosmetic element to imitate text editor ribbon -->
          <div class="content-ribbon">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
          <div class="content-wrapper">
            <textarea id="content" name="content" rows="5" v-model="content" required></textarea>
          </div>
        </div>
    </div>
  </form>

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

button {
  border: none;
  border-bottom: solid 2px transparent;
  background: none;
  margin-right: 8px;

  font-family: Freemono, monospace;
  font-size: 16px;
}
button:hover {
  cursor: pointer;
  border-bottom: solid 2px #0E6875;
  /* background-color: #6affed; */
}

.wrapper-2 {
  border: solid 2px #0E6875;
  background-color: #d7fffa;
  padding: 4px;
  margin-top: 8px;
}
.label-wrapper {
  display: flex;
  margin-bottom: 4px;
  align-items: center;
}
label {
  display: inline-block;
  width: 100px;
  text-align: right;

  border: solid 1px #0E6875;
  background-color: #6affed;
  padding: 4px;

  margin-right: 4px;
}
input {
  flex-grow: 1;
  padding: 4px;
  padding-left: 12px;

  font-family: Freemono, monospace;
  font-size: 16px;
  color: #242424;
}

.content-ribbon {
  margin-top: 12px;
  border: solid 1px #0E6875;
  background-color: #befff7;
  padding: 4px;
  padding-left: 12px;

  font-family: SGA;
}
.content-wrapper {
  display: flex;
}
textarea {
  flex-grow: 1;
  resize: none;

  padding: 4px;

  font-family: Freemono, monospace;
  font-size: 16px;
  color: #242424;
}

</style>