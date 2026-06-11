import { Request, Response, Router } from "express";
import { prisma } from "../config/db.js";

const healthRoutes = Router();

healthRoutes.get("/", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({ status: "UP", database: "CONNECTED" });
  } catch (error) {
    res.status(503).json({ status: "DOWN", database: "DISCONNECTED" });
  }
});

export default healthRoutes;
