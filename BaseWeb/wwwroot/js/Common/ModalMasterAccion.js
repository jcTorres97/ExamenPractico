$(function () {
    $('#commonModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var urlN = button.attr("href");
        var url = urlN;
        var idMet = getQueryVariable("NumId", url);
        var icono = $("#icono-" + idMet).val();
        var alias = $("#alias-" + idMet).val();
        if (icono !== "" && alias !== "") {
            url = updateURLParameter(url, "Icono", icono);
            url = updateURLParameter(url, "Alias", alias);
        }
        url = encodeURI(url);
        var modal = $(this);
        console.log(url);
        modal.find('.modal-content').load(url, function () {

            //callback handler
            $('form').submit(function (e) {
                e.preventDefault();
                //$('#ModalControl').val('Guardando ...')
                //    .attr('disabled', 'disabled');

                if (!$(this).valid()) {
                    return false;
                } else {
                    //form
                    $('button[type="submit"]').prop('disabled', true);
                    var data = new FormData(this);
                    $.ajax({
                        url: this.action,
                        type: this.method,
                        data: data,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
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
                                    console.log(result.accion);
                                    if (idMet !== false) {
                                        $("#icono-" + idMet).val(result.accion.icono);
                                        $("#alias-" + idMet).val(result.accion.alias);
                                        $(".alias-" + idMet).html("<code><i class='" + result.accion.icono + "'></i>&nbsp;" + result.accion.alias + "</code>");
                                    }
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
        });
    });
});

function getQueryVariable(variable, url) {
    var query = url.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
function updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}