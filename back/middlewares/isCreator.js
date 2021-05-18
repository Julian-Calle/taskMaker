const { idSchema } = require("../schemas");
const { createError, validator } = require("../helpers");

const isCreator = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const { taskId } = req.params;

    await validator(idSchema, taskId);

    //se verifica si el usuario es el creador de la task, en caso de no serlo genera un error

    const [result] = await connection.query(
      `
 SELECT * FROM tasks  WHERE id=? AND userId=? `,
      [taskId, req.userId]
    );

    if (result.length === 0) {
      throw createError("No eres el creador de la task", 401);
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = isCreator;
