import { Router } from "express";
import { OrganizationController } from "../controllers/organization-controller";

const organizationRoute = Router()
const organizationController = new OrganizationController()

organizationRoute.post('/session', organizationController.authenticate)
organizationRoute.post('/register', organizationController.create)

export { organizationRoute }