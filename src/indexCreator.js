const generateIndexHTML = (team) => {
  const createManager = (manager) => {
    return `<div class="card m-3" style="width: 17em">
        <div class="card-header bg-primary text-white">
          <h1>${manager.getName()}</h1>
          <h2><i class="bi bi-cup-fill"></i> Manager</h2>
        </div>
        <div class="card-body bg-light">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${manager.getId()}</li>
            <li class="list-group-item">Email: <a href = "mailto: ${manager.getEmail()}">${manager.getEmail()}</a></li>
            <li class="list-group-item">Office Number: ${manager.getOfficeNumber()}</li>
          </ul>
        </div>
      </div>`;
  };
  const createEngineer = (engineer) => {
    return `<div class="card m-3" style="width: 17em">
    <div class="card-header bg-primary text-white">
      <h1>${engineer.getName()}</h1>
      <h2><i class="bi bi-tools"></i> Engineer</h2>
    </div>
    <div class="card-body bg-light">
      <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${engineer.getId()}</li>
      <li class="list-group-item">Email: <a href = "mailto: ${engineer.getEmail()}">${engineer.getEmail()}</a></li>
      <li class="list-group-item">Github: <a href='https://github.com/${engineer.getGithub()}' target='_blank'>${engineer.getGithub()}</a></li>
      </ul>
    </div>
  </div>`;
  };
  const createIntern = (intern) => {
    return `<div class="card m-3" style="width: 17em">
    <div class="card-header bg-primary text-white">
      <h1>${intern.getName()}</h1>
      <h2><i class="bi bi-eyeglasses"></i> Intern</h2>
    </div>
    <div class="card-body bg-light">
      <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${intern.getId()}</li>
      <li class="list-group-item">Email: <a href = "mailto: ${intern.getEmail()}">${intern.getEmail()}</a></li>
      <li class="list-group-item">School: ${intern.getSchool()}</li>
      </ul>
    </div>
  </div>`;
  };
  let pageSetup = [];
  pageSetup.push(
    team
      .filter((member) => member.getRole() === 'Manager')
      .map((manager) => createManager(manager))
  );
  const engineerteam = team
    .filter((member) => member.getRole() === 'Engineer')
    .map((engineer) => createEngineer(engineer));

  pageSetup.push(engineerteam.join(' '));

  const internteam = team
    .filter((member) => member.getRole() === 'Intern')
    .map((intern) => createIntern(intern));

  pageSetup.push(internteam.join(''));

  return pageSetup.join('');
};

module.exports = (team) => {
  return `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
      />
      <title>My Team</title>
    </head>
    <div class="jumbotron jumbotron-fluid bg-danger">
      <div class="container">
        <h1 class="display-4 text-center text-white">My Team</h1>
      </div>
    </div>
    <body>
      <div
        class="container row row-col-sm-12 row-col-md-3 d-flex justify-content-center mx-auto"
      >
        ${generateIndexHTML(team)}
      </div>
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"
      ></script>
    </body>
  </html>
    `;
};
