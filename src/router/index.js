/**
 * 路由初始化
 * @module router/index
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//创建方法
const createRouter = () => new Router({
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        // 保存到 meta 中，备用
        to.meta.savedPosition = savedPosition;
        if (savedPosition) {
            return { x: 0, y: 0 };
        }
        return {};
    },
    routes: [{ path: "/login", name: "login", component: () => import('@/views/login') },
    { path: "", name: "index", component: () => import('@/views/index') },
    { path: "/vehicle/information", name: "information", component: () => import('@/views/vehicle/information') },
    { path: "/vehicle/archives", name: "archives", component: () => import('@/views/vehicle/archives') },
    { path: "/people/information", name: "people_information", component: () => import('@/views/people/information') },
    { path: "/people/collection", name: "people_collection", component: () => import('@/views/people/collection') },
    { path: "/people/archives", name: "people_archives", component: () => import('@/views/people/archives') }]
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // the relevant part
}

export default router
