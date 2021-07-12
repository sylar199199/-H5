const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 引入happypack
const Happypack = require('happypack')
// gzip
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
// const productionGzipExtensions = ['js', 'css']

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  lintOnSave: true,
  transpileDependencies: ['*'], // 解决npm run serve某些node_modules依赖不能被babel编译问题
  productionSourceMap: process.env.NODE_ENV === 'development',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: process.env.BASE_URL,
  assetsDir: 'static',
  configureWebpack: {
    // module: {
    //   // rules: [ // 可在package.json 配置顶层 sideEffects: false
    //   //   {
    //   //     enforce: 'pre',
    //   //     test: /\.(js|vue)$/,
    //   //     exclude: /node_modules/,
    //   //     loader: 'eslint-loader',
    //   //   },
    //   // ],
    // },
    plugins: [
      new Happypack({
        loaders: ['babel-loader', 'vue-loader', 'url-loader'],
        // cache: true,
        threads: 4 // 线程数取决于你电脑性能的好坏，好的电脑建议开更多线程
      }),
      // new CompressionWebpackPlugin({
      //   filename: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
      //   threshold: 5120, // 对5K以上的数据进行压缩
      //   minRatio: 0.8,
      //   deleteOriginalAssets: false // 是否删除源文件
      // })
    ],
    performance: {
      hints: false,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
          },
        }),
      ],
    },
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    if (process.env.MODE_REPORT) {
      // report配置
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
    }

    // base64转换规则配置
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20000 }))
      .end()

    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icon'))
      .end()

    config.module
      .rule('svg-icon')
      // .test(/^(?:(?!iconfont).)+\.svg$/)
      // .test/.*[?<!iconfont]\.svg$/)
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/less/variable.less')] // 引入全局样式变量
    }
  },
  css: {
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true,
    } : false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    sourceMap: false
  },
  devServer: {
    proxy: {
      // 代理配置(socket)
      '/wssapi': {
        target: 'wss://api.ilot.ng', // 代理接口
        ws: true, // 是否启用websockets
        secure: false, // 将安全设置为false,才能访问https开头的
        changeOrigin: true,
        // logLevel: 'debug',
        pathRewrite: {
        }
      },
      // 代理配置(接口)
      '/api': {
        target: 'https://www.ilot.ng', // 代理接口
        secure: false, // 将安全设置为false,才能访问https开头的
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false,
    },
    // 匹配所有以 /api 开头的url
    // '/api': {
    //   // 请求的目标主机
    //   target: 'http://http://10.9.0.110:8401',
    //   changeOrigin: true,
    //   ws: true
    //   // 这样重写会把路径中 /api 消去
    //   // pathRewrite: {
    //   //   '^/api': '/api'
    //   // }
    // }
  },
}
