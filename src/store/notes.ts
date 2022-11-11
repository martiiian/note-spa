import notesData from '@/data/notes.json'
import { defineStore } from "pinia";
import { deleteItem, update, create } from "./utils/actions";
import { useSubNotesStore } from "./sub-notes";

export interface State {
  all: ListItem[]
}

export const useNotesStore = defineStore('notes', {
  state: (): State => ({
    all: notesData as ListItem[]
  }),

  actions: {
    ...{
      delete: deleteItem,
      update,
      create
    }
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
