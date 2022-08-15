const app = require('../../app.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Checking all functionalities for schedule', () => {
  describe('Create schedule', () => {
    describe('Create schedule without token', () => {
      test('should return 401 status', async () => {
        const response = await request.post('/app/v1/schedule/create');
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe('fetch self schedule', () => {
    describe('fetch self schedule without token', () => {
      test('should return 401 status', async () => {
        const response = await request.get('/app/v1/schedule/fetch/self');
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe('fetch all schedule', () => {
    describe('fetch all schedule without token', () => {
      test('should return 401 status', async () => {
        const response = await request.get('/app/v1/schedule/fetch/all');
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe('fetch one schedule', () => {
    describe('fetch one schedule without token', () => {
      test('should return 401 status', async () => {
        const response = await request.post('/app/v1/schedule/fetch/one/1')
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe('fetch all schedules for a user', () => {
    describe('fetch all schedules for a user without token', () => {
      test('should return 401 status', async () => {
        const response = await request.post('/app/v1/schedule/fetch/1');
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe('Update schedule', () => {
    describe('Update schedule without token', () => {
      test('should return 401 status', async () => {
        const response = await request.post('/app/v1/schedule/update');
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe('delete schedule', () => {
    describe('elete schedule without token', () => {
      test('should return 401 status', async () => {
        const response = await request.post('/app/v1/schedule/delete/1');
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe('delete all schedule of a user', () => {
    describe('delete all schedule of a user without token', () => {
      test('should return 401 status', async () => {
        const response = await request.post('/app/v1/schedule/delete/all/1');
        expect(response.statusCode).toBe(401);
      });
    });
  });
});

