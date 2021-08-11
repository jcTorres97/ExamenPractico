console.log("alerts");

function eliminarCSRF(url, id, nombre) {
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
                                title: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
                        } else {
                            swal({
                                type: 'info',
                                title: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
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
                            location.reload();
                        });
                    }
                });
            })
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};


function asignarMensajesSistema() {
    swal({
        title: '¿Reasignar los mensajes del sistema?',
        text: "Esta acción puede modificar el plan de vida del estudiante, familiares y profesores y los estatus de los mensajes enviados.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#0c7cd5',
        confirmButtonText: '¡Sí, continuar!',
        cancelButtonText: '¡No, cancelar!',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                var form = $('#__AjaxAntiForgeryForm');
                var token = $('input[name="__RequestVerificationToken"]', form).val();
                $.ajax({
                    url: "/Estudiantes/ReasignarMensajes",
                    method: "post",
                    dataType: "json",
                    data: {
                        __RequestVerificationToken: token
                    },
                    success: function (data) {
                        if (data.success) {
                            swal({
                                type: 'success',
                                title: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
                        } else {
                            swal({
                                type: 'info',
                                title: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
                        }

                    },
                    error: function () {
                        swal({
                            title: "¡Algo salió mal!",
                            text: "¡Ha ocurrido un error al reasignar los mensajes!",
                            type: "error",
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }, function () {
                            location.reload();
                        });
                    }
                });
            })
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};



function descargarReporteEstudiantes() {
    swal({
        title: '¡Advertencia!',
        text: "¿Seguro que desea descargar el reporte de los estudiantes?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: '¡Si, Continuar!',
        cancelButtonText: '¡No, Cancelar!',
        confirmButtonColor: '#0c7cd5',
        cancelButtonColor: 'red',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        console.log(result);
        if (result) {
            window.location.href = "/Estudiantes/ReporteEstudiantes";
        }
    }).catch(swal.noop);

}


function descargarReporteFamiliares() {
    swal({
        title: '¡Advertencia!',
        text: "¿Seguro que desea descargar el reporte de los familiares?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: '¡Si, Continuar!',
        cancelButtonText: '¡No, Cancelar!',
        confirmButtonColor: '#0c7cd5',
        cancelButtonColor: 'red',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        console.log(result);
        if (result) {
            window.location.href = "/Familiares/ReporteFamiliares";
        }
    }).catch(swal.noop);

}


function descargarReporteProfesores() {
    swal({
        title: '¡Advertencia!',
        text: "¿Seguro que desea descargar el reporte de los profesores?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: '¡Si, Continuar!',
        cancelButtonText: '¡No, Cancelar!',
        confirmButtonColor: '#0c7cd5',
        cancelButtonColor: 'red',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        console.log(result);
        if (result) {
            window.location.href = "/Profesores/ReporteProfesores";
        }
    }).catch(swal.noop);

}

function descargarReporteDirectores() {
    swal({
        title: '¡Advertencia!',
        text: "¿Seguro que desea descargar el reporte de los directores?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: '¡Si, Continuar!',
        cancelButtonText: '¡No, Cancelar!',
        confirmButtonColor: '#0c7cd5',
        cancelButtonColor: 'red',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        console.log(result);
        if (result) {
            window.location.href = "/Profesores/ReporteDirectores";
        }
    }).catch(swal.noop);

}

function descargarReporteInstituciones() {
    swal({
        title: '¡Advertencia!',
        text: "¿Seguro que desea descargar el reporte de las instituciones?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: '¡Si, Continuar!',
        cancelButtonText: '¡No, Cancelar!',
        confirmButtonColor: '#0c7cd5',
        cancelButtonColor: 'red',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        console.log(result);
        if (result) {
            window.location.href = "/Instituciones/ReporteInstituciones";
        }
    }).catch(swal.noop);

}

function asignarMensajes(id, nombre) {
    swal({
        title: '¿Reasignar los mensajes de: ' + nombre + '?',
        text: "Esta acción puede modificar el plan de vida del estudiante y los estatus de los mensajes enviados.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#0c7cd5',
        confirmButtonText: '¡Sí, continuar!',
        cancelButtonText: '¡No, cancelar!',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                var form = $('#__AjaxAntiForgeryForm');
                var token = $('input[name="__RequestVerificationToken"]', form).val();
                $.ajax({
                    url: "/Estudiantes/ReAsingnarMensajes?idEstudiante=" + id,
                    method: "post",
                    dataType: "json",
                    data: {
                        __RequestVerificationToken: token,
                        idEstudiante: id
                    },
                    success: function (data) {
                        if (data.success) {
                            swal({
                                type: 'success',
                                title: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
                        } else {
                            swal({
                                type: 'info',
                                title: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
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
                            location.reload();
                        });
                    }
                });
            })
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};


function eliminarAdvertencia() {

    swal({
        title: 'No es posible eliminar este grupo.',
        text: "Para eliminar un grupo, es necesario que elimine primero los alumnos de éste.",
        type: 'warning',
        animation: false,
        customClass: 'animated tada',
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};

function camposVacios() {

    swal({
        title: 'No es posible generar el correo.',
        text: "Para generar un correo es necesario llenar los campos de: Nombre y Apellidos.",
        type: 'warning',
        animation: false,
        customClass: 'animated tada',
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};
function crearCorreo() {
    var nombre = $('#Nombre').val().replace(" ", "").trim();
    nombre = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    var apellido = $('#Apellido').val().trim();
    apellido = apellido.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    var fecha = Math.floor((Math.random() * 100) + 1);
    var anio = fecha;
    var correo = $('#Email').val();
    console.log(fecha);

    if (nombre == "" || apellido == "" || anio == "") {
        camposVacios();
        document.getElementById("Email").value = "";
    } else {
        var correogenerado = nombre.charAt(0) + apellido.split(" ", 1) + fecha + "@zacpainc.com";

        document.getElementById("Email").value = correogenerado.toLowerCase();
    }

}

function seguroEditar() {

    swal({
        title: 'Advertencia',
        text: "¿Está seguro que deseas modificar tus datos?",
        type: 'warning',
        buttons: true,
        showCancelButton: true,
        confirmButtonColor: '#0c7cd5',
        cancelButtonColor: 'red',
        confirmButtonText: '¡Sí, enviar!',
        cancelButtonText: '¡No, cancelar!',
        showLoaderOnConfirm: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                document.getElementById("control").submit();
            }
        });
};
function CambioDeContra() {
    var correo = $('#correoR').val();
    swal({
        title: 'Recuperar contraseña',
        text: "Se enviará un correo electrónico de recuperación de contraseña a la siguiente dirección: " + correo + " ¿Desea continuar?",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#0c7cd5',
        confirmButtonText: '¡Sí, enviar!',
        cancelButtonText: '¡No, cancelar!',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: '/InicioSesion/RecuperarContraPost/',
                    method: "post",
                    dataType: "json",
                    data: {
                        Email: correo
                    },
                    success: function (data) {
                        if (data.success) {
                            swal({
                                type: 'success',
                                title: "¡Listo!",
                                text: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
                        } else {
                            swal({
                                type: 'error',
                                title: "¡Algo salió mal!",
                                text: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
                        }

                    },
                    error: function () {
                        swal({
                            title: "¡Algo salió mal!",
                            text: "¡Ha ocurrido un error al intentar recuperar la contraseña!",
                            type: "error",
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }, function () {
                            location.reload();
                        });
                    }
                });
            })
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};


function LoginA() {
    var correo = $('#EmailLogin').val();
    var pass = $('#PassLogin').val();
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    $.ajax({
        url: '/InicioSesion/Login/',
        method: "POST",
        dataType: "JSON",
        data: {
            Email: correo,
            Password: pass,
            __RequestVerificationToken: token
        },
        success: function (data) {
            console.log(data);
            if (data.success) {
                swal({
                    type: 'success',
                    title: "¡Listo!",
                    text: data.message,
                    allowOutsideClick: false,
                    confirmButtonColor: '#0c7cd5',
                    allowEscapeKey: false
                }).then(function () {

                })
            } else {
                swal({
                    type: 'error',
                    title: "¡Algo salió mal!",
                    text: data.message,
                    allowOutsideClick: false,
                    confirmButtonColor: '#0c7cd5',
                    allowEscapeKey: false
                }).then(function () {

                })
            }

        },
        error: function () {
            swal({
                title: "¡Algo salió mal!",
                text: "¡Ha ocurrido un error al intentar recuperar la contraseña!",
                type: "error",
                allowOutsideClick: false,
                confirmButtonColor: '#0c7cd5',
                allowEscapeKey: false
            }, function () {

            });
        }
    });

}


function eliminarCSRFEDI(url, id, nombre, c) {
    console.log(url);
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
                    dataType: "html",
                    data: {
                        __RequestVerificationToken: token,
                        id: id
                    },
                    success: function (data) {
                        console.log(data);
                        swal({
                            type: 'success',
                            title: '¡Registro eliminado!',
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }).then(function () {
                            if (c == "IndexDirectores") {
                                location.href = '/Profesores/IndexDirectores';
                            } else {
                                location.href = '/' + c + '/Index';
                            }

                        })
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
                            location.reload();
                        });
                    }
                });
            })
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};


function eliminar(url, id, nombre) {
    swal({
        title: '¿Desea eliminar el registro: ' + nombre + '?',
        text: "Esta acción no se podrá revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#0c7cd5',
        confirmButtonText: '¡Si, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: url + id,
                    method: "GET",
                    dataType: "html",
                    success: function (data) {

                        swal({
                            type: 'success',
                            title: '¡Registro eliminado!',
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }).then(function () {
                            location.reload();
                        })
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
                            location.reload();
                        });
                    }
                });
            })
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};

function eliminarEdit(url, id, nombre, c) {
    swal({
        title: '¿Desea eliminar el registro: ' + nombre + '?',
        text: "Esta acción no se podrá revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#0c7cd5',
        confirmButtonText: '¡Si, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: url + id,
                    method: "GET",
                    dataType: "html",
                    success: function (data) {

                        swal({
                            type: 'success',
                            title: '¡Registro eliminado!',
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }).then(function () {
                            location.href = '/' + c + '/Index';
                        })
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
                            location.reload();
                        });
                    }
                });
            })
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};

