class Appointments {
  constructor() {
    this.appointments = [];
  }

  addAppointment(appointment) {
    this.appointments = [...this.appointments, appointment];
  }

  editAppointment(newAppointment) {
    this.appointments = this.appointments.map(
      (appointment) => (appointment.id === newAppointment.id ? newAppointment : appointment),
    );
  }
}

export default Appointments;