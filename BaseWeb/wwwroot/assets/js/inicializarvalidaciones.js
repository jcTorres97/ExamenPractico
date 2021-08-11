$(document).ready(() => {

  const coolrules = typeof rules === "undefined" || !rules ? {} : rules;

  inicializarvalidaciones(coolrules)

})

/**
 * Permite inicializar validaciones de la forma correcta
 * (de acuerdo a la plantilla, claro)
 * @param {*} superrules Un objeto para configurar cada validacion nueva
 */
function inicializarvalidaciones(superrules = null){

  $("#form").validate({

    rules: superrules,

    errorElement: "div",
    wrapper: "div",
    errorPlacement: (error, element) => {
      $(element).closest(".validate").find(".invalid-feedback").append(error)

    },
    highlight: element => {
      $(element).addClass("is-invalid")

    },
    unhighlight: element => {
      $(element).removeClass("is-invalid")
    }

  })

}