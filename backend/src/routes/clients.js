import express from 'express';
import clientsController from '../controllers/clientsController.js';

const router = express.Router();

// Rutas para manejar clientes
router.get("/clients", clientsController.getClients);          // Obtener todos los clientes
router.post("/clients", clientsController.createClient);      // Crear un nuevo cliente
router.delete("/clients/:id", clientsController.deleteClient); // Eliminar un cliente
router.put("/clients/:id", clientsController.updateClient);   // Actualizar un cliente

export default router;
