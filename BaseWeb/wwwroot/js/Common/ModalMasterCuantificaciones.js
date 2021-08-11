$(function () {
    $('#commonModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var url = button.attr("href");
        //console.log(url);
        var modal = $(this);
        modal.find('.modal-content').load(url, function () {

            //callback handler
            $('#formProveedor').submit(function (e) {
                e.preventDefault();
                var materialCuantificacion = new Object();
                materialCuantificacion.IdProveedorCuantArt = $("#IdProveedorCuantArt").val();
                materialCuantificacion.IdFamilia = $("#IdFamilia").val();
                materialCuantificacion.IdCuantificacion = $("#IdCuantificacion").val();
                materialCuantificacion.Descripcion = $("#Descripcion").val();
                materialCuantificacion.fecha = $("#fecha").val();
                materialCuantificacion.isEdicionCantidad = false;
                materialCuantificacion.isEdicionProveedor = false;
                $.ajax({
                    method: "POST",
                    url: "/Cuantificaciones/EditarArticulo/",
                    data: materialCuantificacion
                }).done(function (response) {
                    if (response.success) {
                        swal({
                            type: 'success',
                            title: response.msj,
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            confirmButtonText: 'Aceptar',
                            allowEscapeKey: false
                        }).then(function () {
                            $('#commonModal').modal('hide');
                            $.ajax({
                                method: "POST",
                                url: "/Cuantificaciones/ObtenerListaFamMat/",
                                data: { idFamilia: materialCuantificacion.IdFamilia, idCuantificacion: materialCuantificacion.IdCuantificacion }
                            })
                                .done(function (result) {
                                    ActualizarTabla(materialCuantificacion.IdFamilia, result);
                                    actualizarRows(materialCuantificacion.IdFamilia);
                                    SelectArticulos();
                                });
                        });
                    } else {
                        swal({
                            type: 'error',
                            title: response.msj,
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            confirmButtonText: 'Aceptar',
                            allowEscapeKey: false
                        }).then(function () {
                        });
                    }
                });

            });

        });
    });

    $(function () {
        $('#commonModal').on('hidden.bs.modal', function () {
            $(this).removeData('bs.modal');
            $('#modal-container .modal-content').empty();
            console.log("Modal Clear");
        });
    });
});