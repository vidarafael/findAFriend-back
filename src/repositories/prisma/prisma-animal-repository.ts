import { AnimalRepository, CreateAnimal, FindAnimal } from "../animal-repository";
import { prisma } from "@/prisma";

export class PrismaAnimalRepository implements AnimalRepository {
  async create({ name, type_animal, age_in_month, size, image }: CreateAnimal) {
    const animal = await prisma.animal.create({
      data: {
        name, 
        type_animal, 
        age_in_month, 
        size, 
        image
      }
    })

    return animal
  }

  async findById({ id }: FindAnimal) {
    const animal = await prisma.animal.findUnique({
      where: {
        id
      }
    })

    return animal
  }
}