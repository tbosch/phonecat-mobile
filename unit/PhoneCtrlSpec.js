define([
    'phonesTestData',
    'lib/jquery',
    'app/PhoneCtrl'], function(testData, $, PhoneCtrl) {
    describe('PhoneCtrl', function() {
        var phonesSpy, phoneSpy;
        beforeEach(function() {
            phonesSpy = jasmine.createSpy('phones');
            phoneSpy = jasmine.createSpy('phone');
        });


        function createCtrl(phones, phone) {
            var phonesPromise = $.Deferred();
            phonesPromise.resolve(phones);
            phonesSpy.andReturn(phonesPromise);
            var phonePromise = $.Deferred();
            phonePromise.resolve(phone);
            phoneSpy.andReturn(phonePromise);
            return new PhoneCtrl({phones: phonesSpy, phone: phoneSpy});
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
            ctrl.phonesListState.search = 'Wi';
            expect(ctrl.pagedPhones().length).toEqual(1);
        });

        it('should return a sorted list for pagedPhones', function() {
            var ctrl = createCtrl(testData.twoPhones);
            ctrl.phonesListState.sortDescend = true;
            expect(ctrl.pagedPhones()[0].name).toEqual("Motorola XOOM\u2122 with Wi-Fi");
            ctrl.phonesListState.sortDescend = false;
            expect(ctrl.pagedPhones()[0].name).toEqual("MOTOROLA XOOM\u2122");
        });

        it('should load the details of the selected phone', function() {
            var ctrl = createCtrl([], testData.onePhoneDetail);
            ctrl.selectPhone({id: 'motorola-xoom-with-wi-fi'});
            expect(ctrl.selectedPhone).toBe(testData.onePhoneDetail);
        })
    });
});
