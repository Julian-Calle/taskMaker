require("dotenv").config();
const express = require("express");
const http = require("http");
const morgan = require("morgan"); // Solo modo developer
// const bodyParser = require("body-parser"); Obsoleto
const fileUpload = require("express-fileupload");
const { PORT } = process.env;
const getDB = require("./db");
const cors = require("cors");
const path = require("path");

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
  kickOut,
} = require("./controllers/tasks");

const {
  createUser,
  loginUser,
  validateUser,
  editUser,
  validateEmail,
  editPassword,
  getMemberList,
} = require("./controllers/users");
const {
  isAuthorized,
  ifTaskExists,
  isUser,
  isMember,
  ifInvitedUserExist,
  isCreator,
} = require("./middlewares");

// #################################################################
// #                      Configuramos express                     #
// #################################################################

// Creamos la app de express
const app = express();
const server = http.createServer(app);
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

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
//Archivos estaticos (habilitar carpeta uploads)
app.use(express.static(path.join(__dirname, "uploads")));
// Body parser (multipart form data <- subida de imágenes)
app.use(fileUpload());
// Logger (solo se empleará durante el desarrollo)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// #############################################################
// #                     Endpoints de task                     #
// #############################################################
//GET - Petición para añadir una
//URL ejemplo: http://localhost:3000/tasks
app.post("/tasks", isAuthorized, createTask);

//DELETE - Eliminar una task
//URL ejemplo_ http://localhost:3000/tasks/1"
app.delete("/tasks/:taskId", ifTaskExists, isAuthorized, deleteTask); //todo hay que cambiarla para decidir que hacer en caso de que sea compartida

//DELETE - Eliminar las task checkeadas
//URL ejemplo_ http://localhost:3000/tasks/checked/1"
app.delete("/tasks/:taskId", deleteAllCheckedTasks);

//PUT - Editar una task
//URL ejemplo: http://localhost:3000/tasks/3
app.put("/tasks/:taskId", isAuthorized, ifTaskExists, isMember, editTask);

//GET - Filtrar tasks
//URL ejemplo: http://localhost:3000/tasks/2
app.get("/tasks", isAuthorized, filterTasks); //todo hay que tener en cuenta también las task que son compartidas

//GET - Obtner lista de tipos definida por usuaio
//URL ejemplo: http://localhost:3000/tasks/types
app.get("/tasks/types", isAuthorized, listTypesByUSer);

//GET - Enviar un email con el contenido de la task
//URL ejemplo: http://localhost:3000/tasks/send/:taskId"
app.post("/tasks/send/:taskId", isAuthorized, isMember, sendTask); //todo falta verificar si la task existe

//GET - compartir la task con otro usuario
//URL ejemplo: http://localhost:3000/tasks/share/:taskId/:invitedUserId"
app.get(
  "/tasks/share/:taskId/:invitedUserId",
  ifTaskExists,
  isAuthorized,
  isMember,
  ifInvitedUserExist,
  shareTask
);
//GET - Eliminar a un usuario de la lista de miebros de unsa task
//URL ejemplo: http://localhost:3000/tasks/kickOut/:taskId/:invitedUserId"
app.delete(
  "/tasks/kickOut/:taskId/:invitedUserId",
  isAuthorized,
  ifTaskExists,
  isCreator,
  ifInvitedUserExist,
  kickOut
);

// ################################################################
// #                     Endpoints de usuario                     #
// ################################################################

//GET - Petición para añadir una
//URL ejemplo: http://localhost:3000/createTask/:userId
app.post("/user/new", createUser);

//GET - hacer log in
//URL ejemplo: http://localhost:3000/login
app.post("/login", loginUser);

//GET - Validar el email de un usuario
//URL ejemplo_ http://localhost:3000/users/validate/a13a9ab9392...
app.get("/users/validate/:validationCode", validateUser);

//GET - Obtener lista de memberList de una task
//URL ejemplo_ http://localhost:3000/users/2
app.get("/users/:taskId", ifTaskExists, getMemberList);

//PUT - Validar el email de un usuario
//URL ejemplo_ http://localhost:3000/users/validate/a13a9ab9392...
app.put("/users/validateEmail/:validationCode/:email", validateEmail);

//PUT - Modifica los datos de un usuario
//URL ejemplo http:http://localhost:3000/users
app.put("/users", isAuthorized, editUser);

//PUT - Modifica la contraseña de un usuario
//URL ejemplo http:http://localhost:3000/users
app.put("/pepe", isAuthorized, editPassword);

// #################################################################
// #                 Endpoints not found y error                   #
// #################################################################

// Middleware de error
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

// Inicio del servidor
server.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT} 🚀`);
});

io.on("connection", (socket) => {
  // console.log(socket.rooms);
  console.log("conectado");
  const id = socket.id.slice(0, 3);
  // console.log(`Identificado: ${id}`);
  const taskId = socket.handshake.auth.taskId;
  console.log(socket.handshake.auth.taskId);
  socket.join(taskId);
  socket.emit("start", taskId);

  socket.on("edition", (data) => {
    socket.to(taskId).emit("newChange", data);
  });
});
