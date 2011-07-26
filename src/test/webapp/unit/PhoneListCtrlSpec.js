describe('PhoneListCtrl', function() {
    var twoPhones = [
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

    var manyPhones = [
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
    },
    {
        "age": 2,
        "carrier": "AT&amp;T",
        "id": "motorola-atrix-4g",
        "imageUrl": "img/phones/motorola-atrix-4g.0.jpg",
        "name": "MOTOROLA ATRIX\u2122 4G",
        "snippet": "MOTOROLA ATRIX 4G the world's most powerful smartphone."
    },
    {
        "age": 3,
        "id": "dell-streak-7",
        "imageUrl": "img/phones/dell-streak-7.0.jpg",
        "name": "Dell Streak 7",
        "snippet": "Introducing Dell\u2122 Streak 7. Share photos, videos and movies together. It\u2019s small enough to carry around, big enough to gather around."
    },
    {
        "age": 4,
        "carrier": "Cellular South",
        "id": "samsung-gem",
        "imageUrl": "img/phones/samsung-gem.0.jpg",
        "name": "Samsung Gem\u2122",
        "snippet": "The Samsung Gem\u2122 brings you everything that you would expect and more from a touch display smart phone \u2013 more apps, more features and a more affordable price."
    },
    {
        "age": 5,
        "carrier": "Dell",
        "id": "dell-venue",
        "imageUrl": "img/phones/dell-venue.0.jpg",
        "name": "Dell Venue",
        "snippet": "The Dell Venue; Your Personal Express Lane to Everything"
    },
    {
        "age": 6,
        "carrier": "Best Buy",
        "id": "nexus-s",
        "imageUrl": "img/phones/nexus-s.0.jpg",
        "name": "Nexus S",
        "snippet": "Fast just got faster with Nexus S. A pure Google experience, Nexus S is the first phone to run Gingerbread (Android 2.3), the fastest version of Android yet."
    },
    {
        "age": 7,
        "carrier": "Cellular South",
        "id": "lg-axis",
        "imageUrl": "img/phones/lg-axis.0.jpg",
        "name": "LG Axis",
        "snippet": "Android Powered, Google Maps Navigation, 5 Customizable Home Screens"
    },
    {
        "age": 8,
        "id": "samsung-galaxy-tab",
        "imageUrl": "img/phones/samsung-galaxy-tab.0.jpg",
        "name": "Samsung Galaxy Tab\u2122",
        "snippet": "Feel Free to Tab\u2122. The Samsung Galaxy Tab\u2122 brings you an ultra-mobile entertainment experience through its 7\u201d display, high-power processor and Adobe\u00ae Flash\u00ae Player compatibility."
    },
    {
        "age": 9,
        "carrier": "Cellular South",
        "id": "samsung-showcase-a-galaxy-s-phone",
        "imageUrl": "img/phones/samsung-showcase-a-galaxy-s-phone.0.jpg",
        "name": "Samsung Showcase\u2122 a Galaxy S\u2122 phone",
        "snippet": "The Samsung Showcase\u2122 delivers a cinema quality experience like you\u2019ve never seen before. Its innovative 4\u201d touch display technology provides rich picture brilliance, even outdoors"
    },
    {
        "age": 10,
        "carrier": "Verizon",
        "id": "droid-2-global-by-motorola",
        "imageUrl": "img/phones/droid-2-global-by-motorola.0.jpg",
        "name": "DROID\u2122 2 Global by Motorola",
        "snippet": "The first smartphone with a 1.2 GHz processor and global capabilities."
    },
    {
        "age": 11,
        "carrier": "Verizon",
        "id": "droid-pro-by-motorola",
        "imageUrl": "img/phones/droid-pro-by-motorola.0.jpg",
        "name": "DROID\u2122 Pro by Motorola",
        "snippet": "The next generation of DOES."
    },
    {
        "age": 12,
        "carrier": "AT&amp;T",
        "id": "motorola-bravo-with-motoblur",
        "imageUrl": "img/phones/motorola-bravo-with-motoblur.0.jpg",
        "name": "MOTOROLA BRAVO\u2122 with MOTOBLUR\u2122",
        "snippet": "An experience to cheer about."
    }];


    function createCtrl(phones) {
        var phoneService = {};
        var phonePromise = $.Deferred();
        phonePromise.resolve(phones);
        phoneService.phones = jasmine.createSpy().andReturn(phonePromise);
        return new PhoneListCtrl(phoneService);
    }

    it('should contain a phones property with the expected list of phones', function() {
        var ctrl = createCtrl(twoPhones);
        expect(ctrl.phones).toEqual(twoPhones);
    });

    it('should return a paged list for pagedPhones', function() {
        var ctrl = createCtrl(manyPhones);
        expect(ctrl.pagedPhones().length).toEqual(10);

    });

    it('should return a filtered list for pagedPhones', function() {
        var ctrl = createCtrl(twoPhones);
        ctrl.search = 'Wi';
        expect(ctrl.pagedPhones().length).toEqual(1);
    });

    it('should return a sorted list for pagedPhones', function() {
        var ctrl = createCtrl(twoPhones);
        ctrl.sortDescend = true;
        expect(ctrl.pagedPhones()[0].name).toEqual("Motorola XOOM\u2122 with Wi-Fi");
        ctrl.sortDescend = false;
        expect(ctrl.pagedPhones()[0].name).toEqual("MOTOROLA XOOM\u2122");
    });
});