require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); // Solo modo developer
// const bodyParser = require("body-parser"); Obsoleto
const fileUpload = require('express-fileupload');
const { PORT } = process.env;
const getDB = require('./db');
const cors = require('cors');
const path = require('path');

// #################################################################
// #             Importamos controllers y middlewares              #
// #################################################################
const {
  createTask,
  deleteTask,
  deleteAllCheckedTasks,
  editTask,
  filterTasks,
  listTypesByUSer,
  sendTask,
  shareTask,
} = require('./controllers/tasks');

const {
  createUser,
  loginUser,
  validateUser,
  editUser,
  validateEmail,
  editPassword,
} = require('./controllers/users');
const {
  isAuthorized,
  ifTaskExists,
  isUser,
  isMember,
} = require('./middlewares');

// #################################################################
// #                      Configuramos express                     #
// #################################################################

// Creamos la app de express
const app = express();
// Guardamos db en el local de express
app.locals.getDB = getDB;
// Body parser (body en JSON)
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(bodyParser.json());
// Cors (permite peticiones externas)
app.use(cors());
//Archivos estaticos (habilitar carpeta uploads)
app.use(express.static(path.join(__dirname, 'uploads')));
// Body parser (multipart form data <- subida de imágenes)
app.use(fileUpload());
// Logger (solo se empleará durante el desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// #############################################################
// #                     Endpoints de task                     #
// #############################################################
//GET - Petición para añadir una
//URL ejemplo: http://localhost:3000/tasks
app.post('/tasks', isAuthorized, createTask);

//DELETE - Eliminar una task
//URL ejemplo_ http://localhost:3000/tasks/1"
app.delete('/tasks/:taskId', ifTaskExists, isAuthorized, deleteTask); //todo hay que cambiarla para decidir que hacer en caso de que sea compartida

//DELETE - Eliminar las task checkeadas
//URL ejemplo_ http://localhost:3000/tasks/checked/1"
app.delete('/tasks/:taskId', deleteAllCheckedTasks);

//PUT - Editar una task
//URL ejemplo: http://localhost:3000/tasks/3
app.put('/tasks/:taskId', isAuthorized, ifTaskExists, isUser, editTask); //todo hay que cambiarla para decidir que hacer en caso de que sea compartida

//GET - Filtrar tasks
//URL ejemplo: http://localhost:3000/tasks/2
app.get('/tasks', isAuthorized, filterTasks); //todo hay que tener en cuenta también las task que son compartidas

//GET - Obtner lista de tipos definida por usuaio
//URL ejemplo: http://localhost:3000/tasks/types
app.get('/tasks/types', isAuthorized, listTypesByUSer);

//GET - Enviar un email con el contenido de la task
//URL ejemplo: http://localhost:3000/tasks/send/:taskId"
app.post('/tasks/send/:taskId', isAuthorized, isMember, sendTask); //todo falta verificar si la task existe

//GET - compartir la task con otro usuario
//URL ejemplo: http://localhost:3000/tasks/share/:taskId/:invitedUserId"
app.get(
  '/tasks/share/:taskId/:invitedUserId',
  isAuthorized,
  isMember,
  shareTask
);

// ################################################################
// #                     Endpoints de usuario                     #
// ################################################################

//GET - Petición para añadir una
//URL ejemplo: http://localhost:3000/createTask/:userId
app.post('/user/new', createUser);

//GET - hacer log in
//URL ejemplo: http://localhost:3000/login
app.post('/login', loginUser);

//GET - Validar el email de un usuario
//URL ejemplo_ http://localhost:3000/users/validate/a13a9ab9392...
app.get('/users/validate/:validationCode', validateUser);

//PUT - Validar el email de un usuario
//URL ejemplo_ http://localhost:3000/users/validate/a13a9ab9392...
app.put('/users/validateEmail/:validationCode/:email', validateEmail);

//PUT - Modifica los datos de un usuario
//URL ejemplo http:http://localhost:3000/users
app.put('/users', isAuthorized, editUser);

//PUT - Modifica la contraseña de un usuario
//URL ejemplo http:http://localhost:3000/users
app.put('/pepe', isAuthorized, editPassword);

// #################################################################
// #                 Endpoints not found y error                   #
// #################################################################

// Middleware de error
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT} 🚀`);
});
