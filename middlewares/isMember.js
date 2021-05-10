// const { loginSchema } = require("../../schemas");
const { createError } = require("../helpers");

const isMember = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const { userId, taskId } = req.params;
    // console.log(userId);
    // console.log(taskId);
    //valido los valores del body
    //todo validar param con un schema
    // await validator(editTaskSchema, req.body);

    const [result] = await connection.query(
      `
    SELECT 	t.id "id",t.task "task",t.checked "checked",t.timeLimit "timeLimit",t.color "color",t.type "type"   
    FROM tasks  t JOIN membersList m 
    ON t.id =m.taskId WHERE m.userId= ? AND m.taskId =?;
    `,
      [userId, taskId]
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
