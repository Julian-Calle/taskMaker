const { createError } = require("../../helpers");

const addUser = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const { name, email, password } = req.body;

    //Lanzamos un error en caso de que el usuario exista en la base de datos
    const [userExists] = await connection.query(
      `
      SELECT *
      FROM users 
      WHERE email = ?
    `,
      [email]
    );

    if (userExists[0]) {
      throw createError("Ya existe un usuario registrado con ese email", 409);
    }

    await connection.query(
      `
  INSERT INTO users (name, email, password)
  VALUES(?, ?, SHA2(?, 512))`,
      [name, email, password]
    );

    const [newUser] = await connection.query(
      `
      SELECT *
      FROM users 
      WHERE email = ?
    `,
      [email]
    );

    res.send({
      status: "ok",
      data: newUser[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addUser;
