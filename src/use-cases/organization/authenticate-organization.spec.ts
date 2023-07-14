import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationInMemoryRepository } from '@/repositories/in-memory/organization-in-memory-repository'
import { hash } from 'bcryptjs'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe("Authenticate Organization Use Case", () => {
  let organizationRepository: OrganizationInMemoryRepository
  let sut: AuthenticateOrganizationUseCase

  beforeEach(() => {
    organizationRepository = new OrganizationInMemoryRepository()
    sut = new AuthenticateOrganizationUseCase(organizationRepository)
  })

  it("Should be able authenticated organization", async () => {
    const organizationCreated = await organizationRepository.create({
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })

    const { organization } = await sut.execute({ email: organizationCreated.email, password: '123456' })

    expect(organization.id).toEqual(expect.any(String))
  })

  it("Should not be able authenticated organization with email non exists", async () => {
    await organizationRepository.create({
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })


    await expect(() => 
      sut.execute({ email: 'email non exists', password: '123456' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("Should not be able authenticated organization with password wrong", async () => {
    await organizationRepository.create({
      name: 'ORG Test',
      city: 'Guarulhos',
      state: 'São Paulo',
      email: 'org@hotmail.com',
      password_hash: await hash('123456', 6),
      latitude: 1,
      longitude: 1,
      phone: '11 99999-9999'
    })


    await expect(() => 
      sut.execute({ email: 'org@hotmail.com', password: 'password-wrong' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})