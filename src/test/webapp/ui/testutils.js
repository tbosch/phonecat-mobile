define(['lib/jasmine'], function(jasmine) {

    function getCurrentPage() {
        return testwindow().$.mobile.activePage;
    }

    /**
     * Instruments the first call to the onActivate function of the given controller, so whenever
     * it is called it receives the remaining arguments that are given to this function.
     * @param controller
     * @param other passed to the onActivate function of the controller.
     */
    function setOnActivateArguments(controller) {
        var oldOnActivate = controller.prototype.onActivate;
        var onActivateArgs = Array.prototype.slice.call(arguments, 1);
        var callCount = 0;
        controller.prototype.onActivate = function() {
            callCount++;
            if (callCount == 1) {
                return oldOnActivate.apply(this, onActivateArgs);
            } else {
                return oldOnActivate.apply(this, arguments);
            }
        }
    }


    /**
     * Mocks the jquey ajax function to return the given result
     * when the given path is called.
     * This can be called multiple times without overriding the
     * previous calls.
     * @param window
     * @param path
     * @param success If the result is successful or not
     * @param data The data to return to the callback.
     */
    function addXhrMock(window, path, success, data) {
        var xhrMock = window.xhrMock
        // This function is called from the test frame.
        // To ensure that the instanceof operator works correct on arrays created in test functions
        // and used in the testframe,
        // we need to recreate arrays with the Array prototype of the testframe.
        data = jasmine.ui.normalizeExternalObject(data, window)
        if (!xhrMock) {
            var oldAjax = window.jQuery.ajax;
            xhrMock = spyOn(window.jQuery, 'ajax').andCallFake(function(url, options) {
                var result = xhrMock.results[url];
                console.log(url, result);
                if (result) {
                    var res = window.$.Deferred();
                    if (result.success) {
                        res.resolve(result.data);
                        if (options && options.success) {
                            options.success(result.data);
                        }
                    } else {
                        res.reject(result.data);
                        if (options && options.error) {
                            options.error(result.data);
                        }
                    }

                    return res;
                } else {
                    return oldAjax.apply(this, arguments);
                }
            });
            window.xhrMock = xhrMock;
            xhrMock.results = {};
        }
        xhrMock.results[path] = { success: success, data: data };
    }

    return {
        getCurrentPage: getCurrentPage,
        setOnActivateArguments: setOnActivateArguments,
        addXhrMock: addXhrMock
    }
});
