import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationInMemoryRepository } from '@/repositories/in-memory/organization-in-memory-repository'
import { CreateOrganizationUseCase } from './create-organization'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

describe("Create Organization Use Case", () => {
  let organizationRepository: OrganizationInMemoryRepository
  let sut: CreateOrganizationUseCase

  beforeEach(() => {
    organizationRepository = new OrganizationInMemoryRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it("Should be able create organization", async () => {
    const { organization } = await sut.execute({ 
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password: '123456',
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999' 
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.password_hash.length).toBeGreaterThan(6)
  })

  it("Should not be able create organization if organization already exists", async () => {
    const { organization } = await sut.execute({ 
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password: '123456',
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999' 
    })

    await expect(() => sut.execute({ 
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password: '123456',
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999' 
    })).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
    
  })

})