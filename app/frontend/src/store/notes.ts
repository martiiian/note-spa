import { defineStore } from 'pinia'
import { deleteItem, update, create } from './utils/actions'
import { useSubNotesStore } from './sub-notes'
import { ListItem } from '@/types/common'

export interface State {
  all: ListItem[]
}

export const useNotesStore = defineStore('notes', {
  state: (): State => ({
    all: []
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
