const { getPatientByNameOrPhoneQuery } = require('../../../database/queries');

const { boomify, patientSearchValidation } = require('../../../utils');

const getPatientByNameOrPhone = async (req, res, next) => {
  try {
    const {
      query: { phone, firstName, lastName },
    } = req;

    const patientQueryValidation = await patientSearchValidation.isValid({
      firstName,
      lastName,
      phone,
    });

    if (!patientQueryValidation)
      return next(
        boomify(
          400,
          'Invalid Query String',
          'Please Send an valid firstName or lastName or valid phone with length of 10 like 0599010101',
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
