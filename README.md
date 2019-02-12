#本项目都是基于 https://github.com/Jasonccj/vue-webpack-todo  来做的
在此感谢 Jasonccj 的辛勤整理

由于我学习慕课网上这门课时webpack已经升级到4以上了，所以下载以上项目以后 在本地运行困难重重，花了一些时间升级到webpack4
特此分享

几个印象深刻的改动：

1、 extract-text-webpack-plugin  webpack4不兼容，用mini-css-extract-plugin代替

2、 css-loader 用1.0.0 版本，不然一直报错 什么minimise不可配置  CSS Loader Invalid Options

3、 vue-webpack-todo-master/node_modules/webpack-dev-server/node_modules/ajv/lib/keyword.js
中的64.65行需要注释，不然也一直报错

4、一旦有插件报错，首先看是不是版本不对了，webpack4不支持了

5、 Error: listen EADDRINUSE 127.0.0.1:8000  是端口被占用，在webpack devServer 中修改端口号即可

6、npm run devServer 后是文件夹列表，没有及时刷新页面： 没有添加HtmlWebPackPlugin()插件
