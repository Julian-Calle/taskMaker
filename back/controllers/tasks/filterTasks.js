const filterTasks = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();
    let { type, color, checked, timeLimit, order, direction } = req.query;
    const orderBy = order ? order : 'id';
    const orderDirection = direction ? direction : 'ASC';

    const [results] = await connection.query(
      `
    SELECT * FROM tasks 
    WHERE 
        (type=? OR ?) AND 
        (color=? OR ?)  AND 
        (checked=? OR ?) AND  
        (timeLimit=? OR ?) AND 
        userId=?
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
    console.log(results);
    console.log(req.userId);
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
