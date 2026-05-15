import { createApp } from 'vue'
import App from './App.vue'
import MyComponent from './components/MyComponent.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/app.css'
import './assets/styles.css'

createApp(App)  
// inicializimi i router-it
.use(router)
// inicializimi i Pinia-s per menaxhimin e gjendjes (state management)
.use(createPinia())
// .component('MyComponent', MyComponent) // importimi global
.mount('#app')