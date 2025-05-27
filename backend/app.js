import express from "express";
import cookieParser from "cookie-parser";
import gameRoutes from "./src/routes/games.js";


const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/games", gameRoutes);



export default app;