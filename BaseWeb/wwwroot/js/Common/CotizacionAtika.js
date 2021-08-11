var reloader = true;
async function Crear() {
    var model = CrearModelo(null);
    calculoTotal();
    $.ajax({
        method: "POST",
        url: "/CotizacionesAtika/Crear/",
        data: model
    }).done(function (response) {
        if (response.success) {
            toastr.options.positionClass = "toast-bottom-right";
            toastr.success("Cambio realizado con éxito");
            if ($('#IdCotizacion').val().length == 0) {
                $("#IdCotizacion").val(response.modelo);
            }
        } else {
            toastr.options.positionClass = "toast-bottom-right";
            toastr.error("Error: No se guardaron los cambios");
        }
    });
}
$("#IVA").on("change", function () {
    calculoTotal();
});
$("#descuento").on("change", function () {
    calculoTotal();
});
function CrearModelo(listaProveedores) {
    var model = new Object();
    model.iva = $("#IVA").val();
    model.notas = $("#Notas").val();
    model.total = parseFloat($("#totalCotizar").text());
    model.vencimiento = $("#FechaEntregaInput").val();
    model.tiempoDiseno = $("#tiempoDiseno").val();
    model.tiempoProduccion = $("#tiempoProduccion").val();
    model.tiempoEntrega = $("#tiempoEntrega").val();
    model.idCotizacion = $("#IdCotizacion").val();
    model.idLocacion = $("#LugarInputOut").val();
    model.fechaEvento = $("#fechaEvento").val();
    model.fechaEntrega = $("#FechaEntrega").val();
    model.idProyecto = $("#IdProyecto").val();
    model.observaciones = $("#summernote").val();
    model.idProyecto = $("#IdProyecto").val();
    model.idCotizacion = $("#IdCotizacion").val();
    model.descuento = $("#descuento").val();
    model.subtotalCotizacion = parseFloat($("#subtotalCotizar").text());
    if (listaProveedores) {
        model.listaProveedores = listaProveedores;
    }
    return model;
}

function validacionDeCotizacion() {
    var CondicionesPago = null;
    var Vigencia = null;
    $('input[name="CondicionesPago[]"]:checked').each(function () {
        if ($(this).prop('checked')) {
            CondicionesPago = $(this).val();
        }
    });
    $('input[name="Vigencia[]"]:checked').each(function () {
        if ($(this).prop('checked')) {
            Vigencia = $(this).val();
        }
    });
    if (CondicionesPago == null) {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.error("Se necesita capturar el <strong> anticipo o pago en la condición de pago </strong>para poder realizar esta acción");
    }
    if (Vigencia == null) {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.error("Se necesita capturar la <strong>  vigencia de pago en las clausulas</strong> para poder realizar esta acción");
    }
}

function validarCantidadSinMensaje() {
    var cantidadCeros = 0;
    var CondicionesPago = null;
    var Vigencia = null;
    $('input[name="CondicionesPago[]"]:checked').each(function () {
        if ($(this).prop('checked')) {
            CondicionesPago = $(this).val();
        }
    });
    $('input[name="Vigencia[]"]:checked').each(function () {
        if ($(this).prop('checked')) {
            Vigencia = $(this).val();
        }
    });
    if (CondicionesPago == null || Vigencia == null) {
        $("#generarCotizacion").attr("readonly", true);
        $("#AgruparComponentes").attr("readonly", true);
        return false;
    }
    $("#generarCotizacion").attr("readonly", false);
    $("#AgruparComponentes").attr("readonly", false);
    return true;
}
function activarDescuento() {
    var check = document.getElementById("checkdescuento").checked;
    if (check) {
        $("#descuento").attr("readonly", false);
        $("#descuento").css("background-color", "transparent");
    } else {
        $("#descuento").attr("readonly", true);
        $("#descuento").css("background-color", "lightgray");
        $("#descuento").val(0);
        Crear();
    }
}


