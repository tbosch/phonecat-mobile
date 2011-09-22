define([
    'phonesTestData',
    'lib/jasmine',
    'lib/jquery',
    'require',
    'lib/angular',
    'app/PhoneListCtrl'], function(testData, jasmine, $, require, angular) {
    describe('PhoneListCtrl', function() {
        var phonesSpy, phoneSpy, PhoneListCtrl;
        beforeEach(function() {
            phonesSpy = jasmine.createSpy('phones');
            phoneSpy = jasmine.createSpy('phone');
            var ctrlFactory  = require.factories['app/PhoneListCtrl'];
            PhoneListCtrl = ctrlFactory({phones: phonesSpy, phone: phoneSpy}, angular);
        });


        function createCtrl(phones) {
            var phonePromise = $.Deferred();
            phonePromise.resolve(phones);
            phonesSpy.andReturn(phonePromise);
            return new PhoneListCtrl();
        }

        it('should contain a phones property with the expected list of phones', function() {
            var ctrl = createCtrl(testData.twoPhones);
            expect(ctrl.phones).toEqual(testData.twoPhones);
        });

        it('should return a paged list for pagedPhones', function() {
            var ctrl = createCtrl(testData.manyPhones);
            expect(ctrl.pagedPhones().length).toEqual(10);

        });

        it('should return a filtered list for pagedPhones', function() {
            var ctrl = createCtrl(testData.twoPhones);
            ctrl.search = 'Wi';
            expect(ctrl.pagedPhones().length).toEqual(1);
        });

        it('should return a sorted list for pagedPhones', function() {
            var ctrl = createCtrl(testData.twoPhones);
            ctrl.sortDescend = true;
            expect(ctrl.pagedPhones()[0].name).toEqual("Motorola XOOM\u2122 with Wi-Fi");
            ctrl.sortDescend = false;
            expect(ctrl.pagedPhones()[0].name).toEqual("MOTOROLA XOOM\u2122");
        });
    });
});
