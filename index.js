const inquirer = require('inquirer');
const fs = require('fs');
const generateIndexHTML = require('./src/indexCreator');
const { Intern, Manager, Engineer } = require('./lib/classes');

const questions = [
  {
    type: 'list',
    message: 'What is your role?: ',
    name: 'role',
    choices: ['Manager', 'Engineer', 'Intern', 'Done Adding Employees']
  },
  {
    type: 'input',
    message: 'Enter Employee id: ',
    name: 'employeeId',
    when: (answers) => answers.role !== 'Done Adding Employees'
  },
  {
    type: 'input',
    message: 'Enter Employee Name: ',
    name: 'employeeName',
    when: (answers) => answers.role !== 'Done Adding Employees'
  },
  {
    type: 'input',
    message: 'Enter Employee Email: ',
    name: 'employeeEmail',
    when: (answers) => answers.role !== 'Done Adding Employees'
  },
  {
    type: 'input',
    message: 'What is your office number?: ',
    name: 'officeNumber',
    when: (answers) => answers.role === 'Manager'
  },
  {
    type: 'input',
    message: 'What is your github username?: ',
    name: 'githubName',
    when: (answers) => answers.role === 'Engineer'
  },
  {
    type: 'input',
    message: 'What school do you attend?: ',
    name: 'school',
    when: (answers) => answers.role === 'Intern'
  }
];

const teamArray = [];

function buildTeam() {
  fs.writeFile(
    './dist/team.html',
    generateIndexHTML(teamArray),
    'utf-8',
    (err) => (err ? console.error(err) : console.log('Success!'))
  );
}

function init() {
  inquirer.prompt(questions).then((response) => {
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
