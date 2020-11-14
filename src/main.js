/**
 * 程序入口
 * @author chenhuachun@xdh.net.cn
 *
 */

import Vue from 'vue'
// ie浏览器兼容问题处理
import 'babel-polyfill'

// 按需加载ui
import './helper/ui'
import 'vant/lib/index.css'

//公用组件
import './helper/commonPage'

// 根组件
import App from './App.vue'

// 初始路由
import router from './router'

// 初始化store
import store from './store'

// rem布局
import 'lib-flexible/flexible'

// 解决移动端点击300ms延时
import fastclick from 'fastclick'

//解决移动端点击300ms延时
fastclick.attach(document.body)

// 注入路由守卫
import guarder from './helper/guarder'

import mixin from './helper/mixin'

// 注册路由守卫
guarder(router)

Vue.mixin(mixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')