import { Router } from "express";
import { isAuthenticated } from "@/shared/middlewares/is-authenticated";
import { AdoptionAnimalController } from "../controllers/adoption-animal-controller";

const adoptionAnimalRoute = Router()
const adoptionAnimalController = new AdoptionAnimalController()

adoptionAnimalRoute.get('/list', adoptionAnimalController.list)

adoptionAnimalRoute.post('/register', isAuthenticated, adoptionAnimalController.create)

export { adoptionAnimalRoute }