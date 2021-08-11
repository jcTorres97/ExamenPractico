$.validator.addMethod("greaterThanDate", greaterThanDateValidation)
$.validator.addMethod("greaterEqualThanDate", greaterEqualThanDateValidation)

function greaterThanDateValidation(value, element, params) {
    const fechaInicio = toCoolDate($(params[0]).val())
    const fechaFin = toCoolDate(value)
    return fechaFin > fechaInicio
}


function greaterEqualThanDateValidation(value, element, params) {
    const fechaInicio = toCoolDate($(params[0]).val())
    const fechaFin = toCoolDate(value)
    return fechaFin >= fechaInicio
}

function toCoolDate(date){
    return new Date(date.split('/')[2], date.split('/')[1] - 1, date.split('/')[0])
}