function AgregarProfesores(url, id) {
    swal({
        title: 'Submit your Github username',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    swal.showValidationError(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
        if (result.value) {
            swal({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
            })
        }
    })
};

function EviarProyecto(id, opcion, nombre) {


    var titulo = "";
    var texto = "";
    var url = "";
    console.log("iniciando...");
    if (opcion === '1') {
        console.log("opcion 1");
        titulo = '¿Está seguro que desea enviar el proyecto ' + nombre + ' a revisión?';
        url = "EnviarRevision";
        texto = "Al enviar no podrá modificar el proyecto";
        console.log("1...");

    } else if (opcion === '2') {
        titulo = '¿Está seguro que desea Aceptar el proyecto ' + nombre + '?';
        url = "EnviarAceptado";
        texto = "Al enviar no podrá modificar el proyecto";
        console.log("2...");

    } else if (opcion === '3') {
        titulo = '¿Está seguro que desea rechazar el proyecto ' + nombre + '?';
        url = "EnviarRechazado";
        texto = "";
        console.log("3...");
    }
    swal({
        title: titulo,
        text: texto,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#43A047',
        cancelButtonColor: '#0c7cd5',
        confirmButtonText: '¡Sí, Continuar!',
        cancelButtonText: '¡No, cancelar!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-default',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: "/Proyectos/" + url + "/" + id,
                    method: "GET",
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                        if (data.success) {
                            swal({
                                title: "",
                                text: data.message,
                                type: "success",
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            });
                        } else if (!data.success) {
                            swal({
                                title: "Importante",
                                text: data.message,
                                type: "warning",
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            });
                        }
                    },
                    error: function () {
                        swal({
                            title: "¡Algo salió mal!",
                            text: data.message,
                            type: "error",
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }, function () {
                            location.reload();
                        });
                    }
                });
            });
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    });
};

