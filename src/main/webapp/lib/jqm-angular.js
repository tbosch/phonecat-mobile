define(['plugin/global!lib/impl/jquery-mobile-angular-adapter:lib/jquery-mobile,lib/angular'], function() {
    function updateView() {
        return $.mobile.globalScope().$service('$updateView')();
    }

    return {
        globalScope: $.mobile.globalScope,
        updateView: updateView
    }
});