const { validator, createError } = require("../../helpers");
const { createTaskSchema } = require("../../schemas");

const createTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const { task, color, type, timeLimit } = req.body;

    await validator(createTaskSchema, req.body);

    let taskFields = ["task"];
    let taskValues = [task];
    let taskVariables = ["?", "?"];

    if (color) {
      taskFields.push("color");
      taskValues.push(color);
      taskVariables.push("?");
    }
    if (type) {
      taskFields.push("type");
      taskValues.push(type);
      taskVariables.push("?");
    }
    if (timeLimit) {
      taskFields.push("timeLimit");
      taskValues.push(new Date(timeLimit));
      taskVariables.push("?");
    }

    //creamos la task
    const [createdTask] = await connection.query(
      `
    INSERT INTO tasks (userId, ${taskFields.join(", ")})
    VALUES
    (${taskVariables.join(", ")})`,
      [req.userId, ...taskValues]
    );

    // incluimos al propio creador en la lista de miembros
    await connection.query(
      `
    INSERT INTO membersList (taskId, userId)
    VALUES (?,?)
    `,
      [createdTask.insertId, req.userId]
    );

    let result = { task };
    for (let i = 1; i < taskFields.length; i++) {
      result[`${taskFields[i]}`] = taskValues[i];
    }

    res.send({
      status: "ok",
      data: { ...result },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createTask;
