define(["js/phoneService"], function(phoneService) {

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

    return PhoneDetailCtrl;
});