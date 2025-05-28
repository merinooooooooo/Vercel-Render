import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";  // Importamos bcryptjs

const clientsSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    correo: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },

    contraseña: {
      type: String,
      required: true,
    },

    edad: {
      type: Number,
      required: true,
      min: 18,
    },

    paisDeResidencia: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Encriptar la contraseña antes de guardar el cliente
clientsSchema.pre("save", async function(next) {
  if (!this.isModified("contraseña")) return next();  // Solo encripta si la contraseña ha sido modificada

  const salt = await bcrypt.genSalt(10);  // Generamos un "salt"
  this.contraseña = await bcrypt.hash(this.contraseña, salt);  // Encriptamos la contraseña
  next();
});

export default model("clients", clientsSchema);
