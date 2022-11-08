import all from '~/src/data/sub-notes.json'
import { defineStore } from "pinia";
import { getUniqueId } from "../helpers/common";

export const useSubNotesStore = defineStore('sub-notes', {
  state: () => ({
    all: all as ListItem[]
  }),

  actions: {
    delete(item: ListItem) {
      this.all = this.all.filter((i) => i.id !== item.id)
    },

    update(item: ListItem) {
      this.all = this.all.map((i) =>
        i.id === item.id ? item : i
      )
    },

    create(data: Omit<ListItem, 'id' | 'isComplete'>) {
      const id = getUniqueId(this.all)

      this.all.push({
        ...data,
        isComplete: false,
        id
      })
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
