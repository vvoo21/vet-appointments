class Appointments {
  constructor() {
    this.appointments = [];
  }

  addAppointment(appointment) {
    this.appointments = [...this.appointments, appointment];
  }

  deleteAppointment(id) {
    this.appointments = this.appointments.filter((appointment) => appointment.id !== id);
  }

  editAppointment(newAppointment) {
    this.appointments = this.appointments.map(
      (appointment) => (appointment.id === newAppointment.id ? newAppointment : appointment),
    );
  }
}

export default Appointments;