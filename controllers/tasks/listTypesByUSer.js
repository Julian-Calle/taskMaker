const listTypesByUSer = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    // TODO hace un middeware que revise si es un id correcto
    const { userId } = req.params;

    const [listOfTypes] = await connection.query(
      `
    SELECT type FROM tasks WHERE userId = ?
    `,
      [userId]
    );

    const data = listOfTypes.reduce((acc, item) => {
      if (!acc.includes(item.type)) acc.push(item.type);

      return acc;
    }, []);

    res.send({
      status: "ok",
      data,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listTypesByUSer;
