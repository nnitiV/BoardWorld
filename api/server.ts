import express from "express";
import healthRoutes from "./src/routes/healthRoutes.js"
import authRoutes from "./src/routes/authRoutes.js"

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes)
app.use("/api/auth", authRoutes)

app.listen(5173, () => console.log("App listening at port 5173!"));
