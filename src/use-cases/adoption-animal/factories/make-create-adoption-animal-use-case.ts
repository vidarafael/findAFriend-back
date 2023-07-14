import { PrismaAdoptionAnimalRepository } from "@/repositories/prisma/prisma-adoption-animal-repository";
import { CreateAdoptionAnimalUseCase } from "../create-adoption-animal";

export function makeCreateAdoptionAnimalUseCase() {
  const repository = new PrismaAdoptionAnimalRepository()

  const useCase = new CreateAdoptionAnimalUseCase(repository)

  return useCase
}