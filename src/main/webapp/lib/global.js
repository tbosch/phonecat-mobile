/**
 * require.js module to support libraries that use the global object.
 * <p>
 * All of these modules must only be loaded once, no matter which context
 * is used (especially important for tests.).
 * This is done automatically by this module.
 * <p>
 * Also, those libraries need to be loaded in a defined order,
 * as they do not provide a way to declare their dependencies.
 *
 *
 *
 * that loads dependencies in the right order.
 * Syntax for the name: A:B:C:.... The result is returned as a js array.
 * <p>
 * This should work well in all browsers, in contrast to the
 * order plugin of require.js
 * <p>
 * This is meant to be used for libraries that store their state
 * in global variables. For this, this will not reload a library
 * if a different require-js context ist used!
 */

// Global function to register dependencies for modules
// loaded via the global plugin.
// Syntax: lib/global!mymodel:a,b,c


define({
    load: function (name, req, load, config) {
        var results = window.orderjsCache = window.orderjsCache || [];

        var parts = name.split(":");
        var moduleName = parts[0];
        var depsStr = parts[1] || '';
        var deps = depsStr.split(',');
        if (moduleName in results) {
            load(true);
        } else {
            function callback() {
                req([moduleName], function() {
                    results[moduleName] = true;
                    load(true);
                });
            }
            if (deps.length>0) {
                req(deps, callback);
            } else {
                callback();
            };
        }
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