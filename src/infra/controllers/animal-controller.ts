import { makeCreateAnimalUseCase } from "@/use-cases/animal/factories/make-create-animal-use-case";
import { makeFindAnimalUseCase } from "@/use-cases/animal/factories/make-find-animal-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export class AnimalController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string(),
      age_in_month: z.number().default(0),
      type_animal: z.string(),
      size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']),
    })

    const { name, type_animal, age_in_month, size } = bodySchema.parse(request.body)

    const useCase = makeCreateAnimalUseCase()

    await useCase.execute({ name, type_animal, age_in_month, size })

    response.status(201).send()
  }

  async find(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const { id } = paramsSchema.parse(request.params)

    const useCase = makeFindAnimalUseCase()

    const { animal } = await useCase.execute({ id })

    response.status(200).send({ animal })
  }
}