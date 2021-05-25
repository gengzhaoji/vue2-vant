/**
 * 路由初始化
 * @module router/index
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 * 自动生成路由部分
 */
import RouteGenerator from 'gz-vue-router'

const router = new Router({
    routes: []
})

router.addRoutes(new RouteGenerator(require.context('../views', true, /\.vue$/)).generate());

export default router
