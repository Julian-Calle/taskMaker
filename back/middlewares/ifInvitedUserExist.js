const { createError, validator } = require("../helpers");
const { idSchema } = require("../schemas");

const ifInvitedUserExist = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { invitedUserId } = req.params;

    //validaión del  invitedUserID
    await validator(idSchema, invitedUserId);

    const [result] = await connection.query(
      `
SELECT * FROM users WHERE id=?`,
      [invitedUserId]
    );
    if (result.length === 0)
      throw createError(`No existe usuario con id ${invitedUserId}`);

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = ifInvitedUserExist;
