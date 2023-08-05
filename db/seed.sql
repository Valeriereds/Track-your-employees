
INSERT INTO department (name)
VALUES 
  ("Potions"),
  ("Defense Against the Dark Arts"),
  ("Transfiguration"),
  ("Administration");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES 
  ("Professor", 50000, 1),
  ("Inquisitor", 80000, 2),
  ("Deputy Headmaster", 65000, 3),
  ("Headmaster", 70000, 4);

  SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Albus", "Dumbledore", 4, NULL),
  ("Severus", "Snape", 1, 1),
  ("Minerva", "McGonagall", 3, 1),
  ("Dolores", "Umbridge", 2, NULL),
  ("Argus", "Filch", 2, 4);

SELECT * FROM employee;
