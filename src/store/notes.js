import all from '~/src/data/notes.json'
import { getUniqueId } from '../helpers/common'

export default {
  namespaced: true,

  state: () => ({
    all
  }),

  mutations: {
    delete(state, item) {
      state.all = state.all.filter((i) => i.id !== item.id)
    },

    create(state, data) {
      const id = getUniqueId(state.all)

      state.all.push({
        ...data,
        isComplete: false,
        id
      })
    },
  },
}
