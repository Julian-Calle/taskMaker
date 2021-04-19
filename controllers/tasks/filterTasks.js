const filterTasks = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();
    let { type, color, checked, timeLimit, order, direction } = req.body;
    const { userId } = req.params;
    const orderBy = order ? order : "id";
    const orderDirection = direction ? direction : "ASC";

    const [results] = await connection.query(
      `
    SELECT * FROM tasks WHERE (type=? OR ?) AND (color=? OR ?)  AND (checked=? OR ?) AND  (timeLimit=? OR ?) AND  (order=? OR ?) AND  (direction=? OR ?) AND id=?;
    `,
      [
        type,
        !type,
        color,
        !color,
        checked,
        !checked,
        timeLimit,
        !timeLimit,
        order,
        !order,
        direction,
        !direction,
        userId,
      ]
    );
    res.send({
      status: "ok",
      data: [...filtro],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = filterTasks;
