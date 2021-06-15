const Timestamp = new Date().getTime()

const path = require('path')

// 导入compression-webpack-plugin
const CompressionPlugin = require('compression-webpack-plugin');

// 是否为生产环境
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: isProduction ? "./" : "./",
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 转译不能兼容ie的插件中的es6写法
  transpileDependencies: ['jsencrypt'],
  // css相关配置
  css: {
    // 是否使用css分离插件
    extract: isProduction,
    // 开启 CSS source maps?
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import '~@/style/index.scss';`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  chainWebpack: c => {
    //最小化代码
    c.optimization.minimize(true);
    //分割代码
    c.optimization.splitChunks({
      chunks: 'all'
    });
    // 压缩图片
    c.module.rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      });
    // 开启js、css压缩
    if (isProduction) {
      c.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|svg|json|html)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false // 删除源文件
        }));
    }
    // 配置别名
    c.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@com', resolve('src/components'))
      .set('@utils', resolve('src/utils'));
    c.plugins.delete('preload');
    c.plugins.delete('prefetch');
  },
  configureWebpack: {
    name: '富全矿山',
    output: { // 输出重构  打包编译后的 文件名称
      filename: `js/[name].[chunkhash].${Timestamp}.js`,
      chunkFilename: `js/[name].[chunkhash].${Timestamp}.js`
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    port: process.env.port || process.env.npm_config_port || 5000,
    proxy: {// 设置代理
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_TARGET,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: process.env.VUE_APP_TI
        }
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
  }
}
