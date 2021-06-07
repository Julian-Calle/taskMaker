const filterTasks = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();
    let { taskId, order, direction } = req.query;
    const orderBy = order ? order : 'id';
    const orderDirection = direction ? direction : 'ASC';

    const [results] = await connection.query(
      `
      SELECT * FROM membersList WHERE taskId=?
      ORDER BY  ? ?
          ;
      `,
      [selectedTask.id, orderBy, orderDirection]
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
