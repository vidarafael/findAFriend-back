import { AnimalDTO } from '@/dtos/animal-dto';
import { AnimalRepository } from '@/repositories/animal-repository';
import { NotFoundResourceError } from '@/shared/errors/not-found-resource-error';

type FindAnimalUseCaseRequest = Pick<AnimalDTO, 'id'>

interface FindAnimalUseCaseResponse {
  animal: AnimalDTO
}


class FindAnimalUseCase {
  constructor (private animalRepository: AnimalRepository) {}

  async execute({ id }: FindAnimalUseCaseRequest): Promise<FindAnimalUseCaseResponse> {
    const animal = await this.animalRepository.findById({
      id
    })

    if (!animal) {
      throw new NotFoundResourceError()
    }

    return {
      animal
    }
  }
}

export { FindAnimalUseCase }