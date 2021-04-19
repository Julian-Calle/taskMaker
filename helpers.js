/**
 *
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

module.exports = { createError, validator };
