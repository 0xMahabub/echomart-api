import { Password } from '../password';

const p = new Password('test123');

// Units
describe('@PASSWORD class Unit Tests', () => {
  test('Should be able create an object', async () => {
    expect(p).toMatchObject(new Password('test123'));
  });

  test('Should have password property acurate', () => {
    expect(p.password).toEqual('test123');
  });

  test('Should be able to give a hashed password', async () => {
    const hashedPwd: string = await p.hash();
    expect(hashedPwd).toBeTruthy();
  });
});

/// Integrations
describe('@Password CLASS: Integration Tests', () => {
  test('Should verify passwords', async () => {
    const hashedPwd: string = await p.hash();
    const pwd = new Password('test123', hashedPwd);
    const pwd2 = new Password('test122', hashedPwd);
    expect(await pwd.verify()).toBe(true);
    expect(await pwd2.verify()).toBe(false);
  });
});
