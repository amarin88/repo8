import mongoose from "mongoose"; //Importamos mongoose

const cartCollection = "carts"; //Nombre de la colección

const cartSchema = new mongoose.Schema({
  products: {
    type: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "products" }, quantity: Number }],
  }
}); //Esquema del carrito, array de objetos que va a mostrar el producto con su objectId que va a tomar como referencia products y la cantidad agregada o quantity

cartSchema.pre("find", function () {
  this.populate("products.product");
});//Middleware de mongoose para hacer la populación del carrito con los productos dentro del carrito

export const cartModel = mongoose.model(cartCollection, cartSchema);