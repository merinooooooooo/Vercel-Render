/*\
Juegos:

NombreDelJuego
Categoria
Apuesta minima
Apuesta maxima
*/


import { Schema, model} from 'mongoose';

const gamesSchema = new Schema(
    {
        nombre:{
            type: String,
        },
        categoria:{
            type: String,
        },
        ApMinima:{
            type: Number,
        },
        ApMaxima: {
            type: Number,
        },
    },
    {
        timestamps: true,
        strict:false,
    }
);

export default model ("games", gamesSchema);