import { Server } from 'http';
import request from 'supertest';
import { server } from './server';
import { log } from './utils';

let app: Server;
let port: number;

beforeAll(() => {
  port = 3009;
  app = server.listen(port, () =>
    log.info(`⚡️[server]: Server is running at http://localhost:${port}`),
  );
});

afterAll(async () => {
  await app.close(() => log.info(`⚡️[server]: closed.`));
});

describe('⚡️[Server]: Integration testing', () => {
  //SERVER Integration Tests

  describe('Spin the server ...', () => {
    test('GET: /; Should return Welcome Page!', async () => {
      const res = await request(app).get('/');
      expect(res.status).toEqual(200);
      // expect(res.body);
    });
  });

  describe('Routing: 404 Test', () => {
    test('GET: /x404; Should return Error 404!', async () => {
      const res = await request(app).get('/x404');
      expect(res.status).toEqual(404);
      // expect(res.body);
    });

    test('GET: /api/x9374; Should return Error 404!', async () => {
      const res = await request(app).get('/api/x9374');
      expect(res.status).toEqual(404);
      // expect(res.body);
    });
  });

  describe('API endpoint integration check', () => {
    test('GET: /api; Should return ok', async () => {
      const res = await request(app).get('/api');
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        message: '/api => OK!',
        req_url: '/',
      });
    });

    test('GET: /api/user; Should return 404', async () => {
      const res = await request(app).get('/api/user');
      expect(res.status).toEqual(404);
      expect(res.body.message).toEqual('/api/xxx => endpoint not found!');
    });
  });
});
