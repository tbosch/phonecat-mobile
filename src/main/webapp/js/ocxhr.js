define(["lib/angular", "lib/jquery"], function(angular, jquery) {

    function ocxhr(url, options) {
        var res = jquery.ajax(url, options);
        res.always(angular.updateView);
        return res;
    }

    return ocxhr;
});
