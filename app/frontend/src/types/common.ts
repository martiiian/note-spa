export interface ListItem {
  id: number,
  title: string
  description: string
  isComplete: boolean
  parent?: number
}
