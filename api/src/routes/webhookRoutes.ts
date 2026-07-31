import { Router, raw } from "express";
import * as webhookController from "../controller/webhookController.js";

const webhookRoutes = Router();

// Use express.raw({ type: 'application/json' }) ONLY for the webhook route
webhookRoutes.post(
  "/stripe",
  raw({ type: "application/json" }),
  webhookController.handleStripeWebhook,
);

export default webhookRoutes;