$(".checksClausulas").on("change", function () {
    var condicionesPago = new Object();
    var vigenciaConFirma = new Object();
    var clausulas = new Array();
    var TiempoProduccion = new Array();
    $('input[name="CondicionesPago[]"]:checked').each(function () {
        if ($(this).prop('checked')) {
            if ($(this).val() == "desc") {
                if ($("#pago-val").val() != "") {
                    condicionesPago.condicion = null;
                    condicionesPago.hasFirma = $("#pago-desc").prop('checked');
                    condicionesPago.descripcion = $("#pago-val").val();
                } else {
                    $("#pago-check").prop('checked', false);
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.error("Se necesita capturar algun valor en el campo<strong> condicion de pago </strong>para poder seleccionarlo");
                }
            } else {
                condicionesPago.condicion = $(this).val();
                condicionesPago.hasFirma = $("#pago-" + $(this).val()).prop('checked');
            }

        }
    });
    $('input[name="Vigencia[]"]:checked').each(function () {
        if ($(this).prop('checked')) {
            if ($(this).val() == "desc") {
                if ($("#vigencia-val").val() != "") {
                    vigenciaConFirma.vigencia = null;
                    vigenciaConFirma.hasFirma = $("#vigencia-desc").prop('checked');
                    vigenciaConFirma.descripcion = $("#vigencia-val").val();
                }
                else {
                    $("#vigencia-check").prop('checked', false);
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.error("Se necesita capturar algun valor en el campo<strong> vigencia </strong>para poder seleccionarlo");
                }
            } else {
                vigenciaConFirma.vigencia = $(this).val();
                vigenciaConFirma.hasFirma = $("#vigencia-" + $(this).val()).prop('checked');
            }
        }
    });
    $('input[name="Clausulas[]"]:checked').each(function () {
        if ($(this).prop('checked')) {
            if ($(this).val() == "desc") {
                if ($("#clausula-val").val() != "") {
                    clausulas.push({
                        clausula: null,
                        hasFirma: $("#clausula-desc").prop('checked'),
                        descripcion: $("#clausula-val").val()
                    });
                } else {
                    $("#clausula-check").prop('checked', false);
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.error("Se necesita capturar algun valor en el campo<strong> condiciones </strong>para poder seleccionarlo");
                }
            } else {
                clausulas.push({
                    clausula: $(this).val(),
                    hasFirma: $("#clausula-" + $(this).val()).prop('checked')
                });
            }
        }
    });
    $('input[name="TiemposProduccion[]"]:checked').each(function () {
        if ($(this).prop('checked')) {
            if ($(this).val() == "desc") {
                if ($("#tiempo-val").val() != "") {
                    TiempoProduccion.push({
                        tiempo: null,
                        hasFirma: $("#tiempo-desc").prop('checked'),
                        descripcion: $("#tiempo-val").val()
                    });
                } else {
                    $("#tiempo-check").prop('checked', false);
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.error("Se necesita capturar algun valor en el campo<strong> tiempo de producción </strong>para poder seleccionarlo");
                }
            } else {
                TiempoProduccion.push({
                    tiempo: $(this).val(),
                    hasFirma: $("#tiempo-" + $(this).val()).prop('checked')
                });
            }
        }
    });
    var model = new Object();
    model.idProyecto = $("#IdProyecto").val();
    model.idCotizacion = $("#IdCotizacion").val();
    model.condicionesPago = condicionesPago;
    model.VigenciaConFirma = vigenciaConFirma;
    model.Clausulas = clausulas;
    model.TiemposProduccion = TiempoProduccion;
    $.ajax({
        type: "POST",
        url: "/CotizacionesAtika/GuardarClausulas",
        data: { model: model },
        success: function (result) {
            if (result.success) {
                toastr.options.positionClass = "toast-bottom-right";
                toastr.success("Cambio realizado con éxito");
                if ($('#IdCotizacion').val().length == 0) {
                    $("#IdCotizacion").val(response.modelo);
                }
            } else {
                toastr.options.positionClass = "toast-bottom-right";
                toastr.error("Error: No se guardaron los cambios");
            }
        }
    });
    validarCantidadSinMensaje();
});

