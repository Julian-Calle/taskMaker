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

module.exports = { createError };
