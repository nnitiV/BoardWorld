import "dotenv/config";
import express from "express";
import cors from "cors";
import healthRoutes from "./src/routes/healthRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoute.js";
import cartRoutes from "./src/routes/cartRoute.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import webhookRoutes from "./src/routes/webhookRoutes.js";
import productRoutes from "./src/routes/productRoute.js";
import deviceRoutes from "./src/routes/deviceRoutes.js";
import globalErrorHandler from "./src/middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import { protect } from "./src/middleware/authMiddleware.js";
import path from "path";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",          
  "https://boardworld.vercel.app",  
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by Board World CORS Policy"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization", "X-Device-Id"],
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api/webhooks", webhookRoutes);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/products", productRoutes);
app.use(protect);
app.use("/api/device", deviceRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)

app.use(globalErrorHandler);

app.listen(process.env.BACKEND_PORT, () => console.log("App listening at port 5173!"));
