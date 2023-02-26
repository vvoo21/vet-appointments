import 'bootstrap';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { petInput, ownerInput, phoneInput, dateInput, hourInput, symptomsInput, form } from './modules/variables.js';
import infoAppointment, { newAppointment } from './modules/functions.js';

// events
petInput.addEventListener('input', infoAppointment);
ownerInput.addEventListener('input', infoAppointment);
phoneInput.addEventListener('input', infoAppointment);
dateInput.addEventListener('input', infoAppointment);
hourInput.addEventListener('input', infoAppointment);
symptomsInput.addEventListener('input', infoAppointment);

form.addEventListener('submit', newAppointment);

