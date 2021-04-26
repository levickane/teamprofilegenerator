const { Engineer } = require('../lib/classes');

describe('Engineer', () => {
  it('Should create a new instance of engineer when init is called grabbing the name, id, and email and Github username of the employee', () => {
    const newEng = new Engineer('levi', 33, 'levi@mail.com', 'levickane');
    expect(newEng).toEqual({
      name: 'levi',
      id: 33,
      email: 'levi@mail.com',
      github: 'levickane'
    });
  });
});
