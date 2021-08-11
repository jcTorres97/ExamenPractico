

function editarSpan(id) {
    var ptOrPd = $("#" + id + "Span").first();
    ptOrPd.dblclick(function () {
        $("#" + id + "Span").hide();
        $("#" + id + "Input").show();
    });
}

$("#SolicitanteInput").focusout(function () {
    var DatosGralCuantViewModel = new Object();
    DatosGralCuantViewModel.IdCuantificacion = $("#CuantificacionId").val();
    DatosGralCuantViewModel.IdComponente = $("#ComponenteId").val();
    DatosGralCuantViewModel.NombreSolicitante = $("#SolicitanteInput").val();
    DatosGralCuantViewModel.CantidadVolumen = $("#NumeroVolumen").val() < 1 ? 1 : $("#NumeroVolumen").val();
    if (DatosGralCuantViewModel.NombreSolicitante !== null && DatosGralCuantViewModel.NombreSolicitante !== "") {
        $.ajax({
            method: "POST",
            url: "/Cuantificaciones/EditarDatosGenerales/",
            data: DatosGralCuantViewModel
        })
            .done(function (response) {
                $("#CuantificacionId").val(response.helperData.id);
                $("#SolicitanteSpan").empty();
                $("#SolicitanteSpan").append(response.helperData.solicitante);
                $("#SolicitanteSpan").show();
                $("#SolicitanteInput").hide();
            });
    } else {
        $("#SolicitanteSpan").show();
        $("#SolicitanteInput").hide();

    }
});

function ValidarCantidadVolumen(numero)
{
    //console.log(numero);
    let numeroFinal = 0;
    try {
        let SinCero = String(numero).replace(/^0*/, '');
        numeroFinal = parseInt(SinCero);

        if (numeroFinal < 1) {
            return -1
        }
    } catch (error)
    {
        console.error(error);
        return -1
    }
    return numeroFinal;
}

$("#NumeroVolumen").on("change",function () {
    var DatosGralCuantViewModel = new Object();
    DatosGralCuantViewModel.IdCuantificacion = $("#CuantificacionId").val();
    DatosGralCuantViewModel.IdComponente = $("#ComponenteId").val();
    DatosGralCuantViewModel.NombreSolicitante = $("#SolicitanteInput").val();
    let numeroFormato = ValidarCantidadVolumen($("#NumeroVolumen").val());
    DatosGralCuantViewModel.CantidadVolumen = numeroFormato < 0 ? 1 : numeroFormato;
    if (numeroFormato > 0) {
        $("#NumeroVolumen").val(numeroFormato)
        console.log(ValidarCantidadVolumen($("#NumeroVolumen").val()));
            $.ajax({
                method: "POST",
                url: "/Cuantificaciones/EditarDatosGenerales/",
                data: DatosGralCuantViewModel
            })
                .done(function (response) {
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.success("volumen agregado con exito");
                });
    }
    else
    {
        $("#NumeroVolumen").val(1)
        toastr.options.positionClass = "toast-bottom-right";
        toastr.error("Por favor valide la cantidad ingresada");
    }
    /*if (DatosGralCuantViewModel.NombreSolicitante !== null && DatosGralCuantViewModel.NombreSolicitante !== "") {
        $.ajax({
            method: "POST",
            url: "/Cuantificaciones/EditarDatosGenerales/",
            data: DatosGralCuantViewModel
        })
            .done(function (response) {
                $("#CuantificacionId").val(response.helperData.id);
                $("#SolicitanteSpan").empty();
                $("#SolicitanteSpan").append(response.helperData.solicitante);
                $("#SolicitanteSpan").show();
                $("#SolicitanteInput").hide();
            });
    } else {
        $("#SolicitanteSpan").show();
        $("#SolicitanteInput").hide();

    }*/
});

