function blockPage(mensaje) {
    KApp.blockPage({
        overlayColor: '#000000',
        type: 'v2',
        state: 'primary',
        message: mensaje
    });
}

function blockSeccion(seccion,mensaje) {
    KApp.block(seccion, {
        overlayColor: '#000000',
        type: 'v2',
        state: 'primary',
        message: mensaje
    }); 
}

function alertError(mensaje) {
    swal({
        title: "Error",
        text: mensaje,
        type: "error",
        confirmButtonText: "Aceptar"
    });
}

function alertExito(mensaje) {
    swal({
        title: "Éxito",
        text: mensaje,
        type: "success",
        confirmButtonText: "Aceptar"
    });
}

function alertAviso(mensaje) {
    swal({
        title: "Aviso",
        text: mensaje,
        type: "warning",
        confirmButtonText: "Aceptar"
    });
}

function alertInfo(mensaje) {
    swal({
        title: "Aviso",
        text: mensaje,
        type: "info",
        confirmButtonText: "Aceptar"
    });
}

const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
