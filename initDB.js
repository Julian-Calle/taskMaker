require("dotenv").config();
const getDB = require("./db.js");
const fs = require("fs").promises;

if (process.env.NODE_ENV !== "development") process.exit();

let connection;

async function main() {
  try {
    connection = await getDB();

    // borrar tablas si existen
    console.log("****************************");
    console.log("* Borrando tablas antiguas *");
    console.log("****************************");
    await connection.query(`DROP TABLE IF EXISTS membersList`);
    console.log("Tabla de membersList eliminada");
    await connection.query(`DROP TABLE IF EXISTS tasks`);
    console.log("Tabla de tasks eliminada");
    await connection.query(`DROP TABLE IF EXISTS users`);
    console.log("Tabla de users eliminada");

    //leer script sql
    console.log("Leyendo BBDD");
    const sqlScript = await (await fs.readFile("./BBDD/BBDD.sql")).toString();
    await connection.query(sqlScript);

    console.log("**********************************************************");
    console.log("* Tablas antiguas borradas, iniciando creación de tablas *");
    console.log("**********************************************************");

    await connection.query(`
INSERT INTO users (name,email,password,verified)
VALUES 
    ("Juliano","jcallecristancho@gmail.com",SHA2("1234",512),1),
    ("Vira","ubeiram@gmail.com",SHA2("1234",512),1),
    ("Raulinux","raulzc3@gmail.com",SHA2("1234",512),1)
    `);

    await connection.query(`
INSERT INTO tasks (task, checked, userId, color,type)
VALUES 
("ir a morfar", 0, 1, "blue","Urgente"),
("ir a cambiarme la napie", 0, 3, "red","Bromas")
`);

    await connection.query(`
INSERT INTO tasks (task, checked, userId)
VALUES 
("ir a dar clase", 0, 2)
`);

    await connection.query(`
INSERT INTO membersList (taskId, userId)
VALUES (1,1),(2,2),(3,3)
`);

    //añadir valores a tablas
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