$(document).ready(function () {
    calculoTotal();
    CadenadeCambio();
});
function calculoTotal() {
    var cambioDolar = $("#CambioDolar").val();
    var subtotal = 0;
    $(".subtotales").each(function (index) {
        var valor = $(this).text();
        subtotal += parseFloat(valor);
    });
    $("#subtotalCotizar").text(subtotal);
    $(".labelSub").each(function (index) {
        var valor = $(this).text();
        $(this).empty();
        $(this).append(maskDinero(unmaskDinero(valor)) + " MXN");
    });
    if ($("#IVA").val() == "") {
        $("#IVA").val(0)
    }
    var total = 0;
    var Iva = parseFloat($("#IVA").val());
    var subTotal = parseFloat($("#subtotalCotizar").text());
    var existeDescuento = document.getElementById("checkdescuento").checked;
    subTotal = isNaN(subTotal) ? 0 : subTotal;
    total = (subTotal * (Iva / 100)) + subTotal;
    total = isNaN(total) ? 0 : total;
    if (existeDescuento) {
        var descuentazo = $("#descuento").val();
        if (descuentazo != "" || descuentazo != undefined) {
            if (descuentazo != 0) {
                total = total - ((total * descuentazo) / 100);
            }
        } else {
            $("#descuento").val(0);
        }
    }
    $("#totalCotizar").empty();
    $("#totalCotizar").append(total);
    var totalillo = maskDinero(unmaskDinero($("#totalCotizar").text()));
    $("#labelTotalCotizar").empty();
    $("#labelTotalCotizar").append(totalillo + " MXN");

    if ($("#cambioDolar").length && $("#cambioDeDolar").length) {
        var check = document.getElementById("cambioDeDolar").checked;
        var check2 = document.getElementById("cambioDolar").checked;
        if (check || check2) {
            CambioDolarConversion(true, cambioDolar);
            CambioDolarConversionAgrupacion(true, cambioDolar);
        }
    }
}

function CadenadeCambio() {
    var cambioDolar = $("#CambioDolar").val();
    $(".labelSub").each(function (index) {
        var valor = $(this).text();
        $(this).empty();
        $(this).append(maskDinero(unmaskDinero(valor)) + " MXN");
    });
    $(".labelPrecioUnitario").each(function (index) {
        var valor = $(this).text();
        $(this).empty();
        $(this).append(maskDinero(unmaskDinero(valor)) + " MXN");
    });
    $(".agrupacionTotalaria").each(function (index) {
        var valor = $(this).text();
        $(this).empty();
        $(this).append(maskDinero(unmaskDinero(valor)) + " MXN");
    });
    $(".agrupacionUnitaria").each(function (index) {
        var valor = $(this).text();
        $(this).empty();
        $(this).append(maskDinero(unmaskDinero(valor)) + " MXN");
    });
    var total = $("#subtotalCotizar").text();
    var valorString = maskDinero(unmaskDinero(total));
    $("#labelSubtotalCotizar").empty();
    $("#labelSubtotalCotizar").append(valorString + " MXN");
    var totalCotizar = $("#totalCotizar").text();
    var valorTotalString = maskDinero(unmaskDinero(totalCotizar));
    $("#labelTotalCotizar").empty();
    $("#labelTotalCotizar").append(valorTotalString + " MXN");
    var check = document.getElementById("cambioDeDolar").checked;
    var check2 = document.getElementById("cambioDolar").checked;
    if (check || check2) {
        CambioDolarConversion(true, cambioDolar);
        CambioDolarConversionAgrupacion(true, cambioDolar);
    }
    validarCantidadSinMensaje();
}

//Dolares a pesos y viceversa

function CambioDolar(cambioDolar, caso) {
    var model = CrearModelo(null);
    model.isDolarActivo = caso ? document.getElementById("cambioDeDolar").checked : document.getElementById("cambioDolar").checked;
    $.ajax({
        method: "POST",
        url: "/CotizacionesAtika/Crear",
        data: { model }
    })
        .done(function (response) {
            if (response.success) {
                if (caso) {
                    var check = document.getElementById("cambioDeDolar").checked;
                    if (check) {
                        $("#cambioDolar").prop("checked", true);
                        CambioDolarConversion(true, cambioDolar);
                        CambioDolarConversionAgrupacion(true, cambioDolar);
                    } else {
                        $("#cambioDolar").prop("checked", false);
                        CambioDolarConversion(false, null);
                        CambioDolarConversionAgrupacion(false, null);
                    }
                } else {
                    var checkDolar = document.getElementById("cambioDolar").checked;
                    if (checkDolar) {
                        $("#cambioDeDolar").prop("checked", true);
                        CambioDolarConversion(true, cambioDolar);
                        CambioDolarConversionAgrupacion(true, cambioDolar);
                    } else {
                        $("#cambioDeDolar").prop("checked", false);
                        CambioDolarConversion(false);
                        CambioDolarConversionAgrupacion(false, null);
                    }
                }
            }
        });

}

