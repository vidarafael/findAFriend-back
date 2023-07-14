import { randomUUID } from "crypto";
import { CreateOrganization, FindOrganizationByEmail, OrganizationRepository } from "../organization-repository";
import { OrganizationDTO } from "@/dtos/organization-dto";
import { Decimal } from "@prisma/client/runtime/library";

export class OrganizationInMemoryRepository implements OrganizationRepository {
  public items: OrganizationDTO[] = []

  async create({ name, city, email, password_hash, state, phone, latitude, longitude }: CreateOrganization) {
    const organization = {
      id: randomUUID(),
      name,
      city,
      email,
      password_hash,
      state,
      phone,
      latitude: new Decimal(latitude),
      longitude: new Decimal(longitude),
      created_at: new Date()
    } as any

    this.items.push(organization)

    return organization
  }

  async findByEmail({ email }: FindOrganizationByEmail) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }
}