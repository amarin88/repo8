import mongoose from "mongoose";

const urlDb =
  "mongodb+srv://admin:admin123456@codercluster0.0at1r6e.mongodb.net/ecommerce";

export const connectMongoDB = async () => {
  try {
    // Conexión con la base de datos
    mongoose.connect(urlDb);
    console.log("MongoDB successfully connected");
  } catch (error) {
    console.log(error);
  }
};