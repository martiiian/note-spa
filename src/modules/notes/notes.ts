import all from '~/src/data/notes.json'
import { mutations } from '../mutations'
import { Module } from "vuex";
import {RootState} from "@/store";

export default <Module<ListState, RootState>> {
  namespaced: true,

  state: () => ({
    all
  }),

  mutations: mutations,
}
