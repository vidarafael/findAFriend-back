import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAdoptionAnimalUseCase } from './create-adoption-animal'
import { AdoptionAnimalInMemoryRepository } from '@/repositories/in-memory/adoption-animal-in-memory-repository'
import { OrganizationInMemoryRepository } from '@/repositories/in-memory/organization-in-memory-repository'
import { AnimalInMemoryRepository } from '@/repositories/in-memory/animal-in-memory-repository'
import { hash } from 'bcryptjs'

describe("Create Adoption Animal Use Case", () => {
  let adoptionAnimalRepository: AdoptionAnimalInMemoryRepository
  let organizationRepository: OrganizationInMemoryRepository
  let animalRepository: AnimalInMemoryRepository
  let sut: CreateAdoptionAnimalUseCase

  beforeEach(() => {
    adoptionAnimalRepository = new AdoptionAnimalInMemoryRepository()
    organizationRepository = new OrganizationInMemoryRepository()
    animalRepository = new AnimalInMemoryRepository()

    sut = new CreateAdoptionAnimalUseCase(adoptionAnimalRepository)
  })

  it("Should be able create adoption animal", async () => {
    const organization = await organizationRepository.create({
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })

    const animal = await animalRepository.create({
      name: 'Animal test',
      size: 'PEQUENO',
      age_in_month: 12,
      type_animal: 'cachorro',
      image: ''
    })

    const { adoptionAnimal } = await sut.execute({ animal_id: animal.id, organization_id: organization.id })

    expect(adoptionAnimal.id).toEqual(expect.any(String))
  })

})