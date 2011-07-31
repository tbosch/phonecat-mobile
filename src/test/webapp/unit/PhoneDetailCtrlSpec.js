define([
    'phonesTestData',
    'lib/jasmine',
    'lib/jquery',
    'js/phoneService',
    'js/PhoneDetailCtrl'], function(testData, jasmine, $, phoneService, PhoneDetailCtrl) {

    describe('PhoneDetailCtrl', function() {
        var phonesSpy, phoneSpy;
        beforeEach(function() {
            phonesSpy = spyOn(phoneService, 'phones');
            phoneSpy = spyOn(phoneService, 'phone');
        });

        function createCtrl(phones, phone) {
            var phonesPromise = $.Deferred();
            phonesPromise.resolve(phones);
            phonesSpy.andReturn(phonesPromise);
            var phonePromise = $.Deferred();
            phonePromise.resolve(phone);
            phoneSpy.andReturn(phonePromise);
            return new PhoneDetailCtrl.PhoneDetailCtrl();
        }

        it('should load the details of the selected phone from the calling scope ', function() {
            var ctrl = createCtrl([], testData.onePhoneDetail);
            var oldScope = {selectedPhone: {id: 'motorola-xoom-with-wi-fi'}};
            ctrl.onActivate(oldScope);
            expect(ctrl.data).toEqual(testData.onePhoneDetail);
        })
    });
});