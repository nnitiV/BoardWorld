import "dotenv/config";
import express from "express";
import healthRoutes from "./src/routes/healthRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoute.js";
import globalErrorHandler from "./src/middleware/errorHandler.js";
import { protect } from "./src/middleware/authMiddleware.js";

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use(protect);
app.use("/api/user", userRoutes);

app.use(globalErrorHandler);

app.listen(5173, () => console.log("App listening at port 5173!"));
