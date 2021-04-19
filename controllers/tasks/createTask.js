const createTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    // const { user_id } = req.params;
    // const { type } = req.query;
    console.log(req);
    //TODO verificar que sólo se puede crear una task un usuario autentificado

    //todo se añadiran tasks a la lista del usuario que hace la petición

    // todo devolver el id de la task con el contenido de la misma
    console.log("estoy en eso de tareas");

    res.send({
      status: "ok",
      data: "reservation",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = createTask;
