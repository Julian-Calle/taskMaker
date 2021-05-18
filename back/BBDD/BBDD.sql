/* 
Script de creación de la base de datos para el proyecto "taskmaker" creado por:
    Julián David Calle Cristancho
    Raúl González Seco
    Iago Ubeira Martínez
*/
DROP DATABASE taskmaker;
CREATE DATABASE IF NOT EXISTS taskmaker CHARSET "utf8mb4" COLLATE "utf8mb4_spanish_ci";
use taskmaker;

CREATE TABLE IF NOT EXISTS users (
id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50),
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(512) NOT NULL,
verified TINYINT DEFAULT 0,
registrationDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
photo VARCHAR(50) DEFAULT 'urlFoto.svg',
validationCode CHAR(50),
-- membersList variable multiple, investigar
recoveryDate DATETIME,
lastAuthDate DATETIME,
CONSTRAINT users_verified_ck2 CHECK (verified = 1 OR verified = 0) -- Hacemos que el campo verificado se asemeje a un booleano
);

CREATE TABLE IF NOT EXISTS tasks (
id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
task VARCHAR (500) NOT NULL,
checked TINYINT NOT NULL DEFAULT 0,
userId INTEGER UNSIGNED NOT NULL,
timeLimit DATETIME,
color ENUM("blue","red","yellow","grey","pink","white") DEFAULT "white",
shared TINYINT DEFAULT 0,
type VARCHAR(50),
CONSTRAINT tasks_users_fk1 FOREIGN KEY (userId)
	REFERENCES users(id),
CONSTRAINT task_checked_ck1 CHECK (checked = 1 OR checked = 0) -- Hacemos que el campo administrador se asemeje a un booleano
);

CREATE TABLE IF NOT EXISTS membersList(
id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
taskId INTEGER UNSIGNED NOT NULL,
userId INTEGER UNSIGNED NOT NULL,
CONSTRAINT memberList_users_fk1 FOREIGN KEY (userId)
    REFERENCES users(id),
CONSTRAINT memberList_tasks_fk2 FOREIGN KEY (taskId)
	REFERENCES tasks(id),
CONSTRAINT memberList_uc1 UNIQUE (taskId,userId)
);