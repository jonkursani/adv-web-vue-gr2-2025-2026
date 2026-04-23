# Lesson 01 - Vue 3 Fundamentals & Project Setup

## Project Overview

This is a **Vue 3** project that demonstrates the core concepts of Vue's template system, reactive state management, and event handling. The project is built with **Vite** for fast development and optimized production builds.

---

## Technology Stack

- **Vue 3** (v3.5.32) - The Progressive JavaScript Framework
- **Vite** (v8.0.8) - Next-generation frontend build tool
- **Node.js** - Runtime environment (v20.19.0 or >=22.12.0)
- **VS Code** - Recommended IDE with Vue Official extension

---

## What We Learned

### 1. **Project Structure & Setup**

The project is organized as a modern Vue 3 SPA (Single Page Application):

```
vue-gr2/
├── src/
│   ├── App.vue          # Root component (main application)
│   └── main.js          # Entry point - creates and mounts Vue app
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── docs/                # Documentation (lessons)
```

### 2. **Single File Component (SFC)**

A Vue SFC contains three sections in a single `.vue` file:

```vue
<script setup>
  // JavaScript logic
</script>

<template>
  <!-- HTML template -->
</template>

<style scoped>
  /* Scoped CSS styles */
</style>
```

---

## App.vue Deep Dive

### **Script Section (Reactive State & Logic)**

#### Reactive References (`ref`)

We use `ref` to create reactive state variables:

```javascript
const message = ref("You did it!");     // { value: "You did it!" }
const url = ref("https://cacttus.education/");
const isBtnDisabled = ref(true);
const id = ref(2);
const seen = ref(true);
const name = ref("");
```

⚠️ **Important**: In the script, access value with `.value`, but in templates Vue auto-unwraps refs.

#### Methods & Functions

```javascript
// Regular function
function reverseMessage() {
  return message.value.split('').reverse().join('');
}

// Arrow function
const getId = () => {
  return `emp-${id.value}`;
}

// Event handler
function toggleSeen() {
  seen.value = !seen.value;
}

// Form submission handler
function onSubmit() {
  alert("Form submitted!");
}

// Input event handler
function onInput(event) {
  name.value = event.target.value;
}
```

---

### **Template Section (UI & Bindings)**

#### 1. **Template Syntax `{{ }}`**

Output reactive data directly in the template:

```vue
<h1>{{ message }}</h1>  <!-- Displays: "You did it!" -->
```

#### 2. **Attribute Bindings (v-bind or :)**

Bind HTML attributes to reactive data:

```vue
<!-- Link binding -->
<a :href="url" target="_blank" rel="noopener">Cacttus Education</a>

<!-- Button disabled state -->
<button :disabled="isBtnDisabled">Button</button>

<!-- Dynamic ID attribute -->
<p :id="getId()">Employee #{{ id }}</p>
```

#### 3. **JavaScript Expressions in Templates**

Templates support full JavaScript expressions:

```vue
<p>{{ 1 + 1 }}</p>                                    <!-- 2 -->
<p>{{ "Hello " + "World" }}</p>                       <!-- Hello World -->
<p>{{ message.split('').reverse().join('') }}</p>    <!-- !ti did uoY -->
<p>{{ isBtnDisabled ? 'Button is disabled' : 'Button is enabled' }}</p>
```

#### 4. **Directives (v- prefix)**

Vue directives provide special behaviors to templates:

##### **v-if / v-else - Conditional Rendering**

```vue
<p v-if="seen">Now you see me</p>
<p v-else>Now you don't see me</p>
```

Only renders the element if the condition is true (removes from DOM).

##### **v-on or @ - Event Listeners**

```vue
<!-- Long form -->
<button v-on:click="toggleSeen">Toggle</button>

<!-- Shorthand -->
<button @click="toggleSeen">{{ seen ? 'Hide' : 'Show' }} text</button>
```

##### **Event Modifiers**

Modify event behavior with `.modifier`:

```vue
<!-- .prevent - prevents default behavior (like form submission) -->
<form @submit.prevent="onSubmit">
  <button>Submit</button>
</form>

<!-- .enter - trigger handler only when Enter key is pressed -->
<input type="text" @keyup.enter="onInput">
```

#### 5. **Two-Way Data Binding Concept**

While this project doesn't use `v-model`, we manually implement two-way binding:

```javascript
function onInput(event) {
  name.value = event.target.value;  // Update state from input
}
```

```vue
<input type="text" @keyup.enter="onInput">
<p>Name: {{ name }}</p>  <!-- Display updated state -->
```

---

## Key Vue 3 Concepts Covered

| Concept | Example | Purpose |
|---------|---------|---------|
| **Reactive State** | `ref("value")` | Create reactive variables that update UI when changed |
| **Template Interpolation** | `{{ message }}` | Display data in the template |
| **Attribute Binding** | `:href="url"` | Dynamically bind HTML attributes |
| **Event Handling** | `@click="method"` | Listen to user interactions |
| **Conditional Rendering** | `v-if="condition"` | Show/hide elements based on conditions |
| **Event Modifiers** | `@submit.prevent` | Modify event behavior |
| **Script Setup** | `<script setup>` | Simplified composition API syntax |
| **Scoped Styles** | `<style scoped>` | Component-specific CSS (won't affect other components) |

---

## How to Run This Project

### **1. Install Dependencies**

```bash
npm install
```

### **2. Development Server**

Run with hot-reload (changes reflect instantly):

```bash
npm run dev
```

The app will be available at `http://localhost:5173/` (or similar)

### **3. Build for Production**

Create an optimized build:

```bash
npm run build
```

### **4. Preview Production Build**

```bash
npm run preview
```

---

## What's Next?

In upcoming lessons, we'll explore:

- ✅ Component composition and reusable components
- ✅ Props - passing data to child components
- ✅ Computed properties - derived reactive state
- ✅ Watchers - react to data changes
- ✅ List rendering with `v-for`
- ✅ Form handling with `v-model`
- ✅ Lifecycle hooks (onMounted, onUnmounted, etc.)
- ✅ Component routing with Vue Router
- ✅ State management with Pinia

---

## Recommended Resources

- [Vue 3 Official Documentation](https://vuejs.org/)
- [Vite Documentation](https://vite.dev/)
- [Vue DevTools Browser Extension](https://devtools.vuejs.org/)
- VS Code Extension: [Vue Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

---

**Date**: April 23, 2026  
**Project**: vue-gr2  
**Level**: Beginner to Intermediate
