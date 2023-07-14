import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository"
import { CreateOrganizationUseCase } from "../create-organization"

export function makeCreateOrganizationUseCase() {
  const repository = new PrismaOrganizationRepository()

  const useCase = new CreateOrganizationUseCase(repository)

  return useCase
}