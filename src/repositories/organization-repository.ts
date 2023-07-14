import { OrganizationDTO } from "@/dtos/organization-dto";
import { Decimal } from "@prisma/client/runtime/library";

export type CreateOrganization = Omit<OrganizationDTO, 'id' | 'created_at'>
export type CreateOrganizationReturn = Omit<OrganizationDTO, 'latitude' | 'longitude'> & { latitude: Decimal, longitude: Decimal  }
export type FindOrganizationByEmail = Pick<OrganizationDTO, 'email' >
// type OrganizationDTOToPrisma = Omit<OrganizationDTO, 'longitude' | 'latitude'> & { longitude: Decimal, latitude: Decimal }



export interface OrganizationRepository {
  create({ name, city, email, password_hash, state, phone, latitude, longitude }: CreateOrganization): Promise<CreateOrganizationReturn>
  findByEmail({ email }: FindOrganizationByEmail): Promise<OrganizationDTO | null>
}