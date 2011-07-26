function PhoneDetailCtrl(phoneService) {
    this.phoneService = phoneService;
}

PhoneDetailCtrl.prototype = {
    onActivate: function(prevScope) {
        var self = this;
        this.phoneService.phone(prevScope.selectedPhone.id).done(function(phone) {
            self.data = phone;
        });
    }
}

PhoneDetailCtrl.$inject = ['phoneService'];