import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository"
import { AuthenticateOrganizationUseCase } from "../authenticate-organization"


export function makeAuthenticateOrganizationUseCase() {
  const repository = new PrismaOrganizationRepository()

  const useCase = new AuthenticateOrganizationUseCase(repository)

  return useCase
}