function CambioDolarSinActualizar(cambioDolar, caso) {
    if (caso) {
        var check = document.getElementById("cambioDeDolar").checked;
        if (check) {
            $("#cambioDolar").prop("checked", true);
            CambioDolarConversion(true, cambioDolar);
            CambioDolarConversionAgrupacion(true, cambioDolar);
        } else {
            $("#cambioDolar").prop("checked", false);
            CambioDolarConversion(false);
            CambioDolarConversionAgrupacion(false, null);
        }
    } else {
        var checkDolar = document.getElementById("cambioDolar").checked;
        if (checkDolar) {
            $("#cambioDeDolar").prop("checked", true);
            CambioDolarConversion(true, cambioDolar);
            CambioDolarConversionAgrupacion(true, cambioDolar);
        } else {
            $("#cambioDeDolar").prop("checked", false);
            CambioDolarConversion(false);
            CambioDolarConversionAgrupacion(false, null);
        }
    }

}

function CambioDolarConversion(caso, cambioDolar) {
    var elemento = document.getElementsByClassName('subtotales');
    var cantidad = elemento.length;
    var elemento2 = document.getElementsByClassName('preciosUnitarios');
    var cantidad2 = elemento2.length;
    if (caso) {
        for (var i = 0; i < cantidad; i++) {
            var id = elemento[i].getAttribute('id');
            var subtotal = parseFloat($("#" + id).text());
            var total = subtotal / cambioDolar;
            var totalString = maskDinero(unmaskDinero(total.toString()));
            $("." + id + "Dolar").empty();
            $("." + id + "Dolar").append(totalString + " USD");
            $("." + id + "Label").attr("hidden", true);
            $("." + id + "Dolar").attr("hidden", false);
        }
        for (var e = 0; e < cantidad2; e++) {
            var idPrecio = elemento2[e].getAttribute('id');
            var precio = parseFloat($("#" + idPrecio).text());
            var total2 = precio / cambioDolar;
            var totalString2 = maskDinero(unmaskDinero(total2.toString()));
            $("." + idPrecio + "Dolar").empty();
            $("." + idPrecio + "Dolar").append(totalString2 + " USD");
            $("." + idPrecio + "Label").attr("hidden", true);
            $("." + idPrecio + "Dolar").attr("hidden", false);
        }
        var num = $("#subtotalCotizar").text();
        var totalillo = parseFloat(num) / cambioDolar;
        var labelSubTotal = maskDinero(unmaskDinero(totalillo.toString()));
        $("#labelSubtotalCotizarDolar").empty();
        $("#labelSubtotalCotizarDolar").append(labelSubTotal + " USD");
        var num2 = $("#totalCotizar").text();
        var totalillo2 = parseFloat(num2) / cambioDolar;
        var labelTotal = maskDinero(unmaskDinero(totalillo2.toString()));
        $("#labelTotalCotizarDolar").empty();
        $("#labelTotalCotizarDolar").append(labelTotal + " USD");
        $("#labelSubtotalCotizar").attr("hidden", true);
        $("#labelTotalCotizar").attr("hidden", true);
        $("#labelSubtotalCotizarDolar").attr("hidden", false);
        $("#labelTotalCotizarDolar").attr("hidden", false);

    } else {
        for (var z = 0; z < cantidad; z++) {
            var idEl = elemento[z].getAttribute('id');
            $("." + idEl + "Label").attr("hidden", false);
            $("." + idEl + "Dolar").attr("hidden", true);
        }
        for (var a = 0; a < cantidad2; a++) {
            var idPre = elemento2[a].getAttribute('id');
            $("." + idPre + "Label").attr("hidden", false);
            $("." + idPre + "Dolar").attr("hidden", true);
        }
        $("#labelSubtotalCotizar").attr("hidden", false);
        $("#labelTotalCotizar").attr("hidden", false);
        $("#labelSubtotalCotizarDolar").attr("hidden", true);
        $("#labelTotalCotizarDolar").attr("hidden", true);
    }
}

