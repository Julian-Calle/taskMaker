const { validator, createError } = require("../../helpers");
const { editPasswordSchema } = require("../../schemas");

const editPassword = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const userId = req.userId;

    // Comprobamos que los parámetros de entrada son correctos
    await validator(editPasswordSchema, req.body);

    // Recoger de req.body oldPassword y newPassword
    const { oldPassword, newPassword } = req.body;

    // Comprobar que la contraseña antigua es correcta
    const [current] = await connection.query(
      `
     SELECT id
     FROM users
     WHERE id=? AND password=SHA2(?, 512)
   `,
      [userId, oldPassword]
    );

    if (oldPassword === newPassword) {
      throw createError(
        "La contraseña nueva no puede ser igual que la anterior",
        401
      );
    }

    if (current.length === 0) {
      throw createError("La contraseña actual no es correcta", 401);
    }

    // Guardar la nueva contraseña y last auth update para que los anteriores tokens dejen de ser válidos
    await connection.query(
      `
     UPDATE users
     SET password=SHA2(?, 512), lastAuthDate=?
     WHERE id=?
   `,
      [newPassword, new Date(), userId]
    );

    res.send({
      status: "ok",
      message: "Contraseña cambiada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editPassword;
