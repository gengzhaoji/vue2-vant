/**
 * 路由导航守卫
 * @function
 * @param {VueRouter} router 路由实例
 */

import NProgress from 'nprogress'
import { source } from '@/utils/axios'
// vuex数据
import store from '@/store'
// 进度自动递增20%
NProgress.inc(0.2)

export default function (router) {
  /**
   * 全局前置守卫
   */
  router.beforeEach((to, from, next) => {
    NProgress.start();
    source.cancel('页面跳转是取消所有请求');
    if (to.path !== '/login') {
      // next({
      //   path: '/login'
      // })
      next()
    } else {
      if (to.meta && to.meta.name) document.title = to.meta.name;
      next()
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


