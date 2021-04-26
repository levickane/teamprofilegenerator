const { Manager } = require('../lib/classes');

describe('Engineer', () => {
  it('Should create a new instance of manager when init is called grabbing the name, id, and email and office number of the employee', () => {
    const newEng = new Manager('levi', 33, 'levi@mail.com', 52);
    expect(newEng).toEqual({
      name: 'levi',
      id: 33,
      email: 'levi@mail.com',
      officeNumber: 52
    });
  });
});
