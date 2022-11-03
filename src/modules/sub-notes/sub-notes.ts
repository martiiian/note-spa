import all from '~/src/data/sub-notes.json'
import { mutations } from '../mutations'
import { Module, MutationTree } from "vuex";
import {RootState} from "@/store";

export default <Module<ListState, RootState>>{
  namespaced: true,

  state: () => ({
    all
  }),
  
  mutations: <MutationTree<ListState>> {
    ...mutations,

    deleteByParent(state, parent) {
      state.all = state.all.filter((i) => i.parent !== parent.id)
    }
  }
}
