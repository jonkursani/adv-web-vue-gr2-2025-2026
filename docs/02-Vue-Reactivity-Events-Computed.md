# Lesson 02 - Vue Reactivity, Events, and Computed Properties

This lesson continues from the setup notes in Lesson 01 and covers only the new concepts demonstrated in `src/App.vue`.

---

## What We Learned

### 1. `ref()` for Reactive Values

Use `ref()` when you want a reactive value that can hold primitives or objects.

```js
const message = ref('You did it!');
const url = ref('https://cacttus.education/');
const isBtnDisabled = ref(true);
const id = ref(2);
const seen = ref(true);
const name = ref('');
const count = ref(0);
```

In `<script setup>`, access the actual value with `.value`:

```js
message.value = 'Changed text';
count.value += 1;
```

In the template, Vue unwraps refs automatically:

```vue
<h1>{{ message }}</h1>
<p>Count: {{ count }}</p>
```

---

### 2. `reactive()` for Objects and Arrays

Use `reactive()` for object-based state.

```js
const user = reactive({
  name: 'Jane',
  age: 30,
});

const state = reactive({
  count: 0,
});

const author = reactive({
  name: 'John Doe',
  books: [
    { title: 'Book 1', year: 2020 },
    { title: 'Book 2', year: 2021 },
    { title: 'Book 3', year: 2022 },
  ],
});
```

Reactive objects are updated directly:

```js
user.name = 'John';
state.count++;
```

---

### 3. Event Handlers and Methods

Functions inside `<script setup>` become available to the template.

```js
function reverseMessage() {
  return message.value.split('').reverse().join('');
}

const getId = () => {
  return `emp-${id.value}`;
};

function toggleSeen() {
  seen.value = !seen.value;
}

function increment(num = 1) {
  count.value += num;
}

function decrement() {
  state.count--;
}
```

Examples in the template:

```vue
<button @click="toggleSeen">{{ seen ? 'Hide' : 'Show' }} text</button>
<button @click="increment(10)">+10</button>
<button @click="decrement">-</button>
```

---

### 4. Conditional Rendering

Use `v-if` and `v-else` to show different content based on state.

```vue
<p v-if="seen">Now you see me</p>
<p v-else>Now you don't see me</p>
```

This is useful when you want elements to be added or removed from the DOM.

---

### 5. Attribute Binding

Bind dynamic values to HTML attributes with `v-bind` or the `:` shorthand.

```vue
<a :href="url" target="_blank" rel="noopener">Cacttus Education</a>
<button :disabled="isBtnDisabled">Button</button>
<p :id="getId()">Employee #{{ id }}</p>
```

---

### 6. Template Expressions

Templates can evaluate JavaScript expressions directly.

```vue
<p>{{ 1 + 1 }}</p>
<p>{{ 'Hello ' + 'World' }}</p>
<p>{{ message.split('').reverse().join('') }}</p>
<p>{{ isBtnDisabled ? 'Button is disabled' : 'Button is enabled' }}</p>
<p>{{ reverseMessage() }}</p>
```

---

### 7. Form and Keyboard Events

The component uses event modifiers to handle forms and keyboard input cleanly.

```js
function onSubmit() {
  alert('Form submitted!');
}

function onInput(event) {
  name.value = event.target.value;
}
```

```vue
<form @submit.prevent="onSubmit">
  <button>Submit</button>
</form>

<input type="text" placeholder="Enter your name..." @keyup.enter="onInput">
<p>Name: {{ name }}</p>
```

---

### 8. Computed Properties

Use `computed()` for derived values that depend on reactive state.

```js
const hasPublishedBooks = computed(() => {
  return author.books.length > 0 ? 'has published books' : 'has not published books';
});

const fullName = computed(() => {
  return `${user.name} Doe`;
});
```

Computed values are read like normal values in the template:

```vue
<p>
  Author: {{ author.name }}
  {{ hasPublishedBooks }}
  {{ author.books.length }}
</p>

<p>Full name: {{ fullName }}</p>
```

---

## Key Takeaways

- `ref()` is the easiest way to make primitive values reactive.
- `reactive()` works best for objects and nested state.
- Template expressions can render simple logic without extra methods.
- Event handlers keep user interactions in the script section.
- `computed()` is ideal for values derived from existing reactive state.

---

## Next Step

The next lesson can build on this by introducing component composition, props, and reusable UI pieces.
