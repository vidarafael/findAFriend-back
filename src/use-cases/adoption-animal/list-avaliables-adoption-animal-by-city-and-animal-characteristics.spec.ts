import { beforeEach, describe, expect, it } from 'vitest'
import { AdoptionAnimalInMemoryRepository } from '@/repositories/in-memory/adoption-animal-in-memory-repository'
import { OrganizationInMemoryRepository } from '@/repositories/in-memory/organization-in-memory-repository'
import { AnimalInMemoryRepository } from '@/repositories/in-memory/animal-in-memory-repository'
import { hash } from 'bcryptjs'
import { ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCase } from './list-avaliables-adoption-animal-by-city-and-animal-characteristics'

describe("List Avaliables Adoption Animal By City And Animal Characteristics Use Case", () => {
  let adoptionAnimalRepository: AdoptionAnimalInMemoryRepository
  let organizationRepository: OrganizationInMemoryRepository
  let animalRepository: AnimalInMemoryRepository
  let sut: ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCase

  beforeEach(() => {
    adoptionAnimalRepository = new AdoptionAnimalInMemoryRepository()
    organizationRepository = new OrganizationInMemoryRepository()
    animalRepository = new AnimalInMemoryRepository()

    sut = new ListAvaliablesAdoptionAnimalByCityAndAnimalCharacteristicsUseCase(adoptionAnimalRepository)
  })

  it("Should be able list adoption animal by state and city", async () => {
    const organizationTruthyInTest = await organizationRepository.create({
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })

    const organizationFalsyInTest = await organizationRepository.create({
      name: 'ORG Test',
      city: 'cidadeTest',
      state: 'estadoTest',
      email: 'org2@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })

    const animalTruthyInTest = await animalRepository.create({
      name: 'Pica pau',
      size: 'PEQUENO',
      age_in_month: 12,
      type_animal: 'cachorro',
      image: ''
    })

    const animalTruthyInTest2 = await animalRepository.create({
      name: 'Gato de botas',
      size: 'MEDIO',
      age_in_month: 12,
      type_animal: 'gato',
      image: ''
    })

    const animalFalsyInTest = await animalRepository.create({
      name: 'Animal test',
      size: 'PEQUENO',
      age_in_month: 12,
      type_animal: 'cachorro',
      image: ''
    })

    await adoptionAnimalRepository.create({
      animal_id: animalTruthyInTest.id,
      organization_id: organizationTruthyInTest.id
    })

    await adoptionAnimalRepository.create({
      animal_id: animalTruthyInTest2.id,
      organization_id: organizationTruthyInTest.id
    })

    await adoptionAnimalRepository.create({
      animal_id: animalFalsyInTest.id,
      organization_id: organizationFalsyInTest.id
    })

    adoptionAnimalRepository.animals = [animalTruthyInTest, animalTruthyInTest2, animalFalsyInTest]
    adoptionAnimalRepository.organizations = [organizationTruthyInTest, organizationFalsyInTest]

    const { adoptionAnimals } = await sut.execute({ state: 'São Paulo', city: 'Guarulhos' })

    expect(adoptionAnimals.length).toEqual(2)

    expect(adoptionAnimals).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        animal_id: animalTruthyInTest.id,
        organization_id: organizationTruthyInTest.id,
        created_at: expect.any(Date),
      }),
      expect.objectContaining({
        id: expect.any(String),
        animal_id: animalTruthyInTest2.id,
        organization_id: organizationTruthyInTest.id,
        created_at: expect.any(Date),
      }),
    ]))
  })

  it("Should be able list adoption animal by state and city and type animal", async () => {
    const organizationTruthyInTest = await organizationRepository.create({
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })

    const organizationFalsyInTest = await organizationRepository.create({
      name: 'ORG Test',
      city: 'cidadeTest',
      state: 'estadoTest',
      email: 'org2@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })

    const animalTruthyInTest = await animalRepository.create({
      name: 'Pica pau',
      size: 'PEQUENO',
      age_in_month: 12,
      type_animal: 'cachorro',
      image: ''
    })

    const animalFalsyInTest = await animalRepository.create({
      name: 'Animal test',
      size: 'PEQUENO',
      age_in_month: 12,
      type_animal: 'cachorro',
      image: ''
    })

    await adoptionAnimalRepository.create({
      animal_id: animalTruthyInTest.id,
      organization_id: organizationTruthyInTest.id
    })


    await adoptionAnimalRepository.create({
      animal_id: animalFalsyInTest.id,
      organization_id: organizationFalsyInTest.id
    })

    adoptionAnimalRepository.animals = [animalTruthyInTest, animalFalsyInTest]
    adoptionAnimalRepository.organizations = [organizationTruthyInTest, organizationFalsyInTest]

    const { adoptionAnimals } = await sut.execute({ state: 'São Paulo', city: 'Guarulhos', type_animal: 'cachorro' })

    expect(adoptionAnimals.length).toEqual(1)

    expect(adoptionAnimals).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        animal_id: animalTruthyInTest.id,
        organization_id: organizationTruthyInTest.id,
        created_at: expect.any(Date),
      }),
    ]))
  })

  it("Should be able list adoption animal by state and city and all animal characteristics", async () => {
    const organizationTruthyInTest = await organizationRepository.create({
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })

    const organizationFalsyInTest = await organizationRepository.create({
      name: 'ORG Test',
      city: 'cidadeTest',
      state: 'estadoTest',
      email: 'org2@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })

    const animalTruthyInTest = await animalRepository.create({
      name: 'Gato Pica pau',
      size: 'MEDIO',
      age_in_month: 12,
      type_animal: 'gato',
      image: ''
    })

    const animalTruthyInTest2 = await animalRepository.create({
      name: 'Gato de botas',
      size: 'MEDIO',
      age_in_month: 12,
      type_animal: 'gato',
      image: ''
    })

    const animalFalsyInTest = await animalRepository.create({
      name: 'Animal test',
      size: 'PEQUENO',
      age_in_month: 12,
      type_animal: 'cachorro',
      image: ''
    })

    const animalFalsyInTest2 = await animalRepository.create({
      name: 'Animal test',
      size: 'PEQUENO',
      age_in_month: 12,
      type_animal: 'gato',
      image: ''
    })

    await adoptionAnimalRepository.create({
      animal_id: animalTruthyInTest.id,
      organization_id: organizationTruthyInTest.id
    })

    await adoptionAnimalRepository.create({
      animal_id: animalTruthyInTest2.id,
      organization_id: organizationTruthyInTest.id
    })

    await adoptionAnimalRepository.create({
      animal_id: animalFalsyInTest.id,
      organization_id: organizationFalsyInTest.id
    })

    await adoptionAnimalRepository.create({
      animal_id: animalFalsyInTest2.id,
      organization_id: organizationTruthyInTest.id
    })

    adoptionAnimalRepository.animals = [animalTruthyInTest, animalTruthyInTest2, animalFalsyInTest]
    adoptionAnimalRepository.organizations = [organizationTruthyInTest, organizationFalsyInTest]

    const { adoptionAnimals } = await sut.execute({ state: 'São Paulo', city: 'Guarulhos', type_animal: 'gato', size: 'MEDIO', age_in_month: 12 })

    expect(adoptionAnimals.length).toEqual(2)

    expect(adoptionAnimals).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        animal_id: animalTruthyInTest.id,
        organization_id: organizationTruthyInTest.id,
        created_at: expect.any(Date),
      }),
    ]))
  })
})