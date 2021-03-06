const jwt = require("jsonwebtoken");
const { createError } = require("../helpers");

const isAuthorized = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();
    const { authorization } = req.headers;

    // Si no authorization está vacío devuelvo un error
    if (!authorization) {
      throw createError("Falta la cabecera de autorización", 401);
    }

    // Valido el token y si no es válido devuelvo un error
    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (error) {
      throw createError("El token no es válido", 401);
    }

    // Selecciono la fecha de ultima actualización de email / password del usuario
    const [result] = await connection.query(
      `
      SELECT *
      FROM users
      WHERE ID=?
      `,
      [tokenInfo.id]
    );
    //Si no hay last auth update, el token no será válido
    const lastAuthUpdate =
      result[0].lastAuthDate && new Date(result[0].lastAuthDate);
    const tokenEmissionDate = new Date(tokenInfo.iat * 1000);
    if (tokenEmissionDate < lastAuthUpdate || lastAuthUpdate === undefined) {
      throw createError("El token no es válido", 401);
    }

    // Inyectamos en la request la el id del usuario
    req.userId = tokenInfo.id;
    req.user = result[0];
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = isAuthorized;
