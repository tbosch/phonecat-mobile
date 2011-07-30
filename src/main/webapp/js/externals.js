/**
 * Virtual modules for libraries that do not use require.js
 */
define('globalScope', function() {
    return function() {
        return $.mobile.globalScope.apply($, arguments);
    }
});

define('$ajax', function() {
    return function() {
        return $.ajax.apply($, arguments);
    }
});

define('$updateView', ['globalScope'], function(globalScope) {
    return function() {
        return globalScope().$service('$updateView')();
    }
});