const { createError } = require('../../helpers');

const deleteTask = async (req, res, next) => {
  let connection;
  let message;
  try {
    connection = await req.app.locals.getDB();

    //Elimino todos los user de la tabla memberList si es el propietario
    if (req.selectedTask.userId !== req.user.id) {
      await connection.query(
        `
        DELETE FROM membersList WHERE taskId = ? AND userId=?;`,
        [req.selectedTask.id, req.user.id]
      );
      message = `Has eliminado tu suscripción a la task ${req.selectedTask.id}`;
    } else {
      await connection.query(
        `
      DELETE FROM membersList WHERE taskId = ?;
      DELETE FROM tasks WHERE (id = ? AND userId= ?);`,
        [req.selectedTask.id, req.user.id, req.selectedTask.id, req.user.id]
      );
      message = `Has eliminado la task ${req.selectedTask.id}`;
    }
    res.send({
      status: 'ok',
      data: message,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = deleteTask;
