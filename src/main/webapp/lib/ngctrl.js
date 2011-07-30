/**
 * require.js module that published a controller so that angular can use it.
 */
define({

    load: function (name, req, load, config) {
        function getNameWithoutPath(name) {
            var lastSlashPos = name.lastIndexOf('/');
            return name.substring(lastSlashPos + 1);
        };

        req(["lib/angular", name], function(angular,ctrl) {
            if (typeof window != "undefined") {
                var ctrlName = getNameWithoutPath(name);
                window[ctrlName] = ctrl;
            }
            load(ctrl);
        });
    },
    write: function (pluginName, moduleName, write) {
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
    }
});