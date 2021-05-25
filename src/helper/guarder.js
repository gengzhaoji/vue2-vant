/**
 * 路由导航守卫
 * @function
 * @param {VueRouter} router 路由实例
 */
// vuex数据
import store from '@/store'

// 获取取消正在执行的函数逻辑
import { cancelFn } from '@utils/axios'

//进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

/**
 * 白名单
 */
const whiteList = ['/login']

export default function (router) {
  /**
   * 全局前置守卫
   */
  router.beforeEach((to, from, next) => {
    NProgress.start();
    cancelFn();
    /** 已经登录了存在token */
    if (store.getters.token) {
      next();
      NProgress.done();
    } else {
      // 没有token
      if (whiteList.includes(to.path)) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        NProgress.done()
      }
    }
  });

  /**
   * 全局后置守卫
   */
  router.afterEach((to, from) => {
    NProgress.done();
    window.scroll(0, 0)
  })
}


