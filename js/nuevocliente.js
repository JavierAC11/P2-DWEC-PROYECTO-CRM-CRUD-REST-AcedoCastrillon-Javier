const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const telefono = document.querySelector('#telefono');
const empresa = document.querySelector('#empresa');

console.log(nombre)

function validarFormulario(e){
    if (e.target.value.trim().length === 0){
        mostrarError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        return;
    }

    
    if (e.target.type === 'email'){
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(e.target.value)){
            console.log("test")
            mostrarError(`El campo ${e.target.id} debe ser un correo electrónico`, e.target.parentElement);
            return;
        }else if(e.target.parentElement.querySelector('p')){
            e.target.parentElement.querySelector('p').remove();
        }
        return;
    }
    
    if (e.target.type === 'tel'){
        const telRegex = /^[0-9]{9}$/;
        if(!telRegex.test(parseInt(e.target.value))){
            mostrarError(`El campo ${e.target.id} debe contener 9 dígitos`, e.target.parentElement);
            return;
        }else if(e.target.parentElement.querySelector('p')){
            e.target.parentElement.querySelector('p').remove();
        }
        return;
    }


    else{
        if(e.target.parentElement.querySelector('p')){
            e.target.parentElement.querySelector('p').remove();
        }
    }
}

function mostrarError(mensaje, referencia){

    if(referencia.querySelector('p')){
        referencia.querySelector('p').remove();
    }
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add("text-center", "text-danger", "font-weight-bold", "text-red-700");
    referencia.appendChild(error);
}

function obtenerCliene(e){
    e.preventDefault();

    if(nombre.value.trim() === '' || empresa.value.trim() === '' || email.value.trim() === '' || telefono.value.trim() === ''){
        mostrarError('Todos los campos son obligatorios', formulario);
        return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email.value)){
        mostrarError('El campo email debe ser un correo electrónico', formulario);
        return;
    }
    const telRegex = /^[0-9]{9}$/;
    if(!telRegex.test(parseInt(telefono.value))){
        mostrarError('El campo teléfono debe contener 9 dígitos', formulario);
        return;
    }
    else if(formulario.querySelector('p')){
        formulario.querySelector('p').remove();
    }
    
    let cliente = {
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value,
        empresa: empresa.value
    }

    return cliente;
}




nombre.addEventListener('blur', validarFormulario)
email.addEventListener('blur', validarFormulario)
telefono.addEventListener('blur', validarFormulario)
empresa.addEventListener('blur', validarFormulario)

formulario.addEventListener('submit', (e) => {
    let cliente = obtenerCliene(e)
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
        console.log("test")
        let db = event.target.result;
        let transaction = db.transaction(["clientes"], "readwrite");
        let objectStore = transaction.objectStore("clientes");
        let peticion = objectStore.add(cliente);
        peticion.onsuccess = () => {
            console.log("Cliente agregado correctamente");
        }
    }})