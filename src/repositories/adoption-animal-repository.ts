import { AdoptionAnimalDTO } from "@/dtos/adoption-animal-dto";
import { Size } from "@prisma/client";

export type CreateAdoptionAnimal = Omit<AdoptionAnimalDTO, 'id' | 'created_at' | 'wasAdopted'>
export interface FindAdoptionAnimal { 
  state: string 
  city: string 
  type_animal?: string
  age_in_month?: number
  size?: Size  
}

export interface AdoptionAnimalRepository {
  create({ animal_id, organization_id }: CreateAdoptionAnimal): Promise<AdoptionAnimalDTO>
  findManyByOrganizationStateAndCityAndAnimalCharacteristics({ 
    state, 
    city, 
    type_animal, 
    age_in_month, 
    size
  }: FindAdoptionAnimal): Promise<AdoptionAnimalDTO[]>
}

