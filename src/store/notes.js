import all from '~/src/data/notes.json'
import { mutations } from '../helpers/store/mutations'

export default {
  namespaced: true,

  state: () => ({
    all
  }),

  mutations: {
    ...mutations,
  },
}
