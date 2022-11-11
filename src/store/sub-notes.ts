import all from '../data/sub-notes.json'
import { defineStore } from "pinia";
import { deleteItem, update, create } from "./utils/actions";

export const useSubNotesStore = defineStore('sub-notes', {
  state: () => ({
    all: all as ListItem[]
  }),

  actions: {
    ...{
      delete: deleteItem,
      update,
      create
    },

    deleteByParent(parent: ListItem) {
      this.all = this.all.filter((i) => i.parent !== parent.id)
    }
  },

  getters: {
    filteredByParent: (state) =>
      (parent: ListItem) => state.all.filter((sn) => sn.parent === parent.id)
  }
})
