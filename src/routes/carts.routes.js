// Importación del router de Express
import { Router } from "express";
// Importación del manager de los carritos
import cartDao from "../dao/mongoDao/cart.dao.js"; //Importamos el Dao del carrito
import { passportCall, authorization } from "../middlewares/passport.middleware.js";//Importamos el middleware de rol de usuario

// Creación del router
const router = Router();

// Ruta para crear un nuevo carrito
router.post("/", authorization("user"), async (req, res) => {
  try {
    const cart = await cartDao.create(); //Crea el carrito en la base de datos

    res.status(201).json({ status: "success", payload: cart }); // Responde con el carrito creado y el código de estado 201 (creado)
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.status(500).json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

// Ruta para obtener los productos de un carrito por su ID
router.get("/:cid", passportCall("jwt"), authorization("user"), async (req, res) => {
  try {
    const { cid } = req.params; // Obtiene el parámetro de la ruta "cid" (cart id)
    const cart = await cartDao.getById(cid); //Obtiene el carrito por id en la base de datos

    if (!cart) {
      return res
        .status(404)
        .json({ status: "Error", response: `Cart with ID ${cid} not found.` });
    } //Si no encuentra el carrito retorna un error

    res.status(200).json({ status: "success", payload: cart }); // Responde con los productos del carrito y el código de estado 200 (éxito)
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.status(500).json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

// Ruta para agregar un producto a un carrito
router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), async (req, res) => {
  try {
    const { cid, pid } = req.params; // Obtiene los parámetros de la ruta "cid"(cart id) y "pid" (product id)

    const cart = await cartDao.addProductToCart(cid, pid); //Recibe el id del carrito y del producto, y agrega el producto al carrito de la base de datos

    if (cart.product == false)
      return res.status(404).json({
        status: "Error",
        response: `Product with ID ${pid} doesn't found.`,
      }); //Si no encuentra el producto por id en la base de datos arroja error
    if (cart.cart == false)
      return res.status(404).json({
        status: "Error",
        response: `Cart with ID ${cid} not found.`,
      }); //Si no encuentra el carrito por id en la base de datos arroja error

    res.status(201).json({ status: "success", payload: cart }); // Responde con el carrito actualizado en la base de datos
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.status(500).json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

//Ruta para actualizar un carrito por ID
router.put("/:cid", passportCall("jwt"), authorization("user"), async (req, res) => {
  try {
    const { cid } = req.params; // Obtenemos el id del carrito por parámetro
    const body = req.body; // Obtenemos el cuerpo de la solicitud

    const cart = await cartDao.update(cid, body); // Actualizamos el carrito en la base de datos con la data recibida
    if (!cart)
      return res
        .status(404)
        .json({
          status: "Error",
          response: `Cart with ID ${cid} not found or no changes were made.`,
        }); //Si no encuentra el carrito retorna un error

    res.status(200).json({ status: "success", payload: cart }); // Responde con los productos del carrito actualizados y el código de estado 200 (éxito)
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.status(500).json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

//Ruta para modificar la quantity del producto por parametro
router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), async (req, res) => {
  try {
    const { cid, pid } = req.params; //Obtenemos el id del carrito y del producto por parametro
    const { quantity } = req.body; //Obtenemos la quantity por el cuerpo de la solicitud

    const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity); //Actualizamos el carrito en la base de datos con la data recibida en quantity
    if (cart.product == false)
      return res
        .status(404)
        .json({
          status: "Error",
          response: `Product with ID ${pid} is not found`,
        }); //Si no encuentra el producto devuelve false
    if (cart.cart == false)
      return res
        .status(404)
        .json({ status: "Error", response: `Cart with ID ${cid} not found.` }); // Si no encuentra el carrito devuelve false

    res.status(200).json({ status: "success", payload: cart }); //Devuelve el carrito actualizado
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.status(500).json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

//Ruta para borrar un producto del carrito por ID
router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), async (req, res) => {
  try {
    const { cid, pid } = req.params; // Obtiene el parámetro de la ruta "cid" (cart id) y "pid" (product id)
    const cart = await cartDao.deleteProductInCart(cid, pid); //Elimina el producto del carrito
    if (cart.product == false)
      return res.status(404).json({
        status: "Error",
        response: `Product with ID ${pid} is not found`,
      });
    if (cart.cart == false)
      return res.status(404).json({
        status: "Error",
        response: `Cart with ID ${cid} is not found`,
      });

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.status(500).json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

//Ruta para vaciar el carrito por ID
router.delete("/:cid", passportCall("jwt"), authorization("user"), async (req, res) => {
  try {
    const { cid } = req.params; // Obtiene el parámetro de la ruta "pid" (product id)

    const cart = await cartDao.deleteAllProductsInCart(cid); //Obtiene el carrito por id y borra los productos
    if (!cart)
      return res.status(404).json({
        status: "Error",
        response: `Cart with ID ${cid} is not found`,
      });
    //Si no encuentra el carrito por id retorna error
    res.status(200).json({ status: "success", payload: cart }); //Devuelve el carrito vacio
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.status(500).json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

// Exporta el router
export default router;
 