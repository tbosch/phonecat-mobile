angular.service('ocxhr', function(updateView) {
    function ocxhr(url, options) {
        var res = $.ajax(url, options);
        res.always(updateView);
        return res;
    }
    return ocxhr;
}, {$inject: ['$updateView']});