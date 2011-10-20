
define('lib/jquery', function() {
    if (typeof window !== 'undefined') {
        return window.$;
    }
});

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

define('app/phoneService',["lib/angular", "lib/jquery"], function(angular, $) {

    function phones() {
        var res = $.Deferred();
        angular.service("$xhr")('GET', 'phones/phones.json', res.resolve, res.reject);
        return res.pipe(function(code, data) {
            return data;
        });
    }

    function phone(id) {
        var res = $.Deferred();
        angular.service("$xhr")('GET', 'phones/' + id + '.json', res.resolve, res.reject);
        return res.pipe(function(code, data) {
            return data;
        });
    }

    return {
        phones: phones,
        phone: phone
    }
});

define('app/PhoneCtrl',["app/phoneService", "lib/angular"], function(phoneService, angular) {

    function PhoneCtrl() {
        var self = this;
        this.phonesListState = {
            sortDescend : false,
            search : null
        };
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
            phoneService.phone(phone.id).done(function(phone) {
                self.selectedPhone = phone;
            });
        }
    };

    angular.controller('PhoneCtrl', PhoneCtrl);

    return PhoneCtrl;
});

require([
    "app/PhoneCtrl"
], function() {
    $("body").show();
});

define("main", function(){});
