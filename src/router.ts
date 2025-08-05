import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import Home from './views/Home.vue'
import Stats from './views/Stats.vue'
import About from './views/About.vue'
import Config from './views/Config.vue'
import Job from './views/Job.vue'
import Login from './views/Login.vue'
import Weixin from './views/Weixin.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/stats',
        name: 'Stats',
        component: Stats
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/config',
        name: 'Config',
        component: Config,
        meta: { requiresAuth: true }
    },
    {
        path: '/job',
        name: 'Job',
        component: Job,
        meta: { requiresAuth: true }
    },
    {
        path: '/cai',
        name: 'Login',
        component: Login
    },
    {
        path: '/weixin',
        name: 'Weixin',
        component: Weixin,
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token')
        if (!token) {
            ElMessage.warning('请先登录')
            next('/cai')
            return
        }
    }
    next()
})

export default router
