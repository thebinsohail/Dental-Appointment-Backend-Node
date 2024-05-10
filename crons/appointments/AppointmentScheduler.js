const schedule = require('node-schedule');
const AppointmentService = require('../../services/AppointmentService');

const AppointmentScheduler = {
  expireAppointmentsJob: schedule.scheduleJob('*/5 * * * *', async function () {
    console.log('[Scheduling] - [Appointments] Finding the appointments that have the date less than today..');
    const today = new Date();
    const appointments = await AppointmentService.getAllAppointments({ date: { $lt: today } });

    for (let i = 0; i < appointments.length; i++) {
      const appointmentDbObject = await AppointmentService.updateAppointmentById(appointments[i]._id, 'EXPIRED');
      console.log(`Marked ${appointments[i]} status to 'EXPIRED'`);
      console.log(appointmentDbObject);
    }
    console.log('[Scheduling] - [Appointments] Ended');
  })
};

module.exports = AppointmentScheduler;
