const { patchPatientDataByIdQuery } = require('../../database/queries');
const { boomify, patientDataValidation } = require('../../utils');

const patchPatientData = async (req, res, next) => {
  const { firstName, lastName, phone, email, birthday, diseases } = req.body;
  const { patientId } = req.params;

  try {
    const isValid = await patientDataValidation.validate(
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
    if (isValid) {
      res.json({
        msg: 'Updated successfully',
        data,
      });
    }
  } catch (error) {
    next(
      error.name === 'ValidationError'
        ? boomify(400, 'Validation Error', error.errors)
        : error,
    );
  }
};

module.exports = patchPatientData;
