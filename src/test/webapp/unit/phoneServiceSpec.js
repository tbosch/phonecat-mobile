define(['lib/jquery', 'app/phoneService'], function($, phoneServiceFactory) {
    describe('phoneService', function() {
        var mockXhr, service;
        beforeEach(function() {
            mockXhr = jasmine.createSpy('xhr');
            service = phoneServiceFactory(mockXhr);
        });

        it('should call and return phones/phones.json as promise', function() {
            var phones = [
                {test: true}
            ];

            var serviceResult;
            service.phones().done(function(res) {
                serviceResult = res;
            });
            mockXhr.argsForCall[0][2](200, phones);
            expect(serviceResult).toEqual(phones);

        });

        it('should call and return phones/[id].json as promise', function() {
            var phone = [
                {test: true}
            ];
            var serviceResult;
            service.phone().done(function(res) {
                serviceResult = res;
            });
            mockXhr.argsForCall[0][2](200, phone);
            expect(serviceResult).toEqual(phone);

        });
    });
});