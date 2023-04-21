export interface Repository<T,Tdto> {
  findOne(id: number): Promise<T>
  findAll(): Promise<T[]>
  edit(id: number, data: Tdto): Promise<void>
  insertOne(item: Tdto): Promise<void>
  remove(id: number): Promise<void>
}