import { AnimalDTO } from "@/dtos/animal-dto";

export type CreateAnimal = Omit<AnimalDTO, 'id' | 'created_at'>
export type FindAnimal = Pick<AnimalDTO, 'id'>

export interface AnimalRepository {
  create({ name, type_animal, age_in_month, size, image }: CreateAnimal): Promise<AnimalDTO>
  findById({ id }: FindAnimal): Promise<AnimalDTO | null>
}