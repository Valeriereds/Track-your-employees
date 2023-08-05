DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id),
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id),
  REFERENCES role(id),
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id),
  REFERENCES employee(id),
  ON DELETE SET NULL,
);

-- first_name, Last_name role_id manager_id
-- vl ro int null if manager, corrosponding int of employee id if manager
-- val rojas 1 null
-- alex green 2 1 because id 1 is his manager
-- to determine the id number corrosponding to the employee role 
-- title salary dept id
-- lawyer, int, dept id int you choose with it
-- this is how you match it to the role id as well