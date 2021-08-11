var seleccion;
$(function () {
    $('#commonModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var url = button.attr("href");
        //console.log(url);
        var modal = $(this);
        modal.find('.modal-content').load(url, function () {

            //callback handler
            $('form').submit(function (e) {
                console.log(e);
                e.preventDefault();
                //$('#ModalControl').val('Guardando ...')
                //    .attr('disabled', 'disabled');

                if (!$(this).valid()) {
                    console.log("form Invalido");
                    return false;
                } else {
                    //form
                    var data = new FormData(this);
                    seleccion = this.elements.Nombre.value;
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
                                    title: result.msj,
                                    allowOutsideClick: false,
                                    confirmButtonColor: '#0c7cd5',
                                    confirmButtonText: 'Aceptar',
                                    allowEscapeKey: false
                                }).then(function () {
                                    console.log(url);
                                    $("#alertaMetodo").remove();
                                    $("#hiddenSelectMM").show();
                                    mostrar();
                                });
                            } else {

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
        $('#commonModal').on('hidden.bs.modal', function () {
            $(this).removeData('bs.modal');
            $('#modal-container .modal-content').empty();
            console.log("Modal Clear");
        });
    });
});

function mostrar() {
    $.get("/Componentes/ObtenerManofacturaAyncrona", function (data, status) {

        var array = data;

        select = document.getElementById("MetodoManufactura");

        $('#MetodoManufactura').empty();

        option = document.createElement("option");
        option.value = '';
        option.text = 'Selecciona un metodo de manufactura';
        select.appendChild(option);

        for (i = 0; i < array.length; i++) {
            option = document.createElement("option");
            option.value = array[i].id;
            option.text = array[i].text;
            if ($.trim(seleccion) == array[i].text) {
                option.selected = true;
            }
            select.appendChild(option);
        }

        $('.k_selectpicker').selectpicker('refresh');

        console.log(data);
    });
}