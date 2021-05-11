// const { sendEmailSchema } = require("../../schemas");
// const { sendMail, validator } = require("../../helpers");

const shareTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { taskId, invitedUserId } = req.body;
    // valido los valores del body
    // await validator(sendEmailSchema, req.body);
    console.log(req.body);

    res.send({
      status: "ok",
      data: "ok",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = shareTask;
