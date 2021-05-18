// const { concurrency } = require("sharp");
// const { validator } = require("../../helpers");
// const { editTaskSchema } = require("../../schemas");
const kickOut = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const { taskId, invitedUserId } = req.params;

    const [result] = await connection.query(
      `
    DELETE FROM membersList WHERE taskId=? AND userId=?
    `,
      [taskId, invitedUserId]
    );

    res.send({
      status: "ok",
      data: { taskId: Number(taskId), userId: Number(invitedUserId) },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = kickOut;
