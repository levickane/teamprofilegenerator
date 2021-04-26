const inquirer = require('inquirer');
const fs = require('fs');
const generateIndexHTML = require('./src/indexCreator');

const questions = [
  {
    type: 'input',
    message: 'Enter Employee id: ',
    name: 'employeeId'
  },
  {
    type: 'input',
    message: 'Enter Employee Name: ',
    name: 'employeeName'
  },
  {
    type: 'input',
    message: 'Enter Employee Email: ',
    name: 'employeeEmail'
  },
  {
    type: 'list',
    message: 'What is your role?: ',
    name: 'role',
    choices: ['Manager', 'Engineer', 'Intern']
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

function writeToFile(theFileName, data) {
  fs.writeFile(theFileName, generateIndexHTML(data), (err) =>
    err ? console.error(err) : console.log('Success!')
  );
}

function init() {
  inquirer.prompt(questions).then((response) => {
    const filename = 'index.html';
    writeToFile(filename, response);
  });
}

// Function call to initialize app
init();
