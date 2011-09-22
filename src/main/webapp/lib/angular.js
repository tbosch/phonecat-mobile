define('lib/angular', function() {
    var angular;
    if (typeof window !== 'undefined') {
        angular = window.angular;
    }
    var globalScope;
    function getGlobalScope() {
        if (!globalScope) {
            globalScope = $("body").scope();
        }
        return globalScope;
    }

    function updateView() {
        return getGlobalScope().$service("$updateView")();
    }

    function controller(name, ctrl) {
        window[name] = ctrl;
    }

    angular.updateView = updateView;
    angular.controller = controller;
    return angular;


});