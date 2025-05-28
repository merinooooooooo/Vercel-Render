import express from "express";
import clientsController from "../controllers/clientsController.js";

const router = express.Router();

// Rutas para manejar clientes
router
   .route("/clients")
   .get(clientsController.getClients)      // Obtener todos los clientes
   .post(clientsController.createClients);  // Crear un nuevo cliente

router
   .route("/clients/:id")
   .put(clientsController.updateClients)    // Actualizar un cliente
   .delete(clientsController.deleteClients); // Eliminar un cliente

export default router;
