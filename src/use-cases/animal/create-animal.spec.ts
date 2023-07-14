import { beforeEach, describe, expect, it } from 'vitest'
import { AnimalInMemoryRepository } from '@/repositories/in-memory/animal-in-memory-repository'
import { CreateAnimalUseCase } from './create-animal'

describe("Create Animal Use Case", () => {
  let animalRepository: AnimalInMemoryRepository
  let sut: CreateAnimalUseCase

  beforeEach(() => {
    animalRepository = new AnimalInMemoryRepository()

    sut = new CreateAnimalUseCase(animalRepository)
  })

  it("Should be able create animal", async () => {
    const { animal } = await sut.execute({
      name: 'Animal test',
      size: 'PEQUENO',
      age_in_month: 12,
      type_animal: 'cachorro',
      image: ''
    })

    expect(animal.id).toEqual(expect.any(String))
  })

})