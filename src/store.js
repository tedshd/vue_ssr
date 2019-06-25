import Vue from 'vue'
import Vuex from 'vuex'
// Assume we have a universal API that returns Promises
// and ignore the implementation details
import fetchMeta from './api/meta'


Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    // state() {
    //   return {
    //     meta: {}
    //   }
    // },
    state: () => ({
      metaData: {}
    }),
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.metaData, id, item)
      }
    },
    actions: {
      getMeta ({ commit }, id) {
        // return the Promise via `store.dispatch()` so that we know
        // when the data has been fetched
        return fetchMeta(id).then(item => {
          console.log('res:', item);
          commit('setItem', { id, item })
        })
      }
    }
  })
}
