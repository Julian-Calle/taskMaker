const Joi = require("joi");

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

module.exports = { createTaskSchema };