function SelectCategorias() {
    var id = $("#IdFamilia").val();
    var seguimiento = document.getElementById("seguimiento").checked;
    $('#IdProveedorArticulo').selectpicker('deselectAll');
    funComboCategoria();
    funComboArticulos();
    $("#IdCategoria").attr("disabled", true);
    $("#IdCategoria").selectpicker("refresh");
    $("#IdProveedorArticulo").attr("disabled", true);
    $("#IdProveedorArticulo").selectpicker("refresh");
    if (id !== "") {
        $.ajax({
            method: "POST",
            url: "/Cuantificaciones/ObtenerCatPorFamilia",
            data: { idFamilia: id }
        })
            .done(function (response) {
                if (response.lista.length === 0) {
                    funComboCategoria();
                    funComboArticulos();
                    $("#IdCategoria").attr("disabled", true);
                    $("#IdCategoria").selectpicker("refresh");
                    $("#IdProveedorArticulo").attr("disabled", true);
                    $("#IdProveedorArticulo").selectpicker("refresh");
                } else {
                    $("#IdCategoria").attr("disabled", false);
                    funComboCategoria();
                    funComboArticulos();
                    $("#IdCategoria").append('<option value="" selected>Selecciona un Categoria</option>');
                    $(response.lista).each(function (i, v) {
                        $("#IdCategoria").append('<option value="' + v.id + '">' + v.nombre + '</option>');
                    });
                    $("#IdCategoria").selectpicker("refresh");
                }
            });
        if (seguimiento) {
            $(".collapse").removeClass("show");
            $(".card-title").addClass("collapsed");
            $(".card-title-" + id).removeClass("collapsed");
            $("#collapseOne-" + id).addClass("show");
            var posicion = $("#card-" + id).offset().top;
            $("html, body").animate({
                scrollTop: posicion - 100
            }, 1000);
        }
    } else {
        $('#IdCategoria').empty();
        $("#IdCategoria").append('<option value="" selected>Selecciona un Categoria</option>');
        $("#IdCategoria").selectpicker("refresh");
        if (seguimiento) {
            $(".collapse").removeClass("show");
        }
    }
}
function seleccionarValor(valor) {
    var seguimiento = document.getElementById("seguimiento").checked;

    if (seguimiento) {
        var clase = $("#collapseOne-" + valor).hasClass("show");
        if (!clase) {
            $("#IdFamilia").val(valor);
            $("#IdFamilia").selectpicker("refresh");
            $.ajax({
                method: "POST",
                url: "/Cuantificaciones/ObtenerCatPorFamilia",
                data: { idFamilia: valor }
            })
                .done(function (response) {
                    if (response.lista.length === 0) {
                        funComboCategoria();
                        funComboArticulos();
                        $("#IdCategoria").attr("disabled", true);
                        $("#IdCategoria").selectpicker("refresh");
                        $("#IdProveedorArticulo").attr("disabled", true);
                        $("#IdProveedorArticulo").selectpicker("refresh");
                    } else {
                        $("#IdCategoria").attr("disabled", false);
                        funComboArticulos();
                        $("#IdProveedorArticulo").attr("disabled", true);
                        funComboCategoria();
                        $("#IdCategoria").append('<option value="" selected>Selecciona un Categoria</option>');
                        $(response.lista).each(function (i, v) {
                            $("#IdCategoria").append('<option value="' + v.id + '">' + v.nombre + '</option>');
                        });
                        $("#IdCategoria").selectpicker("refresh");
                    }
                });
        } else {
            $("#IdFamilia").val("");
            $("#IdFamilia").selectpicker("refresh");
            funComboCategoria();
            $("#IdCategoria").append('<option value="" selected>Selecciona un Categoria</option>');
            $("#IdCategoria").selectpicker("refresh");
            $("#IdProveedorArticulo").empty();
            $("#IdProveedorArticulo").selectpicker("refresh");

        }

    }
}
function SelectArticulos() {
    var id = $("#IdCategoria").val();
    var idCuantificacion = $("#CuantificacionId").val();
    $('#IdProveedorArticulo').selectpicker('deselectAll');
    $("#IdProveedorArticulo").selectpicker("refresh");
    $('#IdProveedorArticulo').empty();
    $("#IdProveedorArticulo").selectpicker("refresh");
    $("#IdProveedorArticulo").attr("disabled", true);
    $("#IdProveedorArticulo").selectpicker("refresh");
    if (id !== "") {
        $.ajax({
            method: "POST",
            url: "/Cuantificaciones/ObtenerArtPorCat",
            data: { IdCategoria: id, idCuantificacion: idCuantificacion }
        })
            .done(function (response) {
                if (response.lista.length === 0) {
                    funComboArticulos();
                    $("#IdProveedorArticulo").attr("disabled", true);
                    $("#IdProveedorArticulo").selectpicker("refresh");
                } else {
                    $("#IdProveedorArticulo").attr("disabled", false);
                    funComboArticulos();
                    $(response.lista).each(function (i, v) {
                        $("#IdProveedorArticulo").append('<option value="' + v.idProveedorArticulo + '">' + v.nombreArticulo + '</option>');
                    });
                    $("#IdProveedorArticulo").selectpicker("refresh");
                }

            });
    } else {
        funComboArticulos();
    }
}

