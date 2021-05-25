const filterTasks = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();
    let { type, color, checked, timeLimit, order, direction } = req.query;
    const orderBy = order ? order : 'id';
    const orderDirection = direction ? direction : 'ASC';

    const [results] = await connection.query(
      `
    SELECT * FROM tasks t JOIN membersList m ON m.taskId=t.id
    WHERE 
        (t.type=? OR ?) AND 
        (t.color=? OR ?)  AND 
        (t.checked=? OR ?) AND  
        (t.timeLimit=? OR ?) AND 
        m.userId=?
    ORDER BY  ? ?
        ;
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
        req.userId,
        orderBy,
        orderDirection,
      ]
    );
    res.send({
      status: 'ok',
      data: [...results],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = filterTasks;
