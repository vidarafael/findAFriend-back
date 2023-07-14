import { beforeEach, describe, expect, it } from 'vitest'
import { AnimalInMemoryRepository } from '@/repositories/in-memory/animal-in-memory-repository'
import { FindAnimalUseCase } from './find-animal'
import { NotFoundResourceError } from '@/shared/errors/not-found-resource-error'

describe("Find Animal Use Case", () => {
  let animalRepository: AnimalInMemoryRepository
  let sut: FindAnimalUseCase

  beforeEach(() => {
    animalRepository = new AnimalInMemoryRepository()

    sut = new FindAnimalUseCase(animalRepository)
  })

  it("Should be able find animal by id", async () => {
    const animalCreated = await animalRepository.create({
      name: 'Animal test',
      size: 'PEQUENO',
      age_in_month: 12,
      type_animal: 'cachorro',
      image: ''
    })

    const { animal } = await sut.execute({ id: animalCreated.id })

    expect(animal).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'Animal test'
    }))
  })

  it("Should not be able find animal with id not exist", async () => {
   
    await expect(() => sut.execute({ id: 'id-non-exists'})).rejects.toBeInstanceOf(NotFoundResourceError)
  })
})