import { Request, Response, Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/", (req: Request, res: Response ) => res.status(200).json({message: "The API is healthy!"}));

export default healthRoutes