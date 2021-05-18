const deleteAllCheckedTasks = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    //Falta poner que solo el propio usuario pueda modificarlo

    const [task] = await connection.query(
      `
          DELETE * FROM tasks WHERE checked=1; 
          `
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
module.exports = deleteAllCheckedTasks;
