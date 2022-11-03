import { getUniqueId } from '../../src/helpers/common'
import { MutationTree } from "vuex";

export const mutations: MutationTree<ListState> = {
  delete(state, item) {
    state.all = state.all.filter((i) => i.id !== item.id)
  },

  update(state, item) {
    state.all = state.all.map((i) =>
      i.id === item.id ? item : i
    )
  },

  create(state, data) {
    const id = getUniqueId(state.all)

    state.all.push({
      ...data,
      isComplete: false,
      id
    })
  },
}
