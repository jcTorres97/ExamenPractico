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
                    debugger;
                    var data = new FormData(this);
                    let existe = this.elements.Nombre;
                    if (existe != undefined) {
                        seleccion = this.elements.Nombre.value;
                    }
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
                                    switch (url) {
                                        case "/TipoPermisos/_Crear":
                                            $("#alertaTP").remove();
                                            $("#hiddenSelectTP").show();
                                            mostrar1();
                                            break;
                                        case "/ProyectoPrioridades/_Crear":
                                            $("#alertaPP").remove();
                                            $("#hiddenSelectPP").show();
                                            mostrar2();
                                            break;
                                    }
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

function mostrar1() {
    debugger;
    $.get("/TipoPermisos/ObtenerTipoPermisoAsincrona", function (data, status) {

        var array = data;
        console.log(data);
        select = document.getElementById("IdTipoPermiso");

        $('#IdTipoPermiso').empty();

        option = document.createElement("option");
        option.value = '';
        option.text = 'Selecciona una opción';
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

function mostrar2() {
    $.get("/ProyectoPrioridades/ObtenerProyectosPrioridadAsincrona", function (data, status) {

        var array = data;

        select = document.getElementById("IdProyectoPrioridad");

        $('#IdProyectoPrioridad').empty();

        option = document.createElement("option");
        option.value = '';
        option.text = 'Selecciona una opción';
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