function promiseajax(superurl, supertype, superdata, superdatatype = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: superurl, type: supertype, data: superdata, dataType: superdatatype,
            success: data => {
                resolve(data)
            },
            error: error => {
                reject(error)
            },
        })
    })
}