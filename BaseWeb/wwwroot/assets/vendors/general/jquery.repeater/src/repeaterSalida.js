$.fn.repeaterVal = function () {
    var parse = function (raw) {
        var parsed = [];

        foreach(raw, function (val, key) {
            var parsedKey = [];
            if (key !== "undefined") {
                parsedKey.push(key.match(/^[^\[]*/)[0]);
                parsedKey = parsedKey.concat(map(
                    key.match(/\[[^\]]*\]/g),
                    function (bracketed) {
                        return bracketed.replace(/[\[\]]/g, '');
                    }
                ));

                parsed.push({
                    val: val,
                    key: parsedKey
                });
            }
        });

        return parsed;
    };

    var build = function (parsed) {
        if (
            parsed.length === 1 &&
            (parsed[0].key.length === 0 || parsed[0].key.length === 1 && !parsed[0].key[0])
        ) {
            return parsed[0].val;
        }

        foreach(parsed, function (p) {
            p.head = p.key.shift();
        });

        var grouped = (function () {
            var grouped = {};

            foreach(parsed, function (p) {
                if (!grouped[p.head]) {
                    grouped[p.head] = [];
                }
                grouped[p.head].push(p);
            });

            return grouped;
        }());

        var built;

        if (/^[0-9]+$/.test(parsed[0].head)) {
            built = [];
            foreach(grouped, function (group) {
                built.push(build(group));
            });
        }
        else {
            built = {};
            foreach(grouped, function (group, key) {
                built[key] = build(group);
            });
        }

        return built;
    };

    return build(parse($(this).inputVal()));
};

