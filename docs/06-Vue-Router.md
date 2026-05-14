# Lesson 06 - Vue Router: Routes, Navigation, and Route Patterns

This lesson replaces the previous file and documents only the Vue Router concepts demonstrated or expected in the project — items not covered in Lessons 01–05.

---

## 1. Installing and Initializing the Router

Create a router file (commonly `src/router/index.js`) and export a configured router instance.

Example:

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router
```

In `main.js` register the router with the app:

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
```

---

## 2. `router-view` and `router-link`

Place `<router-view />` in your root component where matched route components should render.

Use `<router-link>` in templates instead of raw `<a>` when navigating between routes:

```vue
<router-link to="/">Home</router-link>
<router-link :to="{ name: 'About' }">About</router-link>
```

`router-link` handles client-side navigation and prevents page reloads.

---

## 3. Route Params, Query, and Props

Path params capture segments from the path:

```js
{ path: '/users/:id', name: 'User', component: User }
```

In the component you can access `route.params.id` via `useRoute()` or receive it as a prop by enabling `props: true` on the route:

```js
{ path: '/users/:id', component: User, props: true }
```

Query parameters are available via `route.query` (`/search?q=vue`).

---

## 4. Programmatic Navigation

Use `useRouter()` to get the router instance in setup and navigate programmatically:

```js
import { useRouter } from 'vue-router'
const router = useRouter()
router.push({ name: 'User', params: { id: 123 } })
// or
router.replace('/login')
```

Use `replace()` to navigate without adding a history entry.

---

## 5. Named Routes and Route Aliases

Named routes let you reference routes by name, which is helpful when paths change.

```js
{ path: '/profile/:id', name: 'Profile', component: Profile }
```

You can also define `alias` to expose a route under additional paths.

---

## 6. Nested Routes (Child Routes)

Define child routes to render components inside parent route components using nested `<router-view>`:

```js
{
  path: '/users', component: Users, children: [
    { path: '', name: 'UsersList', component: UsersList },
    { path: ':id', name: 'UserDetails', component: UserDetails, props: true }
  ]
}
```

Parent component must include `<router-view />` where children render.

---

## 7. Route Guards

Protect routes or run logic during navigation using guards.

Global guard example:

```js
router.beforeEach((to, from, next) => {
  // check auth, etc.
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
```

Per-route `beforeEnter` guards and in-component `beforeRouteEnter`/`beforeRouteLeave` hooks are also available.

---

## 8. Lazy-loading Routes (Code Splitting)

Load route components only when needed to reduce initial bundle size:

```js
const About = () => import('../views/About.vue')
{ path: '/about', component: About }
```

---

## 9. scrollBehavior and History Modes

- `createWebHistory()` (HTML5 history) is the common choice in modern SPAs.
- `createWebHashHistory()` uses hash mode (`/#/path`) and avoids server config.
- `scrollBehavior` controls scroll position on navigation.

---

## 10. Passing Props to Route Components

Routes can pass route params as props:

```js
{ path: '/users/:id', component: User, props: route => ({ id: Number(route.params.id) }) }
```

This enables plain `props`-based components and simplifies testing.

---

## Quick Reference

| Feature | Purpose | Example |
|--------:|:--------|:--------|
| `router-view` | Where matched components render | `<router-view />` |
| `router-link` | Declarative navigation | `<router-link to="/about">About</router-link>` |
| `useRouter()` | Programmatic navigation | `router.push(...)` |
| `useRoute()` | Read current route | `const route = useRoute()` |
| `beforeEach` | Global guard | `router.beforeEach(...)` |
| Lazy routes | Code-splitting | `() => import('./MyView.vue')` |

---

## Key Takeaways

1. Set up the router in a dedicated `router` module and register it with `app.use(router)`.
2. Use `router-link` and `router-view` for declarative routing.
3. Prefer named routes and `props` to keep route components simple and testable.
4. Use lazy-loading for large routes to improve initial load time.
5. Use route guards to handle authentication and access control.

---

This lesson focuses solely on Vue Router patterns not covered in previous lessons.