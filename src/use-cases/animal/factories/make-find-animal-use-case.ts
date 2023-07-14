import { PrismaAnimalRepository } from "@/repositories/prisma/prisma-animal-repository"
import { FindAnimalUseCase } from "../find-animal"

export function makeFindAnimalUseCase() {
  const repository = new PrismaAnimalRepository()

  const useCase = new FindAnimalUseCase(repository)

  return useCase
}