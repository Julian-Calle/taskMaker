const deleteAllCheckedTasks = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    //Solo el propietario puede elminiarlo
    if (req.selectedTask.userId !== req.user.id) {
      throw createError('Solo puedes borrar la task el propietario');
    }
    const [task] = await connection.query(
      `
      DELETE FROM membersList WHERE taskId = ?;
          DELETE * FROM tasks WHERE checked=1; 
          `
    );
    res.send({
      status: 'ok',
      data: `Las task checkeadas han sido borradas`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = deleteAllCheckedTasks;
