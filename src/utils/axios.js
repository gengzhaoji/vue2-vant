/**
 *  Axios 实例, ajax请求底层方法
 *  官方文档 [https://github.com/axios/axios]{@link https://github.com/axios/axios}
 *  @module utils/axios
 */

import axios from 'axios'
// vuex数据
import store from '@/store'
import router from '@/router'
// API_HOST
import { API_HOST, AJAX_SUCCESS } from '@/config'
// 弹窗提示
import { Toast } from 'vant';

// 请求错误自定义
const errorCode = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  'default': '系统未知错误,请反馈给管理员'
};

// 请求存储
const axiosPromiseArr = [];

/**
 * 白名单
 */
const whiteList = ['/file/upload', '/file/downloadFile']

/**
 * Axios实例化参数选项对象
 * @const
 * @type {object}
 * @property {object} headers 请求头对象对象，默认：null
 * @property {number} timeout 超时时间，默认：0， 不限制
 * @property {boolean} withCredentials 是否带上验证信息， 默认：true
 * @property {number} maxContentLength 限制最大发送内容长度，默认：-1 不限制
 * @property {strin} cancelToken 取消请求
 */
const service = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 0,
  withCredentials: false,
  responseType: 'json',
  maxContentLength: -1,
  baseURL: process.env.VUE_APP_BASE_API || API_HOST
})

/**
 * 在请求发送数据之前，对发送数据进行转换
 */
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false;
  if (store.getters.token && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + store.getters.token// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof (value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    delete config.params;
    config.url = url;
  }
  /**
 * 请求未完成时保存取消的cancelToken
 */
  config.cancelToken = new axios.CancelToken(cancel => {
    // 判断是否重复切不在白名单中
    const repeat = axiosPromiseArr.some(item => item.url === config.url && item.method === config.method);
    if (repeat && !whiteList.includes(config.url)) {
      cancel();
    } else {
      axiosPromiseArr.push({ url: config.url, method: config.method, cancel })
    }
  })

  return config
}, error => {
  Toast.fail('加载超时')
  return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 请求成功后从正在进行的请求数组中删除
  axiosPromiseArr.forEach((item, index) => {
    if (item.url === res.config.url.replace(res.config.baseURL, '') && item.method === res.config.method) {
      delete axiosPromiseArr[index];
    }
  })
  // 未设置状态码则默认成功状态
  const code = res.data && res.data.code || AJAX_SUCCESS;
  // 获取错误信息
  const msg = errorCode[code] || res.data && res.data.msg || errorCode['default']
  if (code === 500 && msg === "登录状态已过期") {
    store.dispatch('LogOut').then(() => {
      router.push({
        path: "/login",
        query: {
          redirect: store.getters.fullPath
        }
      })
    })
    cancelFn();
  } else if (code === 500) {
    Toast.fail(msg)
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    Toast.fail(msg)
    return Promise.reject('error')
  } else {
    return Promise.resolve(res.data)
  }
},
  // 服务器状态码不是200的情况    
  error => {
    let { message } = error;
    if (message) {
      if (message == "Network Error") {
        message = "后端接口连接异常";
      } else if (message.includes("timeout")) {
        message = "系统接口请求超时";
      } else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
      Toast.fail(message)
      cancelFn();
    }
    return Promise.reject(error)
  }
);
/**
 * 请求系统错误时 取消所有正在进行的请求函数
 * @returns 
 */
export function cancelFn() {
  axiosPromiseArr.forEach((el, index) => {
    // 中止请求
    el.cancel();
    // 重置axiosPromiseArr
    delete axiosPromiseArr[index];
  })
}

/**
 * Axios 实例
 * @example
 *
 *  // 基础用法
 *  import axios from '@/utils/axios'
 *  axios({
 *    method: 'post',
 *    url: '/user/123',
 *    data: {
 *      firstName: 'Fred',
 *      lastName: 'Flintstone'
 *    }
 *  })
 *
 *  @example
 *
 *  // 实例方法
 *  axios.request(config)
 *  axios.get(url[, config])
 *  axios.delete(url[, config])
 *  axios.head(url[, config])
 *  axios.options(url[, config])
 *  axios.post(url[, data[, config]])
 *  axios.put(url[, data[, config]])
 *  axios.patch(url[, data[, config]])
 */

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
  let config = Object.assign({ method: 'get' }, options || {});

  // 必须要传入url
  if (!config.url) {
    throw new Error('ajax url is required!')
  }

  let { url, method, data } = config;

  delete config.url;
  delete config.method;
  delete config.data;

  const http = ['get', 'head', 'delete'].includes(method) ? service[method](url, {
    ...config,
    params: data
  }) : service[method](url, data, config);

  return http
}
