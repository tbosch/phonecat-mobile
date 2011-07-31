define(["lib/jqm-ng", "lib/jquery"], function(jqmng, jquery) {

    function xhr(url, options) {
        var res = jquery.ajax(url, options);
        res.always(jqmng.updateView);
        return res;
    }

    return {xhr: xhr};
});
