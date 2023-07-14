import { AdoptionAnimalDTO } from "@/dtos/adoption-animal-dto";
import { AdoptionAnimalRepository, CreateAdoptionAnimal, FindAdoptionAnimal } from "../adoption-animal-repository";
import { randomUUID } from "crypto";
import { AnimalDTO } from "@/dtos/animal-dto";

export class AdoptionAnimalInMemoryRepository implements AdoptionAnimalRepository {
  public items: AdoptionAnimalDTO[] = []
  public organizations: any[] = []
  public animals: AnimalDTO[] = []

  async create({ animal_id, organization_id }: CreateAdoptionAnimal) {
    const adoptionAnimal = {
      id: randomUUID(),
      animal_id,
      organization_id,
      created_at: new Date(), 
      wasAdopted: null,
    }

    this.items.push(adoptionAnimal)

    return adoptionAnimal
  }

  async findManyByOrganizationStateAndCityAndAnimalCharacteristics({ 
    state, 
    city, 
    type_animal, 
    age_in_month, 
    size 
  }: FindAdoptionAnimal) {
    const animals = this.animals.filter((animal) => {
      return (type_animal ? animal.type_animal === type_animal : animal) 
        && (age_in_month ? animal.age_in_month === age_in_month : animal) 
        && (size ? animal.size === size : animal) 
    })

    const organizations = this.organizations.filter((organization) => {
      return (state ? organization.state === state : organization) && (city ? organization.city === city : organization)
    })

    return this.items.filter((adoptionAnimal) => {
      const animal = animals.find((animal) => animal.id === adoptionAnimal.animal_id) 
      const organization = organizations.find((organization) => organization.id === adoptionAnimal.organization_id) 

      if (animal && organization) {
        return adoptionAnimal
      }

      return false
    })
  }
}