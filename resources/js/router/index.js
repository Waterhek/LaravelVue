import { createRouter, createWebHistory } from "vue-router";
//import { useAuthStore } from '@/stores/auth';
import EmptyLayout from '../layouts/Empty.vue';
import MainLayout from '../layouts/Main.vue';
import NotFound from '../components/NotFound.vue';
import userIndex from '../components/user/Index.vue';
import userForm from '../components/user/Form.vue';
//import Login from '../components/auth/Login.vue';
//import Register from '../components/auth/Register.vue';

const routes = [
    /* { 
        path: '/login',
        name: 'login',
        component: Login,
        meta: { layout: EmptyLayout }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { layout: EmptyLayout }
    }, */
    {
        path: '/',
        name: 'user.index',
        component: userIndex,
        meta: { layout: MainLayout }
    },
    {
        path: '/user/create',
        name: 'user.create',
        component: userForm,
        meta: { layout: MainLayout }
    },
    {
        path: '/user/:id/edit',
        name: 'user.edit',
        component: userForm,
        meta: { layout: MainLayout }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound,
        meta: { layout: EmptyLayout }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

/* router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
  
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({ name: 'login' });
    } else {
      next();
    }
}); */

export default router