function SelectUnidadMedida() {
    if ($(".blockUwu").length === 0) {
        $(".k_Material").find(".dropdown-menu > .inner").addClass("blockUwu");
    }
    let numeroFormato = ValidarCantidadVolumen($("#NumeroVolumen").val());
    var id = $("#IdProveedorArticulo").val();
    var articulo = new Object();
    articulo.IdFamilia = $("#IdFamilia").val();
    articulo.IdProveedorArticulo = $("#IdProveedorArticulo").val();
    articulo.IdComponente = $("#ComponenteId").val();
    articulo.IdCuantificacion = $("#CuantificacionId").val();
    if (articulo.IdProveedorArticulo.length > 0) {
        KApp.block('.blockUwu', {
            overlayColor: '#000000',
            type: 'v2',
            state: "primary",
            message: "Guardando...",
            size: 'lg'
        });
        KApp.block("#collapseOne-" + articulo.IdFamilia, {
            overlayColor: '#000000',
            type: 'v2',
            state: "primary",
            message: "Guardando...",
            size: 'lg'
        });
        $.ajax({
            method: "POST",
            url: "/Cuantificaciones/_CrearArticulo/",
            data: { articulo: articulo, cantidadVolumen: numeroFormato }
        })
            .done(function (response) {
                if (response.success) {
                    $.ajax({
                        method: "POST",
                        url: "/Cuantificaciones/ObtenerListaFamMat/",
                        data: { idFamilia: articulo.IdFamilia, idCuantificacion: articulo.IdCuantificacion }
                    })
                        .done(function (result) {
                            ActualizarTabla(articulo.IdFamilia, result);
                            actualizarRows(articulo.IdFamilia);
                            toastr.options.positionClass = "toast-bottom-right";
                            toastr.success("Su operación ha sido realizado con éxito");
                            $('#IdProveedorArticulo').selectpicker('deselectAll');
                            $("#IdProveedorArticulo").find('[value="' + id + '"]').remove();
                            $("#IdProveedorArticulo").selectpicker("refresh");
                            validarCeros();

                        });
                } else {
                    swal({
                        type: 'error',
                        title: response.msj,
                        allowOutsideClick: false,
                        confirmButtonColor: '#0c7cd5',
                        allowEscapeKey: false
                    }).then(function () {
                    });
                }
            });
    }

    KApp.unblock('.blockUwu');
    KApp.unblock("#collapseOne-" + articulo.IdFamilia);
}

function LimpiarFormulario() {
    $('#IdProveedorArticulo').empty();
    $("#IdProveedorArticulo").append('<option value="" selected>Selecciona un art&iacute;culo</option>');
    $("#IdProveedorArticulo").selectpicker("refresh");
    $('#UnidadMedida').val("");
    $('#fecha').val("");
    $('#descripcion').val("");
    $('#cantidad').val("");
    $("#IdCategoria").val("");
    $("#IdCategoria").selectpicker("refresh");
}

