define('lib/angular', [], function () {
    var angular;
    if (typeof window !== 'undefined') {
        angular = window.angular;
    }

    function controller(name, ctrl) {
        window[name] = ctrl;
    }

    angular.controller = controller;

    return angular;
});