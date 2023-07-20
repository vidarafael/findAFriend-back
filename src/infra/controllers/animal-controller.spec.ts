import { describe, it, expect, afterEach } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { prisma } from "@/prisma";

describe('Animal Controller (E2E)', () => {
  afterEach(async () => {
    await prisma.organization.deleteMany()
    await prisma.animal.deleteMany()
  })
 
  it('Should be able create animal', async () => {
    await request(app).post('/organization/register').send({
      name: 'ORG Pets', 
      email: 'orgpet@hotmail.com', 
      password: 'secretpassword',
      city: 'guarulhos',
      state: 'são paulo',
      phone: '11 99999-9999',
      latitude: 1,
      longitude: 1
    })

    const authResponse = await request(app).post('/organization/session').send({
      email: 'orgpet@hotmail.com', 
      password: 'secretpassword',
    })

    const { token } = authResponse.body

    const response = await request(app)
      .post('/animal/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Tedd',
        type_animal: 'cachorro',
        age_in_month: 12,
        size: 'PEQUENO'
      })

    expect(response.status).toBe(201)
  })

  it('Should be able find animal by id', async () => {
    const animal = await prisma.animal.create({
      data: {
        name: 'Tedd',
        type_animal: 'cachorro',
        age_in_month: 12,
        size: 'PEQUENO',
      }
    })

    const response = await request(app).get(`/animal/${animal.id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      animal: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        type_animal: expect.any(String),
        age_in_month: expect.any(Number),
        size: expect.any(String),
        image: null,
        created_at: expect.any(Date)
      })
    }))
  })
})