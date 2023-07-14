import { AdoptionAnimalDTO } from "@/dtos/adoption-animal-dto"
import { AdoptionAnimalRepository } from "@/repositories/adoption-animal-repository"

type CreateAdoptionAnimalUseCaseRequest = Omit<AdoptionAnimalDTO, 'id' | 'created_at' | 'wasAdopted'>

interface CreateAdoptionAnimalUseCaseResponse {
  adoptionAnimal: AdoptionAnimalDTO
}


class CreateAdoptionAnimalUseCase {
  constructor (private adoptionAnimalRepository: AdoptionAnimalRepository) {}

  async execute({ animal_id, organization_id }: CreateAdoptionAnimalUseCaseRequest): Promise<CreateAdoptionAnimalUseCaseResponse> {
    const adoptionAnimal = await this.adoptionAnimalRepository.create({
      animal_id, organization_id
    })

    return {
      adoptionAnimal
    }
  }
}

export { CreateAdoptionAnimalUseCase }