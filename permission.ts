import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import UserInfo from './src/mock/login'
import { getToken } from './src/utils/cookie'
import router from './src/router'
import { RouteLocationNormalized, } from 'vue-router'
console.log(UserInfo, router)
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next,) => {
    NProgress.start()
    if (to.path === '/login') return next() // 注意判断如果路由是/login的时候可以向下进行，否则会造成死循环
    if (!getToken()) return next('/login')
    next()
})
router.afterEach((to,) => {
    NProgress.done()
},)