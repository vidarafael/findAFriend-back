import { AdoptionAnimalRepository, CreateAdoptionAnimal, FindAdoptionAnimal } from "../adoption-animal-repository";
import { prisma } from "@/prisma";

export class PrismaAdoptionAnimalRepository implements AdoptionAnimalRepository {
  async create({ animal_id, organization_id }: CreateAdoptionAnimal) {
    const adoptionAnimal = await prisma.adoptionAnimal.create({
      data: {
        animal_id,
        organization_id
      }
    })

    return adoptionAnimal
  }

  async findManyByOrganizationStateAndCityAndAnimalCharacteristics({ 
    state, 
    city, 
    type_animal, 
    age_in_month, 
    size 
  }: FindAdoptionAnimal) {
   const adoptionAnimals = prisma.adoptionAnimal.findMany({
      where: {
        organization: {
          state,
          city
        },
        animal: {
          type_animal,
          age_in_month,
          size
        }
      }
    })

    return adoptionAnimals
  }
}