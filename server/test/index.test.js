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
  addAppointmentQuery,
  addPatientQuery,
  getPatientsQuery,
  addHistoryLogQuery,
  getAppointmentsStatusByIdQuery,
  updateAppointmentStatusQuery,
  deleteAppointmentsQueries,
  checkUserIdByEmail,
  addUserQuery,
  updateAppointmentTimeQuery,
  patchPatientDataByIdQuery,
  checkPatientExistence,
  getUserDataQeury,
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
    test('updateAppointmentTimeQuery query should the edit the appointment date and time and return appointment id - updated Date - Time', async () => {
      const appointmentId = 1;
      const appointmentDate = '2021-4-1';
      const appointmentTime = '18:00:00';
      const expected = {
        id: 1,
        appointment_date: new Date('2021-04-01T00:00:00.000Z'),
        appointment_time: '18:00:00',
      };

      const {
        rows: [updateAppointmentObject],
      } = await updateAppointmentTimeQuery({
        appointmentId,
        appointmentDate,
        appointmentTime,
      });
      return expect(expected).toEqual(updateAppointmentObject);
    });
    test('getAppointmentsStatusByIdQuery query should return the appointment recored id containing the status of this appointment', async () => {
      const appointmentId = 1;
      const expected = { is_done: false };
      const {
        rows: [appointmentRecord],
      } = await getAppointmentsStatusByIdQuery({
        appointmentId,
      });
      return expect(expected).toEqual(appointmentRecord);
    });
    test('updateAppointmentStatusQuery query should return the appointment recored id containing the updated status of this appointment', async () => {
      const appointmentId = 1;
      const expected = { is_done: true };
      const {
        rows: [appointmentRecord],
      } = await updateAppointmentStatusQuery({
        appointmentId,
      });
      return expect(expected).toEqual(appointmentRecord);
    });
    test('patchPatientDataByIdQuery query should return Patient Data updated', async () => {
      const expected = {
        id: 1,
        firstname: 'john',
        lastname: 'cina',
        phone: '0599887782',
        email: 'john@cina.com',
        birthday: new Date('1994-09-02T00:00:00.000Z'),
        diseases: 'no diseases',
      };
      const {
        rows: [data],
      } = await patchPatientDataByIdQuery({
        patientId: 1,
        firstName: 'john',
        lastName: 'cina',
        phone: '0599887782',
        email: 'john@cina.com',
        birthday: '1994-09-02',
        diseases: 'no diseases',
      });
      return expect(expected).toEqual(data);
    });
    test('addPatientQuery(patientData) query should return new patient id', async () => {
      const patientData = {
        firstName: 'test',
        lastName: 'test',
        phone: '0599020202',
        email: 'test@test.com',
        birthday: '08-08-1989',
        diseases: 'cancer',
      };
      const {
        rows: [{ id: patientId }],
      } = await addPatientQuery(patientData);
      return expect(patientId).toBeTruthy();
    });
    test('addAppointmentQuery(patientData) query should return new appointment id', async () => {
      const patientData = {
        firstName: 'test',
        lastName: 'test',
        phone: '0599020202',
        email: 'test@test.com',
        birthday: '08-08-1989',
      };
      const {
        rows: [{ id: patientId }],
      } = await addPatientQuery(patientData);

      const appointmentData = {
        patientId,
        appointmentDate: '2021-3-31',
        appointmentTime: '16:00:00',
        complaints: 'teeth pain',
      };

      const {
        rows: [{ id: appointmentId }],
      } = await addAppointmentQuery(appointmentData);
      return expect(appointmentId).toBeTruthy();
    });
    test('checkPatientExistence(phone) query should return patient Id', async () => {
      const patientPhone = '0599010101';
      const patientId = 1;
      const {
        rows: [{ id }],
      } = await checkPatientExistence({ phone: patientPhone });
      return expect(id).toBe(patientId);
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
    test('addUserQuery query should add a user', async () => {
      const expected = [
        {
          id: 2,
        },
      ];
      const { rows } = await addUserQuery({
        email: 'test@test.com',
        password:
          '$2b$10$yrP4Qea4Mdu0rKkWHAnBw.Trkj4YNl8a1X7yQm5AVA.1ZNu1THnD2',
      });
      return expect(rows).toEqual(expected);
    });
    test('checkUserIdByEmail query should return id to that email', async () => {
      const expected = [
        {
          id: 1,
        },
      ];
      const { rows } = await checkUserIdByEmail({
        email: 'someemail@admin.com',
      });
      return expect(rows).toEqual(expected);
    });
    test('getUserDataQeury query should return user data', async () => {
      const expected = [
        {
          id: 1,
          email: 'someemail@admin.com',
          password:
            '$2b$10$tKU3mWh6lSjVd6TppnPcku6qlcyWV0fgraYYi8bvUk2ATIEtpk6AO',
        },
      ];
      const { rows } = await getUserDataQeury({
        email: 'someemail@admin.com',
      });
      return expect(rows).toEqual(expected);
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
    test('POST /api/v1/appointments with patientData belongs to new patient attached to request body should return success message with status code 201', async () => {
      const patientData = {
        firstName: 'test',
        lastName: 'test',
        phone: '0599020202',
        email: 'test@test.com',
        birthday: '1989-08-08',
        appointmentDate: '2021-4-2',
        appointmentTime: '16:00:00',
        complaints: 'teeth pain',
      };
      const res = await request(app)
        .post('/api/v1/appointments')
        .set({
          'Content-Type': 'application/json',
        })
        .send(patientData)
        .expect(201)
        .expect('Content-Type', /json/);
      const expected = { status: 201, message: 'success' };
      return expect(expected).toEqual(res.body);
    });
    test('POST /api/v1/appointments with patientData belongs to exist patient attached to request body should return success message with status code 201 without adding new Patient -by checking the count of the existing patients to be 20 after adding the appointment', async () => {
      const patientData = {
        firstName: 'Easton',
        lastName: 'Brekke',
        phone: '0599010101',
        email: 'Francesco.Weissnat55@yahoo.com',
        birthday: '1936-12-02',
        appointmentDate: '2021-3-31',
        appointmentTime: '16:00:00',
        complaints: 'teeth pain',
      };
      const res = await request(app)
        .post('/api/v1/appointments')
        .set({
          'Content-Type': 'application/json',
        })
        .send(patientData)
        .expect(201)
        .expect('Content-Type', /json/);
      const expected = { status: 201, message: 'success' };
      const { rowCount: patientsCount } = await getPatientsQuery();
      expect.assertions(2);
      expect(patientsCount).toBe(20);
      return expect(expected).toEqual(res.body);
    });
    test('POST /api/v1/appointments with patientData missing phone number', async () => {
      const patientData = {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        birthday: '1989-08-08',
        appointmentDate: '2021-3-31',
        appointmentTime: '16:00:00',
        complaints: 'teeth pain',
      };
      const res = await request(app)
        .post('/api/v1/appointments')
        .set({
          'Content-Type': 'application/json',
        })
        .send(patientData)
        .expect(400)
        .expect('Content-Type', /json/);
      const expected = {
        statusCode: 400,
        error: 'Validation Error',
        message: ['phone is a required field'],
      };
      return expect(expected).toEqual(res.body);
    });
    test('POST /api/v1/appointments with patientData - send incorrect appointmentTime', async () => {
      const patientData = {
        firstName: 'test',
        lastName: 'test',
        phone: '0599010102',
        email: 'test@test.com',
        birthday: '1989-08-08',
        appointmentDate: '2021-4-02',
        appointmentTime: '14:00',
        complaints: 'teeth pain',
      };
      const res = await request(app)
        .post('/api/v1/appointments')
        .set({
          'Content-Type': 'application/json',
        })
        .send(patientData)
        .expect(400)
        .expect('Content-Type', /json/);
      const expected = {
        statusCode: 400,
        error: 'RangeError',
        message: 'Invalid time value',
      };
      return expect(expected).toEqual(res.body);
    });
    test('POST /api/v1/appointments with patientData - choose unavailable time', async () => {
      const patientData = {
        firstName: 'test',
        lastName: 'test',
        phone: '0599010102',
        email: 'test@test.com',
        birthday: '1989-08-08',
        appointmentDate: '2021-12-02',
        appointmentTime: '17:00:00',
        complaints: 'teeth pain',
      };
      const res = await request(app)
        .post('/api/v1/appointments')
        .set({
          'Content-Type': 'application/json',
        })
        .send(patientData)
        .expect(409)
        .expect('Content-Type', /json/);
      const expected = {
        statusCode: 409,
        error: 'Unavailable Time',
        message: 'please choose another appointment time',
      };
      return expect(expected).toEqual(res.body);
    });
    test('POST /api/v1/appointments with patientData - choose unavailable time outside the working ours from 8:00-18:00', async () => {
      const patientData = {
        firstName: 'test',
        lastName: 'test',
        phone: '0599010102',
        email: 'test@test.com',
        birthday: '1989-08-08',
        appointmentDate: '2021-12-02',
        appointmentTime: '19:00:00',
        complaints: 'teeth pain',
      };
      const res = await request(app)
        .post('/api/v1/appointments')
        .set({
          'Content-Type': 'application/json',
        })
        .send(patientData)
        .expect(400)
        .expect('Content-Type', /json/);
      const expected = {
        statusCode: 400,
        error: 'Unavailable Time',
        message:
          'please choose another appointment time through the working hours',
      };
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
    test('POST /api/v1/users/signup should add a user to the database', async () => {
      const expected = {
        title: 'User Registration',
        detail: 'Successfully registered new dentist',
      };
      const res = await request(app)
        .post('/api/v1/users/signup')
        .send({
          email: 'test2@test.com',
          password: 'password',
          passwordConfirm: 'password',
        })
        .expect('Content-Type', /json/)
        .expect(201);
      return expect(res.body).toEqual(expected);
    });
    test('POST /api/v1/users/signup  should return boomify Object Error when invalid input is added', async () => {
      const expected = {
        statusCode: 409,
        error: 'checking email',
        message: 'This email already exists',
      };
      const res = await request(app)
        .post('/api/v1/users/signup')
        .send({
          email: 'someemail@admin.com',
          password: 'password',
          passwordConfirm: 'password',
        })
        .expect('Content-Type', /json/)
        .expect(409);
      return expect(expected).toEqual(res.body);
    });
    describe('PATCH /api/v1/appointments/:appointmentId', () => {
      describe('/time', () => {
        test('with correct body should update the appointment and return a success message', async () => {
          const appointmentId = 1;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/time`)
            .send({
              appointmentDate: '2021-4-3',
              appointmentTime: '18:00:00',
              isDone: false,
            })
            .expect('Content-Type', /json/)
            .expect(200);
          const expected = { status: 200, message: 'success' };
          return expect(expected).toEqual(res.body);
        });
        test('with a completed appointment should return error with status code 400 and message This appointment is completed', async () => {
          const appointmentId = 2;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/time`)
            .send({
              appointmentDate: '2021-4-3',
              appointmentTime: '18:00:00',
              isDone: false,
            })
            .expect('Content-Type', /json/)
            .expect(400);
          const expected = {
            statusCode: 400,
            error: 'Bad request',
            message: 'Please make sure you are sending a rightful request',
          };
          return expect(expected).toEqual(res.body);
        });
        test('with a non exist appointmentId should return error with status code 400 and message This appointmentId not exist', async () => {
          const appointmentId = 150;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/time`)
            .send({
              appointmentDate: '2021-4-3',
              appointmentTime: '18:00:00',
              isDone: false,
            })
            .expect('Content-Type', /json/)
            .expect(400);
          const expected = {
            statusCode: 400,
            error: 'Bad request',
            message: 'Please make sure you are sending a rightful request',
          };
          return expect(expected).toEqual(res.body);
        });
        test('with invalid appointment Date should return error message', async () => {
          const appointmentId = 1;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/time`)
            .send({
              appointmentDate: '2021',
              appointmentTime: '18:00:00',
              isDone: false,
            })
            .expect('Content-Type', /json/)
            .expect(400);
          const expected = {
            statusCode: 400,
            error: 'RangeError',
            message: 'Invalid time value',
          };
          return expect(expected).toEqual(res.body);
        });
        test('with invalid appointment Time should return error message', async () => {
          const appointmentId = 1;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/time`)
            .send({
              appointmentDate: '2021-4-3',
              appointmentTime: '18',
              isDone: false,
            })
            .expect('Content-Type', /json/)
            .expect(400);
          const expected = {
            statusCode: 400,
            error: 'RangeError',
            message: 'Invalid time value',
          };
          return expect(expected).toEqual(res.body);
        });
        test('with invalid appointmentId should return error message', async () => {
          const appointmentId = 'invaildAppointmentId';
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/time`)
            .send({
              appointmentDate: '2021-4-3',
              appointmentTime: '18:00:00',
              isDone: false,
            })
            .expect('Content-Type', /json/)
            .expect(400);
          const expected = {
            statusCode: 400,
            error: 'Validation Error',
            message: [
              'appointmentId must be a `number` type, but the final value was: `NaN` (cast from the value `"invaildAppointmentId"`).',
            ],
          };
          return expect(expected).toEqual(res.body);
        });
        test('with unavailable time should return error message', async () => {
          const appointmentId = 1;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/time`)
            .send({
              appointmentDate: '2021-12-02',
              appointmentTime: '08:00:00',
              isDone: false,
            })
            .expect('Content-Type', /json/)
            .expect(409);
          const expected = {
            statusCode: 409,
            error: 'Unavailable Time',
            message: 'please choose another appointment time',
          };
          return expect(expected).toEqual(res.body);
        });
        test('with time outside the working hours should return error message', async () => {
          const appointmentId = 1;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/time`)
            .send({
              appointmentDate: '2021-12-02',
              appointmentTime: '01:00:00',
              isDone: false,
            })
            .expect('Content-Type', /json/)
            .expect(400);
          const expected = {
            statusCode: 400,
            error: 'Unavailable Time',
            message:
              'please choose another appointment time through the working hours',
          };
          return expect(expected).toEqual(res.body);
        });
      });
      describe('/status', () => {
        test('should update the appointment is_done = true and return a success message', async () => {
          const appointmentId = 1;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/status`)
            .send({ isDone: false })
            .expect('Content-Type', /json/)
            .expect(200);
          const expected = { status: 200, message: 'success' };
          return expect(expected).toEqual(res.body);
        });
        test('with a completed appointment should return error with status code 400 and error message', async () => {
          const appointmentId = 2;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/status`)
            .send({ isDone: false })
            .expect('Content-Type', /json/)
            .expect(400);
          const expected = {
            statusCode: 400,
            error: 'Bad request',
            message: 'Please make sure you are sending a rightful request',
          };
          return expect(expected).toEqual(res.body);
        });
        test('with a non exist appointmentId should return error with status code 400 and message This appointmentId not exist', async () => {
          const appointmentId = 150;
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/status`)
            .send({ isDone: false })
            .expect('Content-Type', /json/)
            .expect(400);
          const expected = {
            statusCode: 400,
            error: 'Bad request',
            message: 'Please make sure you are sending a rightful request',
          };
          return expect(expected).toEqual(res.body);
        });
        test('with invalid appointmentId should return error message', async () => {
          const appointmentId = 'invaildAppointmentId';
          const res = await request(app)
            .patch(`/api/v1/appointments/${appointmentId}/status`)
            .send({ isDone: false })
            .expect('Content-Type', /json/)
            .expect(400);
          const expected = {
            statusCode: 400,
            error: 'Validation Error',
            message: [
              'appointmentId must be a `number` type, but the final value was: `NaN` (cast from the value `"invaildAppointmentId"`).',
            ],
          };
          return expect(expected).toEqual(res.body);
        });
      });
    });
    test('PATCH /api/v1/patients/:patientId route should return message Updated successfully', async () => {
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
    test('PATCH /api/v1/patients/:patientId route should return error Key (phone)=(0599010102) already exists.', async () => {
      const message = 'Key (phone)=(0599010102) already exists.';
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
    test('PATCH /api/v1/patients/:patientId route should return Invalid time value for wrong date', async () => {
      const message = 'Invalid time value';
      const res = await request(app)
        .patch('/api/v1/patients/9')
        .send({
          firstName: 'alaa',
          lastName: 'alser',
          phone: '0592623088',
          email: 'alasa@lhaser.com',
          birthday: '02-09-1994',
          diseases: 'no diseases',
        })
        .expect(400)
        .expect('Content-Type', /json/);
      return expect(message).toEqual(res.body.message);
    });
    test('PATCH /api/v1/patients/:patientId route should return Validation Error for invalid name', async () => {
      const message = 'Validation Error';
      const res = await request(app)
        .patch('/api/v1/patients/9')
        .send({
          firstName: 'aa',
          lastName: 'alser',
          phone: '0592623088',
          email: 'alasa@lhaser.com',
          birthday: '1994-09-02',
          diseases: 'no diseases',
        })
        .expect(400)
        .expect('Content-Type', /json/);
      return expect(message).toEqual(res.body.error);
    });
    test('PATCH /api/v1/patients/:patientId route should return error for invalid id', async () => {
      const message = `There's no patient with this Id`;
      const res = await request(app)
        .patch('/api/v1/patients/9999')
        .send({
          firstName: 'aaaa',
          lastName: 'alser',
          phone: '0592623088',
          email: 'alasa@lhaser.com',
          birthday: '1994-09-02',
          diseases: 'no diseases',
        })
        .expect(404)
        .expect('Content-Type', /json/);
      return expect(message).toEqual(res.body.error);
    });
    test('POST /api/v1/users/login should return status code 201 and message = logged in successfully', async () => {
      const message = 'logged in successfully';
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'someemail@admin.com', password: 'password' })
        .expect(200)
        .expect('Content-Type', /json/);
      return expect(message).toBe(res.body.message);
    });
    test('POST /api/v1/users/login should return status code 400 and message = Incorrect email', async () => {
      const message = 'Incorrect email or password';
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'someemail1111@admin.com', password: 'password' })
        .expect(400)
        .expect('Content-Type', /json/);
      return expect(message).toBe(res.body.message);
    });
    test('POST /api/v1/users/login should return status code 400 and message = Incorrect password', async () => {
      const message = 'Incorrect email or password';
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'someemail@admin.com', password: 'password111' })
        .expect(400)
        .expect('Content-Type', /json/);
      return expect(message).toBe(res.body.message);
    });
    test('POST /api/v1/users/login should return status code 400 and validtion error message = Must be a valid email', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'someemail', password: 'password' })
        .expect(400)
        .expect('Content-Type', /json/);
      const { message } = res.body;
      return expect(message[0]).toBe('Must be a valid email');
    });
    test('POST /api/v1/users/login should return status code 400 and validtion error message = Password must be at least 8 char', async () => {
      const message = 'Password must be at least 8 char';
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'someemail@admin.com', password: 'passwor' })
        .expect(400)
        .expect('Content-Type', /json/);
      return expect(message).toBe(res.body.message[0]);
    });
    test('Logout Route should return header set-cookie for token equal to empty value', async () => {
      const {
        header: {
          'set-cookie': [cookies],
        },
      } = await request(app)
        .get('/api/v1/users/logout')
        .expect('Content-type', /json/)
        .expect(200);
      const [, token] = cookies.split(';')[0].split('=');
      return expect(token).toBe('');
    });
  });
});
