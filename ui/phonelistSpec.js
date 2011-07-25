describe('phonelist', function() {


    it('should show expected number of phones in a list', function() {
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

        loadHtml('/phonecat-mobile/index.html#phonelist', function(testwin) {
            addXhrMock(testwin, 'phones/phones.json', true, phones);
        });
        runs(function() {
           var page = getCurrentPage();
           var listEntries = page.find('li');
           expect(listEntries.length).toEqual(phones.length);
        });
    });


    it('should show the names of the phones in a list', function() {
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

        loadHtml('/phonecat-mobile/index.html#phonelist', function(testwin) {
            addXhrMock(testwin, 'phones/phones.json', true, phones);
        });
        runs(function() {
           var page = getCurrentPage();
           var $ = testframe().$;
           var listEntries = page.find('li');
           for (var i=0; i<listEntries.length; i++) {
               var li = $(listEntries[i]);
               var text = $.trim(li.text());
               expect(text).toEqual(phones[i].name);
           }
        });
    });
});