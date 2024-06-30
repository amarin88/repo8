import { productModel } from "../models/product.model.js"; //Importamos el esquema de productos

const getAll = async (query, options) => {
  const products = await productModel.paginate(query, options);
  return products;
}; //Función asincrona para traer todos los productos, retorna todos los productos encontrados recibiendo las querys y las opciones configuradas de paginación

const getById = async (id) => {
  const product = await productModel.findById(id);
  return product;
}; //Función asincrona que recibe un id, busca el producto que contenga ese id y lo retorna

const create = async (data) => {
  const product = await productModel.create(data);
  return product;
}; //Función asincrona que recibe la data que contendrá el producto, y devuelve el producto creado

const update = async (id, data) => {
  await productModel.findByIdAndUpdate(id, data);
  const product = await productModel.findById(id);
  return product;
}; // Función asincrona que recibe el id del producto y la data con la cual se actualizará el producto, una vez actualizado busca el producto por id y lo retorna

const deleteOne = async (id) => {
  const product = await productModel.deleteOne({ _id: id }); //EL id tiene que coincidir con el de la base de datos de mongo
  if (product.deletedCount === 0) return false;
  return true;
}; //Función asincrona que elimina el producto por id

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
}; //Exportamos todas las funciones
