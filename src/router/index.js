import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/aboutt',
        name: 'about',
        // component: AboutView
        component: () => import("@/views/AboutView.vue") // lazy loading
    },
    {
        path: '/about-us',
        redirect: '/about'
    },
    {
        path: '/users/:id', // params
        name: 'edit-user',
        component: () => import("@/views/EditUserView.vue")
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import("@/views/NotFoundView.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

// navigation guard
// para navigimit te ni route specifike ekzekutohet beforeEach
router.beforeEach((to, from) => {
    console.log('from', from);
    console.log('to', to);
}) 

export default router;