function CambioDolarConversionAgrupacion(caso, cambioDolar) {
    var elemento = document.getElementsByClassName('subtotalesAgrupacion');
    var cantidad = elemento.length;
    var elemento2 = document.getElementsByClassName('preciosUnitarioAgrupacion');
    var cantidad2 = elemento2.length;
    if (caso) {
        for (var i = 0; i < cantidad; i++) {
            var id = elemento[i].getAttribute('id');
            var subtotal = parseFloat($("#" + id).text());
            var total = subtotal / cambioDolar;
            var totalString = maskDinero(unmaskDinero(total.toString()));
            $("." + id + "Dolar").empty();
            $("." + id + "Dolar").append(totalString + " USD");
            $("." + id + "Peso").attr("hidden", true);
            $("." + id + "Dolar").attr("hidden", false);
        }
        for (var e = 0; e < cantidad2; e++) {
            var idPrecio = elemento2[e].getAttribute('id');
            var precio = parseFloat($("#" + idPrecio).text());
            var total2 = precio / cambioDolar;
            var totalString2 = maskDinero(unmaskDinero(total2.toString()));
            $("." + idPrecio + "Dolar").empty();
            $("." + idPrecio + "Dolar").append(totalString2 + " USD");
            $("." + idPrecio + "Peso").attr("hidden", true);
            $("." + idPrecio + "Dolar").attr("hidden", false);
        }


    } else {
        for (var z = 0; z < cantidad; z++) {
            var idEl = elemento[z].getAttribute('id');
            $("." + idEl + "Peso").attr("hidden", false);
            $("." + idEl + "Dolar").attr("hidden", true);
        }
        for (var a = 0; a < cantidad2; a++) {
            var idPre = elemento2[a].getAttribute('id');
            $("." + idPre + "Peso").attr("hidden", false);
            $("." + idPre + "Dolar").attr("hidden", true);
        }
    }
}

function CrearAgrupacion(idCotizacion, idProyecto) {
    if (!($("#generarCotizacion").attr("readonly"))) {
        location.href = "/AgrupacionRequerimientos/ListadoAgrupacion?idProyecto=" + idProyecto + "&idCotizacion=" + idCotizacion;
    } else {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.error("Se necesita capturar las cantidades y registrar la locación para poder realizar esta acción");
    }
}

//CotizacionRequerimiento