$.fn.repeater = function (fig) {
    fig = fig || {};

    var setList;

    $(this).each(function () {

        var $self = $(this);

        var show = fig.show || function () {
            $(this).show();
        };

        var hide = fig.hide || function (removeElement) {
            removeElement();
        };

        var $list = $self.find('[data-repeater-list]').first();

        var $filterNested = function ($items, repeaters) {
            return $items.filter(function () {
                return repeaters ?
                    $(this).closest(
                        pluck(repeaters, 'selector').join(',')
                    ).length === 0 : true;
            });
        };

        var $items = function () {
            return $filterNested($list.find('[data-repeater-item]'), fig.repeaters);
        };

        var $itemTemplate = $list.find('[data-repeater-item]')
            .first().clone().hide();

        var $firstDeleteButton = $filterNested(
            $filterNested($(this).find('[data-repeater-item]'), fig.repeaters)
                .first().find('[data-repeater-delete]'),
            fig.repeaters
        );

        if (fig.isFirstItemUndeletable && $firstDeleteButton) {
            $firstDeleteButton.remove();
        }

        var getGroupName = function () {
            var groupName = $list.data('repeater-list');
            return fig.$parent ?
                fig.$parent.data('item-name') + '[' + groupName + ']' :
                groupName;
        };

        var initNested = function ($listItems) {
            if (fig.repeaters) {
                $listItems.each(function () {
                    var $item = $(this);
                    //console.log($item);
                    foreach(fig.repeaters, function (nestedFig) {
                        $item.find(nestedFig.selector).repeater(extend(
                            nestedFig, { $parent: $item }
                        ));
                    });
                });
            }
        };

        var $foreachRepeaterInItem = function (repeaters, $item, cb) {
            if (repeaters) {
                foreach(repeaters, function (nestedFig) {
                    cb.call($item.find(nestedFig.selector)[0], nestedFig);
                });
            }
        };

        var $nuevoElemento = function (index) {
            var UrlMaterial = '/Stock/ObtenerArticulosEnStockPorBusquedaAsincrona/';
            $('select[name="salida[' + index + '].IdArticulo"]').select2({
                placeholder: 'Buscar artículo por Nombre...',
                minimumInputLength: 3,
                theme: 'bootstrap',
                allowClear: true,
                language: {
                    inputTooShort: function () {
                        return "Por favor, introduzca 3 o más caracteres";
                    },
                    noResults: function (params) {
                        return "No se encontraron resultados";
                    }
                },
                ajax: {
                    url: UrlMaterial,
                    delay: 1500,
                    dataType: 'json',
                    data: function (params) {
                        var query = {
                            term: params.term
                        }
                        return query;
                    },
                    processResults: function (data) {
                        //console.log(data);
                        var dataFinal = [];
                        var valorSelectComponente = $('#IdComponente_' + index + '').val();//componente del articulo que se esta buscando
                        var valorSelectComponenteIntActivo = parseInt(valorSelectComponente);

                        var listaObjetos = [];
                        //Obtener todos los  idArticulos donde el componente sea el mismo que se selecciono
                        $("[name*=IdArticulo]").each(function (index2, item) {
                            var valorSelect = $('#IdArticulo_' + index2 + '').val();
                            var valorSelectC = $('#IdComponente_' + index2 + '').val();
                            var valorSelectComponenteIntG = parseInt(valorSelectC);

                            if (valorSelect != null && valorSelectComponenteIntActivo == valorSelectComponenteIntG) {
                                var valorselectIdArticuloInt = parseInt(valorSelect);
                                listaObjetos.push(valorselectIdArticuloInt);
                            }

                        });
                        // se filta los datos que no esten seleccionados 
                        if (listaObjetos.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                if (listaObjetos.includes(data[i].id)) {
                                    //console.log("Ya esta ocupado");
                                } else {
                                    dataFinal.push(data[i]);
                                }
                            }
                        } else {
                            for (var i = 0; i < data.length; i++) {
                                dataFinal.push(data[i]);
                            }
                        }

                        return {
                            results: dataFinal
                        };
                    }
                }
            }).on('select2:select', function (event) {

                var datos = event.params.data;
                $('input[name="salida[' + index + '].Cantidad"]').attr({
                    "max": datos.stock,
                    "placeholder": `${datos.stock} en stock`
                });
                $('input[name="unidad[' + index + ']"]').empty();
                $('input[name="unidad[' + index + ']"]').append(datos.unidad);
                $('input[name="spamCantidad[' + index + ']"]').empty();
                $('input[name="spamCantidad[' + index + ']"]').append(`(${datos.stock} en stock)`);
            });


            $('#IdArticulo_' + index + '').change(function () {
                var idArticuloS = $('#IdArticulo_' + index + '').val();
                var idComponenteS = $('#IdComponente_' + index + '').val();

                if (idArticuloS != null && idComponenteS != null && idArticuloS != '' && idComponenteS != '') {
                    $.ajax({
                        url: '/Stock/ValidarCuantificacionSalida/?idComponente=' + idComponenteS + "&idArticulo=" + idArticuloS,
                        method: "GET",
                        traditional: true,
                        contentType: 'application/json',
                        success: function (result) {
                            if (result.cuantificacion || result.salida) {
                                $('#detalleBtn_' + index + '').show();
                                $('#sinCuntificacionDiv_' + index + '').hide();
             
                            } else {
                                $('#sinCuntificacionDiv_' + index + '').show();
                                $('#detalleBtn_' + index + '').hide();


                            }

                        },
                        error: function (result) {
                        }
                    });


                } else {
                    $('#sinCuntificacionDiv_' + index + '').hide();
                    $('#detalleBtn_' + index + '').hide();
                }


            });



            $('#IdComponente_' + index + '').change(function () {
                var idArticuloS = $('#IdArticulo_' + index + '').val();
                var idComponenteS = $('#IdComponente_' + index + '').val();

                if (idArticuloS != null && idComponenteS != null && idArticuloS != '' && idComponenteS != '') {
                    $.ajax({
                        url: '/Stock/ValidarCuantificacionSalida/?idComponente=' + idComponenteS + "&idArticulo=" + idArticuloS,
                        method: "GET",
                        traditional: true,
                        contentType: 'application/json',
                        success: function (result) {
                            if (result.cuantificacion || result.salida) {
                                $('#detalleBtn_' + index + '').show();
                                $('#sinCuntificacionDiv_' + index + '').hide();

                            } else {
                                $('#sinCuntificacionDiv_' + index + '').show();
                                $('#detalleBtn_' + index + '').hide();


                            }

                        },
                        error: function (result) {
                        }
                    });


                } else {
                    $('#sinCuntificacionDiv_' + index + '').hide();
                    $('#detalleBtn_' + index + '').hide();
                }


            });

            var idproyecto = $("#IdProyectoS").val();
            $.ajax({
                url: '/Stock/ObtenerComponentes/?idProyecto=' + idproyecto,
                method: "GET",
                traditional: true,
                contentType: 'application/json',
                success: function (result) {
                    $('select[name="salida[' + index + '].IdComponente"]').empty()
                        .append('<option value="">Seleccione una opción</option>');
                    $('select[name="salida[' + index + '].IdComponente"]').select2({
                        placeholder: 'Buscar componente por Nombre...',
                        minimumInputLength: 0,
                        theme: 'bootstrap',
                        allowClear: true,
                        language: {
                            inputTooShort: function () {
                                return "Por favor, introduzca 3 o más caracteres";
                            },
                            noResults: function (params) {
                                return "No se encontraron resultados";
                            }
                        },
                    });
                    $.each(result, function (i, item) {
                        $('select[name="salida[' + index + '].IdComponente"]').append($('<option>', {
                            value: item.id,
                            text: item.valor
                        }));
                    });
                }
            });

            $('#detalleBtn_' + index + '').on("click", function () {
                var idArticuloS = $('#IdArticulo_' + index + '').val();
                var idComponenteS = $('#IdComponente_' + index + '').val();
                $.ajax({
                    url: '/Stock/ObtenerListaProductoProyectoCrear/?idComponente=' + idComponenteS + "&idArticulo=" + idArticuloS,
                    method: "GET",
                    traditional: true,
                    contentType: 'application/json',
                    success: function (result) {
                        $('#contenidoModal').empty();
                        $('#contenidoModal').append(result);
                    },
                    error: function (result) {
                        console.log(result.msj);
                    }
                });
            });
    

        }
        var estatusAgregar = true;
        var setIndexes = function ($items, groupName, repeaters) {
            var total = $items.length - 1;
            $items.each(function (index) {
                var $item = $(this);
                $item.data('item-name', groupName + '[' + index + ']');

                $filterNested($item.find('[id]'), repeaters).each(function () {
                    var $input = $(this);
                    var nombreFinal = "";
                    var nombre = $input.attr('id');

                    if (nombre.includes("DetalleSalidaDiv") || nombre.includes("sinCuntificacionDiv") || nombre.includes("detalleBtn") || nombre.includes("renderizado") || nombre.includes("detalleBtnOcultar")) {
                        var nameLim = nombre.split("_")[0];

                        $input.attr('id', nameLim + "_" + index);

                    }

                });


                $filterNested($item.find('[name]'), repeaters).each(function () {
                    var $input = $(this);
                    // match non empty brackets (ex: "[foo]")
                    var matches = $input.attr('name').match(/\[[^\]]+\]/g);
                    $('.custom-file-input').on('change', function () {
                        var fileName = $(this).val();
                        $(this).next('.custom-file-label').addClass("selected").html(fileName);
                    });
                    var name = $input.attr('name');
                    var nameLim = name.split("[")[0];
                    var nameLim2 = name.split("]")[1];

                    var band = nameLim !== "archivo" ? true : false;

                    var newName = band ? nameLim + '[' + index + ']' +
                        ($input.is(':checkbox') || $input.attr('multiple') ? '[]' : '') : nameLim +
                        ($input.is(':checkbox') || $input.attr('multiple') ? '[]' : '');
                    //console.log(newName);
                    $input.attr('name', newName + nameLim2);
                    var nameLim3 = name.split(".")[1];

                    $input.attr('id', nameLim3 + "_" + index);
                    //console.log("El nombre es: " + newName);
                    $foreachRepeaterInItem(repeaters, $item, function (nestedFig) {
                        var $repeater = $(this);
                        setIndexes(
                            $filterNested($repeater.find('[data-repeater-item]'), nestedFig.repeaters || []),
                            groupName + '[' + index + ']' +
                            '[' + $repeater.find('[data-repeater-list]').first().data('repeater-list') + ']',
                            nestedFig.repeaters
                        );
                    });


                });

                if (total == index && estatusAgregar) {
                    $nuevoElemento(index);

                }

            });

            $list.find('input[name][checked]')
                .removeAttr('checked')
                .prop('checked', true);
        };

        setIndexes($items(), getGroupName(), fig.repeaters);
        initNested($items());
        if (fig.initEmpty) {
            $items().remove();
        }

        if (fig.ready) {
            fig.ready(function () {
                setIndexes($items(), getGroupName(), fig.repeaters);
            });
        }

        var appendItem = (function () {
            var setItemsValues = function ($item, data, repeaters) {

                if (data || fig.defaultValues) {
                    var inputNames = {};
                    $filterNested($item.find('[name]'), repeaters).each(function () {
                        var key = $(this).attr('name').match(/\[([^\]]*)(\]|\]\[\])$/)[1];
                        inputNames[key] = $(this).attr('name');

                    });

                    $item.inputVal(map(
                        filter(data || fig.defaultValues, function (val, name) {
                            return inputNames[name];
                        }),
                        identity,
                        function (name) {
                            return inputNames[name];
                        }
                    ));
                }

                $foreachRepeaterInItem(repeaters, $item, function (nestedFig) {
                    var $repeater = $(this);
                    $filterNested(
                        $repeater.find('[data-repeater-item]'),
                        nestedFig.repeaters
                    )
                        .each(function () {
                            var fieldName = $repeater.find('[data-repeater-list]').data('repeater-list');
                            if (data && data[fieldName]) {
                                var $template = $(this).clone();
                                $repeater.find('[data-repeater-item]').remove();
                                foreach(data[fieldName], function (data) {
                                    var $item = $template.clone();
                                    setItemsValues(
                                        $item,
                                        data,
                                        nestedFig.repeaters || []
                                    );
                                    $repeater.find('[data-repeater-list]').append($item);
                                });
                            }
                            else {
                                setItemsValues(
                                    $(this),
                                    nestedFig.defaultValues,
                                    nestedFig.repeaters || []
                                );
                            }
                        });
                });

            };

            return function ($item, data) {
                $list.append($item);
                setIndexes($items(), getGroupName(), fig.repeaters);
                $item.find('[name]').each(function () {
                });
                setItemsValues($item, data || fig.defaultValues, fig.repeaters);
            };
        }());

        var addItem = function (data) {
            var $item = $itemTemplate.clone();
            //console.log($item);
            appendItem($item, data);
            if (fig.repeaters) {
                initNested($item);
            }
            //console.log($item.get(0));
            show.call($item.get(0));
        };

        setList = function (rows) {
            $items().remove();
            foreach(rows, addItem);
        };

        $filterNested($self.find('[data-repeater-create]'), fig.repeaters).click(function () {
            estatusAgregar = true;
            addItem();
            var self = $(this).closest('[data-repeater-item]').get(0);
            hide.call(self, function () {
                $(self).remove();
                setIndexes($items(), getGroupName(), fig.repeaters);
            });
        });

        $list.on('click', '[data-repeater-delete]', function () {
            estatusAgregar = false;
            var self = $(this).closest('[data-repeater-item]').get(0);
            hide.call(self, function () {
                $(self).remove();
                setIndexes($items(), getGroupName(), fig.repeaters);
            });
        });
    });

    this.setList = setList;

    return this;
};
