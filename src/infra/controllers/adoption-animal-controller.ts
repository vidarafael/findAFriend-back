import { makeCreateAdoptionAnimalUseCase } from "@/use-cases/adoption-animal/factories/make-create-adoption-animal-use-case";
import { makeListAvaliablesAdoptionAnimalByCityAndAnimalCharactericsUseCase } from "@/use-cases/adoption-animal/factories/make-list-avaliables-adoption-animal-by-city-and-animal-characteristics-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export class AdoptionAnimalController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      animal_id: z.string().uuid()
    })

    const organizationSchema = z.object({
      id: z.string().uuid()
    })

    const { animal_id } = bodySchema.parse(request.body)
    const { id } = organizationSchema.parse(request.organization)

    const useCase = makeCreateAdoptionAnimalUseCase()

    await useCase.execute({ animal_id, organization_id: id })

    response.status(201).send()
  }

  async list(request: Request, response: Response) {
    const querySchema = z.object({
      city: z.string(), 
      state: z.string(),  
      type_animal: z.string().optional(),
      age_in_month: z.coerce.number().optional(),
      size: z.enum(["PEQUENO", "MEDIO", "GRANDE"]).optional() 
    })

    const { city, state, type_animal, age_in_month, size } = querySchema.parse(request.query)

    const useCase = makeListAvaliablesAdoptionAnimalByCityAndAnimalCharactericsUseCase()

    const { adoptionAnimals } = await useCase.execute({ city, state, type_animal, age_in_month, size })

    response.status(200).send({ adoptionAnimals })
  }
}