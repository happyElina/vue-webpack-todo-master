import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    // mode: 'history',
    // base: '/base/'
  })
}
