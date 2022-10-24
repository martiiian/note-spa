import all from '~/src/data/sub-notes.json'
import { mutations } from '../helpers/store/mutations'

export default {
  namespaced: true,

  state: () => ({
    all
  }),
  
  mutations: {
    ...mutations,

    deleteByParent(state, parent) {
      state.all = state.all.filter((i) => i.parent !== parent.id)
    }
  }
}
