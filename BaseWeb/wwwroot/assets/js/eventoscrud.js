/**
 * Modals
 */
//Evento Aceptar desde el modal
$("#modalUniversal").on("click", "#btnAceptar", () => {

  if (!$("#form").valid()) return

  crear()

})

//Evento Aceptar-Editar desde el modal
$("#modalUniversal").on("click", "#btnAceptarEditar", () => {

  if (!$("#form").valid()) return

  editar()

})

//Elimina contenido cuando se cierra el modal
$(document).ready(() => {
  $("#modalUniversal").on("hidden.bs.modal", () => {
    $("#modalUniversal").html("")
  })
})




/**
 * Permite Añadir el token para evitar ataques de CSRF
 */
$.ajaxSetup({
  beforeSend: (xhr, settings) => {
    if (settings.type == "GET") return
    const token = $("#modalUniversal input[name='__RequestVerificationToken']").val()
    if(typeof token !== 'undefined') xhr.setRequestHeader("RequestVerificationToken", token)
  }
})




/**
 * Muestra el mensaje de éxito o fracaso
 * (si retornas bien el ReponseHelper del controlador)
 * @param {*} result El resultado del ResponseHelper
 */
function mostrarmensaje(result) {
  KApp.unblock("#modalUniversal .modal-content")
  if (result.success) {
    Swal.fire(
      "Correcto",
      result.message,
      "success"
    )
    $("#modalUniversal").modal("hide")
    busqueda()
  } else {
    Swal.fire(
      "Error",
      result.message,
      "error"
    )
  }
}


function eliminar(url, id, nombre){
  swal({
    title: `¿Desea eliminar el registro: ${nombre}`,
    text: "Esta acción no se podrá revertir",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    cancelButtonColor: '#0c7cd5',
    confirmButtonText: '¡Sí, eliminar!',
    cancelButtonText: '¡No, cancelar!',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return promiseajax(url + id, "POST", null).catch(() =>{
        Swal.showValidationMessage("Ocurrió un error del servidor")
      })
    }
  }).then(result => {
    if (result.value) {
      //Se eliminó correctamente
      if (result.value.success) {
        swal({
          type: 'success',
          title: result.value.message,
          allowOutsideClick: false,
          confirmButtonColor: '#0c7cd5',
          allowEscapeKey: false
        })
        
        busqueda()
      } else {
        //Huvo un error
        swal({
          type: 'error',
          title: result.value.message,
          allowOutsideClick: false,
          confirmButtonColor: '#0c7cd5',
          allowEscapeKey: false
        })
      }
    }
  })

}