import all from '~/src/data/notes.json'

export default {
  namespaced: true,

  state: () => ({
    all
  }),

  mutations: {
    delete(state, item) {
      state.all = state.all.filter((i) => i.id !== item.id)
    }
  },
}
