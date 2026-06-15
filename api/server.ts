import "dotenv/config";
import express from "express";
import healthRoutes from "./src/routes/healthRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoute.js";
import productRoutes from "./src/routes/productRoute.js";
import globalErrorHandler from "./src/middleware/errorHandler.js";
import { protect } from "./src/middleware/authMiddleware.js";
import path from "path";

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(protect);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.use(globalErrorHandler);

app.listen(process.env.BACKEND_PORT, () => console.log("App listening at port 5173!"));
