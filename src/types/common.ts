declare interface ListItem {
  id: number,
  title: string
  description: string
  isComplete: boolean
  parent?: number
}

declare interface ListState {
  all: ListItem[]
}
