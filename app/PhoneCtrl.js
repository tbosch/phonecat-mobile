define(["lib/angular"], function(angular) {

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