function calculosCot(id, idAgrupacion, isAgrupado) {
    var cantidad = parseFloat($(".cantidadValor-" + id).val());
    var precioUnitario = parseFloat($(".precioUnitario-" + id).text());
    var notaExtra = $("#notaExtraComponente-" + id).val();
    var totalSubtotalPorId = cantidad * precioUnitario;
    var check = document.getElementById("cambioDeDolar").checked;
    var check2 = document.getElementById("cambioDolar").checked;
    var cambioDolar = $("#CambioDolar").val();
    var isFirma = $("#isFirma-" + id).prop("checked");
    var total = 0;
    cantidad = isNaN(cantidad) ? 0 : cantidad;
    $(".subTotal-" + id).empty();
    $(".labelsubTotal-" + id).empty();
    $(".labelsubTotal-" + id).append(maskDinero(unmaskDinero(totalSubtotalPorId.toString())) + " MXN");
    $(".subTotal-" + id).append(totalSubtotalPorId);
    $(".subtotales").each(function (index) {
        var valor = parseFloat($(this).text());
        valor = isNaN(valor) ? 0 : valor;
        total = total + valor;
    });
    var totalAgrupacionSubTotal = 0;
    if (isAgrupado) {
        if (idAgrupacion != null) {
            $(".subtotal-Agrupacion-" + idAgrupacion).each(function (index) {
                var valor = parseFloat($(this).text());
                valor = isNaN(valor) ? 0 : valor;
                totalAgrupacionSubTotal = totalAgrupacionSubTotal + valor;
            });
            $("#" + idAgrupacion + "-subtotalAgrupacion").html(totalAgrupacionSubTotal);
            $("." + idAgrupacion + "-subtotalAgrupacionPeso").html(maskDinero(unmaskDinero(totalAgrupacionSubTotal.toString())) + " MXN");
        }
    }
    var listProveedores = new Array();
    $(".servicioProveedor-" + id).each(function () {
        if ($(this).val().toString() != "" && $(this).val().toString() != 0 && $(this).val().toString() != null) {
            listProveedores.push($(this).val());
        }
    });
    var model = CrearModelo(listProveedores.map(i => Number(i)));
    model.cantidad = cantidad;
    model.subtotal = totalSubtotalPorId;
    model.IdCotizacionRequerimiento = $("#requerimientoCotizacionValor-" + id).val();
    model.precioUnitario = parseFloat($("#" + id + "-PrecioUnitario").text());
    model.IdRequerimiento = id;
    model.notaExtra = notaExtra;
    model.isFirma = isFirma;
    var totalCot = 0;
    totalCot = (total * (model.iva / 100)) + total;
    model.total = totalCot;
    model.total = isNaN(model.total) ? 0 : model.total;
    model.subtotalCotizacion = total;
    var existeDescuento = document.getElementById("checkdescuento").checked;
    if (existeDescuento) {
        var descuentazo = $("#descuento").val();
        if (descuentazo != "" || descuentazo != undefined) {
            if (descuentazo != 0) {
                totalCot = totalCot - (total * (descuentazo / 100));
            }
        } else {
            $("#descuento").val(0);
        }
    }
    var idCoti = $("#IdCotizacion").val();
    var requeValor = $("#requerimientoCotizacionValor-" + id).val();
    $.ajax({
        method: "POST",
        url: "/CotizacionesAtika/CrearCotizacionRequerimiento/",
        data: model
    })
        .done(function (response) {
            $("#subtotalCotizar").empty();
            $("#subtotalCotizar").append(total);
            $("#totalCotizar").empty();
            $("#totalCotizar").append(totalCot);
            validarCantidadSinMensaje();
            if (check || check2) {
                CambioDolarConversion(true, cambioDolar);
                CambioDolarConversionAgrupacion(true, cambioDolar);
            }
            var subtotalillo = maskDinero(unmaskDinero($("#subtotalCotizar").text()));
            $("#labelSubtotalCotizar").empty();
            $("#labelSubtotalCotizar").append(subtotalillo + " MXN");
            var ftotal = maskDinero(unmaskDinero(totalCot.toString()));
            $("#labelTotalCotizar").empty();
            $("#labelTotalCotizar").append(ftotal + " MXN");
            if (requeValor == "" || requeValor == null) {
                $("#requerimientoCotizacionValor-" + id).val(response.idCotizacionRequerimiento);
            }
            if (idCoti == "" || idCoti == null) {
                $("#IdCotizacion").val(response.idCotizacion);
            }
        });
}


$('#requerimiento').on("change", function () {
    var idCotizacionRequerimiento = $(this).val();
    if (idCotizacionRequerimiento.toString() != "") {
        $("#servicio").removeAttr("disabled");
        $('#servicio').val("");
        $('#proveedorSele').val("");
        $("#nombreProveedor").text("");
        $("#precioProveedor").text("0");
        $('#proveedorSele').empty("");
        $('#proveedorSele').append("<option selected value=''>Seleccione un proveedor</option>");
        $('#proveedorSele').selectpicker("destroy");
        $("select").selectpicker("refresh");
        $('#servicio').attr("disabled");
        $('#proveedorSele').attr("disabled");
    } else {
        $("#servicio").attr("disabled");
    }
    $("#servicio").selectpicker("refresh");
});

$('.serviceSelect').on("change", function () {
    var idServicio = $(this).val();
    var idCotizacionRequerimiento = $("#requerimiento").val();
    var $select = $(".proveedorSelect");
    try {
        $.ajax({
            url: "/CotizacionesAtika/ObtenerProveedorPorServicio",
            data: { idServicio, idCotizacionRequerimiento },
            type: "POST",
            success: function (response) {
                $("#renderProveedor").html(response);
                $(".proveedorSelect").selectpicker();
                $('#proveedorSele').removeAttr("disabled");
            },
            error: function () {
                console.error("No es posible completar la operación");
            }
        });
    } catch (e) {
        console.log(e);
    }
});

