import { userModel } from "../models/user.model.js";

const getAll = async () => {
  const users = await userModel.find();
  return users;
};//Función asincrona para traer todos los usuarios

const getById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};//Función asincrona para traer todos los usuarios por id

const getByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};//Función asincrona para traer todos los usuarios por email

const create = async (data) => {
  const user = await userModel.create(data);
  return user;
};//Función asincrona para crear usuarios

const update = async (id, data) => {
  await userModel.findByIdAndUpdate(id, data);
  const user = await userModel.findById(id);
  return user;
};//Función asincrona para actualizar los datos de los usuarios

const deleteOne = async (id) => {
  const user = await userModel.deleteOne({ _id: id });
  if (user.deletedCount === 0) return false;
  return true;
};//Función asincrona para eliminar usuarios por id

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  getByEmail
};