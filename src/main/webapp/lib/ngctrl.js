/**
 * require.js module that published a controller so that angular can use it.
 */
define({
    load: function (name, req, load, config) {
        req([name], function(ctrl) {
            var lastSlashPos = name.lastIndexOf('/');
            var ctrlName = name.substring(lastSlashPos + 1);
            window[ctrlName] = ctrl;
            load(ctrl);
        });
    }
});