// Imports de los módulos necesarios
import express from "express";
import router from "./routes/index.js"; // Importa el router principal
import { connectMongoDB } from "./config/mongoDb.config.js"; //Importamos la configuración de MongoDB
import session from "express-session";//Importamos para iniciar sessions en el servidor
import MongoStore from "connect-mongo";// Importamos para conectar las sessions con mongo atlas
import passport from "passport";//Importación de passport para autenticación de usuarios
import initializePassport from "./config/passport.config.js"; //Import config de passport
import cookieParser from "cookie-parser";//Import de cookie parser

connectMongoDB(); //Conectamos con mongoDB

// Instancia de express
const app = express();

// Configuración del puerto
const PORT = 8080;
const ready = () =>
  console.log(
    `Server ready on http://localhost:${PORT}. Press Ctrl + C to stop.`
  );

app.use(express.json()); // Middleware para analizar las solicitudes con formato JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar las solicitudes con datos codificados en URL
app.use(cookieParser("secret"));
app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://admin:admin123456@codercluster0.0at1r6e.mongodb.net/ecommerce",//URL de la base de datos de mongo con la que se va a conectar
    ttl: 15//Tiempo de vida de la sesión en minutos
  }),
  secret: "CodigoSecreto",//Contraseña
  resave: true,//Ponemos true en el caso de la sesión quede inactiva y querramos que se mantenga
  saveUninitialized: true// Ponemos true en el caso de que la sesión no contenga datos y querramos almacenarla igual 
}));

app.use(passport.initialize());//Middleware de inicialización de passport
app.use(passport.session());//Middleware de sesión de passport
initializePassport();//Inicializador del passport local


app.use("/api", router); // Utiliza el router principal bajo el prefijo "/api"

app.listen(PORT, ready); // Inicia el servidor en el puerto especificado y muestra un mensaje de confirmación cuando está listo