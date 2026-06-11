import express from "express";
import healthRoutes from "./src/routes/healthRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"

const app = express();

app.use("/api/health", healthRoutes)
app.use("/api/user", userRoutes)

app.listen(5173, () => console.log("App listening at port 5173!"));
