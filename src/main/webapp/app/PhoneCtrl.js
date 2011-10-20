define(["app/phoneService", "lib/angular"], function(phoneService, angular) {

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