const { createError } = require('../../helpers');

const deleteTask = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    //Elimino todos los user de la tabla memberList si es el propietario
    if (req.selectedTask.userId !== req.user.id) {
      throw createError('Solo puedes borrar la task el propietario');
    }
    await connection.query(
      `
      DELETE FROM membersList WHERE taskId = ?;
      DELETE FROM tasks WHERE (id = ? AND userId= ?);`,
      [req.selectedTask.id, req.user.id, req.selectedTask.id, req.user.id]
    );
    res.send({
      status: 'ok',
      data: `El 'task' con id ${req.selectedTask.id} ha sido borrado`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = deleteTask;
