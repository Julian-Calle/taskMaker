const { idSchema } = require("../schemas");
const { createError, validator } = require("../helpers");

const isMember = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const { taskId } = req.params;

    //valido los valores del body

    await validator(idSchema, taskId);
    console.log(req.userId, taskId);
    const [result] = await connection.query(
      `
    SELECT 	t.id "id",t.task "task",t.checked "checked",t.timeLimit "timeLimit",t.color "color",t.type "type"   
    FROM tasks  t JOIN membersList m 
    ON t.id =m.taskId WHERE m.userId= ? AND m.taskId =?;
    `,
      [req.userId, taskId]
    );
    //si no hay ningun resultado es que el userId o taskId no es correcto
    if (result.length === 0) {
      throw createError("El id de usuarrio o de task es incorrecto", 401);
    }

    //inyectamos en la petición el task que contenga el id de usuario y de task pasados por parámetros
    req.task = result[0];
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = isMember;
