define(["app/phoneService"], function(phoneService) {

    function PhoneListCtrl() {
        var self = this;
        this.sortDescend = false;
        this.search = null;
        this.phones = [];
        phoneService.phones().done(function(phones) {
            self.phones = phones;
        });
    }

    PhoneListCtrl.prototype.pagedPhones = function() {
        var sort = this.sortDescend?'-':'+';
        sort+="name";
        var search =null;
        if (this.search) {
            search = {name: this.search};
        }
        return angular.Array.paged(this.phones, search, sort);
    }

    return {PhoneListCtrl: PhoneListCtrl};
});