function ValidarFormulario() {
    if ($('#IdProveedorArticulo').val() === ""
        || $('#fecha').val() === ""
        || $('#descripcion').val() === ""
        || $('#cantidad').val() === ""
        || $("#IdCategoria").val() === ""
        || $("#IdFamilia").val() === "") {
        $("#alert").show();
        return false;
    } else {
        return true;
    }
}

function guardarAlert() {
    $("#alert").hide();
}

function actualizarRows(idFamilia) {
    var numRegistros = $('.example-' + idFamilia + ' >tbody >tr').length;
    if (numRegistros > 0) {
        $('#span-' + idFamilia).removeClass("badge-danger");
        $('#span-' + idFamilia).addClass("badge-success");
        $('#span-' + idFamilia).empty();
        if (numRegistros === 1) {
            $('#span-' + idFamilia).append("Con " + numRegistros + " material");
        } else {
            $('#span-' + idFamilia).append("Con " + numRegistros + " materiales");
        }
    } else {
        $('#span-' + idFamilia).addClass("badge-danger");
        $('#span-' + idFamilia).removeClass("badge-success");
        $('#span-' + idFamilia).empty();
        $('#span-' + idFamilia).append("Sin materiales");
    }
}

function ActualizarTabla(idFamilia, response) {
    $("#collapse-" + idFamilia).empty();
    $("#collapse-" + idFamilia).fadeIn(10000).append(response);
    var table = $('.example-' + idFamilia).DataTable({
        responsive: true,
        pageLength: 25,
        language: {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "order": [],
        "columnDefs": [{
            "targets": 'no-sort',
            "orderable": false
        }],
        fixedColumns: true,
        dom: 'B<"clear">lfrtip',
        buttons: {
            name: 'primary',
            buttons: [
                { extend: 'print', text: 'Imprimir', exportOptions: { columns: '.Print' } },
                { extend: 'copyHtml5', text: 'Copiar', exportOptions: { columns: '.Print' } },
                { extend: 'excelHtml5', text: 'Excel', exportOptions: { columns: '.Print' } },
                { extend: 'csvHtml5', text: 'Csv', exportOptions: { columns: '.Print' } },
                { extend: 'pdfHtml5', text: 'Pdf', exportOptions: { columns: '.Print' } }
            ]
        }
    });
}
function eliminarCuantProvee(id, idfamilia, nombre) {
    var idCuantificacion = $("#CuantificacionId").val();
    swal({
        title: '¿Desea eliminar el registro: ' + nombre + '?',
        text: "El artículo se eliminará de la lista de cuantificaciones",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#0c7cd5',
        confirmButtonText: '¡Sí, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                var form = $('#__AjaxAntiForgeryForm');
                var token = $('input[name="__RequestVerificationToken"]', form).val();
                $.ajax({
                    url: "/Cuantificaciones/EliminarProveedor/",
                    method: "post",
                    dataType: "json",
                    data: {
                        id: id
                    }
                }).done(function (response) {
                    if (response.success) {
                        $.ajax({
                            method: "POST",
                            url: "/Cuantificaciones/ObtenerListaFamMat/",
                            data: { idFamilia: idfamilia, idCuantificacion: idCuantificacion }
                        }).done(function (result) {
                            ActualizarTabla(idfamilia, result);
                            actualizarRows(idfamilia);
                            SelectArticulos();
                            swal.close();
                        });
                    } else {
                        swal({
                            type: 'error',
                            title: response.msj,
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }).then(function () {
                        });
                    }
                });
            });
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    });
};
function SelectProveedor() {
    var id = $("#IdProveedor").val();
    $("#descripcion").empty();
    $("#precio").empty();

    if (id !== "") {
        $("#Mensaje").hide();
        $.ajax({
            method: "POST",
            url: "/Cuantificaciones/ObtenerProveedorArticulo/",
            data: { id: id }
        })
            .done(function (response) {
                if (response.proovedor !== null) {
                    response.proovedor.descripcion !== "" ? $("#descripcion").append(response.proovedor.descripcion) : $("#descripcion").append("Sin descripción");
                    response.proovedor.precio !== "" ? $("#precio").append(response.proovedor.precio.toFixed(2)) : $("#precio").append("0");
                } else {
                    $("#descripcion").append("Sin descripción");
                    $("#precio").append("0");
                }
            });
    } else {
        $("#Mensaje").show();
        $("#descripcion").append("Sin descripción");
        $("#precio").append("0");
    }
}

