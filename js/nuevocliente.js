import { obtenerCliente, validarFormulario } from './funciones.js';
import { nuevoCliente } from './API.js';

const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const telefono = document.querySelector('#telefono');
const empresa = document.querySelector('#empresa');

console.log(nombre)

nombre.addEventListener('blur', validarFormulario)
email.addEventListener('blur', validarFormulario)
telefono.addEventListener('blur', validarFormulario)
empresa.addEventListener('blur', validarFormulario)

//TODO: Activar el boton solo si el formulario es correcto

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let cliente = obtenerCliente(e);

    nuevoCliente(cliente);

})