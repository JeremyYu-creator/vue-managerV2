
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

// 为 store state 声明类型
export interface State {
}
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('key')
export const store = createStore<State>({
  state: {
  },
  mutations: {

  }
})
export function useStore() {
  return baseUseStore(key)
}
