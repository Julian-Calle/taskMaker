const { validator } = require('../../helpers');
const { editTaskSchema } = require('../../schemas');
const editTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { task, checked, timeLimit, color, type } = req.body;
    const { taskId } = req.params;

    //valido los valores del body
    await validator(editTaskSchema, req.body);

    const editedTask = task ? task : req.selectedTask.task;
    const editedChecked = checked ? checked : req.selectedTask.checked;
    const editedTimeLimit = timeLimit ? timeLimit : req.selectedTask.timeLimit;
    const editColor = color ? color : req.selectedTask.color;
    const editedType = type ? type : req.selectedTask.type;

    await connection.query(
      `
    UPDATE tasks SET task=?,checked=?,timeLimit=?,color=?,type=? WHERE id=? AND userId=?;
    `,
      [
        editedTask,
        editedChecked,
        editedTimeLimit,
        editColor,
        editedType,
        taskId,
        req.userId,
      ]
    );
    console.log(
      (await connection.query(`SELECT * FROM tasks WHERE id=?`, [taskId]))[0]
    );
    res.send({
      status: 'ok',
      data: {
        taskId,
        editedTask,
        editedChecked,
        editedTimeLimit,
        editColor,
        editedType,
        userId: req.userId,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = editTask;
