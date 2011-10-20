define('lib/angular', ['lib/jquery'], function($) {
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

    function controller(name, ctrl) {
        window[name] = ctrl;
    }

    angular.controller = controller;
    angular.service = function(name) {
        return getGlobalScope().$service(name);
    };

    return angular;
});