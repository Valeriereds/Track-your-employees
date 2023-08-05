require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require("figlet");

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}
);

figlet("Accio Employee!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

module.exports = db;