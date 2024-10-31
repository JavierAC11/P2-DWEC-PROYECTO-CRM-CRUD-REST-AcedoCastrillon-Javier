// Aqui inicializamos la base de datos y creamos las funciones para agregar, eliminar y obtener clientes de la base de datos.
let request = indexedDB.open("clientesDB", 1);
request.onupgradeneeded = (event) => {

    let db = event.target.result;

    let objectStore = db.createObjectStore("clientes", { keyPath: "id", autoIncrement: true });

    objectStore.createIndex("nombre", "nombre", { unique: false });
    objectStore.createIndex("email", "email", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("empresa", "empresa", { unique: false });
}

/**
* Añade un cliente a la base de datos.
*
* @param {Object} cliente - el cliente que deseamos añadir.
*/
export function nuevoCliente(cliente) {
    let request = indexedDB.open("clientesDB", 1);
    request.onsuccess = (event) => {
        console.log("test add cliente")
        let db = event.target.result;
        let transaction = db.transaction(["clientes"], "readwrite");
        let objectStore = transaction.objectStore("clientes");
        let peticion = objectStore.add(cliente);
        peticion.onsuccess = () => {
            console.log("Cliente agregado correctamente");
        }
    }}

/** 
* Elimina un cliente de la base de datos.
*
* @param {Number} id - El id del cliente a eliminar.
*/
export function eliminarCliente(id) {

    let request = indexedDB.open("clientesDB", 1);

    request.onsuccess = () => {
        let db = request.result;
        let transaction = db.transaction("clientes", "readwrite");
        let clienteStore = transaction.objectStore("clientes");
        
        clienteStore.delete(id);
    }
}

/**
 * Actualiza los datos de un cliente en la base de datos.
 * 
 * @param {Object} nuevosDatos - Los nuevos datos del cliente
 * @param {Number} id - El id del cliente a actualizar
 */
export function actualizarCliente(nuevosDatos, id){
    let request = indexedDB.open("clientesDB", 1);
    request.onsuccess = () => {
        let db = request.result;
        let transaction = db.transaction("clientes", "readwrite");
        let clienteStore = transaction.objectStore("clientes");

        clienteStore.delete(Number(id));
        let actualizarCliente = clienteStore.put(nuevosDatos);

        actualizarCliente.onsuccess = () => {
            window.location.href = "index.html";
        }
    }
}

/**
 * Obtiene los clientes de la base de datos.
 * 
 * @returns {Promise} - Una promesa que resuelve con un array de clientes.
 * */
export function obtenerClientes(){
    return new Promise((resolve) => {
    let request = indexedDB.open("clientesDB", 1);
    let clientes = [];

    request.onsuccess = () => {
        let db = request.result;
        let transaction = db.transaction("clientes", "readwrite");
        let clienteStore = transaction.objectStore("clientes");

        let obtenerClientes = clienteStore.openCursor();


        obtenerClientes.onsuccess = (event) => {
        
            let cursor = event.target.result;
            if(cursor){
                clientes.push(cursor.value);
                cursor.continue();
            } else{
                resolve(clientes);
            }
        }
    }
})
    
}