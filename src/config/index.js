const statiConfig = window.__config__ || {};

// 默认请求前缀
export const API_HOST = statiConfig['API_HOST'] || '';

// 请求响应成功code
export const AJAX_SUCCESS = statiConfig['AJAX_SUCCESS']  || 200