function EditarProveedor() {
    var idProveedor = $("#IdProveedor").val();
    var idFamilia = $("#IdFamilia").val();
    var idCuantificacion = $("#CuantificacionId").val();
    var idCuantProveedor = $("#IdCuantificacionProveedor").val();
    var isEdicionProveedor = true;
    $.ajax({
        method: "POST",
        url: "/Cuantificaciones/EditarProveedorArticulo/",
        data: { idProveedor: idProveedor, idCuantProveedor: idCuantProveedor, isEdicionProveedor: isEdicionProveedor }
    })
        .done(function (response) {
            if (response.success) {
                toastr.options.positionClass = "toast-bottom-right";
                toastr.success("Se ha actualizado el proveedor con éxito");
                $('#commonModal').modal('hide');
            } else {
                swal({
                    type: 'error',
                    title: response.msj,
                    allowOutsideClick: false,
                    confirmButtonColor: '#0c7cd5',
                    allowEscapeKey: false
                }).then(function () {
                });
            }
        });

}

function editarCantidad(idProveedor, isEditableCuant) {
    var cantidad = $("#cantidad-" + idProveedor).val();
    var fecha = $("#fecha-" + idProveedor).val();
    var observacion = $("#observacion-" + idProveedor).val();
    var materialCuantificacion = new Object();
    materialCuantificacion.IdProveedorCuantArt = idProveedor;
    materialCuantificacion.isEdicionCantidad = true;
    if (isEditableCuant) {
        materialCuantificacion.cantidad = cantidad;
        materialCuantificacion.fecha = fecha;
    } else {
        materialCuantificacion.fecha = fecha;
        materialCuantificacion.descripcion = observacion;
    }
    materialCuantificacion.isEditableCuant = isEditableCuant;
    $.ajax({
        method: "POST",
        url: "/Cuantificaciones/EditarArticulo/",
        data: { materialCuantificacion: materialCuantificacion },
        cache: false,
        success: function (response) {
            if (response.success) {
                if (isEditableCuant) {
                    validarArticuloSuccess("cantidad", idProveedor, materialCuantificacion.cantidad);
                    validarArticuloSuccess("fecha", idProveedor, materialCuantificacion.fecha);
                } else {
                    validarArticuloSuccess("fecha", idProveedor, materialCuantificacion.fecha);
                    validarArticuloSuccess("observacion", idProveedor, materialCuantificacion.descripcion);
                }
            } else {
                if (isEditableCuant) {
                    validarArticuloError("cantidad", idProveedor);
                    validarArticuloError("fecha", idProveedor);
                } else {
                    validarArticuloError("fecha", idProveedor);
                    validarArticuloError("observacion", idProveedor);
                }
            }
        },
        error: function () {
            if (isEditableCuant) {
                validarArticuloError("cantidad", idProveedor);
                validarArticuloError("fecha", idProveedor);
            } else {
                validarArticuloError("fecha", idProveedor);
                validarArticuloError("observacion", idProveedor);
            }
        }
    }).fail(function () {
        if (isEditableCuant) {
            validarArticuloError("cantidad", idProveedor);
            validarArticuloError("fecha", idProveedor);
        } else {
            validarArticuloError("fecha", idProveedor);
            validarArticuloError("observacion", idProveedor);
        }
    });

}


