import { createRouter, createWebHistory } from 'vue-router';
import DashRoutes from './DashboardRoutes';
import AuthRoutes from './AuthRoutes';
import WebsiteRoutes from './WebsiteRoutes';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/pages/Error404.vue')
        },
        {
            path: '/payment/success',
            component: () => import('@/views/website/PaymentSuccess.vue')
        },
        {
            path: '/payment/failed',
            component: () => import('@/views/website/PaymentFailed.vue')
        },
        DashRoutes,
        AuthRoutes,
        WebsiteRoutes
    ]
});
