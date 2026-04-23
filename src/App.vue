<!-- SFC - Single File Component -->

<!-- script logic - JS -->
<script setup>
import { ref } from 'vue';

// const heading = document.getElementById("heading");
// heading.innerHTML = "You did it!";
const message = ref("You did it!"); // { value: "You did it!" }
const url = ref("https://cacttus.education/"); // { value: "https://cacttus.education/" }
const isBtnDisabled = ref(true); // { value: true }
const id = ref(2) // { value: 2 }

function reverseMessage() {
  console.log(message); // { value: "You did it!" }
  console.log(message.value); // "You did it!"
  return message.value.split('').reverse().join('');
}

const getId = () => {
  return `emp-${id.value}`;
}

// Directives - v-
const seen = ref(true)

function toggleSeen() {
  seen.value = !seen.value;
}

function onSubmit() {
  // event.preventDefault()
  alert("Form submitted!");
}

const name = ref("");
function onInput(event) {
  // event.target - refers to the input element
  // if (event.key === "Enter") {}
  name.value = event.target.value
}
</script>

<!-- template - HTML -->
<template>
  <!-- Template syntax {{  }} -->
  <!-- <h1>You did it!</h1> -->
  <!-- <h1 th:text="message"></h1> -->
  <!-- <h1 id="heading">{{ message }}</h1> -->
  <h1>{{ message }}</h1>

  <!-- 
    Attribute bindings 
    v-bind or v-bind:href="url" or :href="url"
  -->
  <p>
    Visit <a :href="url" target="_blank" rel="noopener">Cacttus Education</a> to read more
  </p>

  <button :disabled="isBtnDisabled">Button</button>

  <!-- JavaScript expressions {{  }} -->
  <p>{{ 1 + 1 }}</p>
  <p>{{ "Hello " + "World" }}</p>
  <p>{{ message.split('').reverse().join('') }}</p>
  <p>{{ isBtnDisabled ? 'Button is disabled' : 'Button is enabled' }}</p>
  <!-- <p :id="'emp-' + id"></p> -->
  <!-- <p :id="`emp-${id}`">Employee #{{ id }}</p> -->
  <!-- Ne template nuk i referohemi me id.value vetem ne script -->
  <p :id="getId()">Employee #{{ id }}</p>
  <p>{{ reverseMessage() }}</p>

  <!-- 
    Directives v-
    v-bind or : - for attribute bindings
    v-on or @ - for event listeners
    v-if, v-else-if, v-else - for conditional rendering
    v-for - for list rendering
  -->
  <p v-if="seen">Now you see me</p>
  <p v-else>Now you don't see me</p>

  <!-- <button v-on:click="">Show text</button> -->
  <!-- <button @click="seen = !seen">{{ seen ? 'Hide' : 'Show' }} text</button> -->
  <button @click="toggleSeen">{{ seen ? 'Hide' : 'Show' }} text</button>

  <!-- Events modifiers .stop, .prevent, .enter -->

  <div>
    <form @submit.prevent="onSubmit">
      <p>Sample form</p>
      <button>Submit</button>
    </form>
  </div>

  <input type="text" placeholder="Enter your name..." @keyup.enter="onInput">
  <p>Name: {{ name }}</p>
</template>

<!-- styles - CSS -->
<!-- scoped - css applied only to this component -->
<style scoped></style>