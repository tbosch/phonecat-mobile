define(['lib/externals'], function() {
    function updateView() {
        return $.mobile.globalScope().$service('$updateView')();
    }

    return {
        globalScope: $.mobile.globalScope,
        updateView: updateView
    }
});