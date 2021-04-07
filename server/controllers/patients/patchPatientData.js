const { patchPatientDataByIdQuery } = require('../../database/queries');
const { boomify, patientDataValidation } = require('../../utils');

const patchPatientData = async (req, res, next) => {
  console.log(req.body);
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
      rows: [data],
      rowCount,
    } = await patchPatientDataByIdQuery({
      firstName,
      lastName,
      phone,
      email,
      birthday,
      diseases,
      patientId,
    });

    if (rowCount === 0) {
      return next(boomify(404, `There's no patient with this Id`));
    }
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
    if (error.constraint === 'patients_phone_key') {
      return next(boomify(409, 'Phone already exists.', error.detail));
    }
    return next(error);
  }
};

module.exports = patchPatientData;
