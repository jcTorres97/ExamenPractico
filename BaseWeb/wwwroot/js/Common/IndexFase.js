function ClonarFases(id)
{
    $.ajax({
        url: '/Fases/ClonarFaseGenerica',
        data: { idProyecto : id },
        method: "POST",
        success: function (result) {
            if (result.success) {
                document.getElementById("loader").style.display = "none";
                swal({
                    title: "",
                    text: result.msj,
                    type: "success",
                    confirmButtonText: "Aceptar",
                    onClose: () => {
                        document.getElementById("loader").style.display = "none";
                        busqueda();
                        //location.reload();
                    }
                })
            } else {
                document.getElementById("loader").style.display = "none";
                swal({
                    type: 'error',
                    title: result.msj,
                    allowOutsideClick: false,
                    confirmButtonColor: '#0c7cd5',
                    confirmButtonText: 'Aceptar',
                    allowEscapeKey: false
                }).onClose(function () {
                    document.getElementById("loader").style.display = "none";
                });
                //toastr.error(result.message);
            }
        },
        error: function (xhr) {
            alert('error');
        }
    });
}