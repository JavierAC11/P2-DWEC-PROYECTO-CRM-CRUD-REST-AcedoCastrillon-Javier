let request = indexedDB.open("clientesDB", 1);
request.onupgradeneeded = (event) => {

    let db = event.target.result;

    let objectStore = db.createObjectStore("clientes", { keyPath: "id", autoIncrement: true });

    objectStore.createIndex("nombre", "nombre", { unique: false });
    objectStore.createIndex("email", "email", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("empresa", "empresa", { unique: false });
}

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

export function eliminarCliente(id) {

    let request = indexedDB.open("clientesDB", 1);

    request.onsuccess = () => {
        let db = request.result;
        let transaction = db.transaction("clientes", "readwrite");
        let clienteStore = transaction.objectStore("clientes");
        
        clienteStore.delete(id);
    }
}

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
    console.log("Sale...")
})
    
}