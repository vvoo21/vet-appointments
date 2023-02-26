import { containerAppointments } from './variables.js';
/* eslint-disable */
import { deleteAppointment, uploadAppointment } from './functions.js';
/* eslint-disable */

class UI {
  static printAlert(message, type) {
    const divMessage = document.createElement('div');
    divMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');

    if (type === 'error') {
      divMessage.classList.add('alert-danger');
    } else {
      divMessage.classList.add('alert-success');
    }

    divMessage.textContent = message;

    document.querySelector('#content').insertBefore(divMessage, document.querySelector('.add-appointment'));

    setTimeout(() => {
      divMessage.remove();
    }, 3000);
  }

  printAppointment({ appointments }) {
    this.cleanHTML();

    appointments.forEach((appointment) => {
      const {
        pet, owner, phone, date, hour, symptoms, id,
      } = appointment;

      const divAppointment = document.createElement('div');
      divAppointment.classList.add('appointment', 'p-3');
      divAppointment.id = id;

      const petParagraph = document.createElement('h2');
      petParagraph.classList.add('card-title', 'font-weight-bolder');
      petParagraph.textContent = pet;

      const ownerParagraph = document.createElement('p');
      ownerParagraph.innerHTML = `
        <span class="font-weight-bolder">Owner: </span> ${owner}
      `;

      const phoneParagraph = document.createElement('p');
      phoneParagraph.innerHTML = `
        <span class="font-weight-bolder">Phone: </span> ${phone}
      `;

      const dateParagraph = document.createElement('p');
      dateParagraph.innerHTML = `
        <span class="font-weight-bolder">Date: </span> ${date}
      `;

      const hourParagraph = document.createElement('p');
      hourParagraph.innerHTML = `
        <span class="font-weight-bolder">Hour: </span> ${hour}
      `;

      const symptomsParagraph = document.createElement('p');
      symptomsParagraph.innerHTML = `
        <span class="font-weight-bolder">symptoms: </span> ${symptoms}
      `;

      const btnDelete = document.createElement('button');
      btnDelete.setAttribute('type', 'button');
      btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
      btnDelete.innerHTML = `Delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    `;
      btnDelete.onclick = () => deleteAppointment(id);

      const btnEdit = document.createElement('button');
      btnEdit.setAttribute('type', 'button');
      btnEdit.classList.add('btn', 'btn-info', 'mr-2');
      btnEdit.innerHTML = `Edit <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
    `;
      btnEdit.onclick = () => uploadAppointment(appointment);

      divAppointment.appendChild(petParagraph);
      divAppointment.appendChild(ownerParagraph);
      divAppointment.appendChild(phoneParagraph);
      divAppointment.appendChild(dateParagraph);
      divAppointment.appendChild(hourParagraph);
      divAppointment.appendChild(symptomsParagraph);
      divAppointment.appendChild(btnDelete);
      divAppointment.appendChild(btnEdit);

      containerAppointments.appendChild(divAppointment);
    });
  }

  static cleanHTML() {
    while (containerAppointments.firstChild) {
      containerAppointments.removeChild(containerAppointments.firstChild);
    }
  }
}

export default UI;