const {
  getPatientByNameOrPhoneQuery,
  addPatientQuery,
  addAppointmentQuery,
} = require('../../../database/queries');

const addAppointment = async (req, res, next) => {
  const {
    body: {
      firstName,
      lastName,
      email,
      birthday,
      phone,
      diseases,
      appointmentDate,
      appointmentTime,
      complaints,
    },
  } = req;
  let patientId;
  try {
    const {
      rows: existPatient,
      rowCount: isPatientExist,
    } = await getPatientByNameOrPhoneQuery({
      phone,
    });
    if (!isPatientExist) {
      const {
        rows: [{ id: newPatientId }],
      } = await addPatientQuery({
        firstName,
        lastName,
        email,
        birthday,
        phone,
        diseases,
      });
      patientId = newPatientId;
    } else {
      patientId = existPatient[0].id;
    }
    await addAppointmentQuery({
      patientId,
      appointmentDate,
      appointmentTime,
      complaints,
    });
    return res.status(201).json({ status: 201, message: 'success' });
  } catch (err) {
    return next(err);
  }
};

module.exports = addAppointment;
