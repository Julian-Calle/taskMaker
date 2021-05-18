const { createError } = require('../../helpers');

const unsuscribeMemberList = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    //Sólo si no es el propietario
    const [checkCreator] = await connection.query(
      `
SELECT * FROM tasks WHERE userId=? AND id=?`,
      [req.user.id, req.selectedTask.id]
    );
    if (checkCreator.length !== 0)
      throw createError('No puedes darta de baja de tu propia task-', 403);

    await connection.query(
      `
        DELETE FROM membersList WHERE userId = ?ANDtaskId=?;
       
            `
    );
    res.send({
      status: 'ok',
      data: `El usuario con id ${req.user.id} se eliminó de la lista de miembros de la "task" con id ${req.selectedTask.id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = unsuscribeMemberList;
