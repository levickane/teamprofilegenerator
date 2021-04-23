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
  constructor(officeNumber, name, id, email) {
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
  constructor(github, name, id, email) {
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
  constructor(school, name, id, email) {
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

let intern = new Intern('UIC', 'Levi', 69, 'levi@gmail.com');

console.log(intern.getRole());
