const Joi = require("joi");

/**
 * Esquema que sirve para validar elementos comunes
 *
 * @param {*} varName - Nombre del campo a validar
 * @param {*} max - Longitud máxima de caracteres
 * @param {*} min - Longitud mínima de caracteres
 */

const textRequiredValidator = (varName, max, min = 0) => {
  return Joi.string()
    .required()
    .min(min)
    .max(max)
    .messages({
      "string.base": `${varName} debe ser de tipo 'string'`,
      "string.empty": `${varName} no puede estar vacío`,
      "string.min": `${varName} debe ser mayor de {#limit} caracteres`,
      "string.max": `${varName} no puede ser mayor de {#limit} caracteres`,
      "any.required": `${varName} es un campo requerido`,
    });
};

const createTaskSchema = Joi.object().keys({
  task: Joi.string().required().min(5).max(500).messages({
    "string.base": `task debe ser de tipo 'string'`,
    "string.empty": `task no puede estar vacío`,
    "string.min": `task debe ser mayor de {#limit} caracteres`,
    "string.max": `task no puede ser mayor de {#limit} caracteres`,
    "any.required": `task es un campo requerido`,
  }),
  color: Joi.any().valid("blue", "red", "yellow", "grey", "pink", "white", ""),
  type: Joi.string().allow("").min(2).max(50).messages({
    "string.base": `type debe ser de tipo 'string'`,
    "string.min": `type debe ser mayor de {#limit} caracteres`,
    "string.max": `type puede ser mayor de {#limit} caracteres`,
  }),
  timeLimit: Joi.date().allow("").optional().min(new Date()).messages({
    "date.base": `'timeLimit' debe ser de tipo 'date'`,
    "date.min": `'timeLimit' no puede ser anterior a la fecha actual`,
  }),
});

const createUserSchema = Joi.object().keys({
  name: textRequiredValidator("name", 50, 1),
  email: textRequiredValidator("email", 100, 5),
  password: textRequiredValidator("password", 100, 8),
});

const loginSchema = Joi.object().keys({
  email: textRequiredValidator("email", 100),
  password: textRequiredValidator("password", 100),
});

const editPasswordSchema = Joi.object().keys({
  oldPassword: textRequiredValidator("oldPassword", 100),
  newPassword: textRequiredValidator("newPassword", 100, 8),
});

module.exports = {
  createTaskSchema,
  createUserSchema,
  loginSchema,
  editPasswordSchema,
};
