const editTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { task, checked, timeLimit, color, type } = req.body;
    const { taskId } = req.params;

    await connection.query(
      `
    UPDATE tasks SET taks=?,checked=?,timeLimit=?,color=? where id=?;
    `,
      [task, checked, timeLimit, color, type, taskId]
    );
    res.send({
      status: "ok",
      data: {
        taskId,
        task,
        checked,
        timeLimit,
        color,
        type,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = editTask;
