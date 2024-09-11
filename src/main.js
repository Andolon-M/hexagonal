import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';
import Login from './Login.vue'
import Product from './product.vue';
import Createuser from './Createuser.vue';
const routes = [
    { path: '/', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Createuser },
    { path: '/products', name: 'Products', component: Product},

]

// crear objeto de rutas de vue router -- objeto de vr
const router = createRouter({
    history: createWebHistory(),
    routes
});

//instancia de vue
const app = createApp(App)

// use router
app.use(router)

// mount #app
app.mount('#app')

