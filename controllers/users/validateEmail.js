const { createError } = require('../../helpers');
const validateEmail = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    const { validationCode, email } = req.params;
    //Comprobar que hay un usuario en la base de datos pendiente de validar con ese código
    console.log(validationCode);
    const [user] = await connection.query(
      `
            SELECT id
            FROM users
            WHERE validationCode=?`,
      [validationCode]
    );
    if (user.length === 0) {
      throw createError(
        'No hay ningún usuario pendiente de validar su email con ese código',
        400
      );
    }
    //Activamos el usuario y eliminamos el validationCode
    await connection.query(
      `UPDATE users
            SET email=?, verified=true, validationCode=NULL
            WHERE validationCode=?`,
      [email, validationCode]
    );
    res.send({
      status: 'ok',
      message: 'Email validado y actualizado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = validateEmail;
