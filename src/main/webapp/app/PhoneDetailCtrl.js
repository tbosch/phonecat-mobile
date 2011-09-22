define(["app/phoneService", "lib/angular"], function(phoneService, angular) {

    function PhoneDetailCtrl() {
    }

    PhoneDetailCtrl.prototype = {
        onActivate: function(prevScope) {
            var self = this;
            phoneService.phone(prevScope.selectedPhone.id).done(function(phone) {
                self.data = phone;
            });
        }
    }

    angular.controller('PhoneDetailCtrl', PhoneDetailCtrl);

    return PhoneDetailCtrl;
});