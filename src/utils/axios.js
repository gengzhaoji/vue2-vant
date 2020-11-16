/**
 *  Axios 实例, ajax请求底层方法
 *  官方文档 [https://github.com/axios/axios]{@link https://github.com/axios/axios}
 *  @author 耿朝继
 *  @module utils/axios
 */

import axios from 'axios'
// vuex数据
import store from '@/store'
// 路由跳转
import router from '../router'
// API_HOST
import { API_HOST, AJAX_SUCCESS } from '@/config'

import { Toast } from 'vant';
/**
 * 取消请求
 * @type {CancelTokenSource}
 * @example
 *
 * import {source} from '@/utils/axios'
 * source.cancel('描述文字....')
 */
export const source = axios.CancelToken.source()

/**
 * Axios实例化参数选项对象
 * @const
 * @type {object}
 * @property {object} headers 请求头对象对象，默认：null
 * @property {number} timeout 超时时间，默认：0， 不限制
 * @property {boolean} withCredentials 是否带上验证信息， 默认：true
 * @property {number} maxContentLength 限制最大发送内容长度，默认：-1 不限制
 */
const config = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 0,
  withCredentials: true,
  responseType: 'json',
  maxContentLength: -1,
  baseURL: API_HOST
}

const service = axios.create(config)

/**
 * 在请求发送数据之前，对发送数据进行转换
 */
service.interceptors.request.use(config => {
  //Loading
  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  const token = store.state.token;
  token && (config.headers.Authorization = token);
  return config;
},
  error => {
    Toast.fail('加载超时')
    return Promise.error(error);
  }
)

// 响应拦截器 200-300为成功逻辑
service.interceptors.response.use(
  res => {
    if (res.status === AJAX_SUCCESS) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res.data);
    }
  },
  // 服务器状态码不是200的情况    
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录                
        // 未登录则跳转登录页面，并携带当前页面的路径                
        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        // 403 token过期                
        // 登录过期对用户进行提示                
        // 清除本地token和清空vuex中token对象                
        // 跳转登录页面                
        case 403:
          Toast.fail('登录过期，请重新登录')
          // // 清除token                    
          // localStorage.removeItem('token');
          // store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        // 404请求不存在                
        case 404:
          Toast.fail('网络请求不存在')
          break;
        // 其他错误，直接抛出错误提示                
        default:
          Toast.fail(error.response.data.message)
      }
      return Promise.reject(error.response);
    }
  }
);
/**
 * 
 * @param {object} options 
 * 请求配置参数
 * url请求地址必须传
 * method请求方法默认为get方法
 * data请求参数
 */
export default function (options) {
  // 处理默认参数，传参和默认参数合并
  let config = Object.assign({ method: 'get' }, options || {})

  // 必须要传入url
  if (!config.url) {
    throw new Error('axios url is required!')
  }

  let { url, method, data } = config

  delete config.url
  delete config.method
  delete config.data

  const http = ['get', 'head', 'delete'].includes(method) ? service[method](url, {
    ...config,
    params: data
  }) : service[method](url, data, config)

  return http
} 
