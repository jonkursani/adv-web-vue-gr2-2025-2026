# Lesson 07 - State Management with Pinia

This lesson adds only the Pinia-specific concepts that were not covered in previous lessons.

---

## 1. Registering Pinia (app-level)

Install and register Pinia in `main.js` so stores are available app-wide:

```js
import { createPinia } from 'pinia'
createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
```

This is shown in the project and creates a global store container.

---

## 2. Defining a Store (`defineStore`)

Pinia stores are defined with `defineStore(id, setupFn)` or an options object. The project uses the setup-style store:

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const message = ref('Hello, Pinia!')

  function increment() { count.value++ }

  const doubleCount = computed(() => count.value * 2)

  return { count, message, increment, doubleCount }
})
```

Key points:
- `id` (first arg) must be unique across stores.
- Return state refs, actions (functions), and getters (computed) from the setup function.
- Pinia automatically unwraps refs in templates (no `.value` needed in templates).

---

## 3. Using a Store in Components

Import and call the composable to access the store instance anywhere (setup or script):

```js
import { useCounterStore } from '@/stores/counterStore'
const counter = useCounterStore()
counter.increment()
console.log(counter.count)
```

In templates you can bind directly:

```vue
<p>Count: {{ counter.count }}</p>
<button @click="counter.increment">+</button>
<p>Double: {{ counter.doubleCount }}</p>
```

Because the store is a singleton per app, all components using `useCounterStore()` share the same state instance.

---

## 4. Getters vs Computed

In setup-style stores you use `computed()` for derived values (getters). Pinia also supports an options-style `getters` field which behaves similarly.

Example getter (setup-style):

```js
const doubleCount = computed(() => count.value * 2)
```

Access getters like normal properties in templates: `{{ counter.doubleCount }}`.

---

## 5. Actions

Actions are plain functions returned from the store and can modify state, call APIs, or orchestrate logic.

```js
function incrementBy(n = 1) { count.value += n }
```

Actions can be async (return a Promise) and can call other actions.

---

## 6. Options-style Store (alternative)

Pinia supports an options-style API similar to Vuex for teams migrating from Vuex:

```js
export const useStore = defineStore('id', {
  state: () => ({ count: 0 }),
  getters: { double: (state) => state.count * 2 },
  actions: { increment() { this.count++ } }
})
```

Use whichever style suits your codebase; both are first-class.

---

## 7. Accessing Route or Router in Stores

Stores are plain JS modules; avoid importing component instances. Use composables or pass values into actions. If you need router inside a store, import it via `useRouter()` inside an action only when called from a component context.

---

## 8. Devtools and Debugging

Pinia integrates with Vue Devtools automatically when installed. Use the Devtools to inspect store state, getters, and actions.

---

## 9. Persistence and Plugins (notes)

Pinia supports plugins for persistence (localStorage) and other cross-cutting concerns. The project doesn't include a persistence plugin by default; add one if you need to persist state across reloads.

---

## Quick Reference

| Feature | Purpose | Example |
|--------:|:--------|:--------|
| `createPinia()` | Register Pinia plugin | `.use(createPinia())` |
| `defineStore()` | Define a named store | `defineStore('id', () => ({ count }))` |
| `useXStore()` | Get store instance | `const store = useCounterStore()` |
| Actions | State-changing methods | `store.increment()` |
| Getters | Derived state | `store.doubleCount` |

---

## Key Takeaways

1. Register Pinia once in `main.js` with `createPinia()`.
2. Define stores with `defineStore(id, setup)` and return refs/actions/getters.
3. Call the store composable (`useStore`) in any component to access shared state.
4. Pinia unwrapps refs in templates — no `.value` needed in templates.
5. Use plugins for persistence or cross-cutting behavior when required.

---

This lesson adds only the Pinia-specific patterns introduced or implied by the project's `src/stores/counterStore.js` and `main.js` setup.