$("#formObservacion").on("submit", function (e) {
    e.preventDefault();
    var idCuantificacion = $("#CuantificacionId").val();
    var mensaje = $("#mensaje").val();
    if (mensaje.trim() !== "") {
        mensaje = mensaje.trim();
        $.ajax({
            method: "POST",
            url: "/Cuantificaciones/CrearObservacion",
            data: { idCuantificacion: idCuantificacion, mensaje: mensaje }
        }).done(function (response) {
            if (response.success) {
                $("#SeleccionOpciones").hide();
                $("#guardarCuantificacion").show();
                var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
                var diasSemana = new Array("domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado");
                var f = new Date();
                var fechaActual = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
                if ($("#mensajesSolos").length > 0) {
                    $("#mensajesSolos").append("<div class='send-mess'>" + mensaje + "</div>");
                } else {
                    $("#seccionMensajes").append("<span class='mess-time'>" + fechaActual + "</span><div class='send-mess__inner'><div class='send-mess-list' id='mensajesSolos'><div class='send-mess'>" + mensaje + "</div></div></div>");
                }
                $("#mensaje").val("");
            }

        });
    }
});

//$("#aceptarLaCuant").on("click", function (e) {
//    e.preventDefault();
//    var href = $('#aceptarLaCuant').attr('href');
//    $.ajax({
//        method: "GET",
//        url: href
//    }).done(function (response) {
//        if (response.success) {
//            var mensaje = $("#mensaje").val();
//            var idCuantificacion = $("#CuantificacionId").val();
//            if (mensaje.trim() !== "") {
//                mensaje = mensaje.trim();
//                $.ajax({
//                    method: "POST",
//                    url: "/Cuantificaciones/CrearObservacion",
//                    data: { idCuantificacion, mensaje }
//                }).done(function (response) {
//                    if (response.success) {
//                        var href = $('#aceptarLaCuant').attr('href');
//                    }

//                });
//            }
//        }

//    });

//});

$("#mostrarObservacion").click(function () {

    $('#collapseExampleObservacion').slideToggle();


});

$("#mostrarChat").click(function () {

    $('#collapseExampleObservacion').show();
    var posicion = $("#collapseExampleObservacion").offset().top;
    $("html, body").animate({
        scrollTop: posicion - 100
    }, 1000);


});

function validarArticuloError(id, idProveedor) {
    $("#" + id + "-" + idProveedor).removeClass("is-valid");
    $("#" + id + "-" + idProveedor).removeClass("not-validInput");
    $("#" + id + "-" + idProveedor).addClass("is-invalid");
}
function validarArticuloSuccess(id, idProveedor, valor) {
    if (valor == 0 || valor == "" || valor == undefined) {
        $("#" + id + "-" + idProveedor).removeClass("is-valid");
        $("#" + id + "-" + idProveedor).removeClass("is-invalid");
        $("#" + id + "-" + idProveedor).addClass("not-validInput");
    } else {

        $("#" + id + "-" + idProveedor).removeClass("not-validInput");
        $("#" + id + "-" + idProveedor).removeClass("is-invalid");
        $("#" + id + "-" + idProveedor).addClass("is-valid");
    }
}

function funComboCategoria() {
    $('#IdCategoria').selectpicker('destroy');
    $('#IdCategoria').selectpicker();
    $('#IdCategoria').selectpicker('deselectAll');
    $("#IdCategoria").selectpicker("refresh");
    $('#IdCategoria').empty();
    $("#IdCategoria").selectpicker("refresh");
}
function funComboArticulos() {
    $('#IdProveedorArticulo').selectpicker('deselectAll');
    $("#IdProveedorArticulo").selectpicker("refresh");
    $('#IdProveedorArticulo').empty();
    $("#IdProveedorArticulo").selectpicker("refresh");
}

function validarCeros() {
    let inputs = $('.input-number');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == 0) {
            inputs[i].value = "";
        }
    }
}