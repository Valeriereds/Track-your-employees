-- first_name, Last_name role_id manager_id
-- vl ro int null if manager, corresponding int of employee id if manager
-- val rojas 1 null
-- alex green 2 1 because id 1 is his manager
-- to determine the id number corresponding to the employee role 
-- title salary dept id
-- lawyer, int, dept id int you choose with it
-- this is how you match it to the role id as well
-- insert into should specify each:
-- dept (name) role (title, salary, department_id) employee(first name, last name, role id, manager id)

INSERT INTO department (name)
VALUES 
  ("Potions"),
  ("Defense Against the Dark Arts"),
  ("Transfiguration"),
  ("Divination");

INSERT INTO role (title, salary, department_id)
VALUES 
  ("Professor", 50000, 1),
  ("Inquisitor", 80000, 4),
  ("Deputy Headmaster", 65000, 2),
  ("Headmaster", 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
  ("Albus", "Dumbledore", 3, NULL),
  ("Dolores", "Umbridge", 4, NULL),
  ("Argus", "Filch", 4, 2),
  ("Severus", "Snape", 1, 1),
  ("Minerva", "McGonagall", 2, 1);