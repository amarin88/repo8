//Módulo de Filesystem
import fs from "fs";

let products = []; //Array para almacenar los productos
let pathFile = "./src/data/products.json"; //Ruta del archivo JSON donde se almacenarán los productos.


//Función asíncrona para agregar un producto al archivo JSON
const addProduct = async (product) => {
  const { title, description, price, thumbnail, code, stock } = product; //Extrae los datos del producto
  await getProducts(); //Obtiene los productos existentes
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status: true,
  };//Crea un nuevo producto con un ID único y autoincremental

  if (Object.values(newProduct).includes(undefined)) {
    console.log("All entries are required");
    return;
  };//Verifica si algún valor es undefined

  const codeAlreadyExists = products.find((product) => product.code === code);
  if (codeAlreadyExists) {
    console.log(`${code} already exists.`);
    return;
  }; //Verifica si ya existe un producto con el mismo código

  products.push(newProduct); //Agrega el nuevo producto al array

  await fs.promises.writeFile(pathFile, JSON.stringify(products)); //Escribe los productos en el archivo JSON
  return newProduct;
};

//Función asíncrona para obtener los productos desde el archivo JSON
const getProducts = async (limit) => {
  const productsJson = await fs.promises.readFile(pathFile, "utf-8");
  products = JSON.parse(productsJson) || []; //Lee el archivo JSON y parsea los productos
  if (!limit) return products; //Si no se especifica un límite, devuelve todos los productos

  return products.slice(0, limit);
};

//Función asíncrona para obtener un producto por su ID
const getProductById = async (id) => {
  await getProducts(); //Obtiene todos los productos
  const product = products.find((product) => product.id === parseInt(id)); //Busca un producto por su ID
  if (!product) {
    const error = new Error(`Product with id: ${id} is not found`);
    error.status = 404;
    throw error;
  }; //Si no se encuentra el producto, muestra un mensaje y devuelve error

  console.log(product);
  return product;
}; //Si no devuelve el producto encontrado

//Función asíncrona para actualizar un producto
const updateProduct = async (id, dataProduct) => {
  await getProducts(); //Obtiene todos los productos
  const index = products.findIndex((product) => product.id === parseInt(id)); //Encuentra el id del producto a actualizar
  products[index] = {
    ...products[index],
    ...dataProduct,
  }; //Actualiza el producto con los nuevos datos
  await fs.promises.writeFile(pathFile, JSON.stringify(products)); //Escribe los productos actualizados en el archivo JSON
  return products[index];
};

// Función asíncrona para eliminar un producto por su ID
const deleteProduct = async (id) => {
  await getProducts(); //Obtiene todos los productos
  products = products.filter((product) => product.id !== parseInt(id)); //Filtra los productos y excluye el que coincida con el ID dado
  await fs.promises.writeFile(pathFile, JSON.stringify(products)); //Escribe los productos actualizados en el archivo JSON
};

// Exportamos todas las funciones como un objeto
export default {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};