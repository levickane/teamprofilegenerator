class Employee {
  constructor(name, id, email) {
    (this.name = name), (this.id = id), (this.email = email);
  }

  getName() {}
  getId() {}
  getRole() {
    return 'Employee';
  }
}

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    super.getName();
    super.getId();
  }
  getRole() {
    return 'Manager';
  }
}

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    super.getName();
    super.getId();
  }
  getRole() {
    return 'Engineer';
  }
}

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    super.getName();
    super.getId();
  }
  getSchool() {}
  getRole() {
    return 'Intern';
  }
}

const intern1 = new Intern('Levi', 69, 'levi@gmail.com', 'UIC');

console.log(intern1);
