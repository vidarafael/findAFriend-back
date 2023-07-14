import { CreateOrganization, FindOrganizationByEmail, OrganizationRepository } from "../organization-repository"
import { prisma } from "@/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export class PrismaOrganizationRepository implements OrganizationRepository {
  async create({ name, city, email, password_hash, state, phone, latitude, longitude }: CreateOrganization) {
    const organization = await prisma.organization.create({
      data: {
        name,
        city,
        email,
        password_hash,
        state,
        phone,
        latitude: new Decimal(latitude),
        longitude: new Decimal(longitude)
      }
    })

    return organization
  }

  async findByEmail({ email }: FindOrganizationByEmail) {
    const organization = await prisma.organization.findUnique({
      where: {
        email
      }
    })

    return organization
  }
  
}