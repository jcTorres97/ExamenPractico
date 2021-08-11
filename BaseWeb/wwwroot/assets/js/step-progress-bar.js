$.fn.progressbar = function(options){
    var opts = $.extend({}, $.fn.progressbar.defaults, options);
    $(this).append('<div class="boxes"><div class="box"></div><div class="box"></div><div class="box"></div></div>');
    $(this).find(".box").last().append('<div class="progress-step"></div>');
    var progressDiv = $(this).find(".progress-step").first();
    progressDiv.append('<div class="bar"><div class="bar__fill" style="width: 33%;"></div></div>');
    var counter = 1;
    $(this).find("ul li").each(function(){
        var html = '<div class="point">';
        html += '<div class="bullet">';
        if (opts.links == true) {
            var link = $(this).data("link");
            if (link == undefined || link == null) {
                link = "#";
            }
            html += '<a class="link-progress-bar" href="' + link + '">';
        }
        if (opts.iconos == true) {
            var icono_temp = $(this).data("icono");
            html += '<span class="' + icono_temp + ' icono"></span>';
        } else {
            html += ' ' + (counter++) + ' ';
        }
        if (opts.links == true) {
            html += '</a>';
        }
        html += '</div>';
        html += '<label class="label-step">' + $(this).text() + '</label>';
        progressDiv.append(html);


    });
    $(this).find("ul").first().css("display", "none");

    //inicializamos
    var $boxOne = $('.box:nth-child(1)'),
    $boxTwo = $('.box:nth-child(2)'),
    $boxThree = $('.box:nth-child(3)');

    var boxOne = new TimelineMax(),
    boxTwo = new TimelineMax(),
    boxThree = new TimelineMax();

    boxOne.to($boxOne, 0.6, {
    opacity: 0.25,
    scale: 1,
    ease: Back.easeOut
    }).to($boxOne, 0.6, {
    rotation: 4,
    ease: Back.easeOut
    }, 2);

    boxTwo.to($boxTwo, 0.6, {
    opacity: 0.5,
    scale: 1,
    ease: Back.easeOut
    }, 0.6).to($boxTwo, 0.6, {
    rotation: -4,
    ease: Back.easeOut
    }, 1.8);

    boxThree.to($boxThree, 0.6, {
    opacity: 1,
    scale: 1,
    ease: Back.easeOut
    }, 1.2);


    var getTotalPoints = $(this).find('.point').length;
    var getIndex = opts.index;
    var flag_completado = false;
    if (getIndex > getTotalPoints) {
        getIndex = getTotalPoints;
        flag_completado = true;
    }
    
    var getCompleteIndex = $(this).find('.point--active').index();

    TweenMax.to($('.bar__fill'), 0.6, {
        width: (getIndex - 1) / (getTotalPoints - 1) * 100 + '%'
    });

    var point = $(this).find(".point")[getIndex-1];
    $('.point--active').addClass('point--complete').removeClass('point--active');
    $(this).find(point).addClass('point--active');
    $(this).find(point).prevAll().addClass('point--complete');
    $(this).find(point).nextAll().removeClass('point--complete');
    if (opts.checkCompletados == true) {
        $(this).find(point).prevAll().find(".bullet").empty();
        $(this).find(point).prevAll().find(".bullet").append('<span class="fas fa-check icono"></span>');
    }
    if(flag_completado || opts.completado){
        $(this).find(point).find(".bullet").empty();
        $(this).find(point).find(".bullet").append('<span class="fas fa-check icono"></span>');
    }
};
// definimos los parámetros junto con los valores por defecto de la función
$.fn.progressbar.defaults = {
    // para el fondo un color por defecto
    background: '#000000',
    iconos: true,
    icono : 'fas fa-step-forward',
    index: 1,
    completado: false,
    links: false,
    checkCompletados: true
};
