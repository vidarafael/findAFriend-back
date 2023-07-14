export interface AdoptionAnimalDTO {
  id: string
  organization_id: string
  animal_id: string
  created_at: Date 
  wasAdopted?: Date | null
}