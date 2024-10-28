const params = new URLSearchParams(window.location.search);
const id = params.get('id');

window.addEventListener("load", obtenerClienteId(id) )
    


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

