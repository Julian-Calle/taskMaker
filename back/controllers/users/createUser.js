const {
  createError,
  validator,
  generateRandomString,
  sendMail,
} = require("../../helpers");
const { createUserSchema } = require("../../schemas");

const addUser = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    await validator(createUserSchema, req.body);

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

    // Creamos un código que servirá para validar el correo del usuario
    const validationCode = generateRandomString(25);

    //Enviamos un correo al usuario para validar su perfil
    //TODO: modificar (de ser necesario) la ruta de validación que se le envía al usuario
    const emailBody = `
 
    Pulsa en este link para validar tu email y comenzar aumentar tu rendimiento sin límites: 
    <strong>${process.env.REACT_PORT}/users/validate/${validationCode}</strong>. 
      `;

    await sendMail({
      to: email,
      subject: `¡Bienvenid@ a Task Maker!`,
      body: emailBody,
      name,
      introMessage: "Bienvenido",
    });

    await connection.query(
      `
     INSERT INTO users (name, email, password, validationCode, lastAuthDate)
     VALUES(?, ?, SHA2(?, 512), ?, CURDATE())`,
      [name, email, password, validationCode]
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
