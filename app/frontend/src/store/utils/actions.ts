import { getUniqueId } from '@/helpers/common'
import { State } from '@/store/notes'

export function deleteItem(this: State, item: ListItem) {
  this.all = this.all.filter((i) => i.id !== item.id)
}

export function update(this: State, item: ListItem) {
  this.all = this.all.map((i) =>
    i.id === item.id ? item : i
  )
}

export function create(this: State, data: Omit<ListItem, 'id' | 'isComplete'>) {
  const id = getUniqueId(this.all)

  this.all.push({
    ...data,
    isComplete: false,
    id
  })
}

