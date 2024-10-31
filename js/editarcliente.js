import { obtenerCliente, validarFormulario } from './funciones.js';
import { actualizarCliente, obtenerClientes } from './API.js';

const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const telefono = document.querySelector('#telefono');
const empresa = document.querySelector('#empresa');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const formulario = document.querySelector('#formulario');

window.addEventListener("load", obtenerClienteId(id) )
    
nombre.addEventListener('blur', validarFormulario)
email.addEventListener('blur', validarFormulario)
telefono.addEventListener('blur', validarFormulario)
empresa.addEventListener('blur', validarFormulario)

function obtenerClienteId(id){
    
    let request = indexedDB.open("clientesDB", 1);

    request.onsuccess = () => {
        let db = request.result;
        let transaction = db.transaction("clientes", "readwrite");
        let clienteStore = transaction.objectStore("clientes");

        let obtenerCliente = clienteStore.get(Number(id));

        obtenerCliente.onsuccess = () => {
            const {nombre, email, telefono, empresa} = obtenerCliente.result;
            document.getElementById('nombre').value = nombre;
            console.log(nombre)
            document.getElementById('email').value = email;
            document.getElementById('telefono').value = telefono;
            document.getElementById('empresa').value = empresa;
        }
    }
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let cliente = obtenerCliente(e)

    if (cliente){
        actualizarCliente(cliente, Number(id));
    }

    
})
