import { randomUUID } from "crypto";
import { AnimalRepository, CreateAnimal, FindAnimal } from "../animal-repository";
import { AnimalDTO } from "@/dtos/animal-dto";

export class AnimalInMemoryRepository implements AnimalRepository {
  public items: AnimalDTO[] = []

  async create({ name, type_animal, age_in_month, size, image }: CreateAnimal) {
    const animal = {
      id: randomUUID(),
      name,
      type_animal,
      age_in_month,
      size,
      image,
      created_at: new Date(), 
    }

    this.items.push(animal)

    return animal
  }

  async findById({ id }: FindAnimal) {
    const animal = this.items.find((item) => item.id === id)

    if (!animal) {
      return null
    }

    return animal
  }
}