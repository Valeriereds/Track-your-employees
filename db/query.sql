-- show all departments
SELECT * 
FROM department;

-- show all roles in departments
SELECT role.id AS id, title, salary, department.name AS department
FROM role 
JOIN department ON role.department_id = department.id;

-- role.department_id matches to department id. We're referencing these in our foreign keys. Matching in between the tables
-- role. whatever you want to select in this table to department. whatever matches from role

-- after AS, you're defining how you want the tables displayed, ie id/title/salary 
-- show all employees with roles in department
SELECT employee.id AS id, first_name, last_name, role.title AS title, salary, department.name AS name
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;

-- show employees by manager
SELECT employee.id AS id, first_name, last_name, role.title AS title, salary, department.name AS name
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE employee.manager_id = 1;

-- View Employee by Department
SELECT employee.id AS id, first_name, last_name, role.title AS title, department.name AS department
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE department.id = 4;

-- show all managers
-- where clause should always be under join
SELECT employee.id AS id, first_name, last_name, role.title AS title, salary, department.name AS name
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE employee.manager_id IS NULL;

-- add a department (adding a row in dept)
INSERT INTO department (name) 
VALUES ("Divination");

-- add a role into department (adding a new row into role)
INSERT INTO role (title, salary, department_id)
VALUES ("Oracle", 45000, 5);

-- add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sybil", "Trelawney", 5, 1);

-- delete a row from employee
DELETE FROM employee
WHERE id = 6;

-- delete a row from role
DELETE FROM role
WHERE id = 5;

-- delete a row from department
DELETE FROM department
WHERE id = 5;

-- update role 
UPDATE role
SET salary = 40000
WHERE salary = 80000;

-- update employee
UPDATE employee
SET id = 6
WHERE id = 5;

-- updates manager to employee with a different manager
UPDATE employee
SET manager_id = 1
WHERE manager_id IS NULL AND role_id = 2;

-- show budget by dept
SELECT department.name AS name, SUM(salary) AS budget
FROM employee
LEFT JOIN role on employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE department.id = 2;