function restablecerContrasenas() {
    swal({
        title: 'Inicializar contraseñas',
        text: "Se cambiara las contraseña de los usuarios y se enviara un correo electrónico de confirmación de correo: ¿Desea continuar?",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#0c7cd5',
        cancelButtonColor: 'red',
        confirmButtonText: '¡Sí, enviar!',
        cancelButtonText: '¡No, cancelar!',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: '/Administrador/RestablecerContrasenas',
                    dataType: "json",
                    success: function (data) {
                        if (data.success) {
                            swal({
                                type: 'success',
                                title: "¡Listo!",
                                text: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
                        } else {
                            swal({
                                type: 'error',
                                title: "¡Hubo un error!",
                                text: data.message,
                                allowOutsideClick: false,
                                confirmButtonColor: '#0c7cd5',
                                allowEscapeKey: false
                            }).then(function () {
                                location.reload();
                            })
                        }
                       

                    },
                    error: function () {
                        swal({
                            title: "¡Algo salió mal!",
                            text: "¡Ha ocurrido un error al intentar modificar la contraseña!",
                            type: "error",
                            allowOutsideClick: false,
                            confirmButtonColor: '#0c7cd5',
                            allowEscapeKey: false
                        }, function () {
                            location.reload();
                        });
                    }
                });
            })
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
};

function deleteOff() {
    swal({
        title: "Importante",
        text: "No se puede eliminar el grupo, ya que cuenta con Profesores asignados",
        type: "warning",
        allowOutsideClick: false,
        confirmButtonColor: '#0c7cd5',
        allowEscapeKey: false
    });
};
function deleteEstudiantes() {
    swal({
        title: "Importante",
        text: "No se puede eliminar el grupo, ya que cuenta con estudiantes asignados",
        type: "warning",
        allowOutsideClick: false,
        confirmButtonColor: '#0c7cd5',
        allowEscapeKey: false
    });
};
function Logearse() {
    var correo = $('#Email').val();
    var contra = $('#Password').val();
    var recordar = false;
    $.ajax({

        method: "POST",
        dataType: 'json',
        url: '/InicioSesion/LoginAjax',
        data: {
            email: correo,
            password: contra,
            recordar: recordar
        },
        success: function (data) {
            if (data.success) {
                console.log("Acceso correcto");
                window.location.href = '/Home/Index';
            } else {
                swal({
                    title: data.title,
                    text: data.message,
                    type: "warning",
                    allowOutsideClick: false,
                    confirmButtonColor: '#0c7cd5',
                    allowEscapeKey: false
                }).then(function () {
                    window.location.reload();
                });
            }
        },
        error: function () {
            swal({
                title: "¡Acceso denegado!",
                text: "verifique su usuario y/o contraseña",
                type: "error",
                allowOutsideClick: false,
                confirmButtonColor: '#0c7cd5',
                allowEscapeKey: false
            }).then(function () {
                window.location.reload();
            });
        }
    });
}