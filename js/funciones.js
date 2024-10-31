const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const telefono = document.querySelector('#telefono');
const empresa = document.querySelector('#empresa');

/**
 * Obtiene los datos del cliente del formulario y los valida.
 * 
 * @param {Event} e - El evento del formulario.
 * 
 * @regex emailRegex - Expresión regular para validar el formato del correo electrónico.
 * @regex /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 * 
 * 
 * @regex telRegex - Expresión regular para validar que el teléfono contenga exactamente 9 dígitos.
 * @regex /^[0-9]{9}$/
 * 
 * @returns {Object} cliente - El cliente con los datos obtenidos del formulario si son correctos.
 */
export function obtenerCliente(e){
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

/**
 * Comprueba que los campos del formulario no estén vacíos y que el email y el teléfono tengan el formato correcto.
 * 
 * @param {Event} e - El evento del formulario. 
 * @returns {void} - No retorna nada.
 */
export function validarFormulario(e){
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

/**
 * Muesta un mensaje de error en el lugar donde se le indica.
 * 
 * @param {String} mensaje - El mensaje de error a mostrar.
 * @param {HTMLElement} referencia - El lugar donde se mostrará el mensaje de error.
 */
function mostrarError(mensaje, referencia){

    if(referencia.querySelector('p')){
        referencia.querySelector('p').remove();
    }
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add("text-center", "text-danger", "font-weight-bold", "text-red-700");
    referencia.appendChild(error);
}