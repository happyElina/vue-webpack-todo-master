import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    fallback: true  //不支持history的退回到哈希模式
    // base: '/base/',
    // linkActiveClass: 'active-link',
    // linkExactActiveClass: 'exact-active-link',
    // 保存页面滚动行为
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return {
    //       x: 0,
    //       y: 0
    //     }
    //   }
    // },
    // parseQuery (query) {
    //
    // },
    // stringifyQuery (object) {
    //
    // },

  })
}
