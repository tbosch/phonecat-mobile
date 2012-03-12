beforeEach(function () {
    jasmine.ui.addLoadHtmlListener(function (win) {
        // do not wait too long during tests
        var oldTimeout = win.setTimeout;
        win.setTimeout = function (fn, delay) {
            if (delay > 20) {
                delay = 20;
            }
            return oldTimeout.call(this, fn, delay);
        };
    }, function (win) {
        // Disable transitions
        win.$.mobile.defaultPageTransition = "none";
        win.$.mobile.defaultDialogTransition = "none";
    });
});

function mockPhonesService(testwin, phones, phone) {
    var angular = testwin.require('lib/angular');
    angular.service("phoneService", function($xhr) {
        return {
            phones: function() {
                return testwin.$.Deferred().resolve(phones);
            },
            phone: function() {
                return testwin.$.Deferred().resolve(phone);
            }
        }
    });
}
