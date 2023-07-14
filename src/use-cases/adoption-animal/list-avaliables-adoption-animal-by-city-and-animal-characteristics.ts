import { AdoptionAnimalDTO } from "@/dtos/adoption-animal-dto"
import { AdoptionAnimalRepository } from "@/repositories/adoption-animal-repository"
import { Size } from "@prisma/client"

interface ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCaseRequest {
  state: string
  city: string
  type_animal?: string
  age_in_month?: number
  size?: Size
}

interface ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCaseResponse {
  adoptionAnimals: AdoptionAnimalDTO[]
}


class ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCase {
  constructor (private adoptionAnimalRepository: AdoptionAnimalRepository) {}

  async execute({ 
    city, 
    state, 
    type_animal, 
    age_in_month, 
    size 
  }: ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCaseRequest): Promise<ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCaseResponse> {
    const adoptionAnimals = await this.adoptionAnimalRepository.findManyByOrganizationStateAndCityAndAnimalCharacteristics({ 
      state, 
      city, 
      type_animal, 
      age_in_month, 
      size 
    })
    
    return {
      adoptionAnimals
    }
  }
}

export { ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCase }