// Class definition
var KWizardDemo = function () {
    // Base elements
    var wizardEl;
    var formEl;
    var validator;
    var wizard;
    
    // Private functions
    var initWizard = function () {
        // Initialize form wizard
        wizard = new KWizard('k_wizard_v2', {
            startStep: 1,
        });

        // Validation before going to next page
        wizard.on('beforeNext', function(wizardObj) {
            if (validator.form() !== true) {
                wizardObj.stop();  // don't go to the next step
            }
        })

        // Change event
        wizard.on('change', function(wizard) {
            KUtil.scrollTop();    
        });
    }

    var initValidation = function() {
        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",

            // Validation rules
            rules: {
                //= Client Information(step 1)
                'jsonCarreras': {
                    required: true
                },
                    'Estadop': {
                    required: true
                },
                'Aspirante.Nombre': {
                    required: true
                }, 
                'Aspirante.ApellidoPaterno': {
                    required: true
                },
                CURP: {
                    required: true,
                    regex: "^.*(?=.{18})(?=.*[0-9])(?=.*[A-Za-zñÑ]).*$"
                }, 
                'Aspirante.Genero': {
                    required: true
                }, 
                'Aspirante.FechaNacimiento': {
                    required: true
                },
                'Aspirante.EstadoCivil': {
                    required: true
                }, 
                'Aspirante.Nacionalidad': {
                    required: true
                },
                Email: {
                    required: true,
                    regex: "^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                },
                'Aspirante.Email': {
                    regex: "^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                },
                'Aspirante.MotivoPreferencia': {
                    required: true
                },
                'Aspirante.LugarNacimiento': {
                    required: true
                },
                'Aspirante.Municipio': {
                    required: true
                },
                'Aspirante.Estado': {
                    required: true
                },
                'Aspirante.Pais': {
                    required: true
                },
                'Aspirante.IdEscuelaOrigen': {
                    required: true
                },
                'Aspirante.EscuelaUniversidadOrigen': {
                    required: true
                },
                LugarNacimiento: {
                    required: true
                },
                Pais: {
                    required: true
                },
                Municipio: {
                    required: true
                },
                Estado: {
                    required: true
                },
                //= Client Information(step 2)
                // Profile Details
                address1: {
                    required: true,
                },
                address2: {
                    required: true,
                }, 
                // Mailing Address
                city: {
                    required: true,
                }, 
                zip: {
                    required: true,
                }, 
                state: {
                    required: true,
                }, 
                country: {
                    required: true,
                }, 

                //= Client Information(step 3)
                // Company Details
                company_name: {
                    required: true,
                }, 
                company_id: {
                    required: true,
                }, 
                company_email: {
                    required: true,
                }, 
                company_tel: {
                    required: true,
                },               
                'account_communication[]': {
                    required: true
                },

                //= Client Information(step 4)
                // Billing Information
                billing_card_name: {
                    required: true
                },
                billing_card_number: {
                    required: true,
                    creditcard: true
                },
                billing_card_exp_month: {
                    required: true
                },
                billing_card_exp_year: {
                    required: true
                },
                billing_card_cvv: {
                    required: true,
                    minlength: 2,
                    maxlength: 3
                },
               

                //= Confirmation(step 5)
                accept: {
                    required: true
                }
            },

            // Validation messages
            messages: {
                'account_communication[]': {
                    required: 'You must select at least one communication option'
                },
                accept: {
                    required: "You must accept the Terms and Conditions agreement!"
                },
                'jsonCarreras': {
                    required: "Por favor complete la lista de carreras de inter&eacute;s"
                },
                'Aspirante.Nombre': {
                    required: "El campo Nombre es requerido"
                },
                'Aspirante.ApellidoPaterno': {
                    required: "El campo Apellido Paterno es requerido"
                },
                CURP: {
                    required: "El campo CURP es requerido",
                    regex: "Verifique el formato del CURP"
                },
                'Aspirante.Genero': {
                    required: "El campo Genero es requerido"
                },
                'Aspirante.FechaNacimiento': {
                    required: "El campo Fecha de nacimiento es requerido"
                },
                'Aspirante.EstadoCivil': {
                    required: "El campo Estado civil es requerido"
                },
                'Aspirante.Nacionalidad': {
                    required: "El campo Nacionalidad es requerido"
                },
                Email: {
                    required: "El campo Correo electronico es requerido",
                    regex: "Por favor, ingrese una direcci\u00F3n de correo electr\u00F3nico"
                },
                'Aspirante.MotivoPreferencia': {
                    required: "El campo motivo preferencia es requerido"
                },
                'Aspirante.Email': {
                    regex: "Por favor, ingrese una direcci\u00F3n de correo electr\u00F3nico"
                },
                'Aspirante.LugarNacimiento': {
                    required: "El campo Lugar de nacimiento es requerido"
                },
                'Aspirante.Municipio': {
                    required: "El campo Municipio es requerido"
                },
                'Aspirante.Estado': {
                    required: "El campo Estado es requerido"
                },
                'Aspirante.Pais': {
                    required: "El campo Pais es requerido"
                },
                'Aspirante.IdEscuelaOrigen': {
                    required: "El campo Nombre de la Escuela Preparatoria es requerido"
                },
                'Aspirante.EscuelaUniversidadOrigen': {
                    required: "El campo Nombre de la Universidad es requerido"
                },
                LugarNacimiento: {
                    required: "El campo Lugar de nacimiento es requerido"
                },
                Pais: {
                    required: "El campo Pais es requerido"
                },
                Municipio: {
                    required: "El campo Municipio es requerido"
                },
                Estado: {
                    required: "El campo Estado es requerido"
                },
            },
            
            // Display error  
            invalidHandler: function(event, validator) {     
                KUtil.scrollTop();

                swal({
                    "title": "", 
                    "text": "Para continuar con el registro, favor de verificar que todos los campos requeridos esten completos.", 
                    "type": "error",
                    "confirmButtonClass": "btn btn-secondary m-btn m-btn--wide",
                    "confirmButtonText": "Regresar"
                });
            },

            // Submit valid form
            submitHandler: function (form) {
                
            }
        });   
    }

    var initSubmit = function() {
        var btn = formEl.find('[data-kwizard-action="action-submit"]');

        btn.on('click', function(e) {
            e.preventDefault();

            if (validator.form()) {
                // See: src\js\framework\base\app.js
                mApp.progress(btn);
                //mApp.block(formEl); 

                // See: http://malsup.com/jquery/form/#ajaxSubmit
                formEl.ajaxSubmit({
                    success: function() {
                        mApp.unprogress(btn);
                        //mApp.unblock(formEl);

                        swal({
                            "title": "", 
                            "text": "Registro realizado con exito", 
                            "type": "success",
                            "confirmButtonClass": "btn btn-secondary",
                            "confirmButtonText": "Aceptar"

                        });
                    }
                });
            }
        });
    }

    return {
        // public functions
        init: function() {
            wizardEl = KUtil.get('k_wizard_v2');
            formEl = $('#k_form');

            initWizard(); 
            initValidation();
            initSubmit();
        }
    };
}();

jQuery(document).ready(function() {    
    KWizardDemo.init();
});