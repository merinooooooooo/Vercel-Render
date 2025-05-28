import express from "express";
import cookieParser from "cookie-parser";
import gameRoutes from "./src/routes/games.js";
import clientsRoutes from "./src/routes/clients.js";

import cors from 'cors';


const app = express();

app.use(cors(
    {origin:"*",}
)); // Permite todas las solicitudes CORS



app.use(express.json());

app.use(cookieParser());

app.use("/api/games", gameRoutes);
app.use("/api/clients", clientsRoutes);




export default app;