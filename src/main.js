import { createApp } from 'vue'
import App from './App.vue'
import MyComponent from './MyComponent.vue'
import router from './router'

createApp(App)
// inicializimi i router-it
.use(router)
// .component('MyComponent', MyComponent) // importimi global
.mount('#app')