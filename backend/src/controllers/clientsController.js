const clientsController = {};
import clientsModel from "../models/clients.js";

// SELECT
clientsController.getclients = async (req, res) => {
  const clientes = await clientsModel.find();
  res.json(clientes);
};

// INSERT
clientsController.createclients = async (req, res) => {
  const { nombre, correo,contraseña,edad, paisDeResidencia } = req.body;
  const newclients = new clientsModel({ nombre, correo,contraseña,edad, paisDeResidencia});
  await newclients.save();
  res.json({ message: "clients save" });
};

// DELETE
clientsController.deleteclients = async (req, res) => {
const deletedclients = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedclients) {
    return res.status(404).json({ message: "clients dont find" });
  }
  res.json({ message: "clients deleted" });
};

// UPDATE
clientsController.updateclients = async (req, res) => {
  // Solicito todos los valores
  const { nombre, correo,contraseña,edad, paisDeResidencia  } = req.body;
  // Actualizo
  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
        nombre, 
        correo, 
        contraseña,
        edad, 
        paisDeResidencia, 
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "clients update" });
};

export default clientsController;