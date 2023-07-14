import { Router } from "express";
import { organizationRoute } from "./organization-route";
import { animalRoute } from "./animal-route";
import { adoptionAnimalRoute } from "./adoption-animal-route";

const routes = Router()

routes.use('/organization', organizationRoute)
routes.use('/animal', animalRoute)
routes.use('/adoption_animal', adoptionAnimalRoute)

export { routes }