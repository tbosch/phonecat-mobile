define(['phonesTestData', 'ui/testutils', 'lib/jasmine', 'lib/jasmine-ui'], function(testData, testutils, jasmine) {
    describe('phonedetail', function() {
        it('should show the name, description and images of the phone with the id', function() {
            loadHtml('/phonecat-mobile/index.html#phonedetail', function(testwin) {
                testutils.addXhrMock(testwin, 'phones/10.json', true, testData.onePhoneDetail);
                testutils.setOnActivateArguments(testwin.PhoneDetailCtrl, {selectedPhone: {id:10}});
            });
            runs(function() {
                var $ = testwindow().$;
                var page = testutils.getCurrentPage();
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
