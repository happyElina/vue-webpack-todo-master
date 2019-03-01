const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const webpack = require("webpack")                      //引入webpack
// const ExtractPlugin = require("extract-text-webpack-plugin")
const baseConfig =  require("./webpack.config.base.js")
const merge =  require("webpack-merge")
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development"    //判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的
let config
const devServer = {                                //这个devServer的配置是在webpack2.x以后引入的,1.x是没有的
    port: 8081,                                     //访问的端口号
    host: '127.0.0.1',                              //可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
    overlay: {
        errors: true,                               //编译中遇到的错误都会显示到网页中去
    },
    // open: true ,                                 //项目启动时,会默认帮你打开浏览器
    hot: true                                       //在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
}
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV : isDev ? '"development"' :'"production"'
    }
  }),
  new HtmlWebPackPlugin({
    template: path.join(__dirname,'template.html')
  })
]

if(isDev){
    config = merge(baseConfig,{
      // devtool: '#cheap-module-eval-source-map',   //官方推荐使用这个配置,作用是在浏览器中调试时,显示的代码和我们的项目中的代码会基本相似,而不会显示编译后的代码,以致于我们调试连自己都看不懂
      module: {
        rules:[{
            test: /\.styl$/,
            use: [
                'style-loader',                     //将css写入到html中去
                'css-loader',                       //css-loader处理css
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                    }                               //那么postcss-loader可以直接引用前面的sourceMap
                },
                'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
            ]
        }]
      },
      devServer,
      plugins: defaultPlugins.concat([
        new webpack.HotModuleReplacementPlugin()
        // new webpack.NoEmitOnErrorsPlugin() // webpack4 废弃
      ])
    })
  } else {
    config = merge(baseConfig,{
      entry: {
          app: path.join(__dirname,'../client/index.js')
          // vendor: ['vue']
      },
      output: {
        filename: '[name].[chunkhash:8].js'
        //此处一定是chunkhash,因为用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义.
      },
      module:{
        rules: [{
            test: /\.styl$/,
            use:[
              MiniCssExtractPlugin.loader,
              // 这个插件应该只用在 production 配置中，并且在loaders链中不使用 style-loader, 特别是在开发中使用HMR，因为这个插件暂时不支持HMR
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
            // ExtractPlugin.extract({
            //     fallback: 'style-loader',
            //     use: [
            //         'css-loader',                       //css-loader处理css
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
            //             }                               //那么postcss-loader可以直接引用前面的sourceMap
            //         },
            //         'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
            //     ]
            // })
        }]
      },
      optimization: {
        splitChunks: {
          chunks: 'all'
        },
        runtimeChunk: true
        // runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单,
        //模块信息清单在每次有模块变更(hash 变更)时都会变更, 所以我们想把这部分代码单独打包出来, 配合后端缓存策略,
        //这样就不会因为某个模块的变更导致包含模块信息的模块(通常会被包含在最后一个 bundle 中)缓存失效.
        // optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来.
        // 就是确保未更改的模块打包的hash 不变
        // https://segmentfault.com/q/1010000014954264
        // 引入大的包，比如说第三方库可能会引起问题，有更多的配置项
      },
      // 排除大的第三方，使用CDN暴露在window下，require（XXX）=> window.XXX
      //     externals: {
      //   '@plugin/index': 'index',
      //   'jquery': 'jQuery',
      //   'vue': 'Vue',
      //   'vue-router': 'VueRouter',
      //   'vuex':'Vuex',
      //   'axios': 'axios',
      //   'element-ui':'ELEMENT',
      //   'moment': 'moment',
      //   'highcharts/highstock': 'Highcharts',
      //   'highlight.js': 'hljs'
      // },
      //  webpack-bundle-analyzer 可以很好的展现打包的js结构和大小
      plugins: defaultPlugins.concat([
         new MiniCssExtractPlugin({
           filename: "[name].css",
           chunkFilename: "[id].css"
         })
      ])
    })
}

module.exports = config                                 //声明一个config的配置,用于对外暴露
