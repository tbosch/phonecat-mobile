define(['lib/jasmine', 'lib/jquery', 'lib/factory!app/phoneService'], function(jasmine, $, serviceFactory) {
    describe('phoneService', function() {
        var mockXhr, service;
        beforeEach(function() {
            mockXhr = jasmine.createSpy('xhr');
            var mockAngularService = function(name) {
                return mockXhr;
            };
            service = serviceFactory({service: mockAngularService}, $);
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