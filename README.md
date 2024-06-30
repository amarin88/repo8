# Segunda Preentrega Proyecto Final Curso Backend

Dicho trabajo fue realizado intentando cumplir con las rúbricas de la segunda preentrega del proyecto final de un e-commerce, del curso de backend para la plataforma Coderhouse, en la comisión 53155 a cargo del profesor Luis Alejandro Mera y la supervisión del tutor Nahuel Lautaro Torres Loretto.

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Uso](#uso)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Contribución](#contribución)
5. [Licencia](#licencia)

## Instalación

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener Node.js instalado en tu sistema.
3. Instala las dependencias del proyecto ejecutando el siguiente comando en la terminal:

npm install

4. Para ejecutar la aplicación, utiliza el siguiente comando:

npm start

## Uso

1. La aplicación ofrece un sistema de gestión de productos y carritos. Utiliza las siguientes rutas para interactuar con la aplicación:

   - /api/products: Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos.
   - /api/carts: Permite crear nuevos carritos y agregar productos a los carritos existentes.
   
2. Antes de utilizar la aplicación, asegúrate de tener una instancia de MongoDB ejecutándose en tu máquina local o en un servidor remoto. Puedes configurar la conexión a la base de datos en el archivo config.js.

3. Para ejecutar la aplicación, sigue los pasos de instalación mencionados anteriormente. Una vez iniciado el servidor, puedes utilizar herramientas como Postman o cURL para enviar solicitudes HTTP a las rutas mencionadas anteriormente y probar la funcionalidad de la aplicación.

4. Asegúrate de enviar los datos necesarios en el cuerpo de la solicitud en formato JSON para las operaciones de creación y actualización de productos y carritos.

5. Puedes utilizar las operaciones de lectura para obtener información sobre los productos y carritos almacenados en la base de datos.

## Estructura del Proyecto

El proyecto sigue una estructura organizada que separa las diferentes partes de la aplicación en directorios específicos:

- app.js: Este archivo es el punto de entrada principal de la aplicación donde se inicializa el servidor Express y se configuran los middlewares.

- index.js: Archivo que define y exporta las rutas principales de la aplicación, incluyendo las rutas de productos y carritos.
  
- routes/: Este directorio contiene los archivos de las rutas de la aplicación. Cada archivo de ruta define las diferentes rutas y controladores asociados para gestionar las solicitudes HTTP entrantes.

- fsManagers/: En este directorio se encuentran los archivos de los gestores de la lógica de negocio utilizando Filesystem. Cada gestor se encarga de manejar una parte específica de la funcionalidad de la aplicación, como la gestión de productos y carritos.

- fsManagers/data: Aquí se almacenan los archivos JSON utilizados para almacenar los datos de la aplicación. Cada archivo JSON representa una colección de datos, como productos y carritos.

- config/mongoDb.config.js: Este archivo contiene la configuración de la aplicación, incluyendo la conexión a la base de datos MongoDB y cualquier otra configuración necesaria para el funcionamiento de la aplicación.

- Models/: Esta carpeta contiene los archivos con los modelos de esquema de las colecciones de los documentos de Mongoose
- 
- mongoDao/: Esta carpeta contiene los archivos del Dao tanto de los productos que se almacenarán en las colecciones como el de los Carritos

- README.md: Este archivo contiene la documentación del proyecto, incluyendo instrucciones de instalación, uso, estructura del proyecto, contribución y licencia.

La estructura organizada del proyecto facilita la navegación y el mantenimiento del código, separando claramente las diferentes partes de la aplicación y proporcionando una estructura clara y concisa para su desarrollo y mantenimiento.

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (git checkout -b feature/contribución).
3. Haz tus cambios y commitea los cambios (git commit -am 'Añade contribución').
4. Sube la rama (git push origin feature/contribución).
5. Abre un Pull Request.

## Licencia

[Sin Licencia].

---
© [Andrés Marin] - [2024]. Todos los derechos reservados.