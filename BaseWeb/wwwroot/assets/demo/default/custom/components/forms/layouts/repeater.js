
"use strict";
// Class definition

var KRepeaterDemo = function () {
    
    // Private functions
    var demo = function () {
        $('.k-repeater').each(function () {
            
            $(this).repeater({
                show: function () {
                    $(this).slideDown();
                    $(this).find('.btn-sm').removeAttr('onclick');
                },
              
                //hide: function (deleteElement) {
                //    if(confirm('Are you sure you want to delete this element?')) {
                //        $(this).slideUp(deleteElement);
                //    }
                //},
                isFirstItemUndeletable: true
            });
        });
    }

    return {
        // public functions
        init: function() {
            demo(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KRepeaterDemo.init();
});