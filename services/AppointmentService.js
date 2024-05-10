const Appointment = require('../models/appointment/Appointment');
const message = require('../response/Constants');

const AppointmentService = {
    bookAppointment: async function (appointment) {
        const user = {
            _id: appointment.user._id,
            email: appointment.user.email,
            fullName: appointment.user.fullName,
            age: appointment.user.age,
            createdAt: appointment.user.createdAt
        }
        const appointments = await this.findAppointmentByEmail(user.email);
        if (appointments != null && appointments.user.email === user.email && appointments.status === 'RESERVED') {
            throw Error('Your Appointment has already been booked!');
        }
        const appointmentObject = new Appointment({
            user: user,
            doctor: appointment.doctor,
            patientName: appointment.patientName,
            mobile: appointment.mobile,
            dateOfAppointment: appointment.dateOfAppointment,
            status: 'RESERVED',
            createdAt: new Date()
        });

        // Save the new appointment to the database
        const appointmentDbObject = await appointmentObject.save()
            .then(appointment => {
                return appointment;
            });
        return appointmentDbObject;
    },
    findAppointmentByEmail: async function (email) {
        const appointment = await Appointment
            .findOne({ 'user.email': email })
            .sort({ _id: -1 })
            .then((appointment) => { return appointment; });
        return appointment;
    },

    getAllAppointments: async function () {
        const appointments = await Appointment
            .find({ status: 'RESERVED',dateOfAppointment: { $lt: new Date() } })
            .sort({ _id: -1 })
            .then((appointments) => { return appointments; });
        return appointments;
    },

    updateAppointmentById: async function (id, appointmentStatus) {
        const appointment = await Appointment.updateOne(
            { _id: id },
            { $set: { status: appointmentStatus } }
        ).then((appointment) => { return appointment; });

        return appointment;
    },
    getResponseMessage: function (status) {
        let responseMessage;
        switch (status) {

            case 'RESERVED':
                responseMessage = message.APPOINTMENT_SUCCESS_MESSAGE;
                break;

            case 'CANCELED':
                responseMessage = message.APPOINTMENT_CANCEL_MESSAGE;
                break;

            case 'TREATED':
                responseMessage = message.APPOINTMENT_TREATED_MESSAGE;
                break;

            default:
                throw new Error('Incorrect input for status field!');

        }
        return responseMessage;
    }
};

module.exports = AppointmentService;