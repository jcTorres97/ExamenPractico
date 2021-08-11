$(function () {
    $('#commonModalCompras').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var url = button.attr("href");
        var modal = $(this);
        modal.find('.modal-content').load(url, function () {
            //callback handler
            $('form').submit(function (e) {
                console.log(e);
                e.preventDefault();

                if (!$(this).valid()) {
                    console.log("form Invalido");
                    return false;
                } else {
                    //form
                    $('button[type="submit"]').prop('disabled', true);
                    var data = new FormData(this);
                    console.log("Data", data);
                    $.ajax({
                        url: this.action,
                        type: this.method,
                        data: data,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            console.log(result);

                            if (result.success) {
                                modal.modal('hide');
                                swal({
                                    type: 'success',
                                    title: "Registro exitoso",
                                    text: result.msj,
                                    allowOutsideClick: false,
                                    confirmButtonColor: '#0c7cd5',
                                    confirmButtonText: 'Aceptar',
                                    allowEscapeKey: false
                                }).then(function () {
                                    location.href = "/OrdenesCompras/AgregarProducto/?IdOrdenCompra=" + result.compra.id;
                                });
                            } else {
                                $('button[type="submit"]').prop('disabled', false);
                                swal({
                                    type: 'error',
                                    title: result.msj,
                                    allowOutsideClick: false,
                                    confirmButtonColor: '#0c7cd5',
                                    confirmButtonText: 'Aceptar',
                                    allowEscapeKey: false
                                });
                            }
                        },
                        error: function (resultError) {
                            console.log(resultError);
                            modal.modal('hide');
                            swal({
                                type: 'error',
                                title: resultError.msj,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                confirmButtonText: 'Aceptar',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            });
                        }
                    });
                }
            });

        });
    });

    $(function () {
        $('#commonModalCompras').on('hidden.bs.modal', function () {
            $(this).removeData('bs.modal');
            $('#modal-container .modal-content').empty();
        });
    });
});