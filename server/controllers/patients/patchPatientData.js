const {
  patchPatientDataByIdQuery,
  patientCheckPhone,
} = require('../../database/queries');
const { boomify, patientDataValidation } = require('../../utils');

const patchPatientData = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      birthday,
      diseases,
      patientId,
    } = await patientDataValidation.validate(
      { ...req.body, ...req.params },
      {
        abortEarly: false,
      },
    );

    const {
      rows: [patient],
    } = await patientCheckPhone({ phone });
    if (patient) {
      return next(boomify(409, 'Edit Error', 'phone number is exist'));
    }

    const {
      rows: [data],
    } = await patchPatientDataByIdQuery({
      firstName,
      lastName,
      phone,
      email,
      birthday,
      diseases,
      patientId,
    });

    return res.json({
      statusCode: 200,
      message: 'Updated successfully',
      data,
    });
  } catch (error) {
    if (error.name === 'RangeError') {
      return next(boomify(400, 'RangeError', error.message));
    }
    if (error.name === 'ValidationError') {
      return next(boomify(400, 'Validation Error', error.errors));
    }
    return next(error);
  }
};

module.exports = patchPatientData;
