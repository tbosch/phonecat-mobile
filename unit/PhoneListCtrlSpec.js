describe('PhoneListCtrl', function() {
    it('should contain a phones property with the expected list of phones', function() {
        var phones = [
            {
                "age": 0,
                "id": "motorola-xoom-with-wi-fi",
                "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
                "name": "Motorola XOOM\u2122 with Wi-Fi",
                "snippet": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
            },
            {
                "age": 1,
                "id": "motorola-xoom",
                "imageUrl": "img/phones/motorola-xoom.0.jpg",
                "name": "MOTOROLA XOOM\u2122",
                "snippet": "The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb)."
            }
        ];
        var phoneService = {};
        var phonePromise = $.Deferred();
        phonePromise.resolve(phones);
        phoneService.phones = jasmine.createSpy().andReturn(phonePromise);
        var ctrl = new PhoneListCtrl(phoneService);

        expect(ctrl.phones).toEqual(phones);
    });
});