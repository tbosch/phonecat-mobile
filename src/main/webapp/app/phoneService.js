define(["lib/angular", "lib/jquery"], function (angular, $) {

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