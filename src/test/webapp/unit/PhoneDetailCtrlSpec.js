define([
    'phonesTestData',
    'lib/jasmine',
    'lib/jquery',
    'require',
    'lib/angular',
    'app/PhoneDetailCtrl'], function(testData, jasmine, $, require, angular) {

    describe('PhoneDetailCtrl', function() {
        var phonesSpy, phoneSpy, PhoneDetailCtrl;
        beforeEach(function() {
            phonesSpy = jasmine.createSpy('phones');
            phoneSpy = jasmine.createSpy('phone');
            var ctrlFactory  = require.factories['app/PhoneDetailCtrl'];
            PhoneDetailCtrl = ctrlFactory({phones: phonesSpy, phone: phoneSpy}, angular);
        });

        function createCtrl(phones, phone) {
            var phonesPromise = $.Deferred();
            phonesPromise.resolve(phones);
            phonesSpy.andReturn(phonesPromise);
            var phonePromise = $.Deferred();
            phonePromise.resolve(phone);
            phoneSpy.andReturn(phonePromise);
            return new PhoneDetailCtrl();
        }

        it('should load the details of the selected phone from the calling scope ', function() {
            var ctrl = createCtrl([], testData.onePhoneDetail);
            var oldScope = {selectedPhone: {id: 'motorola-xoom-with-wi-fi'}};
            ctrl.onActivate(oldScope);
            expect(ctrl.data).toEqual(testData.onePhoneDetail);
        })
    });
});