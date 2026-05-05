# Lesson 03 - Class & Style Bindings, Advanced Conditional Rendering

---

## What We Learned

### 1. Dynamic Class Binding

Dynamically bind CSS classes to elements based on reactive data.

#### **Object Syntax**

The simplest way - key is the class name, value is a boolean:

```js
const isActive = ref(true);
const hasError = ref(false);
```

```vue
<p :class="{ active: isActive, 'text-danger': hasError }">
  Class binding
</p>
```

In this example:
- If `isActive` is `true`, the `active` class is applied
- If `hasError` is `false`, the `text-danger` class is not applied

#### **Binding to an Object**

Store classes in a reactive object and bind directly:

```js
const classObject = reactive({
  active: false,
  'text-danger': true
});
```

```vue
<p :class="classObject">Class object</p>
```

#### **Binding to a Computed Object**

Use `computed()` to dynamically determine which classes apply:

```js
const completed = ref(true);

const classObjComputed = computed(() => {
  return {
    completed: completed.value,
    'text-danger': !completed.value
  };
});
```

```vue
<p :class="classObjComputed">
  Class object computed
  <button @click="completed = !completed">Toggle completed</button>
</p>
```

When `completed` changes, the computed classes update automatically.

#### **Array Syntax**

Bind an array of class names, with optional conditional classes:

```vue
<p :class="[
  'active',
  'text-danger',
  { completed: completed }
]">
  Binding to array
</p>
```

In this example:
- `active` and `text-danger` are always applied
- `completed` is applied only if the `completed` value is truthy

---

### 2. Dynamic Style Binding

Dynamically bind inline CSS styles to elements.

#### **Object Syntax**

Keys are CSS property names (camelCase or kebab-case), values are the style values:

```js
const blueColor = ref('blue');
const uppercase = ref('uppercase');
```

```vue
<p :style="{ 
  color: blueColor, 
  textTransform: uppercase
}">
  Style binding
</p>
```

**Note:** Use camelCase for CSS properties with hyphens (`textTransform`, not `text-transform`). However, kebab-case also works if you quote it: `'text-transform'`.

#### **Binding to a Style Object**

Store styles in a reactive object:

```js
const styleObject = reactive({
  color: 'purple',
  fontSize: '20px'  // camelCase
});
```

```vue
<p :style="styleObject">Style object</p>
```

---

### 3. `v-else-if` for Multiple Conditions

Chain multiple conditions for more complex branching logic.

```js
const type = ref('C');
```

```vue
<p v-if="type === 'A'">
  Type A
</p>
<p v-else-if="type === 'B'">
  Type B
</p>
<p v-else>
  Other type
</p>
```

- If `type` is `'A'`, shows "Type A"
- Else if `type` is `'B'`, shows "Type B"
- Otherwise, shows "Other type"

---

### 4. `v-show` vs `v-if`

Both show/hide elements conditionally, but they work differently:

```js
const ok = ref(false);
const awesome = ref(true);
```

#### **`v-if` - DOM Removal**

Completely removes the element from the DOM when the condition is false:

```vue
<p v-if="awesome">Vue is awesome</p>
<p v-else>Vue is not awesome</p>
<button @click="awesome = !awesome">Toggle text</button>
```

- ✅ When `awesome` is `false`, the entire element is removed from the DOM
- ✅ No event listeners or child components are initialized
- ⚠️ More expensive to toggle frequently (DOM manipulation)

#### **`v-show` - CSS Display Toggle**

Toggles the CSS `display` property; the element always stays in the DOM:

```vue
<p v-show="ok">V-show</p>
```

- ✅ Lighter weight for frequent toggling
- ⚠️ Element is always in the DOM (takes up space in markup)
- Use `v-show` when you toggle frequently; use `v-if` when the condition rarely changes

**When to Use:**
- `v-if`: Conditional rendering where you want to completely add/remove the element
- `v-show`: Frequent toggling of visibility

---

### 5. Template Tag for Grouping

Group multiple elements without adding an extra container to the DOM.

```js
const ok = ref(false);
```

```vue
<template v-if="ok">
  <h1>Template</h1>
  <p>This is a paragraph inside a template</p>
</template>
```

**Key Points:**
- The `<template>` tag itself **does not render** in the DOM
- Use it to apply `v-if`, `v-else-if`, `v-else`, or `v-for` to a group of elements
- Useful when you want to conditionally render multiple elements without wrapping them in a `<div>`

**Example with Toggle:**

```vue
<button @click="ok = !ok">Toggle Group</button>
<template v-if="ok">
  <h1>Heading</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

When `ok` is `true`, all three elements render; when `false`, none render. The `<template>` wrapper doesn't appear in the final HTML.

---

## Quick Reference

| Feature | Purpose | Example |
|---------|---------|---------|
| **:class object** | Bind CSS classes conditionally | `:class="{ active: isActive }"` |
| **:class array** | Bind multiple classes | `:class="['active', { error: hasError }]"` |
| **:style object** | Bind inline styles | `:style="{ color: blue }"` |
| **v-if/v-else-if/v-else** | Conditional DOM rendering | `v-if="condition"` |
| **v-show** | Toggle CSS display | `v-show="condition"` |
| **template v-if** | Group multiple elements | `<template v-if="ok">` |

---

## Key Takeaways

1. **Class binding** makes it easy to dynamically apply styles based on state
2. **Style binding** allows inline style changes without hardcoding CSS
3. **v-else-if** enables complex branching logic
4. **v-show** is better for frequent toggling; **v-if** is better for rare changes
5. **Template tag** is a semantic way to group elements without DOM bloat
