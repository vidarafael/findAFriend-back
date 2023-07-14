import { AnimalDTO } from '@/dtos/animal-dto';
import { AnimalRepository } from '@/repositories/animal-repository';

type CreateAnimalUseCaseRequest = Omit<AnimalDTO, 'id' | 'created_at'>

interface CreateAnimalUseCaseResponse {
  animal: AnimalDTO
}

class CreateAnimalUseCase {
  constructor (private animalRepository: AnimalRepository) {}

  async execute({ name, size, type_animal, age_in_month, image }: CreateAnimalUseCaseRequest): Promise<CreateAnimalUseCaseResponse> {
    const animal = await this.animalRepository.create({
      name, size, type_animal, age_in_month, image
    })

    return {
      animal
    }
  }
}

export { CreateAnimalUseCase }