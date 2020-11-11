import Vue from 'vue';
import Router from 'vue-router';
// file => require('@/views/' + file + '.vue').default 将异步 import() 转化为同步 require() 来增加热更新速度
const _import = process.env.NODE_ENV === 'development'
  ? file => require('@/views/' + file + '.vue').default
  : (file) => (resolve) => require([`@/views/${file}`], resolve);
Vue.use(Router);
const files = require.context('../views', true, /\.vue$/);
const pages = {};
let routes = [];
files.keys().forEach(key => {
  pages[key.replace('./', '').replace('.vue', '')] = files(key).default
});

Object.keys(pages).forEach(item => {
  routes.push({
    path: `/${item}`,
    name: item,
    meta: pages[item].meta || {},
    component: _import(item)
  })
});

const Routes = [
  ...routes,
  {
    path: '/',
    redirect: '/index'
  }
];
console.log(Routes);
export default new Router({ routes: Routes });
