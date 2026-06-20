import { Router } from "express";
import * as deviceController from "../controller/deviceController.js"

const deviceRoutes = Router();

deviceRoutes.get("/", deviceController.getMyDevices)
deviceRoutes.delete("/", deviceController.revokeDevice)

export default deviceRoutes;