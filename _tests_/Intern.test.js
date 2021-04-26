const { Intern } = require('../lib/classes');

describe('Engineer', () => {
  it('Should create a new instance of intern when init is called grabbing the name, id, and email and school of the employee', () => {
    const newIntern = new Intern('levi', 33, 'levi@mail.com', 'UIC');
    expect(newIntern).toEqual({
      name: 'levi',
      id: 33,
      email: 'levi@mail.com',
      school: 'UIC'
    });
  });
});
