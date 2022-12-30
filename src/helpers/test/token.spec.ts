import { Token } from '../token';

// Units
describe('@TOKEN class Unit Tests', () => {
  test('Should be able create an object', async () => {
    const T: Token = new Token();
    expect(T).toMatchObject(new Token());
    expect(T.role).toBe('user'); // by default should be 'user' role
  });

  test('Should be able create an object with given role : admin', async () => {
    const T: Token = new Token('admin');
    expect(T).toMatchObject(new Token('admin'));
    expect(T.role).toBe('admin');
  });

  test('Should be able create an object with given role : vendor', async () => {
    const T: Token = new Token('vendor');
    expect(T).toMatchObject(new Token('vendor'));
    expect(T.role).toBe('vendor');
  });

  describe('@TOKEN: Generate Token Test', () => {
    test('Should generate jwt token <string>', () => {
      const T: Token = new Token();
      expect(T.generateJwt({ id: 'uuid' })).toBeTruthy();
    });
  });
});
