import { Router } from "express";
import { AnimalController } from "../controllers/animal-controller";
import { isAuthenticated } from "@/shared/middlewares/is-authenticated";

const animalRoute = Router()
const animalController = new AnimalController()

animalRoute.get('/:id', animalController.find)

animalRoute.post('/register', isAuthenticated, animalController.create)

export { animalRoute }