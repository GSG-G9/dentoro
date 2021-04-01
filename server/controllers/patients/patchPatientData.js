const { patchPatientDataByIdQuery } = require('../../database/queries');

const patchPatientData = async (req, res, next) => {
  const { firstName, lastName, phone, email, birthday, diseases } = req.body;
  const { patientId } = req.params;
  try {
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

    res.json({
      msg: 'Updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = patchPatientData;
