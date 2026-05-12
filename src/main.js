import { createApp } from 'vue'
import App from './App.vue'
import MyComponent from './MyComponent.vue'

createApp(App)
// .component('MyComponent', MyComponent) // importimi global
.mount('#app')
