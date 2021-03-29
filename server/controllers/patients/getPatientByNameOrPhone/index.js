const { getPatientByNameOrPhoneQuery } = require('../../../database/queries');

const {
  boomify,
  patientSearchValidation: {
    patientSearchByNameValidation,
    patientSearchByPhoneValidation,
  },
} = require('../../../utils');

const getPatientByNameOrPhone = async (req, res, next) => {
  try {
    const {
      query: { phone, firstName, lastName },
    } = req;

    const patientNameValidation = await patientSearchByNameValidation.isValid({
      firstName,
      lastName,
    });

    if (!patientNameValidation)
      return next(
        boomify(
          400,
          'Invalid Name',
          'Please Send an valid firstName or lastName',
        ),
      );

    const patientPhoneValidation = await patientSearchByPhoneValidation.isValid(
      {
        phone,
      },
    );
    if (!patientPhoneValidation)
      return next(
        boomify(
          400,
          'Invalid Phone',
          'Please Send an valid phone with length of 10 like 0599010101',
        ),
      );
    const { rows: patients } = await getPatientByNameOrPhoneQuery({
      firstName,
      lastName,
      phone,
    });

    return res.json({
      message: 'success',
      statusCode: 200,
      data: patients,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = getPatientByNameOrPhone;
