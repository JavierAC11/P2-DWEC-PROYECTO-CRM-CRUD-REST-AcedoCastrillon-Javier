import { eliminarCliente, obtenerClientes } from "./API.js";

const res = document.querySelector('tbody');



window.addEventListener("load", () => {

    let resultado = obtenerClientes()

    resultado.then(clientes => {



    clientes.forEach(cliente => {
    console.log("test")
    const {nombre, telefono, empresa, id} = cliente;
    const row = document.createElement('tr');
    row.innerHTML = `
                <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"">${nombre}</td>
                <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">${telefono}</td>
                <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">${empresa}</td>
                <td>
                    <a href="editar-cliente.html?id=${id}" class="btn btn-primary">Editar</a>
                    <a href="#" data-cliente="${id}" class="btn btn-danger">Eliminar</a>
                </td>
            `;
    res.appendChild(row);
});
})
})

res.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-danger')){
        let id = Number(e.target.dataset.cliente);

        eliminarCliente(id);
        e.target.parentElement.parentElement.remove();
        
    } 
})

