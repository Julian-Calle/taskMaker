const editTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { task } = req.body;
    const { task_id } = req.params;
    await connection.query(
      `
    UPDATE tasks SET taks=? where id=?;
    `,
      [task, task_id]
    );
    res.send({
      status: "ok",
      data: {
        task_id,
        task,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
