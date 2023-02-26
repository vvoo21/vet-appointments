import appointmentsObj from './appointmentsObj.js';
/* eslint-disable */
import UI from './UI.js';
/* eslint-disable */
import Appointments from './Appointments.js';
import {
  form, petInput, ownerInput, phoneInput, dateInput, hourInput, symptomsInput,
} from './variables.js';

const manageAppointments = new Appointments();
let editing;

const infoAppointment = (e) => {
  appointmentsObj[e.target.name] = e.target.value;
};

export const resetObject = () => {
  appointmentsObj.pet = '';
  appointmentsObj.owner = '';
  appointmentsObj.phone = '';
  appointmentsObj.date = '';
  appointmentsObj.hour = '';
  appointmentsObj.symptom = '';
};

export const newAppointment = (e) => {
  e.preventDefault();

  const {
    pet, owner, phone, date, hour, symptoms,
  } = appointmentsObj;

  if (pet === '' || owner === '' || phone === '' || date === '' || hour === '' || symptoms === '') {
    UI.printAlert('All fields are required', 'error');
    return;
  }

  if (editing) {
    UI.printAlert('Edited correctly');

    // pass the appointment object to edit
    manageAppointments.editAppointment({ ...appointmentsObj });

    // Return the button text to its original state
    form.querySelector('button[type="submit"]').textContent = 'Create Appointment';

    // Remove edit mode
    editing = false;
  } else {
    appointmentsObj.id = Date.now();

    manageAppointments.addAppointment({ ...appointmentsObj });

    UI.printAlert('Added successfully');
  }

  resetObject();

  form.reset();

  UI.printAppointment(manageAppointments);
};

export const deleteAppointment = (id) => {
  manageAppointments.deleteAppointment(id);

  UI.printAlert('The appointment was deleted successfully');

  UI.printAppointment(manageAppointments);
};

export const uploadAppointment = (appointment) => {
  const {
    pet, owner, phone, date, hour, symptoms, id,
  } = appointment;

  // fill the inputs
  petInput.value = pet;
  ownerInput.value = owner;
  phoneInput.value = phone;
  dateInput.value = date;
  hourInput.value = hour;
  symptomsInput.value = symptoms;

  // fill the object
  appointmentsObj.pet = pet;
  appointmentsObj.owner = owner;
  appointmentsObj.phone = phone;
  appointmentsObj.date = date;
  appointmentsObj.hour = hour;
  appointmentsObj.symptoms = symptoms;
  appointmentsObj.id = id;

  // Change button text
  form.querySelector('button[type="submit"]').textContent = 'Save Changes';

  editing = true;
};

export default infoAppointment;