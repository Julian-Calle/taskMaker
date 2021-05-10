const { sendEmailSchema } = require("../../schemas");
const { sendMail, validator } = require("../../helpers");

const sendTask = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { email, name } = req.body;
    // valido los valores del body
    await validator(sendEmailSchema, req.body);

    const subject = `${req.user.name} te ha enviado una tarea`;
    const body = req.task.task;
    const introMessage = "Tienes una tarea que ver";
    console.log({ to: email, subject, body, name, introMessage });

    sendMail({ to: email, subject, body, name, introMessage });

    //todo no se envía el email

    res.send({
      status: "ok",
      data: { to: email, name, task: body },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = sendTask;
