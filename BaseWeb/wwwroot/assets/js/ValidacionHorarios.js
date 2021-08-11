
    $(".verify").change(function (event) {

        var dia = jQuery(this).find('.combo1').val();
        var horaInicio = jQuery(this).find('.combo2').val();
        var horaFin = jQuery(this).find('.combo3').val();
        var idDisenoHorario = jQuery(this).find('.comboId').val();
        var idHorario = jQuery(this).find('.comboIdHorario').val();

        var diaCombo = jQuery(this).find('.combo1').attr("name");

        var horaICombo = jQuery(this).find('.combo2').attr("name");
        var horaFinCombo = jQuery(this).find('.combo3').attr("name");
        console.log(diaCombo);
        $.ajax({
            url: '/DisenoHorarioMateria/ExisteHorario/',
            data: { IdDia: dia, IdHoraInicio: horaInicio, IdHoraFin: horaFin, IdDisenoHorario: idDisenoHorario, IdHorario: idHorario },
            type: 'POST',
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    pass = result.message;
                    document.getElementsByName(diaCombo)[0].style.borderColor = "red";
                    document.getElementsByName(horaICombo)[0].style.borderColor = "red";
                    document.getElementsByName(horaFinCombo)[0].style.borderColor = "red";
                    //$(".error-" + idDisenoHorario).removeAttr("hidden","hidden");
                    $(".error-" + idDisenoHorario).show(800);
                } else {
                    document.getElementsByName(diaCombo)[0].style.borderColor = null;
                    document.getElementsByName(horaICombo)[0].style.borderColor = null;
                    document.getElementsByName(horaFinCombo)[0].style.borderColor = null;
                    //$(".error-" + idDisenoHorario).attr("hidden", "hidden");
                    $(".error-" + idDisenoHorario).hide(800);
                }

            },
            error: function (result) {
                console.log(result.msj);
            }

        });

    });