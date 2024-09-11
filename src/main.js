import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';
import Login from './Login.vue'
import Product from './Product.vue';
import Createuser from './Createuser.vue';
import Cookies from 'js-cookie'; // para manejar cookies
const routes = [
    { path: '/', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Createuser },
    { path: '/products', name: 'Products', component: Product, meta: { requiresAuth: true }},

]

// crear objeto de rutas de vue router -- objeto de vr
const router = createRouter({
    history: createWebHistory(),
    routes
});
// Guardia global para verificar cookies
router.beforeEach((to, from, next) => {
    // Si la ruta requiere autenticación
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = Cookies.get('token'); // Verifica la cookie 'token' (o la cookie que uses para la autenticación)
        
        if (!token) {
            // Si no hay cookie, redirige al login
            next({ name: 'Login' });
        } else {
            // Si hay cookie, permite el acceso
            next();
        }
    } else {
        next(); // Si no requiere autenticación, sigue normalmente
    }
});
//instancia de vue
const app = createApp(App)

// use router
app.use(router)

// mount #app
app.mount('#app')

