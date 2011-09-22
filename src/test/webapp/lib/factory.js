/**
 * Plugin for require js to access the factories
 * of the modules. Needed for unit-testing...
 */
define(function() {
    var factories = [];

    var oldExecCb = require.execCb;
    require.execCb = function(fullname, callback) {
        factories[fullname] = callback;
        return oldExecCb.apply(this, arguments);
    }

    function load(name, req, load, config) {
        req([name], function (value) {
            load(factories[name]);
        });
    }

    return {
        load: load
    };
});
