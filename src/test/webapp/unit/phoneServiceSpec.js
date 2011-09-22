define(['lib/jasmine', 'lib/jquery', 'require', 'app/phoneService'], function(jasmine, $, require) {
    describe('phoneService', function() {
        var mockXhr, service;
        beforeEach(function() {
            mockXhr = jasmine.createSpy('xhr');
            var serviceFactory = require.factories['app/phoneService'];
            service = serviceFactory({xhr: mockXhr});
        });

        it('should call and return phones/phones.json as promise', function() {
            var phones = [
                {test: true}
            ];
            var phonesPromise = $.Deferred();
            phonesPromise.resolve(phones);

            mockXhr.andReturn(phonesPromise);
            var serviceResult;
            service.phones().done(function(res) {
                serviceResult = res;
            });
            expect(serviceResult).toEqual(phones);

        });

        it('should call and return phones/[id].json as promise', function() {
            var phone = [
                {test: true}
            ];
            var phonePromise = $.Deferred();
            phonePromise.resolve(phone);

            mockXhr.andReturn(phonePromise);
            var serviceResult;
            service.phone().done(function(res) {
                serviceResult = res;
            });
            expect(serviceResult).toEqual(phone);

        });
    });
});