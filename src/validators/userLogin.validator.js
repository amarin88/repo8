import { body, validationResult } from "express-validator"; //Importamos express-validator

export const userLoginValidator = [
  body("email")
    .isEmail().withMessage("Incorrect email") //Chequea que el dato que se introduce por body posea @ y .com(etcetera)
    .notEmpty().withMessage("Email must be obligatory"), //Que no se introduzcan datos vacios
  body("password").notEmpty().withMessage("Password must be obligatory"), //Que no se introduzcan datos vacios como password
  (req, res, next) => {
    const errors = validationResult(req); //Validamos todo(params, querys) lo que recibimos por request

    if (!errors.isEmpty()) {//Validamos que si error no viene vacio
        //Seteamos el formato de los errores
        const setErrors = errors.array().map( e => {return {msg: e.msg , data: e.path}})

        
      return res.status(400).json({ status: "error", errors: setErrors });//Devolvemos el/los error/es
    }
    next(); //En el caso de que no haya errores continuamos
  },
];
