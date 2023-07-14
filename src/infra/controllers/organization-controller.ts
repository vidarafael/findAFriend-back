import { configToken } from "@/configs/token";
import { makeAuthenticateOrganizationUseCase } from "@/use-cases/organization/factories/make-authenticate-organization-use-case";
import { makeCreateOrganizationUseCase } from "@/use-cases/organization/factories/make-create-organization-use-case";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { z } from "zod";

export class OrganizationController {
  async authenticate(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const { email, password } = bodySchema.parse(request.body)

    const useCase = makeAuthenticateOrganizationUseCase()

    const { organization } = await useCase.execute({ email, password })

    const token = sign({}, configToken.JWT_SECRET, {
      expiresIn: configToken.JWT_EXPIRES_IN,
      subject: organization.id
    })

    response.status(200).json({ token })
  }

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      state: z.string(),
      city: z.string(),
      phone: z.string(),
      longitude: z.number(),
      latitude: z.number(),
    })

    const { name, email, password, city, state, phone, latitude, longitude } = bodySchema.parse(request.body)

    const useCase = makeCreateOrganizationUseCase()

    const { organization } = await useCase.execute({ name, email, password, city, state, phone, latitude, longitude })

    const objToResponse = { ...organization, password_hash: undefined }

    response.status(201).send({ organization: objToResponse })
  }
}