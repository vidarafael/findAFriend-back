import { describe, it, expect } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { prisma } from "@/prisma";

describe('Adoption Animal Controller (E2E)', () => {
  it('Should be able create adoption animal', async () => {
    await prisma.organization.create({
      data: {
        name: 'ORG Pets', 
        email: 'orgpet@hotmail.com', 
        password_hash: 'secretpassword',
        city: 'guarulhos',
        state: 'são paulo',
        phone: '11 99999-9999',
        latitude: 1,
        longitude: 1
      }
    })

    const animal = await prisma.animal.create({
      data: {
        name: 'Ted',
        type_animal: 'cachorro', 
        age_in_month: 12,
        size: 'PEQUENO'
      }
    })

    const authResponse = await request(app).post('/organization/session').send({
      email: 'orgpet@hotmail.com', 
      password: 'secretpassword',
    })

    const { token } = authResponse.body

    const response = await request(app)
      .post('/adoption_animal/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        animal_id: animal.id,
      })

    expect(response.status).toBe(201)
  })

  it('Should be able find animal by id', async () => {
    const organization = await prisma.organization.create({
      data: {
        name: 'ORG Pets', 
        email: 'orgpet@hotmail.com', 
        password_hash: 'secretpassword',
        city: 'guarulhos',
        state: 'são paulo',
        phone: '11 99999-9999',
        latitude: 1,
        longitude: 1
      }
    })

    const animal = await prisma.animal.create({
      data: {
        name: 'Ted',
        type_animal: 'cachorro', 
        age_in_month: 12,
        size: 'PEQUENO'
      }
    })

    await prisma.adoptionAnimal.create({
      data: {
        animal_id: animal.id,
        organization_id: organization.id
      }
    })

    const response = await request(app)
      .get('/adoption_animal/list')
      .query({
        state: 'são paulo',
        city: 'guarulhos'
      })
      .send({
        animal_id: animal.id,
      })

    console.log(response.body)

    expect(response.status).toBe(200)
  })
})