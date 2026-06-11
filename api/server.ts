import express from "express";
import healthRoutes from "./src/routes/healthRoutes.js"

const app = express();

app.use("/api/health", healthRoutes)

app.listen(5173, () => console.log("App listening at port 5173!"));
