import Vuex from 'vuex'


// 服务端渲染需要每次返回新的实例
export default () =>{
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount (state,num) {
        state.count = num
      }
    }
  })
}
