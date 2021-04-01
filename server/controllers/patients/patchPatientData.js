const {
  patchPatientDataByIdQuery,
  patientCheckPhone,
} = require('../../database/queries');
const { boomify, patientDataValidation } = require('../../utils');

const patchPatientData = async (req, res, next) => {
  const { firstName, lastName, phone, email, birthday, diseases } = req.body;
  const { patientId } = req.params;

  try {
    const {
      rows: [patient],
    } = await patientCheckPhone({ phone });
    if (patient) {
      return next(boomify(401, 'edit Error', 'phone number is exist'));
    }

    await patientDataValidation.validate(
      { firstName, lastName, phone, email, diseases, birthday, patientId },
      {
        abortEarly: false,
      },
    );
    const {
      rows: [data],
    } = await patchPatientDataByIdQuery(
      firstName,
      lastName,
      phone,
      email,
      birthday,
      diseases,
      patientId,
    );

    return res.json({
      statusCode: 200,
      msg: 'Updated successfully',
      data,
    });
  } catch (error) {
    return next(
      error.name === 'ValidationError'
        ? boomify(400, 'Validation Error', error.errors)
        : error,
    );
  }
};

module.exports = patchPatientData;
