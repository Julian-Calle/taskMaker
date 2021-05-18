const {
  createError,
  generateRandomString,
  validator,
  sendMail,
  createGreetings,
} = require('../../helpers');
const { editUserSchema } = require('../../schemas');
const editUser = async (req, res, next) => {
  let connection;
  let mailMessage = '';
  let lastAuthDate;

  try {
    connection = await req.app.locals.getDB();

    //Solamente podemos cambiar el mail
    let { email } = req.body;

    //Valido el body
    await validator(editUserSchema, req.body);

    //Obtenemos la info del user de la peticion de isAuthorized guardada en req.user
    lastAuthDate = new Date(req.user.lastAuthDate);

    //Si el email es diferente lo procesamos
    if (email && email !== req.user.email) {
      //Actualizamos lastAuthDate
      lastAuthDate = new Date();
      //Comprobamos que el mail no esté ya en uso
      const [existingEmail] = await connection.query(
        `
        SELECT id
        FROM users
        WHERE email=?`,
        [email]
      );
      console.log(existingEmail);
      if (existingEmail.length > 0) {
        throw createError(
          'Ya existe un usuario en la base de datos con el email proporcionado',
          409
        );
      }
      //Creamos un código de validación (contraseña temporal de un solo uso)
      const registrationCode = generateRandomString(10);

      // Enviamos un mail al usuario con el link de confirmación de email
      const url = 'link'.link(
        `${process.env.PUBLIC_HOST}/users/validateEmail/${registrationCode}/${email}`
      );
      const emailBody = `
      Acabas de modificar tu email de registro en <strong>taskMaker<strong>.
      Pulsa en este ${url} para validar tu nuevo email: <strong> <a href="${process.env.PUBLIC_HOST}/users/validateEmail/${registrationCode}/${email}">link<a><strong>.
      `;
      console.log(registrationCode);
      await connection.query(
        `
      UPDATE users 
      SET validationCode=?
      WHERE id=?`,
        [registrationCode, req.user.id]
      );
      console.log(req.user.name);
      await sendMail({
        to: email,
        subject: `Valida tu nevo email para continuar el proceso de cambio de email en taskMaker`,
        body: emailBody,
        userName: req.user.name,
        introMessage: createGreetings(),
      });
      //Añadimos aviso para revisar correo a la respuesta
      mailMessage = 'Revisa tu email para validar la nueva dirección';
    } else {
      mailMessage =
        'El email introducido coincide con el email actual del usuario.';
    }
    //Obtenemos la info del usuario a modificar (necesita confirmarse por email antes de efectuar cambios)
    const [userEdited] = await connection.query(
      ` 
        SELECT * FROM users WHERE id=?;`,
      [req.user.userId]
    );
    res.send({
      status: 'ok',
      message: mailMessage,
      data: userEdited[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
