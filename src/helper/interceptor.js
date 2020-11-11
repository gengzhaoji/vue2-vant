// axios
import axios from 'axios'
// axios的封装
import http from '../utils/axios'
// vuex数据
import store from '@/store'
// 路由跳转
import Router from '../router'

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识

let cancelToken = axios.CancelToken;

let removePending = (ever) => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}

/**
 * 在请求发送数据之前，对发送数据进行转换
 */
http.interceptors.request.use(function (config) {
  // 在这里实现对请求前的处理
  removePending(config); //在一个ajax发送前执行一下取消操作
  config.cancelToken = new cancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: config.url + '&' + config.method, f: c });
  });
  // -----------------------------------------------------------------------------------------
  return config;
})

/**
 * 在ajax接收响应数据之前，进行判断是否响应未登录、如果未登录重定向到登录页面
 */
http.interceptors.response.use(function (res) {
  // 在这里实现响应后的处理
  removePending(res.config);
  return res
})

