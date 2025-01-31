import { createRouter, createWebHistory } from 'vue-router';
import PostList from '../components/PostList.vue';
import Help from '../components/Help.vue'; // Создайте компонент Help.vue

const routes = [
    {
        path: '/',
        name: 'Home',
        component: PostList
    },
    {
        path: '/help',
        name: 'Help',
        component: Help
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;