define(['lib/global!lib/impl/angular-0.9.15:lib/jquery'], function() {
    function updateView() {
        // TODO
        // This is a hack using jquery mobile angular adapter.
        return $.mobile.globalScope().$service('$updateView')();

    }
    return {
        updateView: updateView
    }
});