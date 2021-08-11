
var pagefunction = function () {
    console.log("iniciando...");

    /*jslint smarttabs:true */
    // Night
    var nightvision_style = [
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }, {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }, {
            "featureType": "poi.park",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#d3d3d3"
                }, {
                    "visibility": "on"
                }
            ]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }, {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "on"
                }, {
                    "hue": "#0008ff"
                }, {
                    "lightness": -75
                }, {
                    "saturation": 10
                }
            ]
        }, {
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#1f1d45"
                }
            ]
        }, {
            "featureType": "landscape.natural",
            "stylers": [
                {
                    "color": "#1f1d45"
                }
            ]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }, {
                    "color": "#01001f"
                }
            ]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                }, {
                    "color": "#e7e8ec"
                }
            ]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }, {
                    "color": "#151348"
                }
            ]
        }, {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                }, {
                    "color": "#f7fdd9"
                }
            ]
        }, {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }, {
                    "color": "#01001f"
                }
            ]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }, {
                    "color": "#316694"
                }
            ]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }, {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#1a153d"
                }
            ]

        }
    ];

    var n = document.querySelector("#Direccion_CP");
    
    var c = document.querySelector("#Direccion_Colonia");
    var d = document.querySelector("#Direccion_Ciudad");
    var e = document.querySelector("#Direccion_Calle");
    var mu = document.querySelector("#Direccion_Municipio");
   var es = document.querySelector("#Direccion_Estado");
    //var ca = document.querySelector("#Direccion_Colonia").value;

    var lt = document.querySelector("#Direccion_Latitud");
    var lg = document.querySelector("#Direccion_Longitud");
    var an = document.querySelector("#Andromeda");
   
    var edit = false;

    var markers = [];
    var marker = {};
    var position;

    /*
     * Google Maps Initialize
     */
    var geocoder;
    $this = $("#map_canvas3");
    $zoom_level = ($this.data("gmap-zoom") || 5);
    //GEO-POSITION
    $data_lat = ($this.data("gmap-lat") || 29.895883);
    $data_lng = ($this.data("gmap-lng") || -80.650635);
    $xml_src = ($this.data("gmap-src") || "/xml/gmap/pins.xml");
    //Bindings
    map = $this;

    //Two Styles
    var nightvisionStyleMap = new google.maps.StyledMapType(nightvision_style,
        {
            name: "Nightvision"
        });

    // Nigth Version
    // Pass Geoposition to center the gmap

    var LatLng = {};


        function userGeolocation() {
            // Try HTML5 geolocation.
            var infoWindow = new google.maps.InfoWindow({ map: map });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('El usuario se encuentra aquí');
                    map.setCenter(pos);
                }, function () {
                    var pos = {
                        lat: 19.7590624,
                        lng: -88.7245752
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('El usuario se encuentra aquí');
                    map.setCenter(pos);
                    //handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                var pos = {
                    lat: 19.7590624,
                    lng: -88.7245752
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('El usuario se encuentra aquí');
                map.setCenter(pos);
                // Browser doesn't support Geolocation
                //handleLocationError(false, infoWindow, map.getCenter());
            }
        }

    function init() {

        console.log("mapa inicido");
        var mapOptions = {
            center: new google.maps.LatLng(19.432608, -99.133209),
            zoom: 15,
        };

        //Init Geocoder
        geocoder = new google.maps.Geocoder();       
        map = new google.maps.Map(document.getElementById('map_canvas3'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 15
        });

        /*
        SKIN Map option
        */

        //map.mapTypes.set('nightvision_style', nightvisionStyleMap);
        //map.setMapTypeId('nightvision_style');

        if (lt.value && lg.value) {

            console.log("{Reubicando}", lt + lg);
            //mapOptions.center = new google.maps.LatLng(parseFloat(lt.value), parseFloat(lg.value));
            map = new google.maps.Map(document.getElementById('map_canvas3'), {
                zoom: 20,
                center: { lat: parseFloat(lt.value), lng: parseFloat(lg.value) }
            });

            var pos = {
                lat: parseFloat(lt.value),
                lng: parseFloat(lg.value)
            };

            marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Posición',
                draggable: true,
            });
            markers.push(marker);

        } else {
            console.log("{Ubicando al usuario}");

            userGeolocation();
        }
    }

    init();

    

    function obtenerMapa(codigoPostal) {

        geocoder.geocode({
            componentRestrictions: {
                country: 'MX',
                postalCode: codigoPostal
            }
        }, function (results, status) {
            //console.log("status?? " + status);

            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                createMarker(results[0].geometry, 'postal_code');

            } else {

                if (status == 'ZERO_RESULTS') {
                    console.log('No se encontraron resultados de la busqueda ');
                } else if (status == 'OVER_QUERY_LIMIT') {
                    console.log('Se excedio la cuota de busqueda ');
                } else if (status == 'REQUEST_DENIED') {
                    console.log("Google Maps Rechazo tu solicitud");
                }
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }


    function transition(event) {
        lat = event.lat();
        lng = event.lng();
        lt.value = lat;
        lg.value = lng;
        fillFormbyAddress(lat, lng);
        //Inverse Geocoder
    }


    function fillFormbyAddress(latStr, lngStr) {
        var latlng = { lat: parseFloat(latStr), lng: parseFloat(lngStr) };

        console.log("Coordenadas obtenenidas en");

        geocoder.geocode({
            'location': latlng
        }, function (results, status) {
            if (status == 'OK') {
                //Address_Components[]
                var address_components = results[0].address_components;
                for (index = 0; index < address_components.length; ++index) {
                    var obj = {};
                    var tipo = results[0].address_components[index].types;
                    for (ind = 0; ind < tipo.length; ++ind) {
                        obj[ind] = tipo[ind];
                    }
                    //console.log("tipo: " + obj[0] + "->" + address_components[index].long_name);
                    if (obj[0] == 'route') {
                        //e.value = address_components[index].long_name;
                    } else if (obj[0] == 'locality') {
                       // d.value = address_components[index].long_name;// ---------------------------------
                    } else if (obj[0] == 'administrative_area_level_2') {
                        //console.log("municipio:" + address_components[index].long_name);
                        //mu.value = address_components[index].long_name;
                    } else if (obj[0] == 'administrative_area_level_1') {
                        //es.value = address_components[index].long_name;
                    } else if (obj[0] == 'postal_code') {
                        //n.value = address_components[index].long_name;
                        //if (n.value.length > 0)
                        //    LoadColoniasCombombox(n.value);
                    }

                }

            } else {

                if (status == 'ZERO_RESULTS') {
                    console.log('No se encontraron resultados de la busqueda ');

                } else if (status == 'OVER_QUERY_LIMIT') {

                    console.log('Se excedio la cuota de busqueda ');

                } else if (status == 'REQUEST_DENIED') {

                    console.log("Google Maps Rechazo tu solicitud");
                }
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }


    function createMarker(event, type) {

        var latLng = { "lat": "", "lng": "" };

        if (type == 'postal_code') {
            latLng.lat = event.location.lat();
            latLng.lng = event.location.lng();
        } else {

            latLng.lat = event.latLng.lat();
            latLng.lng = event.latLng.lng();
        }

        if (markers.length > 0) {
            clearMarkers();
            marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: 'Posición',
                draggable: true,
            });
            markers.push(marker);
        } else {
            clearMarkers();
            marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: 'Posición',
                draggable: true,
            });
            markers.push(marker);
        }

        lt.value = latLng.lat;
        lg.value = latLng.lng;

        console.log("{Coordenadas}", lt.value + lg.value);

        fillFormbyAddress(latLng.lat, latLng.lng);

        google.maps.event.addListener(marker, 'dragend', function (event) {
            position = event.latLng;
            transition(position);
        });
    }

    google.maps.event.addListener(map, 'click', function (event) {
        createMarker(event, 'drag');

    });

    // se guardan en memoria los markers
    function setMapOnAll(map) {
        console.log("Markers", markers.length);
        for (var i = 1; i <= markers.length; i++) {
            markers[i-1].setMap(map);
        }
        marker = [];
    }


    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }


    //By Edit View
    if (n.value.length > 0) {
        console.log("-----Pre-charge------");
        edit = true;
        LoadColoniasCombombox(n.value);
    } else { //no hay codigo postal pero por alguna razon si hay colonia
        var $Colonia = $("#Direccion_Colonia");
        var colonia = document.getElementById("Coloniaxd").value;
        if (colonia != null && colonia != "Seleccione una colonia") {
            $Colonia.find('option')
                .remove()
                .end()
                .append('<option value="' + colonia + '">' + colonia + '</option>')
                .val(colonia);
        }
    }

    function clearForm() {
        e.value = "";
        d.value = "";
    };


    n.addEventListener("input", function (e) {
        var r = n.value;
        console.log("Listen", r);
        if (r.length > 4) {
            edit = false;
            LoadColoniasCombombox(r);
            obtenerMapa(r);
            clearForm();
        } else {
            mu.readOnly = false;
            es.readOnly = false;
            d.readOnly = false;
        }
    }, false);

    n.addEventListener("change", function (e) {
    }, false);
    var bandera = false;
    n.addEventListener("onchange", function (e) {
        bandera = true;
    }, false);

    

    function LoadColoniasCombombox(codigoPostal) {
        datos = {};
        urlDireccion = 'https://direcciones.ozelot.it/api/DireccionAPI/' + codigoPostal;
        //console.log("codigoPostal enviado 1:" + codigoPostal);
        //console.log("url enviado 1:" + urlDireccion);

        $(document).ready(function () {
            var $Colonia = $("#Direccion_Colonia");
            var colonia = document.getElementById("Coloniaxd").value;
            
            KApp.block('#loader_direccion', {
                overlayColor: "#000000",
                type: "v2",
                state: "primary",
                message: "Buscando..."
            });
            //$("#loader_direccion").show();
            $.getJSON(urlDireccion, datos)
                .done(function (responseDirecciones) {
                    //console.log(bandera);
                    //console.log(" bandera edit 1 " + edit);

                    if (!edit) {
                        //console.log(responseDirecciones.municipio + " municipio");

                        if (responseDirecciones.municipio != "Sin municipio" && responseDirecciones.municipio != null) {
                            mu.value = responseDirecciones.municipio;
                            mu.readOnly = true;
                        } else {
                            mu.value = "";
                            mu.readOnly = false;
                        }
                        //console.log(responseDirecciones.estado + " estado");

                        if (responseDirecciones.estado != "Sin estado" && responseDirecciones.estado != null) {
                            es.value = responseDirecciones.estado;
                            es.readOnly = true;
                        } else {
                            es.value = "";
                            es.readOnly = false;
                        }
                        //console.log(responseDirecciones.ciudad + " ciudad");

                        if (responseDirecciones.ciudad != "Sin ciudad") {
                            d.value = responseDirecciones.ciudad;
                            d.readOnly = true;
                        } else {
                            d.value = "";
                            d.readOnly = false;
                        }
                    } else {
                        //console.log(responseDirecciones.municipio + " municipio");
                        if (responseDirecciones.municipio != "Sin municipio" && responseDirecciones.municipio != null) {
                            mu.readOnly = true;
                        } else {
                            mu.readOnly = false;
                        }
                        //console.log(responseDirecciones.estado + " estado");

                        if (responseDirecciones.estado != "Sin estado" && responseDirecciones.estado != null) {
                            es.readOnly = true;
                        } else {
                            es.readOnly = false;
                        }
                        //console.log(responseDirecciones.ciudad + " ciudad");

                        if (responseDirecciones.ciudad != "Sin ciudad") {
                            d.readOnly = true;
                        } else {
                            d.readOnly = false;
                        }
                    }

                    if (bandera == false) {
                        //console.log("respuesta equis"+responseDirecciones);
                        console.log(responseDirecciones);
                        //d.value = ciudad;

                        $Colonia.find('option')
                            .remove()
                            .end()
                            .append('<option value="' + colonia + '">' + colonia + '</option>')
                            .val(colonia);
                    } else {
                                        console.log(responseDirecciones);
                                    $Colonia.find('option')
                                        .remove()
                                        .end()
                                        .append('<option value="Selecciona una colonia">Selecciona una colonia</option>')
                                        .val('Selecciona una colonia');
                    }

                    if (responseDirecciones.colonias != null) {

                        for (var i = 0; i < responseDirecciones.colonias.length; i++) {

                            if (an) {
                                if (an.value == responseDirecciones.colonias[i]) {
                                    $Colonia.append("<option value='" + responseDirecciones.colonias[i] + "' selected>" + responseDirecciones.colonias[i] + "</option>");
                                } else {
                                    console.log("Add");
                                    $Colonia.append("<option value='" + responseDirecciones.colonias[i] + "'>" + responseDirecciones.colonias[i] + "</option>");
                                }
                            } else {


                                $Colonia.append("<option value='" + responseDirecciones.colonias[i] + "'>" + responseDirecciones.colonias[i] + "</option>");
                            }
                        }
                    }
                })
                .fail(function (jqXHR, textStatus, err) {
                    //$('#KUNDE').text('Error: ' + err);
                    KApp.unblock('#loader_direccion');
                })
                .always(function () {
                    //$("#loader_direccion").hide();
                    KApp.unblock('#loader_direccion');
                });



            //$.getJSON(url, datos, function (response) {

            //    //let timerInterval
            //    //Swal.fire({
            //    //    title: 'Agregando materia!',
            //    //    confirmButtonClass: 'btn btn-outline-brand btn-pill',
            //    //    confirmButtonText: 'Espere unos segundos por favor...',
            //    //    timer: 2000,
            //    //    onBeforeOpen: () => {
            //    //        Swal.showLoading()
            //    //        timerInterval = setInterval(() => {

            //    //        }, 100)
            //    //    },
            //    //    onClose: () => {
            //    //        clearInterval(timerInterval)
            //    //    }
            //    //}).then((result) => {
            //    //    if (
            //    //        // Read more about handling dismissals
            //    //        result.dismiss === Swal.DismissReason.timer
            //    //    ) {
            //    //        console.log('I was closed by the timer')
            //    //    }
            //    //})


            //    console.log(bandera);
            //    //console.log(response.municipio + "  municipio");
            //    if (response.municipio != "Sin municipio" && response.municipio != null) {
            //        mu.value = response.municipio;
            //        mu.readOnly = true;
            //    } else {
            //        mu.value = "";
            //        mu.readOnly = false;
            //    }

            //    if (response.estado != "Sin estado" && response.estado != null) {
            //        es.value = response.estado;
            //        es.readOnly = true;
            //    } else {
            //        es.value = "";
            //        es.readOnly = false;
            //    }

            //    if (response.ciudad != "Sin ciudad") {
            //        d.value = response.ciudad;
            //        d.readOnly = true;
            //    } else {
            //        d.value = "";
            //        d.readOnly = false;
            //    }

            //    if (bandera == false) {
            //        console.log(response);
            //        $Colonia.find('option')
            //            .remove()
            //            .end()
            //            .append('<option value="' + colonia + '">' + colonia + '</option>')
            //            .val(colonia);
            //    } else {
            //                     console.log(response);
            //                    $Colonia.find('option')
            //                        .remove()
            //                        .end()
            //                        .append('<option value="Selecciona una colonia">Selecciona una colonia</option>')
            //                        .val('Selecciona una colonia');
            //    }
               

            //    for (var i = 0; i < response.colonias.length; i++) {

            //        if (an) {
            //            if (an.value == response.colonias[i]) {
            //                $Colonia.append("<option value='" + response.colonias[i] + "' selected>" + response.colonias[i] + "</option>");
            //            } else {
            //                console.log("Add");
            //                $Colonia.append("<option value='" + response.colonias[i] + "'>" + response.colonias[i] + "</option>");
            //            }
            //        } else {
                        

            //            $Colonia.append("<option value='" + response.colonias[i] + "'>" + response.colonias[i] + "</option>");
            //        }
            //    }
            //});
        });
    }
};
