import appointmentsObj from './appointmentsObj.js';
/* eslint-disable */
import UI from './UI.js';
/* eslint-disable */
import Appointments from './Appointments.js';
import {
  form, petInput, ownerInput, phoneInput, dateInput, hourInput, symptomsInput,
} from './variables.js';

const manageAppointments = new Appointments();
const ui = new UI(manageAppointments);
let editing;
export let dataBase;

export const infoAppointment = (e) => {
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
    ui.printAlert('All fields are required', 'error');
    return;
  }

  if (editing) {
    // pass the appointment object to edit
    manageAppointments.editAppointment({ ...appointmentsObj });

    // Edit in the indexedDB
    const transaction = dataBase.transaction(['appointments'], 'readwrite');

    const objectStore = transaction.objectStore('appointments');

    objectStore.put(appointmentsObj);

    transaction.oncomplete = () => {
      ui.printAlert('Edited correctly');

      // Return the button text to its original state
      form.querySelector('button[type="submit"]').textContent = 'Create Appointment';

      // Remove edit mode
      editing = false;
    }
  } else {
    appointmentsObj.id = Date.now();

    manageAppointments.addAppointment({ ...appointmentsObj });

    //Insert record into indexedDB
    const transaction = dataBase.transaction(['appointments'], 'readwrite'); 

    const objectStore = transaction.objectStore('appointments');

    objectStore.add(appointmentsObj);

    transaction.oncomplete = () => {
      ui.printAlert('Added successfully');
    }

    transaction.onerror = () => {
      return 'There was an error'
    }
  }

  resetObject();

  form.reset();

  ui.printAppointment();
};

export const deleteAppointment = (id) => {
  manageAppointments.deleteAppointment(id);

  ui.printAlert('The appointment was deleted successfully');

  ui.printAppointment();
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

export const createDB = () => {
  //create a database version 1.0
  const createDB = window.indexedDB.open('appointments ', 1);

  //if there is a mistake
  createDB.onerror = function() {
    return 'There was an error when creating DB';
  }

  // If the database was created correctly
  createDB.onsuccess = function() {

    dataBase = createDB.result;

    ui.printAppointment();
  }

  //schema DB
  createDB.onupgradeneeded = function(e) {
    const db = e.target.result;

    //create object store
    const objectStore = db.createObjectStore('appointments', {
      keyPath: 'id',
      autoIncrement: true
    });

    //Define all columns
    objectStore.createIndex('pet', 'pet', {unique: false});
    objectStore.createIndex('owner', 'owner', {unique: false});
    objectStore.createIndex('phone', 'phone', {unique: false});
    objectStore.createIndex('date', 'date', {unique: false});
    objectStore.createIndex('hour', 'hour', {unique: false});
    objectStore.createIndex('symptoms', 'symptoms', {unique: false});
    objectStore.createIndex('id', 'id', {unique: true});
  }
};

