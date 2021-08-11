var seleccion;
var emp;
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
                    emp = this.elements[1].selectedOptions;
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
                                    var urlLimpia = url.split("?")[0];
                                    console.log(urlLimpia);
                                    var idEmpleado = url.split("=")[1];
                                    console.log(idEmpleado);
                                    if (urlLimpia.includes("/AreasEmpresas/_Crear")) {
                                        $("#alertaArea").remove();
                                        $("#hiddenSelectAE").show();
                                        mostrar1(idEmpleado);
                                    }
                                    if (url == "/Cargos/_Crear") {
                                        $("#alertaCargo").remove();
                                        $("#hiddenSelectCargo").show();
                                        mostrar3();
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


function mostrar1(idEmpleado) {
    if (idEmpleado != null) {
        var url = "/Empleados/ObtenerAreasAsincrono?idEmpleado=" + idEmpleado;
    } else {
        var url = "/Empleados/ObtenerAreasAsincrono" 
    }
    $.get(url, function (data, status) {
        console.log(idEmpleado);
        var array = data;

        select = document.getElementById("SelArEmp");

        //var aux = $.trim(seleccion) + ", " + $.trim(emp[0].text);

        $('#SelArEmp').empty();

        option = document.createElement("option");
        option.value = '';
        option.text = 'Selecciona un área de empresa';
        select.appendChild(option);

        for (i = 0; i < array.length; i++) {
            option = document.createElement("option");
            option.value = array[i].id;
            option.text = array[i].text;
            if (array.length-1 == [i]) {
                option.selected = true;
            }
            select.appendChild(option);
        }

        $('.k_selectpicker').selectpicker('refresh');

        console.log(data);
    });
}

function mostrar3() {
    $.get("/Empleados/ObtenerCargosAsincrono", function (data, status) {

        var array = data;

        select = document.getElementById("SelCargo");

        $('#SelCargo').empty();

        option = document.createElement("option");
        option.value = '';
        option.text = 'Selecciona un cargo';
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