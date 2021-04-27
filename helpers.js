const crypto = require("crypto");

const sgMail = require("@sendgrid/mail");

// Configuramos sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Envía un correo electrónico personalizado
 * @param {string} to - Email del destinatario
 * @param {string} subject - Asunto del correo
 * @param {string} body - Contenido del correo
 * @param {string} name - Nombre del destinatario
 * @param {string} introMessage - Saludo inicial del correo (Buenos días, Hola, etc.)
 */
async function sendMail({ to, subject, body, name, introMessage }) {
  // Instrucciones: https://www.npmjs.com/package/@sendgrid/mail
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM, // Use the email address or domain you verified above
      subject,
      text: body,
      html: `
      <h1>${introMessage} ${name}</h1>
        <div>
          <h2>${subject}</h2>
          <p>${body}</p>
          <br>
          <strong><i><u>TaskMaker</u> "Let's synergy <u>together</u>"</i></strong>
        </div>
      `,
    };

    await sgMail.send(msg);
  } catch (error) {
    throw new Error("Error enviando mail");
  }
}

/**
 * Facilita la creación de errores HTTP
 * @param {string} message - Descripción del error
 * @param {number} numHttpStatus - Código de error HTTP
 * @returns {error} Error preparado para el endpoint de error
 */
function createError(message, numHttpStatus) {
  const error = new Error(message);
  error.httpStatus = numHttpStatus;
  return error;
}
/**
 * Genera una cadena de caracteres aleatoria
 * @param {number} length - Longitud que queremos que tenga la cadena
 * @returns {string} Cadena de caracteres aleatorios
 */
function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Valida datos con schemas de Joi
 * @param {JoiSchema} schema - Esquema con el que validaremos los datos
 * @param {object} valueToValidate  - Objeto con los datos a validar
 * @throws {error} En caso de que los datos no superen la validación
 */
async function validator(schema, valueToValidate) {
  try {
    await schema.validateAsync(valueToValidate);
  } catch (error) {
    error.httpStatus = 400;
    throw error;
  }
}

module.exports = { createError, validator, generateRandomString, sendMail };
