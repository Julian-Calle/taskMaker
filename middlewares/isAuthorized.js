const jwt = require("jsonwebtoken");
const { createError } = require("../helpers");

const isAuthorized = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();
    console.log("autorizando");
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = isAuthorized;
