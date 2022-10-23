import all from '~/src/data/sub-notes.json'

export default {
  namespaced: true,

  state: () => ({
    all
  }),
  
  mutations: {
    delete(state, item) {
      state.all = state.all.filter((i) => i.id !== item.id)
    },

    deleteByParent(state, parent) {
      state.all = state.all.filter((i) => i.parent !== parent.id)
    }
  }
}
