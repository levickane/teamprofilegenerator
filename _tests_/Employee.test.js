const { Employee } = require('../lib/classes');

describe('Employee', () => {
  it('Should create a new instance of employee when init is called grabbing the name, id, and email of the employee', () => {
    const newEmp = new Employee('levi', 33, 'levi@mail.com');
    expect(newEmp).toEqual({ name: 'levi', id: 33, email: 'levi@mail.com' });
  });
});
