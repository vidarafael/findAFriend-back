import { Decimal } from "@prisma/client/runtime/library"

export interface OrganizationDTO {
  id: string
  name: string
  email: string
  password_hash: string
  state: string
  city: string
  phone: string
  longitude: number | Decimal
  latitude: number | Decimal
  created_at: Date      
}