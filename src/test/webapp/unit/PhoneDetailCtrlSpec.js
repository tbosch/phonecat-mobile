define(['phonesTestData', 'lib/jasmine', 'lib/jquery'], function(testData, jasmine, $) {
    var phonesSpy = jasmine.createSpy();
    var phoneSpy = jasmine.createSpy();

    define("js/phoneService", function() {
        return {
            phones: phonesSpy,
            phone: phoneSpy
        }
    });

    require({context: 'PhoneDetailCtrlSpec'}, ['js/PhoneDetailCtrl'], function(PhoneDetailCtrl) {

        describe('PhoneDetailCtrl', function() {
            beforeEach(function() {
                phonesSpy.reset();
                phoneSpy.reset();
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
});