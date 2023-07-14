import { PrismaAdoptionAnimalRepository } from "@/repositories/prisma/prisma-adoption-animal-repository";
import { ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCase } from "../list-avaliables-adoption-animal-by-city-and-animal-characteristics";

export function makeListAvaliablesAdoptionAnimalByCityAndAnimalCharactericsUseCase() {
  const repository = new PrismaAdoptionAnimalRepository()

  const useCase = new ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCase(repository)

  return useCase
}