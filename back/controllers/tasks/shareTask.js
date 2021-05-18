// const { sendEmailSchema } = require("../../schemas");
const { createError } = require("../../helpers");

const { loginSchema } = require("../../schemas");

const shareTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const { taskId, invitedUserId } = req.params;

    //verificar si ya ha sido compartida, en dicho caso devolver el error

    const [result] = await connection.query(
      `
SELECT id FROM membersList WHERE taskId =? AND userID =?
`,
      [taskId, invitedUserId]
    );
    console.log(result.length);
    if (result.length) {
      throw createError("Esta task ya ha sido compartida", 403);
    }

    await connection.query(
      `
    INSERT INTO membersList (taskId, userId)
VALUES (?,?)
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
module.exports = shareTask;
