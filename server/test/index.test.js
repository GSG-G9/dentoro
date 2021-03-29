const request = require('supertest');
const app = require('../app');
const dbBuild = require('../database/config/build');
const connection = require('../database/config/connection');

beforeEach(() => dbBuild());
afterAll(() => connection.end());

describe('Get all patients', () => {
  test('Route /patients status 200, json header', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/patients')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.data).toHaveLength(20);
  });
});
