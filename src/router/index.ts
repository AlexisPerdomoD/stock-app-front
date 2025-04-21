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
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@views/login/index.vue')
        }
    ]
})

export default router
