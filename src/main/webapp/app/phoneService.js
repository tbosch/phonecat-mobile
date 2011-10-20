define(["lib/angular", "lib/jquery"], function(angular, $) {

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