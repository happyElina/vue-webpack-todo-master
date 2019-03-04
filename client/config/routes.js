import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:id',
    // props: (route) =>({id: route.query.id}) // 向组件中传props值（组件需声明props），有利于组件和router的解耦

    component: Todo,
    name: 'app',

    // 保存一些页面信息，有利于SEO
    meta: {
      title: 'this is app',
      description: 'this is app'
    },
    // 子组件  需要在Todo 里配置router-view
    // children: []
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
]
