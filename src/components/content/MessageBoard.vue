<script setup lang="ts">

</script>

<template>

  <form id="message-form">
    <div class="wrapper">
      <!-- Windows 7 Hotmail style -->
      <!-- To: Gavin Torrecampo (cosmetic field, to complete the email look) -->
      <!-- From: Insert name here -->
      <!-- Subject: Insert title here -->
      <!-- text space -->
        <button type="submit" form="message-form">Send</button>
        <button>Cancel</button>
        <div class="wrapper-2">
          <div class="label-wrapper">
            <label for="sender">From:</label>
            <input type="text" id="sender" name="sender">
          </div>
          <div class="label-wrapper">
            <label for="reciever">To:</label>
            <input type="text" id="reciever" name="reciever" value="Gavin Torrecampo" readonly>
          </div>
          <div class="label-wrapper">
            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject">
          </div>
          <div class="content-ribbon">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, aut quo odio nobis et doloribus.</div>
          <div class="content-wrapper">
            <textarea id="content" name="content" rows="5"></textarea>
          </div>
        </div>
    </div>
  </form>

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

button {
  border: none;
  background: none;

  font-family: Freemono, monospace;
  font-size: 16px;
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