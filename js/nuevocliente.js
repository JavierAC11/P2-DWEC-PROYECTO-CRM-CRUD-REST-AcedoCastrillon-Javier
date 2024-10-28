const formulario = document.querySelector('#formulario');
let request = indexedDB.open("clientesDB", 1);

request.onupgradeneeded = (event) => {

    let db = event.target.result;

    let objectStore = db.createObjectStore("clientes", { keyPath: "id", autoIncrement: true });

    objectStore.createIndex("nombre", "nombre", { unique: false });
    objectStore.createIndex("email", "email", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("empresa", "empresa", { unique: false });
}

function obtenerCliene(e){
    e.preventDefault();
    let nombre = document.querySelector('#nombre').value;
    let email = document.querySelector('#email').value;
    let telefono = document.querySelector('#telefono').value;
    let empresa = document.querySelector('#empresa').value;

    let cliente = {
        nombre,
        email,
        telefono,
        empresa
    }

    console.log(cliente)
    return cliente;
}

formulario.addEventListener('submit', obtenerCliene)