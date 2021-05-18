const deleteUser = async (res, req, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { userId } = req.params;
    await connection.query(
      `
    DELETE * FROM tasks where userId=?;
    `[userId]
    );
    await connection.query(
      `
    DELETE * FROM users where id=?;  `[userId]
    );
    res.send({
      status: "ok",
      data: { result: `Se ha eliminado el usuario ${userId} y sus tasks` },
    });
  } catch (error) {
    next(error);
  } finally {
  }
};
