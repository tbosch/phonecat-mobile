define(['lib/jasmine', 'lib/jquery', 'js/ocxhr', 'js/phoneService'], function(jasmine, $, ocxhr, service) {
    describe('phoneService', function() {
        var mockXhr;
        beforeEach(function() {
            mockXhr = spyOn(ocxhr, 'xhr');
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