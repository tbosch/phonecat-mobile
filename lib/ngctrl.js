/**
 * require.js module that published a controller so that angular can use it.
 * The controller needs to return an object with name/function mappings,
 * this can also contain more than one controller.
 */
define({
    load: function (name, req, load, config) {
        req(["lib/angular", name], function(angular,ctrl) {
            // Note: The window is not available during the build!
            if (typeof window != "undefined") {
                for (var ctrlName in ctrl) {
                    window[ctrlName] = ctrl[ctrlName];
                }
            }
            load(ctrl);
        });
    }
});