import { PrismaAnimalRepository } from "@/repositories/prisma/prisma-animal-repository"
import { CreateAnimalUseCase } from "../create-animal"

export function makeCreateAnimalUseCase() {
  const repository = new PrismaAnimalRepository()

  const useCase = new CreateAnimalUseCase(repository)

  return useCase
}