# Lesson 04 - List Rendering and Form Input Bindings

This lesson covers only the new concepts demonstrated in `src/App.vue` that were not covered in Lessons 01, 02, and 03.

---

## What We Learned

### 1. List Rendering with `v-for`

Use `v-for` to render lists from arrays, objects, or numeric ranges.

#### **Render a Range of Numbers**

```vue
<ul>
  <li v-for="numri in 5">
    {{ numri }}
  </li>
</ul>
```

This renders numbers from `1` to `5`.

#### **Render an Array of Objects**

```js
const author = reactive({
  name: 'John Doe',
  books: [
    { title: 'Book 1', year: 2020 },
    { title: 'Book 2', year: 2021 },
    { title: 'Book 3', year: 2022 }
  ]
});
```

```vue
<template v-for="({ title, year }, indeksi) in author.books" :key="indeksi">
  <li>{{ indeksi }} - {{ title }} - ({{ year }})</li>
  <hr>
</template>
```

Key points:
- You can destructure each item directly in the loop
- The `index` argument gives the current position in the array
- `:key` helps Vue track each rendered item efficiently

#### **Render an Object**

```js
const user = reactive({
  name: 'Jane',
  age: 30
});
```

```vue
<ul>
  <li v-for="(vlera, celsi, indeksi) in user">
    {{ indeksi }} - {{ celsi }}: {{ vlera }}
  </li>
</ul>
```

When iterating over an object:
- `vlera` is the value
- `celsi` is the key
- `indeksi` is the item index

#### **`v-if` with `v-for`**

If you need a fallback message when a list is empty, wrap the list in a `v-if` / `v-else` pair:

```vue
<ul v-if="author.books.length">
  <template v-for="({ title, year }, indeksi) in author.books" :key="indeksi">
    <li>{{ indeksi }} - {{ title }} - ({{ year }})</li>
    <hr>
  </template>
</ul>
<ul v-else>
  <li>No books available</li>
</ul>
```

---

### 2. Form Input Bindings with `v-model`

Use `v-model` for two-way data binding between form inputs and reactive state.

#### **Text Input**

```js
const text = ref('');
```

```vue
<input type="text" v-model="text">
<p>Text: {{ text }}</p>
```

#### **Textarea**

```js
const textArea = ref('');
```

```vue
<textarea v-model="textArea"></textarea>
<p>Text area: {{ textArea }}</p>
```

#### **Single Checkbox**

```js
const checked = ref(false);
```

```vue
<input type="checkbox" id="chck" v-model="checked">
<label for="chck">Check me</label>
<p>Checked: {{ checked }}</p>
```

For a single checkbox, `v-model` stores a boolean.

#### **Multiple Checkboxes**

```js
const checkedFrameworks = ref([]);
```

```vue
<p>Choose your favorite frameworks:</p>
<input type="checkbox" id="vue" value="vue" v-model="checkedFrameworks">
<label for="vue">Vue</label>
<input type="checkbox" id="react" value="react" v-model="checkedFrameworks">
<label for="react">React</label>
<input type="checkbox" id="angular" value="angular" v-model="checkedFrameworks">
<label for="angular">Angular</label>
<p>Checked frameworks: {{ checkedFrameworks }}</p>
```

For multiple checkboxes, `v-model` stores an array of selected values.

#### **Radio Buttons**

```js
const picked = ref('');
const two = ref('two');
```

```vue
<input type="radio" id="one" value="one" v-model="picked">
<label for="one">One</label>
<input type="radio" id="two" :value="two" v-model="picked">
<label for="two">Two</label>
<p>Picked: {{ picked }}</p>
```

Radio buttons share one `v-model` value, and the selected button sets that value.

#### **Select Dropdown**

```js
const selected = ref('');
const options = ref([
  { text: 'A', value: 'a' },
  { text: 'B', value: 'b' },
  { text: 'C', value: 'c' }
]);
```

```vue
<select v-model="selected">
  <option value="" disabled>Select an option</option>
  <option
    v-for="(option, index) in options"
    :key="index"
    :value="option.value"
  >
    {{ option.text }}
  </option>
</select>
<p>Selected: {{ selected }}</p>
```

Important points:
- Put `v-model` on the `<select>`, not on each `<option>`
- Each option can still use `v-for` and `:value`
- The selected option is stored in the bound reactive value

---

## Quick Reference

| Feature | Purpose | Example |
|---------|---------|---------|
| **v-for** | Render lists | `v-for="item in items"` |
| **:key** | Track list items efficiently | `:key="index"` |
| **v-model text** | Two-way bind text input | `v-model="text"` |
| **v-model checkbox** | Bind boolean or array | `v-model="checked"` |
| **v-model radio** | Bind selected choice | `v-model="picked"` |
| **v-model select** | Bind selected option | `v-model="selected"` |

---

## Key Takeaways

1. `v-for` can render arrays, objects, and numeric ranges
2. `:key` is important for helping Vue track list updates
3. `v-model` simplifies two-way binding for form elements
4. Different input types store different kinds of values
5. Select elements bind to the `<select>` tag, not the `<option>` tags
