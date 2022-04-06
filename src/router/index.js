import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    // to将要访问的路劲
    // from代表从哪个路劲跳转过来
    // next是一个函数，表示放行
    //  next()  放行    next('/login')  强制跳转

    if (to.path === '/login') return next();

    const tokenstr = window.sessionStorage.getItem('token')

    if (!tokenstr) return next('/login');

    next();
})

export default router