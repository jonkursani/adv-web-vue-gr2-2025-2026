<!-- SFC - Single File Component -->

<!-- script logic - JS -->
<script setup>
import { computed, reactive, ref } from 'vue';

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

// Reactivity (ref, reactive)
// pranon tipe primitive dhe reference
// arrays, objects
const count = ref(0) // { value: 0 }

// console.log(count.value)

function increment(num = 1) {
  // count.value = count.value + 1;
  console.log(count);
  console.log(count.value);
  // count.value++;
  count.value += num
}

const userRef = ref({ // { value: { name: "John", age: 30 } }
  name: "John",
  age: 30
})

// userRef.value.name = "Jane";

// Reactive nuk pranon tipe primitive, vetem reference
// const isActive = reactive(false) // Error
const user = reactive({
  name: "Jane",
  age: 30
})

// user.name = "John";
const state = reactive({
  count: 0
})

function decrement() {
  state.count--;
}

// Computed properties - functions that return a value based on reactive data and are cached until their dependencies change
const author = reactive({
  name: "John Doe",
  books: [
    { title: "Book 1", year: 2020 },
    { title: "Book 2", year: 2021 },
    { title: "Book 3", year: 2022 }
  ] 
})

const hasPublishedBooks = computed(() => {
  return author.books.length > 0 ? 'has published books' : 'has not published books'
})

const fullName = computed(() => {
  return `${user.name} Doe`;
})
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

  <!-- Reactivity -->
  <button @click="count--">-</button>
  <button @click="count-=5">-5</button>
  <p>Count: {{ count }}</p>
  <button @click="increment(1)">+</button>
  <button @click="increment(10)">+10</button>

  <!-- ne template nuk i referohemi me userRef.value -->
  <p>User name: {{  userRef.name }}</p>
  <p>User name reactive: {{  user.name }}</p>

  <button @click="decrement">-</button>
  <p>Count reactive: {{ state.count }}</p>
  <button @click="state.count++">+</button>

  <!-- Computed properties -->
  <p>
    Author: {{ author.name }}
    <!-- {{ author.books.length > 0 ? 'has published books' : 'has not published books' }} -->
    <!-- {{ hasPublishedBooks() }} error because hasPublishedBooks is not a function -->
    {{ hasPublishedBooks }}
    {{ author.books.length }}
  </p>

  <p>Full name: {{ fullName }}</p>
</template>

<!-- styles - CSS -->
<!-- scoped - css applied only to this component -->
<style scoped></style>