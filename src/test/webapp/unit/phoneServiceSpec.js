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

    it('should call and return phones/[id].json as promise', function() {
        var phone = [{test: true}];
        var phonePromise = $.Deferred();
        phonePromise.resolve(phone);

        var mockXhr = jasmine.createSpy().andReturn(phonePromise);
        var service = angular.service('phoneService')(mockXhr);
        var serviceResult;
        service.phone().done(function(res) {
            serviceResult = res;
        });
        expect(serviceResult).toEqual(phone);

    });
});