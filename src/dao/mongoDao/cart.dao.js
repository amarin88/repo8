import { cartModel } from "../models/cart.model.js"; //Importamos el esquema de carritos
import { productModel } from "../models/product.model.js"; //Importamos el esquema de productos

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
}; //Función asincrona que recibe un id, busca el carrito que contenga ese id y lo retorna

const create = async (data) => {
  const cartCreated = await cartModel.create(data);
  return cartCreated;
}; //Función asincrona que recibe la data que contendrá el carrito, y devuelve el carrito creado

const addProductToCart = async (cid, pid) => {
  const product = await productModel.findById(pid); //Buscamos el producto por id
  if (!product) return { product: false }; //Si no lo encuentra responde false
  const cart = await cartModel.findById(cid); //Buscamos el carrito por id
  if (!cart) return { cart: false }; //Si el carrito no se encuentra devolvemos false

  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } }
  );
  //Buscamos el carrito por id en la base de datos, buscamos el producto en el array a traves de mongoose por id. Actualizamos la quantity sumandole 1 a traves del operador de mongoose llamado inc

  if (!productInCart) {
    await cartModel.findOneAndUpdate(
      { _id: cid },
      { $push: { products: { product: pid, quantity: 1 } } }
    );
  } // Si el producto no se encuentra en el carrito, actualizamos el carrito por id haciendo un push en el array de productos a través del pid sumandole 1 a la quantity

  const cartUpdated = await cartModel.findById(cid); //Buscamos el carrito actualizado
  return cartUpdated; //Retornamos el carrito con el producto agregado
};
//Función asincrona que recibe el id del carrito y el id de un producto, busca el id del producto, sino lo encuentra arroja error, si lo encuentra busca el carrito por id para agregarlo, en caso de no encontrar el carrito también arroja error. Si la funcion se cumple devuelve el carrito con el producto agregado

const deleteProductInCart = async (cid, pid) => {
  const product = await productModel.findById(pid); //Buscamos el producto por id
  if (!product) return { product: false }; // Si el producto no existe devuelve false

  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": -1 } }
  );
  //Buscamos el carrito por id en la base de datos, buscamos el producto en el array a traves de mongoose por id. Actualizamos la quantity restandole 1 a traves del operador de mongoose llamado inc

  if (!cart) return { cart: false }; //Si el carrito no se encuentra devolvemos false

  const cartUpdated = await cartModel.findById(cid); // Una vez actualizado en carrito lo buscamos por id
  return cartUpdated; //Retornamos el carrito actualizado
}; //Función asincrona que recibe el id del carrito y el id del producto para eliminarlo del carrito

const update = async (cid, body) => {
  const cart = await cartModel.updateOne(
    { _id: cid },
    { $set: { products: body } },
    { new: true }
  ); //Actualizamos el carrito con la data recibida

  if (!cart) return { cart: false }; //Si no encuentra el carrito retorna false
  const cartUpdated = await cartModel.findById(cid); //Buscamos el carrito por id actualizado
  return cartUpdated; //Retornamos el carrito actualizado
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  const product = await productModel.findById(pid); //Buscamos el producto por id
  if (!product) return { product: false }; // Si no encuentra el producto retorna false

  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } }
  );
  //Buscamos el carrito por id en la base de datos, buscamos el producto en el array a traves de mongoose por id. Actualizamos la quantity con el parametro recibido
  if (!cart) return { cart: false }; //Si no encuentra el carrito retorna false

  const cartUpdated = await cartModel.findById(cid); //Buscamos el carrito por id actualizado
  return cartUpdated; //Retornamos el carrito actualizado
};

const deleteAllProductsInCart = async (cid) => {
  const cart = await cartModel.findByIdAndUpdate(cid, {
    $set: { products: [] },
  }); //Busca el carrito por id y setea el array de productos en 0

  const cartEmpty = await cartModel.findById(cid); //Buscamos el carrito por id vaciado
  return cartEmpty; //Retornamos el carrito vacio
};

export default {
  getById,
  create,
  addProductToCart,
  update,
  updateQuantityProductInCart,
  deleteProductInCart,
  deleteAllProductsInCart,
}; //Exportamos todas las funciones
