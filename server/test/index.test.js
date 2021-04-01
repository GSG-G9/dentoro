const request = require('supertest');
const app = require('../app');
const dbBuild = require('../database/config/build');
const connection = require('../database/config/connection');
const {
  getPatientByNameOrPhoneQuery,
  getAppointmentsByDateQuery,
  getAppointmentsByPatientNameOrPhone,
  getUnavailableTimes,
  getPatientProfileData,
  getHistoryLogs,
  addHistoryLogQuery,
  getAppointmentsStatusByIdQuery,
  updateAppointmentStatusQuery,
  deleteAppointmentsQueries,
  patchPatientDataByIdQuery,
} = require('../database/queries');

describe('Server Tests', () => {
  beforeEach(() => dbBuild());
  afterAll(() => connection.end());
  describe('Database Tests', () => {
    test('getPatientByNameOrPhoneQuery(Easton) query should return the patient object', async () => {
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
      const { rows: actual } = await getPatientByNameOrPhoneQuery({
        firstName: 'Easton',
      });
      return expect(expected).toEqual(actual);
    });
    test('getPatientByNameOrPhoneQuery(Jenkins) query should return the patient object', async () => {
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
      const { rows: actual } = await getPatientByNameOrPhoneQuery({
        lastName: 'Jenkins',
      });
      return expect(expected).toEqual(actual);
    });
    test('getPatientByNameOrPhoneQuery(0599010105) query should return the patient object', async () => {
      const { rows: actual } = await getPatientByNameOrPhoneQuery({
        phone: '0599010105',
      });
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
    test('deleteAppointmentsQueries query for specific patient should return an array with deleted appointment', async () => {
      const { rows: actual } = await deleteAppointmentsQueries(8);

      const expected = [
        {
          id: 8,
          patient_id: 2,
          appointment_date: new Date('2020-12-02T00:00:00.000Z'),
          appointment_time: '11:00:00',
          is_done: false,
          complaints:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
        },
      ];
      return expect(expected).toEqual(actual);
    });
    test('getAppointmentsByDate query should return appointment objects joined with patients data', async () => {
      const expected = [
        {
          appointments_id: 2,
          id: 1,
          patient_id: 1,
          appointment_date: new Date('2020-12-02T00:00:00.000Z'),
          appointment_time: '09:00:00',
          is_done: true,
          complaints:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          firstname: 'Easton',
          lastname: 'Brekke',
          email: 'Francesco.Weissnat55@yahoo.com',
          birthday: new Date('1936-12-02T00:00:00.000Z'),
          phone: '0599010101',
          diseases:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
        },
        {
          appointments_id: 8,
          id: 2,
          patient_id: 2,
          appointment_date: new Date('2020-12-02T00:00:00.000Z'),
          appointment_time: '11:00:00',
          is_done: false,
          complaints:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          firstname: 'Alexie',
          lastname: 'Jenkins',
          email: 'Talon.Fritsch@hotmail.com',
          birthday: new Date('1946-12-02T00:00:00.000Z'),
          phone: '0599010102',
          diseases:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
        },
      ];
      const { rows } = await getAppointmentsByDateQuery('2020-12-02');
      return expect(expected).toEqual(rows);
    });
    test('getAppointmentsByPatientName query should return available appointments', async () => {
      const expected = [
        {
          appointment_id: 1,
          patient_id: 2,
          appointment_date: new Date('2021-12-02T00:00:00.000Z'),
          appointment_time: '08:00:00',
          firstname: 'Alexie',
          lastname: 'Jenkins',
          phone: '0599010102',
        },
        {
          appointment_id: 4,
          patient_id: 2,
          appointment_date: new Date('2021-12-02T00:00:00.000Z'),
          appointment_time: '17:00:00',
          firstname: 'Alexie',
          lastname: 'Jenkins',
          phone: '0599010102',
        },
        {
          appointment_id: 8,
          patient_id: 2,
          appointment_date: new Date('2020-12-02T00:00:00.000Z'),
          appointment_time: '11:00:00',
          firstname: 'Alexie',
          lastname: 'Jenkins',
          phone: '0599010102',
        },
      ];
      const { rows } = await getAppointmentsByPatientNameOrPhone({
        firstName: 'Alexie',
        lastName: 'Jenkins',
      });
      return expect(expected).toEqual(rows);
    });
    test('getUnavailableTimes query should return appointment objects times', async () => {
      const expected = [
        { appointment_time: '08:00:00' },
        { appointment_time: '10:00:00' },
        { appointment_time: '17:00:00' },
        { appointment_time: '12:00:00' },
        { appointment_time: '15:00:00' },
      ];
      const { rows } = await getUnavailableTimes({ date: '2021-12-02' });
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
          phone: '0599010112',
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
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          log_date: new Date('2021-01-02T00:00:00.000Z'),
        },
      ];
      const { rows } = await getHistoryLogs({ patientId: 12 });
      return expect(expected).toEqual(rows);
    });
    test('patchPatientDataByIdQuery query should return Patient Data updated', async () => {
      const expected = {
        id: 1,
        firstname: 'john',
        lastname: 'cina',
        phone: '0599887782',
        email: 'john@cina.com',
        birthday: new Date('1994-09-01T22:00:00.000Z'),
        diseases: 'no diseyases',
      };
      const {
        rows: [data],
      } = await patchPatientDataByIdQuery(
        'john',
        'cina',
        '0599887782',
        'john@cina.com',
        '1994-09-02',
        'no diseyases',
        1,
      );
      return expect(expected).toEqual(data);
    });
    test('getAppointmentsByIdQuery query should return appointment id and status', async () => {
      const expected = [{ is_done: false }];
      const { rows } = await getAppointmentsStatusByIdQuery({
        appointmentId: 8,
      });
      return expect(expected).toEqual(rows);
    });
    test('updateAppointmentStatusQuery query should change the status of an appointment to true', async () => {
      const expected = [{ is_done: true }];
      await updateAppointmentStatusQuery({ appointmentId: 8 });
      const { rows } = await getAppointmentsStatusByIdQuery({
        appointmentId: 8,
      });
      return expect(expected).toEqual(rows);
    });
    test('addHistoryLogQuery query should add a history log', async () => {
      const expected = [
        {
          id: 3,
          patient_id: 12,
          description: 'some sort fo treatment',
          price: 200,
          payment: 200,
        },
      ];
      const { rows } = await addHistoryLogQuery({
        patientId: 12,
        description: 'some sort fo treatment',
        price: '200',
        payment: '200',
      });
      return expect(rows).toMatchObject(expected);
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
        data: [
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
      };
      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/patients/search?lastName="Jenkins"', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?lastName=Jenkins')
        .expect('Content-Type', /json/)
        .expect(200);
      const expected = {
        message: 'success',
        statusCode: 200,
        data: [
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
      };
      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/patients/search?phone="0599010105"', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?phone=0599010105')
        .expect('Content-Type', /json/)
        .expect(200);
      const expected = {
        message: 'success',
        statusCode: 200,
        data: [
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
      };
      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/patients/search?phone="invalidPhone" should return boomify object error', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?phone=invalidPhone')
        .expect('Content-Type', /json/)
        .expect(400);
      const expected = {
        statusCode: 400,
        error: 'Invalid Query String',
        message:
          'Please Send an valid firstName or lastName or valid phone with length of 10 like 0599010101',
      };
      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/patients/search?firstName="2invalidName@" should return boomify object error', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?firstName=2invalidName@')
        .expect('Content-Type', /json/)
        .expect(400);
      const expected = {
        statusCode: 400,
        error: 'Invalid Query String',
        message:
          'Please Send an valid firstName or lastName or valid phone with length of 10 like 0599010101',
      };
      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/patients/search?lastName="2invalidName@" should return boomify object error', async () => {
      const res = await request(app)
        .get('/api/v1/patients/search?lastName=2invalidName@')
        .expect('Content-Type', /json/)
        .expect(400);
      const expected = {
        statusCode: 400,
        error: 'Invalid Query String',
        message:
          'Please Send an valid firstName or lastName or valid phone with length of 10 like 0599010101',
      };
      return expect(expected).toEqual(res.body);
    });
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
            appointment_time: '09:00:00',
            is_done: true,
            complaints:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
            firstname: 'Easton',
            lastname: 'Brekke',
            email: 'Francesco.Weissnat55@yahoo.com',
            birthday: '1936-12-02T00:00:00.000Z',
            phone: '0599010101',
            diseases:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          },
          {
            appointments_id: 8,
            id: 2,
            patient_id: 2,
            appointment_date: '2020-12-02T00:00:00.000Z',
            appointment_time: '11:00:00',
            is_done: false,
            complaints:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
            firstname: 'Alexie',
            lastname: 'Jenkins',
            email: 'Talon.Fritsch@hotmail.com',
            birthday: '1946-12-02T00:00:00.000Z',
            phone: '0599010102',
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
    test('GET /api/v1/appointments/search?firstName=Alexie&lastName=Jenkins should return an array with 3 appointments', async () => {
      const res = await request(app)
        .get('/api/v1/appointments/search?firstName=Alexie&lastName=Jenkins')
        .expect(200)
        .expect('Content-Type', /json/);
      return expect(res.body.data).toHaveLength(3);
    });
    test('GET /api/v1/appointments/search?phone=0599010102 should return an array with 3 appointments', async () => {
      const res = await request(app)
        .get('/api/v1/appointments/search?phone=0599010102')
        .expect(200)
        .expect('Content-Type', /json/);
      return expect(res.body.data).toHaveLength(3);
    });
    test('GET /api/v1/appointments/search should return Validation Error enter a name or phone', async () => {
      const res = await request(app)
        .get('/api/v1/appointments/search')
        .expect(400)
        .expect('Content-Type', /json/);
      return expect(res.body.error).toBe('Validation Error');
    });
    test('GET /api/v1/appointments/available/:date should return free time without any appointments', async () => {
      const expected = {
        title: 'available time',
        detail: 'data collected Successfully',
        data: [
          '09:00:00',
          '11:00:00',
          '13:00:00',
          '14:00:00',
          '16:00:00',
          '18:00:00',
        ],
      };

      const res = await request(app)
        .get('/api/v1/appointments/available/2021-12-02')
        .expect('Content-Type', /json/)
        .expect(200);

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
            phone: '0599010112',
            diseases:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
          },
          balance: 50,
          history: [
            {
              price: 50,
              payment: 0,
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
              log_date: '2021-01-02T00:00:00.000Z',
            },
          ],
        },
      };

      const res = await request(app)
        .get('/api/v1/patients/12')
        .expect('Content-Type', /json/)
        .expect(200);

      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/appointments/available/:date should return boomify Object Error when invalid Date is added', async () => {
      const expected = {
        statusCode: 400,
        error: 'Invalid Date',
        message: 'Please send a correct date',
      };
      const res = await request(app)
        .get('/api/v1/appointments/5952awd-59')
        .expect('Content-Type', /json/)
        .expect(400);
      return expect(expected).toEqual(res.body);
    });
    test('GET /api/v1/patients/:patientId should return boomify Object Error when invalid id is added', async () => {
      const expected = {
        statusCode: 400,
        error: 'Invalid id',
        message: 'Please send a correct one',
      };
      const res = await request(app)
        .get('/api/v1/patients/1a')
        .expect('Content-Type', /json/)
        .expect(400);
      return expect(expected).toEqual(res.body);
    });
    test('POST /api/v1/patients/:patientId/history should add a log to the database', async () => {
      const expected = {
        title: 'adding a history log',
        detail: 'data added Successfully',
        data: [
          {
            id: 3,
            patient_id: 12,
            description: 'some sort fo treatment',
            price: 200,
            payment: 200,
          },
        ],
      };
      const res = await request(app)
        .post('/api/v1/patients/12/history')
        .send({
          description: 'some sort fo treatment',
          price: '200',
          payment: '200',
        })
        .expect('Content-Type', /json/)
        .expect(201);
      return expect(res.body).toMatchObject(expected);
    });
    test('POST /api/v1/patients/:patientId/history  should return boomify Object Error when invalid input is added', async () => {
      const expected = {
        statusCode: 400,
        error: 'Validation Error',
        message: [
          'patientId must be a `number` type, but the final value was: `NaN` (cast from the value `"8s"`).',
        ],
      };
      const res = await request(app)
        .post('/api/v1/patients/8s/history')
        .send({
          description: 'some sort fo treatment',
          price: '200',
          payment: '200',
        })
        .expect('Content-Type', /json/)
        .expect(400);
      return expect(expected).toEqual(res.body);
    });
    test('DELETE /api/v1/appointment/:appointmentId should return a message "appointment deleted successfully"', async () => {
      const message = 'appointment deleted successfully';
      const res = await request(app)
        .delete('/api/v1/appointments/8')
        .expect('Content-Type', /json/)
        .expect(200);
      return expect(message).toEqual(res.body.message);
    });
    test('DELETE /api/v1/appointment/:appointmentId should return Validation Error appointmentId must be a number', async () => {
      const res = await request(app)
        .delete('/api/v1/appointments/"8"')
        .expect(400)
        .expect('Content-Type', /json/);
      return expect(res.body.error).toEqual('Validation Error');
    });
    test('DELETE /api/v1/appointment/:appointmentId should not delete the appointments because it has an history', async () => {
      const expected = {
        statusCode: 400,
        error: 'Bad request',
        message: 'You cannot complete the process at the moment',
      };
      const res = await request(app)
        .delete('/api/v1/appointments/2')
        .expect(400)
        .expect('Content-Type', /json/);
      return expect(expected).toEqual(res.body);
    });
    test('/api/v1/patients/:patientId route should return message Updated successfully', async () => {
      const message = 'Updated successfully';
      const res = await request(app)
        .patch('/api/v1/patients/9')
        .send({
          firstName: 'alaa',
          lastName: 'alser',
          phone: '0592623088',
          email: 'alasa@lhaser.com',
          birthday: '1994-09-02',
          diseases: 'no diseases',
        })
        .expect(200)
        .expect('Content-Type', /json/);
      return expect(message).toEqual(res.body.message);
    });
    test('/api/v1/patients/:patientId route should return error phone number is exist', async () => {
      const message = 'phone number is exist';
      const res = await request(app)
        .patch('/api/v1/patients/1')
        .send({
          firstName: 'alaa',
          lastName: 'alser',
          phone: '0599010102',
          email: 'alasa@lhaser.com',
          birthday: '1994-09-02',
          diseases: 'no diseases',
        })
        .expect(409)
        .expect('Content-Type', /json/);
      return expect(message).toEqual(res.body.message);
    });
  });
});
