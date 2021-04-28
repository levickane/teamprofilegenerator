const inquirer = require('inquirer');
const fs = require('fs');
const generateIndexHTML = require('./src/indexCreator');
const { Intern, Manager, Engineer } = require('./lib/classes');

//this sets the employee role choices so that they can be modified later
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
      var done = this.async();
      setTimeout(function () {
        if (input == '') {
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
        if (input == '') {
          done('You need to enter your username');
          return;
        }
        teamArray.forEach((role) => {
          if (input == role.github && input === '') {
            done('That username belongs to someone else');
            return;
          }
        });
        done(true);
      }, 100);
    },
    when: (answers) => answers.role === 'Engineer'
  },
  {
    type: 'input',
    message: 'What school do you attend?: ',
    name: 'school',
    when: (answers) => answers.role === 'Intern',
    validate: function (input) {
      var done = this.async();
      setTimeout(function () {
        if (input == '') {
          done('You need to provide a school name');
          return;
        }
        done(true);
      }, 100);
    }
  }
];

//this function validates an email address
function validateEmail(email) {
  {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}

//this sets the teamArray which will be passed into the generateIndexHTML()
const teamArray = [];

//this writes the newly generated html to a file called team.html in the dist/ folder
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
      //this creates a new instance of Manager
      case 'Manager':
        const manager = new Manager(
          response.employeeName,
          response.employeeId,
          response.employeeEmail,
          response.officeNumber
        );
        //this pushes manager to teamArray.
        teamArray.push(manager);
        //after pushing to teamArray we start the promp again
        init();
        break;
      //this creates a new instance of Engineer
      case 'Engineer':
        const engineer = new Engineer(
          response.employeeName,
          response.employeeId,
          response.employeeEmail,
          response.githubName
        );
        //this pushes engineer to the teamArray
        teamArray.push(engineer);
        //after pushing to the teamArray we start the promp again
        init();
        break;
      //this creats a new instance of Intern
      case 'Intern':
        const intern = new Intern(
          response.employeeName,
          response.employeeId,
          response.employeeEmail,
          response.school
        );
        //this pushes intern to the teamArray
        teamArray.push(intern);
        //after pushing to the teamArray we start the promp again
        init();
        break;
      default:
        //if no new instances are being created, then the buildTeam function is ran
        return buildTeam();
    }
  });
}

// Function call to initialize app
init();
