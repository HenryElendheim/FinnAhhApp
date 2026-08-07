import { createRouter, createWebHistory } from 'vue-router';
import HomeSide from '../views/HomeSide.vue';
import MessagesSide from '../views/MessagesSide.vue';
import NewAdSide from '../views/NewAdSide.vue';
import ProfilSide from '../views/ProfilSide.vue';
import LoginSide from '../views/LoginSide.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeSide },
    { path: '/home', redirect: '/' },
    { path: '/messages', name: 'messages', component: MessagesSide },
    { path: '/new-ad', name: 'new-ad', component: NewAdSide },
    { path: '/profile', name: 'profile', component: ProfilSide },
    { path: '/login', name: 'login', component: LoginSide },
  ],
});

export default router;
