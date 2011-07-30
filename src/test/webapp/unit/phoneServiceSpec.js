define(function() {
    var mockXhr = jasmine.createSpy();

    define('js/ocxhr', function() {
        return mockXhr;
    });

    require({context: 'phoneServiceSpec'}, ['js/phoneService'], function(service) {
        describe('phoneService', function() {
            beforeEach(function() {
                mockXhr.reset();
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
});