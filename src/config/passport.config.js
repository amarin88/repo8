import passport from "passport"; //Importación de passport
import local from "passport-local"; // Importación de passport local
import google from "passport-google-oauth20"; //Importación de passport de google
import jwt from "passport-jwt";//Importación de passport de jwt
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) =>{
  let token = null;

  if(req && req.cookies ){
    token = req.cookies.token;
  }

  return token;
};


const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true, //Permite recibir las request del usuario
        usernameField: "email",
      }, // Toma el campo "email" y lo sincroniza con el username de passport }
      async (req, username, password, done) => {
        //Done es una función de passport que tenemos que llamar para finalizar la autenticación
        try {
          const { first_name, last_name, email, age, role } = req.body; // Traemos por body los parametros del usuario
          const user = await userDao.getByEmail(username); //A través del dao buscamos el usuario por email
          if (user)
            return done(null, false, { response: "User already exists" }); //Validamos que el usuario no exista, "null" implica que no hay error, "false" es porque no se cumple la condición por ende enviamos un mensaje  de respuesta

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role
          }; //Creamos a traves de un array de objetos el usuario con la contraseña encryptada por bcrypt

          const createUser = await userDao.create(newUser); //A traves del dao creamos el usuario
          return done(null, createUser); //Utilizamos la funcion done() para completar la estrategia de passport local, "null" implica que no hay error y mostramos el usuario creado
        } catch (error) {
          return done(error); //En caso de no poder crear el usuario a traves de la funcion done() retornamos el error
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" }, //En este caso utilizampos el email como username
      async (username, password, done) => {
        try {
          const user = await userDao.getByEmail(username); //A traves del dao buscamos el usuario en la base de datos por el email
          if (!user || !isValidPassword(user, password))
            return done(null, false, { response: "Invalid email or password" }); //Validamos que el usuario exista por email

          return done(null, user); //Si los datos son correctos permitimos la autenticación
        } catch (error) {
          done(error); //En el caso de que haya algún error devolvemos un done() del error
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: " ",
        clientSecret: " ",
        callbackURL: "http://localhost:8080/api/session/google",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const { name, emails } = profile; //Datos que vamos a usar para el registro del usuario "profile" de google.
          const user = {
            first_name: name.givenName,
            last_name: name.familyName,
            email: emails[0].value,
          };

          const userExist = await userDao.getByEmail(emails[0].value);
          if (userExist) return cb(null, userExist);

          const newUser = await userDao.create(user);
        } catch (error) {
          cb(error); //cb "callback" es similar al done()
        }
      }
    )
  );

  passport.use("jwt", new JwtStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: "codigoSecreto"
  },
  async (jwt_payload, done ) =>{
    try {
      

      return done(null, jwt_payload); //Si los datos son correctos permitimos la autenticación
    } catch (error) {
      done(error);//En el caso de que haya algún error devolvemos un done() del error
      
    }

  }
  ));

  passport.serializeUser(async (user, done) => {
    done(null, user._id); //En este caso usamos el _id del usuario en la base de datos de mongo db para serializar
  }); //La serialización es el proceso de convertir un objeto de usuario en un identificador único.

  passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    done(null, user); //En este caso estamos usando el objeto del usuario para deserializar
  }); //La deserialización es el proceso de recuperar un objeto de usuario a partir de un identificador único.
}; //En ésta función configuramos las estrategias del passport local

export default initializePassport;
