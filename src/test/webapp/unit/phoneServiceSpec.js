describe('phoneService', function() {
    it('should call and return phones/phones.json as promise', function() {
        var phones = [{test: true}];
        var phonesPromise = $.Deferred();
        phonesPromise.resolve(phones);

        var mockXhr = jasmine.createSpy().andReturn(phonesPromise);
        var service = angular.service('phoneService')(mockXhr);
        var serviceResult;
        service.phones().done(function(res) {
            serviceResult = res;
        });
        expect(serviceResult).toEqual(phones);

    });
});