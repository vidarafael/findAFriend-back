import { describe, it, expect } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { prisma } from "@/prisma";

describe('Organization Controller (E2E)', () => {
  it('Should be able create organization', async () => {
    const response = await request(app).post('/organization/register').send({
      name: 'ORG Pets', 
      email: 'orgpet@hotmail.com', 
      password: 'secretpassword',
      city: 'guarulhos',
      state: 'são paulo',
      phone: '11 99999-9999',
      latitude: 1,
      longitude: 1
    })

    expect(response.status).toBe(201)
  })

  it('Should be able authenticated organization', async () => {
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

    const response = await request(app).post('/organization/session').send({
      email: 'orgpet@hotmail.com', 
      password: 'secretpassword',
    })

    expect(response.statusCode).toBe(200)
  })
})