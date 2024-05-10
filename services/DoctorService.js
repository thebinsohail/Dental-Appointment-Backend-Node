const Doctor = require('../models/doctor/Doctor');

const DoctorService = {
    registerDoctor: async function (doctor) {
        const doctorObject = new Doctor({
            user: doctor.user,
            qualification: doctor.qualification
        });

        const doc = await doctorObject.save()
            .then((doctor => { return doctor }));
        return doc;
    }
}

module.exports = DoctorService;