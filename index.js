require('dotenv').config();
const mysql = require('mysql');
const figlet = require('figlet');
const { default: inquirer } = require('inquirer');


const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const startQuest = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'End'
      ]
    }
  ])
  .then(choice => {
    switch (choice.options) {
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateRole();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        viewAllDept();
        break;
      case 'Add Department':
        addNewDept();
        break;
      default:
        db.end();
    }
  })
  .catch(err => {
    console.error(err);
  });
};
  
startQuest();
module.exports = db;