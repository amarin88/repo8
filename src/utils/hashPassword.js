import bcrypt from "bcrypt";

export const createHash = (password) => {
    return bcrypt.hashSync(password , bcrypt.genSaltSync(10));
}; //Configuración de bcrypt para hashing de la contraseña del cliente, establecida en 10 caracteres de forma estandar

export const isValidPassword = (user , password) => {
    return bcrypt.compareSync(password , user.password );
}// Configuración de bcrypt para validación de contraseña del cliente. Recibe la data de usuario y contraseña cómo string y la compara para ver si coincide