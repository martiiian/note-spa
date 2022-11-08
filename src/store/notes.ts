import all from '~/src/data/notes.json'
import { defineStore } from "pinia";
import { getUniqueId } from "../helpers/common";
import { useSubNotesStore } from "./sub-notes";

export const useNotesStore = defineStore('notes', {
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
  },

  getters: {
    notesWithChildren(): Array<ListItem & { subNotes: ListItem[] }> {
      const subNotesStore = useSubNotesStore()

      return this.all.map(note => ({
        ...note,
        subNotes: subNotesStore.filteredByParent(note)
      }))
    }
  }
})
