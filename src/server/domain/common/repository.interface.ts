export interface Repository<T> {
  findOne(id: number): Promise<T>
  findAll(): Promise<T[]>
  // edit(id: number): Promise<void>
  insertOne(item: T): Promise<void>
  remove(id: number): Promise<void>
}