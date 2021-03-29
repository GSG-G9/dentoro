const {
  getPatientByName,
  getPatientByPhone,
} = require('../../../database/queries');

const {
  boomify,
  patientSearchValidation: {
    patientSearchByNameValidation,
    patientSearchByPhoneValidation,
  },
} = require('../../../utils');

module.exports = async (req, res, next) => {
  try {
    const {
      query: { phone, firstName, lastName },
    } = req;

    const patientNameValidation = await patientSearchByNameValidation.isValid({
      firstName,
      lastName,
    });

    if (!patientNameValidation)
      throw boomify(
        400,
        'Invalid Name',
        'Please Send an valid firstName or lastName',
      );

    const patientPhoneValidation = await patientSearchByPhoneValidation.isValid(
      {
        phone,
      },
    );
    if (!patientPhoneValidation)
      throw boomify(
        400,
        'Invalid Phone',
        'Please Send an valid phone with length of 10 like 0599010101',
      );
    const { rows: patientsByName } = await getPatientByName({
      firstName,
      lastName,
    });

    const { rows: patientsByPhone } = await getPatientByPhone(phone);
    res.json({
      message: 'success',
      status: 200,
      data: { patientsByPhone, patientsByName },
    });
  } catch (error) {
    next(error);
  }
};
