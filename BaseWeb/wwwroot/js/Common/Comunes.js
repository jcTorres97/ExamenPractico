function validaNumericos(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
        return true;
    }
    return false;
}

function enviarMensaje(id, idComponente, idUniversal, isAprobado) {
    $("#btnAceptar").click();

    var url = "";
    if (id == 1) {
        var flag = false;
        if (isAprobado == "True") {
            $("input[id*=cantidad-]").each(function () {
                if (this.value == 0) {
                    swal({
                        title: "Atención",
                        text: "No puedes dejar cantidades en ceros, asegurate de que todas las cantidades sean validas.",
                        confirmButtonText: "Aceptar",
                        type: "error"
                    });
                    flag = true;
                }
            });
        }
        
        if (!flag) {
            url = "/Cuantificaciones/Index/" + idComponente + "?IdProyecto=" + idUniversal;
            $("#iconoRegresar").remove();
            $("#btnRegresar").addClass("k-spinner k-spinner--lg k-spinner--danger");
            $("#btnRegresar").attr("disabled", true);
            location.href = url;
        }
    } else {
        url = "/Cuantificaciones/EstatusCuantificacion?idComponente=" + idComponente + "&IdCuantificacion=" + idUniversal;
        $("#btnRevision").addClass("k-spinner k-spinner--lg k-spinner--danger");
        $("#btnRevision").removeClass("flaticon-folder-1");
        $("#btnRevision").attr("disabled", true);
        location.href = url;

    }

}
