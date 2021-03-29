const request = require('supertest');
const app = require('../app');
const dbBuild = require('../database/config/build');
const connection = require('../database/config/connection');
const {
  getPatientByNameQuery,
  getPatientByPhoneQuery,
} = require('../database/queries');

describe('Server Tests', () => {
  beforeEach(() => dbBuild());
  afterAll(() => connection.end());
  describe('Database Tests', () => {
    test('getPatientByNameQuery(Easton) query should return the patient object', async () => {
      const expected = [
        {
          id: 1,
          firstname: 'Easton',
          lastname: 'Brekke',
          email: 'Francesco.Weissnat55@yahoo.com',
          birthday: new Date('1936-12-02T00:00:00.000Z'),
          phone: '0599010101',
          diseases:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
        },
      ];
      const { rows: actual } = await getPatientByNameQuery({
        firstName: 'Easton',
      });
      return expect(expected).toEqual(actual);
    });
    test('getPatientByNameQuery(Jenkins) query should return the patient object', async () => {
      const expected = [
        {
          id: 2,
          firstname: 'Alexie',
          lastname: 'Jenkins',
          email: 'Talon.Fritsch@hotmail.com',
          birthday: new Date('1946-12-02T00:00:00.000Z'),
          phone: '0599010102',
          diseases:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
        },
      ];
      const { rows: actual } = await getPatientByNameQuery({
        lastName: 'Jenkins',
      });
      return expect(expected).toEqual(actual);
    });
    test('getPatientByPhoneQuery(0599010105) query should return the patient object', async () => {
      const { rows: actual } = await getPatientByPhoneQuery('0599010105');
      const expected = [
        {
          id: 5,
          firstname: 'Marlin',
          lastname: 'Bahringer',
          email: 'Alexandre16@hotmail.com',
          birthday: new Date('1936-12-02T00:00:00.000Z'),
          phone: '0599010105',
          diseases:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
        },
      ];
      return expect(expected).toEqual(actual);
    });
  });
  describe('Routes Tests', () => {
    test('GET /api/v1/patients/search?firstName="Easton"', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?firstName=Easton')
        .expect('Content-Type', /json/)
        .expect(200);
      const expected = {
        message: 'success',
        statusCode: 200,
        data: {
          patientsByPhone: [],
          patientsByName: [
            {
              id: 1,
              firstname: 'Easton',
              lastname: 'Brekke',
              email: 'Francesco.Weissnat55@yahoo.com',
              birthday: '1936-12-02T00:00:00.000Z',
              phone: '0599010101',
              diseases:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
            },
          ],
        },
      };
      const actual = JSON.parse(res.text);
      return expect(expected).toEqual(actual);
    });
    test('GET /api/v1/patients/search?lastName="Jenkins"', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?lastName=Jenkins')
        .expect('Content-Type', /json/)
        .expect(200);
      const expected = {
        message: 'success',
        statusCode: 200,
        data: {
          patientsByPhone: [],
          patientsByName: [
            {
              id: 2,
              firstname: 'Alexie',
              lastname: 'Jenkins',
              email: 'Talon.Fritsch@hotmail.com',
              birthday: '1946-12-02T00:00:00.000Z',
              phone: '0599010102',
              diseases:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
            },
          ],
        },
      };
      const actual = JSON.parse(res.text);
      return expect(expected).toEqual(actual);
    });
    test('GET /api/v1/patients/search?phone="0599010105"', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?phone=0599010105')
        .expect('Content-Type', /json/)
        .expect(200);
      const expected = {
        message: 'success',
        statusCode: 200,
        data: {
          patientsByName: [],
          patientsByPhone: [
            {
              id: 5,
              firstname: 'Marlin',
              lastname: 'Bahringer',
              email: 'Alexandre16@hotmail.com',
              birthday: '1936-12-02T00:00:00.000Z',
              phone: '0599010105',
              diseases:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
            },
          ],
        },
      };
      const actual = JSON.parse(res.text);
      return expect(expected).toEqual(actual);
    });

    test('GET /api/v1/patients/search?phone="invalidPhone" should return boomify object error', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?phone=invalidPhone')
        .expect('Content-Type', /json/)
        .expect(400);
      const expected = {
        statusCode: 400,
        error: 'Invalid Phone',
        message: 'Please Send an valid phone with length of 10 like 0599010101',
      };
      const actual = JSON.parse(res.text);
      return expect(expected).toEqual(actual);
    });
    test('GET /api/v1/patients/search?firstName="2invalidName@" should return boomify object error', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?firstName=2invalidName@')
        .expect('Content-Type', /json/)
        .expect(400);
      const expected = {
        statusCode: 400,
        error: 'Invalid Name',
        message: 'Please Send an valid firstName or lastName',
      };
      const actual = JSON.parse(res.text);
      return expect(expected).toEqual(actual);
    });
    test('GET /api/v1/patients/search?lastName="2invalidName@" should return boomify object error', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?lastName=2invalidName@')
        .expect('Content-Type', /json/)
        .expect(400);
      const expected = {
        statusCode: 400,
        error: 'Invalid Name',
        message: 'Please Send an valid firstName or lastName',
      };
      const actual = JSON.parse(res.text);
      return expect(expected).toEqual(actual);
    });
  });
});
