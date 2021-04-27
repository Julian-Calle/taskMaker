const listTypesByUSer = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const [listOfTypes] = await connection.query(
      `
    SELECT type FROM tasks WHERE userId = ?
    `,
      [req.userId]
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
