const sendTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    // const { task, checked, timeLimit, color, type } = req.body;
    // const { taskId } = req.params;

    //valido los valores del body
    // await validator(editTaskSchema, req.body);

    res.send({
      status: "ok",
      data: "data",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = sendTask;
