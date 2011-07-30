define(["lib/jqm-ng", "lib/jquery"], function(jqmng, jquery) {

    function ocxhr(url, options) {
        var res = jquery.ajax(url, options);
        res.always(jqmng.updateView);
        return res;
    }

    return ocxhr;
});
