const res = document.querySelector('tbody');

let request = indexedDB.open("clientesDB", 1);

request.onsuccess = () => {
    let db = request.result;
    let transaction = db.transaction("clientes", "readwrite");
    let clienteStore = transaction.objectStore("clientes");

    let obtenerClientes = clienteStore.openCursor();

    let clientes = [];

    obtenerClientes.onsuccess = (event) => {
    
        let cursor = event.target.result;
        if(cursor){
            clientes.push(cursor.value);
            cursor.continue();
        }
        else{
            clientes.forEach(cliente => {
                const {nombre, telefono, empresa, id} = cliente;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="text-center">${nombre}</td>
                    <td class="text-center">${telefono}</td>
                    <td class="text-center">${empresa}</td>
                    <td>
                        <a href="editar-cliente.html?id=${id}" class="btn btn-primary">Editar</a>
                        <a href="#" data-cliente="${id}" class="btn btn-danger">Eliminar</a>
                    </td>
                `;
                res.appendChild(row);
            });
        }

    }
}

res.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-danger')){
        let id = Number(e.target.dataset.cliente);
        let request = indexedDB.open("clientesDB", 1);

        request.onsuccess = () => {
            let db = request.result;
            let transaction = db.transaction("clientes", "readwrite");
            let clienteStore = transaction.objectStore("clientes");

            let eliminarCliente = clienteStore.delete(id);

            eliminarCliente.onsuccess = () => {
                e.target.parentElement.parentElement.remove();
            }
        }
    } else if(e.target.classList.contains('btn-primary')){
        console.log("test")
    }
})

