import { obtenerCliente, validarFormulario } from './funciones.js';

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

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let cliente = obtenerCliente(e)
    console.log(cliente)
    let request = indexedDB.open("clientesDB", 1);

    request.onupgradeneeded = (event) => {

        let db = event.target.result;

        let objectStore = db.createObjectStore("clientes", { keyPath: "id", autoIncrement: true });

        objectStore.createIndex("nombre", "nombre", { unique: false });
        objectStore.createIndex("email", "email", { unique: false });
        objectStore.createIndex("telefono", "telefono", { unique: false });
        objectStore.createIndex("empresa", "empresa", { unique: false });
    }
    request.onsuccess = (event) => {
        let db = event.target.result;
        let transaction = db.transaction(["clientes"], "readwrite");
        let objectStore = transaction.objectStore("clientes");
        let peticion = objectStore.add(cliente);
        peticion.onsuccess = () => {
            console.log("Cliente agregado correctamente");
        }
    }})