// const docLoader = requre.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
    preserveWhiteSpace: true,
    // extractCss: !isDev,  // 貌似不再起作用
    //vue 默认不会吧vue文件的css抽离 更加高效不会吧不需要的样式一起， 这里设定true就抽离出来到css 开发时用
    // 现在的项目里是两个环境都抽离
    cssModules: {  // 在vue文件的样式模块后添加module标识即使用此配置  也可以用scoped  普通的css 等也可以使用，对应的引用样式和类名要做修改
      localIdentName: isDev? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', //根据文件名 路径 哈希生成独一无二的class名字 正式环境可以只用hash 没有冲突
      camelCase: true  //将css中横杠转换成驼峰命名
    }
    // hotReload
    // 会根据环境变量生成 开发环境关闭 不需要设置
    // loaders: {
    //   'docs' : docLoader,
         // js: '',
    // }
    // 可以对vue 中自定义的模块指定相对应的loader
    // preLoader: {
    //   js: ''
    // }
    // postLoader: {
    //
    // }
  }
}
