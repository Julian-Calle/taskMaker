const deleteTask = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    //Para eliminar el taks, pedimos (de momento)el id del taks por params
    const { task_id } = req.params;

    const [task] = await connection.query(
      `
        DELETE * FROM tasks WHERE id=?,[${task_id}]; `
    );
    res.send({
      status: "ok",
      data: `El "task" con id ${task_id} ha sido borrado`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = deleteTask;
