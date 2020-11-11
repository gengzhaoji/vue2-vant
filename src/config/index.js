const statiConfig = window.__config__ || {};

export const baseUrl = statiConfig['baseUrl'] || 'http://68.56.0.250:8081';
export const user = statiConfig['user'] || [{
  name: 'admin',
  password: 'admin'
}];