
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

define('lib/jquery',[], function() {
    if (typeof window !== 'undefined') {
        return window.$;
    }
});

define('app/phoneService',["lib/angular", "lib/jquery"], function (angular, $) {

    function phoneServiceFactory($xhr) {

        function phones() {
            var res = $.Deferred();
            $xhr('GET', 'phones/phones.json', res.resolve, res.reject);
            return res.pipe(function (code, data) {
                return data;
            });
        }

        function phone(id) {
            var res = $.Deferred();
            $xhr('GET', 'phones/' + id + '.json', res.resolve, res.reject);
            return res.pipe(function (code, data) {
                return data;
            });
        }

        return {
            phones:phones,
            phone:phone
        }
    }

    phoneServiceFactory.$inject = ['$xhr'];

    angular.service("phoneService", phoneServiceFactory);

    return phoneServiceFactory;

});

define('app/PhoneCtrl',["lib/angular"], function(angular) {

    function PhoneCtrl(phoneService) {
        var self = this;
        this.phonesListState = {
            sortDescend : false,
            search : null
        };
        this.phoneService = phoneService;
        this.phones = [];
        phoneService.phones().done(function(phones) {
            self.phones = phones;
        });
    }

    PhoneCtrl.prototype = {
        pagedPhones : function() {
            var sort = this.phonesListState.sortDescend ? '-' : '+';
            sort += "name";
            var search = null;
            if (this.phonesListState.search) {
                search = {name: this.phonesListState.search};
            }
            return angular.Array.paged(this.phones, search, sort);
        },
        selectPhone: function(phone) {
            var self = this;
            this.phoneService.phone(phone.id).done(function(phone) {
                self.selectedPhone = phone;
            });
        }
    };

    PhoneCtrl.$inject = ["phoneService"];

    angular.controller('PhoneCtrl', PhoneCtrl);

    return PhoneCtrl;
});

require([
    "app/phoneService",
    "app/PhoneCtrl"
], function() {
    $("body").show();
});

define("main", function(){});
