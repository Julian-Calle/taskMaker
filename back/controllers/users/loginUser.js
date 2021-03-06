const { createError, validator } = require("../../helpers");
const { loginSchema } = require("./../../schemas");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { email, password } = req.body;

    await validator(loginSchema, req.body);

    const [user] = await connection.query(
      `
SELECT * FROM users WHERE email=? AND password=SHA2(?,512)
`,
      [email, password]
    );
    console.log(user);
    console.log(req.body);
    // Si no existe asumimos que el email o la pass son incorrectas y damos un error
    if (user.length == 0) {
      throw createError("El email o el password son incorrectos", 401);
    }
    // Si existe pero no está activo avisamos que está pendiente de activar
    if (!user[0].verified) {
      throw createError(
        "El usuario existe pero está pendiente de validar. Comprueba tu email.",
        401
      );
    }

    // Si el usuario tiene un código de recuperación, lo eliminamos
    if (user[0].validationCode !== null) {
      await connection.query(
        `
        UPDATE users 
        SET validationCode = NULL
        WHERE id = ?;
        `,
        [user[0].id]
      );
    }
    // Creo el objecto de información que irá en el token
    const info = {
      id: user[0].id,
    };

    const token = jwt.sign(info, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.send({
      status: "ok",
      data: { token },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = loginUser;
