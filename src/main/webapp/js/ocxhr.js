define(["$updateView", "$ajax"], function(updateView, ajax) {

    function ocxhr(url, options) {
        var res = ajax(url, options);
        res.always(updateView);
        return res;
    }

    return ocxhr;
});
