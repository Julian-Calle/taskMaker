const createTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { userId } = req.params;
    const { task, color, type, timeLimit } = req.body;

    //TODO verificar que sólo se puede crear una task un usuario autentificado

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
    console.log(taskFields.join(", "));
    console.log(taskValues.join(", "));

    await connection.query(
      `
    INSERT INTO tasks (userId, ${taskFields.join(", ")})
    VALUES
    (${taskVariables.join(", ")})`,
      [userId, ...taskValues]
    );

    let result = { task };
    for (let i = 1; i < taskFields.length; i++) {
      result[`${taskFields[i]}`] = taskValues[i];
    }
    console.log(result);

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
