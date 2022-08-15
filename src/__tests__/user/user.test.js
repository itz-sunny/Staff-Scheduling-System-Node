const app = require('../../app.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Checking all functionalities for user', () => {
  describe('Create user', () => {
    describe('Create user without info', () => {
      test('should return 400 status', async () => {
        const response = await request.post('/app/v1/register');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('"name" is required');
      });
    });

    describe('Create user with any missing info like name', () => {
      test('should return 400 status', async () => {
        const response = await request.post('/app/v1/register').send({
          email: 'sunny@email.com',
          password: 'pa$$$word',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('"name" is required');
      });
    });

    describe('login user', () => {
      describe('login user without info', () => {
        test('should return 400 status', async () => {
          const response = await request.post('/app/v1/login');
          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBe('"email" is required');
        });
      });

      describe('login user with any missing info like name', () => {
        test('should return 400 status', async () => {
          const response = await request.post('/app/v1/login').send({
            email: 'sunny@email.com',
          });
          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBe('"password" is required');
        });
      });
    });
  });
});
