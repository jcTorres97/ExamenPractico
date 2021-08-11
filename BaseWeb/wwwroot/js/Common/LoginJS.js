var validatorRecuperaPwd;

$(function () {
    validatorRecuperaPwd = $("#formRecuperaPwd").validate({
        lang: "es",
        errorPlacement: function (error, element) {
            $(element).closest("div").find(".text-danger").append(error);
        }
    });
});


$("#btnOlvidaste").on("click", function () {
    $("#loginContainer").hide();
    $("#recuperarPwdContainer").show();
});

$("#btnRegresarLogin").on("click", function () {
    $("#recuperarPwdContainer").hide();
    $("#loginContainer").show();
});

$("#btnRecuperarPwd").on("click", function () {
    if ($("#formRecuperaPwd").valid()) {
        $.ajax({
            data: {
                Email: $("#formRecuperaPwd input[name=email]").val()
            },
            title: 'Correo de confirmación enviado',
            type: 'POST',
            url: "/Account/ForgotPassword",
            dataType: 'json',
            beforeSend: function () {
                KApp.block('#recuperarPwdContainer', {});
            },
            success: function (data) {
                if (data.status) {
                    Swal.fire(
                        data.mensaje,
                        "Por favor, revise su correo electrónico para seguir con el proceso de recuperación de contraseña.",
                        'success'
                    );

                }
                else {
                    validatorRecuperaPwd.showErrors({
                        "email": data.mensaje
                    });
                }
                KApp.unblock('#recuperarPwdContainer');

            },
            error: function (ex) {
                Swal.fire(
                    'Error',
                    "Contacte a su administrador de sistema",
                    'error'
                );
                KApp.unblock('#recuperarPwdContainer');
            }
        });
    }

});

function mostrarPassword() {
    var cambio = document.getElementById("txtPassword");
    if (cambio.type == "password") {
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
        $('#show_password').attr('data-original-title', 'Ocultar contraseña');
    } else {
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
        $('#show_password').attr('data-original-title', 'Mostrar contraseña');
    }
}

function mostrarApi() {
    var cambio = document.getElementById("txtApi");
    if (cambio.type == "password") {
        cambio.type = "text";
        $('#ContrasenaApi').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
        $('#show_Api').attr('data-original-title', 'Ocultar Api');
    } else {
        cambio.type = "password";
        $('#ContrasenaApi').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
        $('#show_Api').attr('data-original-title', 'Mostrar Api');
    }
}

function mostrarContrasena() {
    var cambio = document.getElementById("txtContrasena");
    if (cambio.type == "password") {
        cambio.type = "text";
        $('#ContrasenaSMTP').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
        $('#show_Contrasena').attr('data-original-title', 'Ocultar contraseña');
    } else {
        cambio.type = "password";
        $('#ContrasenaSMTP').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
        $('#show_Contrasena').attr('data-original-title', 'Mostrar contraseña');
    }
}
