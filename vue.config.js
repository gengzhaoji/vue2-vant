const path = require('path')

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // 转译不能兼容ie的插件中的es6写法
  transpileDependencies: ['vuex-persist'],
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  configureWebpack: {
    name: 'vue3项目'
  },
  // webpack-dev-server 相关配置
  devServer: {
    port: 5000,
    // proxy: {// 设置代理
    //   '/api': {
    //     target: 'http://127.0.0.1:3000/',
    //     changeOrigin: false
    //   }
    // },
    before: app => { }
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/style/index.scss')]
    }
  }
}
