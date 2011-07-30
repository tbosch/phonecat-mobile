/**
 * require.js module that loads dependencies in the right order.
 * Syntax for the name: A:B:C:.... The result is returned as a js array.
 * <p>
 * This should work well in all browsers, in contrast to the
 * order plugin of require.js
 * <p>
 * This is meant to be used for libraries that store their state
 * in global variables. For this, this will not reload a library
 * if a different require-js context ist used!
 */
define({
    load: function (name, req, load, config) {
        var results = window.orderjsCache = window.orderjsCache || [];

        var names = name.split(":");
        var res = [];

        function callreq(currIndex) {
            if (currIndex==names.length) {
                load(res);
            } else {
                var name = names[currIndex];
                function callback(partres) {
                    res.push(partres);
                    results[name] = partres;
                    callreq(currIndex+1);
                };
                if (name in results) {
                    callback(results[name]);
                } else {
                    req([name], partres);
                }
            }
        }
        callreq(0);
    },

    write: function (pluginName, moduleName, write) {
        /* TODO
        var module = function(ctrl, name) {
            function getNameWithoutPath(name) {
                var lastSlashPos = name.lastIndexOf('/');
                return name.substring(lastSlashPos + 1);
            };
            var ctrlName = getNameWithoutPath(name);
            window[ctrlName] = ctrl;
            return ctrl;
        };
        // Don't know why we need the trailing semi-colon. But without this,
        // we get an error during requirejs optimization. Seems to be a bug
        // in require.js
        write(";define('" + pluginName + "!" + moduleName  +
              "',['"+moduleName+"'], function(ctrl) { return ("+module.toString()+"(ctrl, '"+moduleName+"'));});\n");
        */
    }
});