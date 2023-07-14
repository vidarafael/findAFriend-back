import { Size } from "@prisma/client"

export interface AnimalDTO {
  id: string
  name: string | null
  image?: string | null
  age_in_month: number
  type_animal: string
  size: Size   
  created_at: Date      
}