//$(document).on('change', '#proveedorSele', function () {
//    var idServicio = $(this).val();
//    var name = $(this).attr("name");
//    var regex = /(\d+)/g;
//    var idRequerimiento = parseInt(name.match(regex)[0]);
//    var idSelect = parseInt(name.match(regex)[1]);
//    var $select = $("select[name='proveedores-" + idRequerimiento + "[" + idSelect + "]']");
//    try {
//        $.ajax({
//            url: "/CotizacionesAtika/ObtenerProveedorPorServicio",
//            data: { idServicio },
//            type: "POST",
//            success: function (response) {
//                $.each(response.proveedoresServicio, function (id, name) {
//                    console.log();
//                    $select.append('<option value=' + name.id + '>' + name.proveedor.nombre + '</option>');
//                });
//            },
//            error: function () {
//                console.error("No es posible completar la operación");
//            }
//        });
//    } catch (e) {
//        console.log(e);
//    }
//});

//$(document).on('change', '.selectServicios', function () {
//    var idServicio = $(this).val();
//    var name = $(this).attr("name");
//    var regex = /(\d+)/g;
//    var idRequerimiento = parseInt(name.match(regex)[0]);
//    console.log(idRequerimiento);
//    var idCotizacionRequerimiento = $("#requerimientoCotizacionValor-" + idRequerimiento).val();
//    var idSelect = parseInt(name.match(regex)[1]);
//    var $select = $("select[name='proveedores-" + idRequerimiento + "[" + idSelect + "]']");
//    try {
//        $.ajax({
//            url: "/CotizacionesAtika/ObtenerProveedorPorServicio",
//            data: { idServicio, idCotizacionRequerimiento },
//            type: "POST",
//            success: function (response) {
//                $.each(response.proveedoresServicio, function (id, name) {
//                    console.log();
//                    $select.append('<option value=' + name.id + '>' + name.proveedor.nombre + '</option>');
//                });
//            },
//            error: function () {
//                console.error("No es posible completar la operación");
//            }
//        });
//    } catch (e) {
//        console.log(e);
//    }
//});

$(document).on('change', '.selectProveedores', function () {
    var name = $(this).attr("name");
    var regex = /(\d+)/g;
    var idRequerimiento = parseInt(name.match(regex)[0]);
    var idSelect = parseInt(name.match(regex)[1]);
    var listProveedores = new Array();
    $(".servicioProveedor-" + idRequerimiento).each(function () {
        if ($(this).val().toString() != "" && $(this).val().toString() != 0 && $(this).val().toString() != null) {
            listProveedores.push($(this).val());
        }
    });
    calculosCot(idRequerimiento, null, null);
});

$("#formEnvio").on("submit", function (e) {
    e.preventDefault();
    var requerimiento = $('#requerimiento').val();
    var servicio = $('#servicio').val();
    var proveedor = $('#proveedorSele').val();
    var nombreProveedor = $("#nombreProveedor").text();
    var precioProveedor = $("#precioProveedor").text();
    if (proveedor.trim() == '') {
        $('#proveedorSele').focus();
        return false;
    } else if (requerimiento.trim() == '') {
        $('#requerimiento').focus();
        return false;
    } else if (servicio.trim() == '') {
        $('#servicio').focus();
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: '/CotizacionesAtika/CrearRequerimientoServicio',
            data: { idProveedorServicio: proveedor, idCotizacionRequerimiento: requerimiento },
            beforeSend: function () {
                KApp.block('.modal-content', {
                    overlayColor: '#000000',
                    type: 'v2',
                    state: "primary",
                    message: "Agregando...",
                    size: 'lg'
                });
            },
            success: function (response) {
                if (response.success) {
                    KApp.unblock('.modal-content');
                    if ($(".agregarServicio-" + response.idRequerimiento).find(".badge").length) {
                        $(".agregarServicio-" + response.idRequerimiento).html("<div id='provReq-" + response.idReqServicio + "' class='k-widget-5__item k-widget-5__item--info'><div class='k-widget-5__item-info'><label class='k-widget-5__item-title'>" + nombreProveedor + " &nbsp;&nbsp;<label style='cursor:pointer;' onclick='EliminarReqServicio(" + response.idReqServicio + "," + response.idRequerimiento+")' class='text-danger'>Eliminar</label></label><div class='k-widget-5__item-datetime'>    $ " + precioProveedor + "</div></div></div>");
                    } else {
                        $(".agregarServicio-" + response.idRequerimiento).append("<div id='provReq-" + response.idReqServicio + "' class='k-widget-5__item k-widget-5__item--info'><div class='k-widget-5__item-info'><label class='k-widget-5__item-title'>" + nombreProveedor + " &nbsp;&nbsp;<label style='cursor:pointer;' onclick='EliminarReqServicio(" + response.idReqServicio + "," + response.idRequerimiento +")' class='text-danger'>Eliminar</label></label><div class='k-widget-5__item-datetime'>    $ " + precioProveedor + "</div></div></div>");
                    }
                    $('.submitBtn').removeAttr("disabled");
                    $('#proveedorSele option[value="' + proveedor + '"]').remove();
                    $('#proveedorSele').selectpicker("deselectAll");
                    $('#proveedorSele').selectpicker("refresh");
                    $("#nombreProveedor").text("");
                    $("#precioProveedor").text("0");
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.success("Se guardó con éxito el proveedor");
                } else {
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.error("Error: No se guardaron los cambios");
                }

            }
        });
    }
});

