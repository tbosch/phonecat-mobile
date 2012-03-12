define(['phonesTestData', 'ui/testhelper'], function(testData) {
    function visitPhoneDetailPage(phones, phone) {
        loadHtml('/phonecat-mobile/index.html#phonedetail', function(testwin) {
            mockPhonesService(testwin, phones, phone);
        });
    }

    describe('phonedetail', function() {
        it('should show the name, description and images of the phone with the id', function() {
            visitPhoneDetailPage(testData.onePhone, testData.onePhoneDetail);
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonedetail");
                page.scope().selectPhone(testData.onePhone[0]);
                page.scope().$root.$eval();
                var name = page.find('.phonename');
                expect($.trim(name.text())).toEqual(testData.onePhoneDetail.name);
                var desc = page.find('.phonedesc');
                expect($.trim(desc.text())).toEqual(testData.onePhoneDetail.description);
                var imgs = page.find('img.phoneimg');
                expect(imgs.length).toEqual(testData.onePhoneDetail.images.length);
                for (var i=0; i<imgs.length; i++) {
                    expect($(imgs[i]).attr('src')).toEqual(testData.onePhoneDetail.images[i]);
                }
            });
        });
    });

});
