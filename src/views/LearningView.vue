<!-- SFC - Single File Component -->

<!-- script logic - JS -->
<script setup>
import { computed, reactive, ref } from 'vue';
import Detyra1 from './Detyra1.vue';
import MyComponent from './MyComponent.vue';
import UserForm from './UserForm.vue';

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
function onType(event) {
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

// Class binding
const isActive = ref(true) // { value: true }
const hasError = ref(false) // { value: false }
const classObject = reactive({
  active: false,
  'text-danger': true
})

const completed = ref(true)
const classObjComputed = computed(() => {
  return {
    // completed: completed.value === true
    completed: completed.value, // && !hasError.value, // true && false => false
    'text-danger': !completed.value
    // 'text-danger': completed.value === false
  }
})

// Style binding
const blueColor = ref('blue')
const uppercase = ref('uppercase')
const styleObject = reactive({
  color: 'purple',
  // 'font-size': '20px',
  fontSize: '20px'
})

// Conditional rendering
const awesome = ref(true)
const type = ref('C')
const ok = ref(false)

// Form input bindings
const text = ref("");
// function onInput(e) {
//   text.value = e.target.value 
// }
const textArea = ref("");
const checked = ref(false)
const checkedFrameworks = ref(['react']);
const picked = ref('two')
const selected = ref('')
const options = ref([
  { value: 'it', text: 'Information Technology' },
  { value: 'fi', text: 'Finance' },
  { value: 'hr', text: 'Human Resources' }
])
const two = ref('two')

function onReadMore(msg) {
  alert(`Message from child component: ${msg}`);
  console.log(`Message from child component: ${msg}`)
}

function onSubmitUser(userData) {
  console.log("Emri: ", userData.name);
  console.log("Email: ", userData.email);
  console.log("Submitted user data: ", userData); 
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

  <input type="text" placeholder="Enter your name..." @keyup.enter="onType">
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

  <!-- key: osht klasa ne css, value: variabla ne script  -->
  <p
    class="klasa-statike"
    :class="{ active: isActive, 'text-danger': hasError }"
  >
    Class binding
  </p>

  <p :class="classObject">Class object</p>

  <p :class="classObjComputed">
    Class object computed
    <button @click="completed = !completed">Toggle completed</button>
  </p>

  <p :class="[
    'active', 
    'text-danger', 
    //  completed ? 'completed' : ''
    { completed: completed }
  ]">
    Binding to array
  </p>

  <!-- Style bindings -->
  <p :style="{ 
    color: blueColor, 
    textTransform: uppercase
    // 'text-transform': uppercase
  }">
    Style binding
  </p>

  <p :style="styleObject">Style object</p>

  <!-- 
    Conditional rendering
    v-if - renders the element and its children only if the condition is true
    v-else-if - renders the element and its children if the previous condition is false and
    v-else - renders the element and its children if the previous conditions are false
    v-show - toggles the display CSS property of the element based on the condition (does not remove the element from the DOM)
  -->

  <p v-if="awesome">Vue is awesome</p>
  <p v-else>Vue is not awesome</p>
  <button @click="awesome = !awesome">Toggle text</button>

  <p v-if="type === 'A'">
    Type A
  </p>
  <p v-else-if="type === 'B'">
    Type B
  </p>
  <p v-else>
    Other type
  </p>

  <!-- Template tag -->
  <!-- <h1 v-if="ok">Template</h1>
  <p v-if="ok">This is a paragraph inside a template</p> -->
  <!-- 
      per grupim te elementeve
      nuk shfaqet ne DOM 
  -->
  <template v-if="ok">
    <h1>Template</h1>
    <p>This is a paragraph inside a template</p>
  </template>

  <p v-show="ok">V-show</p>

  <Detyra1 />

  <!-- 
    List rendering 
    v-for - renders a list of items based on an array  
  -->
  <ul>
    <li v-for="numri in 5">
      {{ numri }}
    </li>
  </ul>

  <p>Author books</p>
  <!-- author.books.length 0 => false -->
   <!-- forEach(item, index) -->
  <ul v-if="author.books.length">
    <!-- <li v-for="book in author.books"> -->
    <!-- <li v-for="(book, indeksi) in author.books"> -->
    <!-- v-for with template -->
    <!-- nuk preferohet me u perdor v-if edhe v-for, v-if ka prioritet -->
    <!-- :key - unique key  -->
    <template v-for="({ title, year }, indeksi) in author.books" :key="indeksi">
      <li>{{ indeksi }} - {{ title }} - ({{ year }})</li>
      <hr>
    </template>
  </ul>
  <ul v-else>
    <li>No books available</li>
  </ul>

  <!-- v-for with object -->
  <ul>
    <li v-for="(vlera, celsi, indeksi) in user">
      {{ indeksi }} - {{ celsi }}: {{ vlera }}
    </li>
  </ul>

  <!-- Form input bindings -->
  <!-- Two way data binding -->
  <!-- <input type="text" :value="text" @input="onInput"> -->
  <input type="text" v-model="text">
  <p>Text: {{ text }}</p>

  <!-- Text area -->
  <textarea v-model="textArea"></textarea>
  <p>Text area: {{ textArea }}</p>

  <!-- Single checkbox -->
  <input type="checkbox" id="chck" v-model="checked">
  <label for="chck">Check me</label>
  <p>Checked: {{ checked }}</p>

  <!-- Multiple checkbox -->
  <p>Choose your favorite frameworks:</p>
  <!-- value dergohet ne server -->
  <input type="checkbox" id="vue" value="vue" v-model="checkedFrameworks">
  <label for="vue">Vue</label>
  <input type="checkbox" id="react" value="react" v-model="checkedFrameworks">
  <label for="react">React</label>
  <input type="checkbox" id="angular" value="angular" v-model="checkedFrameworks">
  <label for="angular">Angular</label>
  <p>Checked frameworks: {{ checkedFrameworks }}</p>

  <!-- Radio buttons -->
  <input type="radio" id="one" value="one" v-model="picked">
  <label for="one">One</label>
  <input type="radio" id="two" :value="two" v-model="picked">
  <label for="two">Two</label>
  <p>Picked: {{ picked }}</p>

  <!-- Select -->
  <!-- v-model vendoset te <select> jo te option -->
  <select v-model="selected">
    <option value="" disabled>Select an option</option>
    <!-- <option value="a">A</option>
    <option value="b">B</option>
    <option value="c">C</option> -->
    <option 
      v-for="(option, index) in options" 
      :key="index" 
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
  <p>Selected: {{ selected }}</p>

  <!-- Components -->
  <!-- <my-component /> -->
  <!-- <MyComponent title="My Component" description="My description" /> -->
  <!-- <MyComponent 
    title="Another Component" 
    description="Another description"
  /> -->
  <MyComponent
    :post="{
      title: 'Post title',
      description: 'Post description',
      createdAt: '2024-06-01'
    }"
    @read-more="onReadMore"
  >
    <!-- slot default -->
    <p>This is some content passed from the parent component to the child component using slots.</p>
    
    <!-- slot footer -->
    <template #emriSlotit>
      <p>This is some content for the footer slot.</p>
    </template>

    <template #butonat>
      <button>Butoni tjeter prej slot</button>
    </template>
  </MyComponent> 


  <!-- Create -->
  <UserForm  @submit-form="onSubmitUser" />

  <!-- Update -->
  <!-- <UserForm :is-edit="true" @submit-form="onSubmitUser" /> -->
  <UserForm is-edit @submit-form="onSubmitUser" />
</template>

<!-- styles - CSS -->
<!-- scoped - css applied only to this component -->
<style scoped>
.active {
  font-weight: bold;
}

.text-danger {
  color: red;
}

.completed {
  text-decoration: line-through;
  color: green
}
</style>