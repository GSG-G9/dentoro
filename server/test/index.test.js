const request = require('supertest');
const app = require('../app');
const dbBuild = require('../database/config/build');
const connection = require('../database/config/connection');
const {
  getAppointmentsByDateQuery,
  getPatientProfileData,
  getHistoryLogs,
} = require('../database/queries');

describe('Server Tests', () => {
  beforeEach(() => dbBuild());
  afterAll(() => connection.end());
  describe('Database Tests', () => {
    test('getAppointmentsByDate query should return appointment objects joined with patients data', async () => {
      const expected = [
        {
          appointments_id: 2,
          id: 1,
          patient_id: 1,
          appointment_date: new Date('2020-12-02T00:00:00.000Z'),
          appointment_time: '22:30:00',
          is_done: true,
          complaints:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          firstname: 'Easton',
          lastname: 'Brekke',
          email: 'Francesco.Weissnat55@yahoo.com',
          birthday: new Date('1936-12-02T00:00:00.000Z'),
          phone: '(331) 439-6451 x329',
          diseases:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
        },
        {
          appointments_id: 8,
          id: 2,
          patient_id: 2,
          appointment_date: new Date('2020-12-02T00:00:00.000Z'),
          appointment_time: '20:30:00',
          is_done: false,
          complaints:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          firstname: 'Alexie',
          lastname: 'Jenkins',
          email: 'Talon.Fritsch@hotmail.com',
          birthday: new Date('1946-12-02T00:00:00.000Z'),
          phone: '(868) 462-0397 x84075',
          diseases:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
        },
      ];
      const { rows } = await getAppointmentsByDateQuery('2020-12-02');
      return expect(expected).toEqual(rows);
    });

    test('getPatientProfileData query should return Patient Profile Data by ID', async () => {
      const expected = [
        {
          id: 12,
          firstname: 'Izabella',
          lastname: 'Hoppe',
          email: 'Katlynn.Treutel36@yahoo.com',
          birthday: new Date('1996-12-02T00:00:00.000Z'),
          phone: '(572) 929-4749',
          diseases:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
        },
      ];
      const { rows } = await getPatientProfileData({ patientId: 12 });
      return expect(expected).toEqual(rows);
    });
    test('getHistoryLogs query should return Patient Profile Data by ID', async () => {
      const expected = [
        {
          price: 50,
          payment: 0,
          balance: 50,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          appointment_date: new Date('2021-01-02T00:00:00.000Z'),
          patient_id: 12,
        },
      ];
      const { rows } = await getHistoryLogs({ patientId: 12 });
      return expect(expected).toEqual(rows);
    });
  });
  describe('Routes Tests', () => {
    test('GET /api/v1/appointments/:appointmentDate should return appointment objects joined with patients data', async () => {
      const expected = {
        statusCode: 200,
        message: 'success',
        data: [
          {
            appointments_id: 2,
            id: 1,
            patient_id: 1,
            appointment_date: '2020-12-02T00:00:00.000Z',
            appointment_time: '22:30:00',
            is_done: true,
            complaints:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
            firstname: 'Easton',
            lastname: 'Brekke',
            email: 'Francesco.Weissnat55@yahoo.com',
            birthday: '1936-12-02T00:00:00.000Z',
            phone: '(331) 439-6451 x329',
            diseases:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          },
          {
            appointments_id: 8,
            id: 2,
            patient_id: 2,
            appointment_date: '2020-12-02T00:00:00.000Z',
            appointment_time: '20:30:00',
            is_done: false,
            complaints:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
            firstname: 'Alexie',
            lastname: 'Jenkins',
            email: 'Talon.Fritsch@hotmail.com',
            birthday: '1946-12-02T00:00:00.000Z',
            phone: '(868) 462-0397 x84075',
            diseases:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          },
        ],
      };

      const res = await request(app)
        .get('/api/v1/appointments/2020-12-02')
        .expect('Content-Type', /json/)
        .expect(200);

      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/appointments/:appointmentDate should return boomify Object Error when invalid Date is added', async () => {
      const expected = {
        statusCode: 400,
        message: 'Please send a correct date',
        error: 'Invalid Date',
      };
      const res = await request(app)
        .get('/api/v1/appointments/5952awd-59')
        .expect('Content-Type', /json/)
        .expect(400);
      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/patients/:patientId should return All patients data', async () => {
      const expected = {
        title: 'patient data',
        detail: 'data collected Successfully',
        data: {
          profile: {
            id: 12,
            firstname: 'Izabella',
            lastname: 'Hoppe',
            email: 'Katlynn.Treutel36@yahoo.com',
            birthday: '1996-12-02T00:00:00.000Z',
            phone: '(572) 929-4749',
            diseases:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          },
          balance: 50,
          history: [
            {
              price: 50,
              payment: 0,
              balance: 50,
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
              appointment_date: '2021-01-02T00:00:00.000Z',
              patient_id: 12,
            },
          ],
        },
      };

      const res = await request(app)
        .get('/api/v1/patients/12')
        .expect('Content-Type', /json/)
        .expect(201);

      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/patients/:patientId should return boomify Object Error when invalid id is added', async () => {
      const expected = {
        statusCode: 400,
        error: 'Invalid id',
        message: 'Please send a correct one',
      };
      const res = await request(app)
        .get('/api/v1/patients/11222')
        .expect('Content-Type', /json/)
        .expect(400);
      return expect(expected).toEqual(res.body);
    });
  });
});
