import mongoose from "mongoose"; //Importamos mongoose
import mongoosePaginate from "mongoose-paginate-v2"; // Importamos paginate de mongoose

const productCollection = "products"; // Nombre de la colección

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  thumbnail: {
    type: Array,
    default: [],
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}); // Esquema completo del producto, con todos los campos requeridos

productSchema.plugin(mongoosePaginate); // Instalación del plugin para hacer la instalación

export const productModel = mongoose.model(productCollection, productSchema);
