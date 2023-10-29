export type ItemID = `${string}-${string}-${string}-${string}-${string}`

export interface Item {
  id: ItemID
  value: string,
  timestamp: number
}