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

const viewAllDept = () => {
  const query = `SELECT * FROM department`;

  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuest();
  })
};

const addNewDept = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'New department name'
    }
  ])
  .then(choice => {
    const query = `INSERT INTO department (name) VALUES (?)`;

    db.query(query, choice.name, (err, res) => {
      if (err) throw err;
      console.log(`New ${choice.name} department successfully added`);
      startQuest();
    });
  })
};

const viewAllRoles = () => {
  const query = `SELECT role.id AS id, role.title AS title, salary, department.name as department FROM role JOIN department ON role.department_id = department.id`;
  
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuest();
  })
};

const addRole = () => {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;

    const departments = res.map(({ name, id }) => ({ name: name, value: id }));

    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'New role title:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'New role salary:'
      },
      {
        type: 'list',
        name: 'dept',
        message: 'New role department:',
        choices: departments
      }
    ])
    .then(choice => {
      const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

      db.query(query, [choice.title, choice.salary, choice.dept], (err, res) => {
        if (err) throw err;
        console.log(`Successfully added ${choice.name}`);
        startQuest();
      });
    })
  })
}

const viewAllEmployees = () => {
  const query = `SELECT employee.id AS id, first_name, last_name, role.title AS title, salary, department.name AS department, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id`;
  
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuest();
  })
};

const addEmployee = () => {
  db.query('SELECT * FROM employee', (err, empres) => {
  if (err) throw err;

  const manager = empres.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }))

  db.query('SELECT * FROM role', (err, rollers) => {
    if (err) throw err;
    const roles = rollers.map(({ id, title}) => ({ name: title, value: id }))

    let askMe = [
      {
        type: 'input',
        name: 'first_name',
        message: 'New employee first name:'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'New employee last name:'
      },
      {
        type: 'list',
        name: 'role',
        message: 'New employees role:',
        choices: roles
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Manager for new employee:',
        choices: manager
      }
    ];

    inquirer.prompt(askMe)
    .then(choice => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
      
      db.query(query, [choice.first_name, choice.last_name, choice.role, choice.manager], (err, res) => {
        if (err) throw err;
        console.log(`Employee successfully added.`)
        startQuest();
      })
    })
  })
 })
};

const updateRole = () => {
  db.query('SELECT * FROM employee', (err, empres) => {
    if (err) throw err;
    const employee = empres.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }))

    db.query('SELECT * FROM role', (err, rollers) => {
      if (err) throw err;

      const roles = rollers.map(({ title, id }) => ({ name: title, value: id }))

      let askMe = [
        {
          type: 'list',
          name: 'employee',
          message: 'Update employee:',
          choices: employee
        },
        {
          type: 'list',
          name: 'role',
          message: 'New employee role:',
          choices: roles
        }
      ]

      inquirer.prompt(askMe)
      .then(choice => {
        const query = `UPDATE employee SET role_id = ? WHERE id = ?`;

        db.query(query, [choice.role, choice.employee], (err, res) => {
          if (err) throw err;
          console.log('Employee role has been updated.');
          startQuest();
        })
      })
    })
  })
};
module.exports = db;