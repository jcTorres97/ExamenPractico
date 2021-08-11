/**
 * Permite inicializar validaciones de la forma correcta
 * (de acuerdo a la plantilla, claro)
 * @param {*} superrules Un objeto para configurar cada validacion nueva
 */
$( document ).ready(function() {

  $("#form").validate({

    rules: superrules,

    errorElement: "div",
    wrapper: "div",
    errorPlacement: (error, element) => {
      $(element).closest(".form-group").find(".feed").append(error)
    },
    highlight: element => {
      if($(element).hasClass("k_selectpicker")){
        $(element).closest(".bootstrap-select").addClass("is-invalid")
      } else {
        $(element).addClass("is-invalid")
      }
    },
    unhighlight: element => {
      if($(element).hasClass("k_selectpicker")){
        $(element).closest(".bootstrap-select").removeClass("is-invalid")
      } else {
        $(element).removeClass("is-invalid")
      }
    },

  })

});