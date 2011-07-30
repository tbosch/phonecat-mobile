/**
 * require.js module to support libraries that use the global object.
 * <p>
 * All of these modules must only be loaded at most once, no matter which context
 * is used (especially important for tests.).
 * This is done automatically by this module.
 * <p>
 * Also, those libraries do not provide their dependencies.
 * This plugins allows to specify those dependencies via the following syntax:
 * global!<my-legacy-module>:dep1,dep2, ...
 */
define({
    load: function (name, req, load, config) {
        var cachedResults;
        var buildPhase = typeof window == "undefined";
        if (!buildPhase) {
            cachedResults = window.requirejsGlobal = window.requirejsGlobal || {};
        } else {
            // For build in node.js
            cachedResults = {};
        }
        var parts = name.split(":");
        var moduleName = parts[0];
        var depsStr = parts[1] || '';
        var deps = depsStr.split(',');
        if (moduleName in cachedResults) {
            load(true);
        } else {
            if (buildPhase) {
                // The build does not recognize the second req
                // call within a callback of a first req call.
                // However, during the build phase, the calls to
                // req get executed synchronously, so we can put them
                // behind each other.
                if (deps.length>0) {
                    req(deps, function() {});
                }
                req([moduleName], function() {
                    load(true);
                });
            } else {
                function callback() {
                    req([moduleName], function() {
                        cachedResults[moduleName] = true;
                        load(true);
                    });
                }
                if (deps.length > 0) {
                    req(deps, callback);
                } else {
                    callback();
                }
            }
        }
    }
});
