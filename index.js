const inquirer = require('inquirer');
const fs = require('fs');
const generateIndexHTML = require('./src/indexCreator');
const { Intern, Manager, Engineer } = require('./lib/classes');

let employeeRoles = ['Manager', 'Engineer', 'Intern', 'Done Adding Employees'];

const questions = [
  {
    type: 'list',
    message: "Select employee's role: ",
    name: 'role',
    choices: employeeRoles
  },
  {
    type: 'input',
    message: 'Enter Employee id: ',
    name: 'employeeId',
    validate: function (input) {
      // Declare function as asynchronous, and save the done callback
      input = parseInt(input);
      var done = this.async();

      // Do async stuff
      setTimeout(function () {
        if (typeof input != 'number' || isNaN(input) || input == null) {
          // Pass the return value in the done callback
          done('You need to provide a number');
          return;
        }
        teamArray.forEach((role) => {
          if (input == role.id) {
            done('That id already exists');
            return;
          }
        });
        // Pass the return value in the done callback
        done(true);
      }, 100);
    },
    when: (answers) => answers.role !== 'Done Adding Employees'
  },
  {
    type: 'input',
    message: 'Enter Employee Name: ',
    name: 'employeeName',
    when: (answers) => answers.role !== 'Done Adding Employees',
    validate: function (input) {
      input = parseInt(input);
      var done = this.async();
      setTimeout(function () {
        if (typeof input === null) {
          done('You need to provide a name');
          return;
        }
        done(true);
      }, 100);
    }
  },
  {
    type: 'input',
    message: 'Enter Employee Email: ',
    name: 'employeeEmail',
    validate: function (input) {
      var done = this.async();
      setTimeout(function () {
        if (!validateEmail(input) || input == null) {
          done('You need to provide legit email');
          return;
        }
        teamArray.forEach((role) => {
          if (input == role.email) {
            done('That email already exists');
            return;
          }
        });
        done(true);
      }, 100);
    },
    when: (answers) => answers.role !== 'Done Adding Employees'
  },
  {
    type: 'input',
    message: 'What is your office number?: ',
    name: 'officeNumber',
    validate: function (input) {
      input = parseInt(input);
      var done = this.async();
      setTimeout(function () {
        if (typeof input != 'number' || isNaN(input) || input == null) {
          done('You need to provide a number');
          return;
        }
        done(true);
      }, 100);
    },
    when: (answers) => answers.role === 'Manager'
  },
  {
    type: 'input',
    message: 'What is your github username?: ',
    name: 'githubName',
    validate: function (input) {
      var done = this.async();
      setTimeout(function () {
        teamArray.forEach((role) => {
          if (input == role.github || input == null) {
            done('That username belongs to someone else');
            return;
          }
        });
        done(true);
      }, 1000);
    },
    when: (answers) => answers.role === 'Engineer'
  },
  {
    type: 'input',
    message: 'What school do you attend?: ',
    name: 'school',
    when: (answers) => answers.role === 'Intern',
    validate: function (input) {
      input = parseInt(input);
      var done = this.async();
      setTimeout(function () {
        if (input == null) {
          done('You need to provide a school name');
          return;
        }
        done(true);
      }, 100);
    }
  }
];

function validateEmail(email) {
  {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}

const teamArray = [];

function buildTeam() {
  fs.writeFile(
    './dist/team.html',
    generateIndexHTML(teamArray),
    'utf-8',
    (err) => (err ? console.error(err) : console.log('Generating HTML...'))
  );
}

function init() {
  inquirer.prompt(questions).then((response) => {
    //this allows only 1 manager to be made for the entire program
    if (response.role === 'Manager') {
      employeeRoles.shift();
    }
    switch (response.role) {
      case 'Manager':
        const manager = new Manager(
          response.employeeName,
          response.employeeId,
          response.employeeEmail,
          response.officeNumber
        );
        teamArray.push(manager);
        init();
        break;
      case 'Engineer':
        const engineer = new Engineer(
          response.employeeName,
          response.employeeId,
          response.employeeEmail,
          response.githubName
        );
        teamArray.push(engineer);
        init();
        break;
      case 'Intern':
        const intern = new Intern(
          response.employeeName,
          response.employeeId,
          response.employeeEmail,
          response.school
        );
        teamArray.push(intern);
        init();
        break;
      default:
        return buildTeam();
    }
  });
}

// Function call to initialize app
init();
