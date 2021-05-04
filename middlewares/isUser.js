const { createError } = require('../helpers');

const isUser = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { taskId } = req.params;
    const [result] = await connection.query(
      `
SELECT * FROM tasks WHERE id=? AND userId=?`,
      [taskId, req.userId]
    );
    if (result.length === 0)
      throw createError(
        `No existe tasks con id ${taskId} para el usuario con id ${req.userId}`
      );
    req.selectedTask = result[0];

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = isUser;
