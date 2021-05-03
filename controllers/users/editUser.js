const { createError, generateRandomString } = require('../../helpers');
const editUser = async (req, res, next) => {
  let connection;
  let mailMessage = '';
  let lastAuthDate;

  try {
    connection = await req.app.locals.getDB();

    //Solamente podemos cambiar el mail
    let { email } = req.body;

    //Obtenemos la info del user de la peticion de isAuthorized guardada en req.user
    console.log(req.user);
    lastAuthDate = new Date(currentData[0].lastAuthDate);

    //Si el email es diferente lo procesamos
    if (email && email !== currentData[0].email) {
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
      if (existingMail.length > 0) {
        throw createError(
          'Ya existe un usuario en la base de datos con el email proporcionado',
          409
        );
      }
      //Creamos un código de validación (contraseña temporal de un solo uso)
      const registrationCode = generateRandomString(40);
      updateFields.push(
        `email='${email}'`,
        `validationCode='${registrationCode}'`
      );
      // Enviamos un mail al usuario con el link de confirmación de email
      const emailBody = `
      Acabas de modificar tu email de registro en <strong>taskMaker<strong>.
      Pulsa en este link para validar tu nuevo email: <strong> ${process.env.PUBLIC_HOST}/users/validateEmail/${registrationCode}/${email}<strong>.
      `;
      await sendMail({
        to: email,
        subject: `Valida tu nevo email para continuar el proceso de cambio de email en taskMaker`,
        body: emailBody,
        userName,
        introMessage: createGreetings(),
      });
      //Añadimos aviso para revisar correo a la respuesta
      mailMessage = 'Revisa tu email para validar la nueva dirección';
      updateFields.push('verified = 0');
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
