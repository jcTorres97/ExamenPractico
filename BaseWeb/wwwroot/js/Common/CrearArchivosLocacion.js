$('#inputFileImagen').change(function (e) {
    addArchivo(e);
});

$('#inputFileAdjunto').change(function (e) {
    addArchivo(e);
});

function addArchivo(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        $("#submit_").click();
    };
    reader.readAsDataURL(file);
}

function deleteImage(url, id, nombre, numero) {
    swal({
        title: '¿Desea eliminar el registro: ' + nombre + '?',
        text: "Esta acción no se podrá revertir",
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
                    url: url + id,
                    method: "post",
                    dataType: "json",
                    data: {
                        __RequestVerificationToken: token,
                        id: id
                    },
                    success: function (data) {
                        if (data.success) {
                            swal({
                                type: 'success',
                                title: data.msj,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                $("#imgContent").load(" #imagenContenido");
                            });
                        } else {
                            swal({
                                type: 'info',
                                title: data.msj,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                            });
                        }

                    },
                    error: function () {
                        swal({
                            title: "¡Algo salió mal!",
                            text: "¡Ha ocurrido un error al eliminar el registro, si el problema continua comunicate con el administrador!",
                            type: "error",
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }, function () {
                        });
                    }
                });
            });
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    });
};

function deleteFile(url, id, nombre, numero) {
    swal({
        title: '¿Desea eliminar el registro: ' + nombre + '?',
        text: "Esta acción no se podrá revertir",
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
                    url: url + id,
                    method: "post",
                    dataType: "json",
                    data: {
                        __RequestVerificationToken: token,
                        id: id
                    },
                    success: function (data) {
                        if (data.success) {
                            swal({
                                type: 'success',
                                title: data.msj,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                $("#adjuntoContenido").load(" #adjContent");
                            });
                        } else {
                            swal({
                                type: 'info',
                                title: data.msj,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                            });
                        }

                    },
                    error: function () {
                        swal({
                            title: "¡Algo salió mal!",
                            text: "¡Ha ocurrido un error al eliminar el registro, si el problema continua comunicate con el administrador!",
                            type: "error",
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }, function () {
                        });
                    }
                });
            });
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    });
};

function AparecerInput() {
    $('#newAndjunto').removeAttr("hidden");
    $('#btnNewInput').attr("hidden", "hidden");
}

function AparecerInputImagen() {
    $('#newImagen').removeAttr("hidden");
    $('#btnNewInputImage').attr("hidden", "hidden");
}


