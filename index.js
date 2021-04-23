const inquirer = require('inquirer');
const fs = require('fs');
// const generateIndexHTML = require('./indexCreator')

const questions = [
  {
    type: 'input',
    message: 'What is your name?: ',
    name: 'username'
  },
  {
    type: 'input',
    message: 'Where are you from?: ',
    name: 'placeOfOrigin'
  },
  {
    type: 'input',
    message: 'What is your github username?: ',
    name: 'github'
  },
  {
    type: 'input',
    message: 'What is your Linkedin?: ',
    name: 'linkedin'
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