$(document).ready(function () {
    $('#k_scrollable_modal_1').on('hidden.bs.modal', function (e) {
        $('#requerimiento').val("");
        $('#servicio').val("");
        $('#proveedorSele').val("");
        $("#nombreProveedor").text("");
        $("#precioProveedor").text("0");
        $('#proveedorSele').empty("");
        $('#proveedorSele').append("<option selected value=''>Seleccione un proveedor</option>");
        $('#proveedorSele').selectpicker("destroy");
        $("select").selectpicker("refresh");
        $('#servicio').attr("disabled");
        $('#proveedorSele').attr("disabled");
    });
});

function EliminarReqServicio(id, idRequerimiento) {
    $.ajax({
        type: 'POST',
        url: '/CotizacionesAtika/EliminarRequerimientoServicio',
        data: { idReqServicio: id },
        beforeSend: function () {
            KApp.block('.table-responsive', {
                overlayColor: '#000000',
                type: 'v2',
                state: "primary",
                message: "Eliminando...",
                size: 'lg'
            });
        },
        success: function (response) {
            if (response.success) {
                KApp.unblock('.table-responsive');
                console.log($(".agregarServicio-" + idRequerimiento).find(".k-widget-5__item").length > 1);
                if ($(".agregarServicio-" + idRequerimiento).find(".k-widget-5__item").length > 1) {
                    $("#provReq-" + id).remove();
                } else {
                    $(".agregarServicio-" + idRequerimiento).html('<span class="badge badge-pill badge-warning"><strong>Sin servicios</strong></span>');
                }
            } else {
                $('.statusMsg').html('<span style="color:red;">Hubo un problema, por favor intente de nuevo.</span>');
            }

        }
    });
}

function GenerarCotizacion(idProyecto, idCotizacion, estatus) {
    if (!($("#generarCotizacion").attr("readonly"))) {
        idCotizacion = idCotizacion != 0 ? $("#IdCotizacion").val() : null;
        reloader = false;
        swal({
            title: "Generar cotización",
            html: "<p>Seleccione una opción</p>" +
                "<a class='btn btn-success' onclick='MostrarModal()' href='/CotizacionesAtika/ActualizarEstatusCotizacion?idProyecto=" + idProyecto + "&idCotizacion=" + idCotizacion + "&estatus=" + estatus + "&enviarMensaje=" + false + "&isDollarAcivo=" + false + "'>Generar</a><br/>",
            //"<a class='btn btn-success' onclick='MostrarModal()'  href='/CotizacionesAtika/ActualizarEstatusCotizacion?idProyecto=" + idProyecto + "&idCotizacion=" + idCotizacion + "&estatus=" + estatus + "&enviarMensaje=" + true + "&isDollarAcivo=" + false + "'>Generar y enviar al cliente MXN</a><br/>" +
            //"<a class='btn btn-success' onclick='MostrarModal()'  href='/CotizacionesAtika/ActualizarEstatusCotizacion?idProyecto=" + idProyecto + "&idCotizacion=" + idCotizacion + "&estatus=" + estatus + "&enviarMensaje=" + true + "&isDollarAcivo=" + true + "'>Generar y enviar al cliente USD</a>",
            type: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            confirmButtonColor: 'red',
            cancelButtonColor: '#0c7cd5',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            onClose: () => {
                reloader = true;
            }
        }).then((result) => {

        });
    } else {
        validacionDeCotizacion();
    }
}