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
                    //console.log("form Invalido");
                    return false;
                } else {
                    //form
                    var data = new FormData(this);
                    seleccion = this.elements.Nombre.value;
                    //console.log("Data", data);
                    $.ajax({
                        url: this.action,
                        type: this.method,
                        data: data,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            //console.log(result);

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
                                    //console.log(url);
                                    switch (url) {
                                        case "/FamiliasArticulos/_Crear":
                                            $("#alertaFalimiaCategoria").remove();
                                            $("#hiddenSelectFC").show();
                                            mostrar1();
                                            FuncionMO();
                                            break;
                                        case "/Categorias/_Crear":
                                            var familiaActual = $('#FamiliasCategoria').val();
                                            $("#hiddenSelectC").show();
                                            mostrar2(familiaActual);
                                            break;
                                        case "/UbicacionAlmacenes/_Crear":
                                            $("#alertaUbicacion").remove();
                                            $("#hiddenSelectUA").show();
                                            mostrar3();
                                            break;
                                        case "/UnidadesMedida/_Crear":
                                            $("#alertaUnidad").remove();
                                            $("#hiddenSelectUM").show();
                                            mostrar4();
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
                            //console.log(resultError);
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
            //console.log("Modal Clear");
        });
    });
});

function mostrar1() {
    $.get("/Articulos/ObtenerFamiliasCategoriaArticulosPorBusquedaAsincrona", function (data, status) {

        var array = data;

        select = document.getElementById("FamiliasCategoria");

        $('#FamiliasCategoria').empty();

        option = document.createElement("option");
        option.value = '';
        option.text = 'Seleccione una familia de categorias';
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

        $("#alertaCategoria").removeClass('prevent-click');
        $("#alertaCategoria").show();
        $("#hiddenSelectC").hide();
        $('.k_selectpicker').selectpicker('refresh');

        //console.log(data);
    });
}

function mostrar2(familiaActual) {
    $.get("/Articulos/ObtenerCategoriaArticulosPorBusquedaAsincrona", { idFamiliaCategoria: familiaActual }, function (data, status) {

        select = document.getElementById("CategoriasArticulo");
        var array = data;
        var selecteds = [];

        $('#CategoriasArticulo option:selected').each((idx, el) => {
            selecteds.push({
                id: el.value,
                text: el.text
            });
        });

        $('#CategoriasArticulo').empty();

        for (i = 0; i < array.length; i++) {
            option = document.createElement("option");
            option.value = array[i].id;
            option.text = array[i].text;

            if (selecteds.find(o => o.id === option.value)) {
                option.selected = true;
            } if ($.trim(seleccion) == option.text) {
                option.selected = true;
            }
            select.appendChild(option);
        }

        $('.k_selectpicker').selectpicker('refresh');

        if ($('#CategoriasArticulo option').length == 0) {
            //Sólo en vista Crear y Editar
            $('#grupoCategoria').addClass('prevent-click');
            $("#alertaCategoria").addClass('prevent-click');
            $("#crearC").addClass('prevent-click');
            $("#alertaCategoria").show();
            $("#hiddenSelectC").hide();
            //Sólo en en la vista INDEX
            $("#CategoriasArticulo").prop("disabled", true);
            $("#notaC").show();
        }
        else {
            //Sólo en vista Crear y Editar
            $("#alertaCategoria").hide();
            $('#grupoCategoria').removeClass('prevent-click');
            $("#alertaCategoria").removeClass('prevent-click');
            $("#crearC").removeClass('prevent-click');
            $("#hiddenSelectC").show();
            //Sólo en en la vista INDEX
            $("#CategoriasArticulo").prop("disabled", false);
            $("#notaC").hide();
        }

        $('.k_selectpicker').selectpicker('refresh');
    });
}

function mostrar3() {
    $.get("/Articulos/ObtenerUbicacionAlmacenesPorBusquedaAsincrona", function (data, status) {

        var array = data;

        select = document.getElementById("UbicacionAlmacen");

        $('#UbicacionAlmacen').empty();

        option = document.createElement("option");
        option.value = '';
        option.text = 'Seleccione una ubicación';
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

        //console.log(data);
    });
}

function mostrar4() {
    $.get("/Articulos/ObtenerUnidadesMedidaPorBusquedaAsincrona", function (data, status) {

        var array = data;

        select = document.getElementById("UnidadMedida");

        $('#UnidadMedida').empty();

        option = document.createElement("option");
        option.value = '';
        option.text = 'Seleccione una unidad de medida';
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

        //console.log(data);
    });
}

function LlenarSFamilia()
{
    $.ajax({
        url: "/FamiliasArticulos/ObtenerListaSegundaFamilia/",
        method: "POST",
        success: function (respuesta)
        {
            console.log(typeof (respuesta));
            /*respuesta.forEach(function (elemento, index) {
                console.log(elemento);
            });*/
            //console.log(respuesta.listaSF);
            let Ioption;
            let Iselect = document.getElementById("idFamilia");

            $('#idFamilia').empty();
            Ioption = document.createElement("option");
            Ioption.value = '';
            Ioption.text = 'Seleccione una unidad de medida';
            Iselect.appendChild(Ioption);

            for (const item of respuesta.listaSF)
            {
                Ioption = document.createElement("option");
                Ioption.value = item.id;
                Ioption.text = item.nombre;
                Iselect.appendChild(Ioption);
            }
            $('.k_selectpicker').selectpicker('refresh');
        },
        error: function (respuesta)
        {
            console.error("Ocurrio un error al intentar conectarse con el servidor");
        }

    });
}