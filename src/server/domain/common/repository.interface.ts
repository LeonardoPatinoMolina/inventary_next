export interface Repository<T,Tdto> {
  findOne(id: number): Promise<T>
  findAll(page: number): Promise<{pages: number, data: T[], total: number}>
  edit(id: number, data: Tdto): Promise<void>
  insertOne(item: Tdto): Promise<void>
  remove(id: number): Promise<void>
}