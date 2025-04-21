import { createRouter, createWebHistory } from 'vue-router'

import Home from '@views/home/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            props: (route) => ({
                search: route.query.search,
                orderby: route.query.orderby,
                lower: route.query.lower,
                greater: route.query.greater,
                page: route.query.page,
                limit: route.query.limit,
                byUser: route.query.byuser === 'true'
            })
        },
        {
            path: '/stock/:stockID',
            name: 'stock-detail',
            props: true,
            component: () => import('@views/stock-detail/index.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@views/login/index.vue')
        }
    ]
})

export default router
