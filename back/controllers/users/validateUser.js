const { createError } = require("../../helpers");
const validateUser = async (req, res, next) => {
  let connection;
  console.log("entro");

  try {
    connection = await req.app.locals.getDB();

    const { validationCode } = req.params;
    //Comprobar que hay un usuario en la base de datos pendiente de validar con ese código

    const [user] = await connection.query(
      `
            SELECT id
            FROM users
            WHERE validationCode=?`,
      [validationCode]
    );
    if (user.length === 0) {
      throw createError(
        "No hay ningún usuario pendiente de validar con ese código",
        400
      );
    }
    //Activamos el usuario y eliminamos el validationCode
    await connection.query(
      `UPDATE users
            SET verified=true, validationCode=NULL
            WHERE validationCode=?`,
      [validationCode]
    );
    res.send({
      status: "ok",
      message: "Usuario validado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = validateUser;
