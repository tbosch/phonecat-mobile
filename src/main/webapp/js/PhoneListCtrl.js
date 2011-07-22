function PhoneListCtrl(phoneService) {
    var self = this;
    phoneService.phones().done(function(phones) {
        self.phones = phones;
    });
}
PhoneListCtrl.$inject = ['phoneService'];

