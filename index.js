require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require("figlet");

figlet("Accio Employee!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});