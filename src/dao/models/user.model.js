import mongoose from "mongoose"; //Importamos mongoose

const userCollection = "user"; //Nombre de la colección

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    age: Number,
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}); //Esquema del usuario, array de objetos que va a mostrar el usuario con su objectId


export const userModel = mongoose.model(userCollection, userSchema);