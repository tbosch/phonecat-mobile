define(['phonesTestData'], function(testData) {
    describe('phonelist', function() {
        it('should show expected number of phones in a list', function() {
            loadHtml('/phonecat-mobile/index.html#phonelist', function(testwin) {
                addXhrMock(testwin, 'phones/phones.json', true, testData.twoPhones);
            });
            runs(function() {
                var page = getCurrentPage();
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(testData.twoPhones.length);
            });
        });

        it('should show the names of the phones in a list', function() {
            loadHtml('/phonecat-mobile/index.html#phonelist', function(testwin) {
                addXhrMock(testwin, 'phones/phones.json', true, testData.twoPhones);
            });
            runs(function() {
                var page = getCurrentPage();
                var $ = testframe().$;
                var listEntries = page.find('li.phone');
                for (var i = 0; i < listEntries.length; i++) {
                    var li = $(listEntries[i]);
                    var text = $.trim(li.text());
                    expect(text).toEqual(testData.twoPhones[listEntries.length - i - 1].name);
                }
            });
        });

        it('should sort by name when the sort buttons are clicked', function() {
            loadHtml('/phonecat-mobile/index.html#phonelist', function(testwin) {
                addXhrMock(testwin, 'phones/phones.json', true, testData.twoPhones);
            });
            runs(function() {
                var page = getCurrentPage();
                var sortButtons = page.find('.sortUp');
                expect(sortButtons.length).toEqual(1);
                sortButtons.trigger('vclick');
            });
            waitsForAsync();
            runs(function() {
                var page = getCurrentPage();
                var $ = testframe().$;
                var listEntries = page.find('li.phone');
                for (var i = 0; i < listEntries.length; i++) {
                    var li = $(listEntries[i]);
                    var text = $.trim(li.text());
                    var phoneIndex = testData.twoPhones.length - i - 1;
                    expect(text).toEqual(testData.twoPhones[phoneIndex].name);
                }
                var sortButtons = page.find('.sortDown');
                expect(sortButtons.length).toEqual(1);
                sortButtons.trigger('vclick');
            });
            waitsForAsync();
            runs(function() {
                var page = getCurrentPage();
                var $ = testframe().$;
                var listEntries = page.find('li.phone');
                for (var i = 0; i < listEntries.length; i++) {
                    var li = $(listEntries[i]);
                    var text = $.trim(li.text());
                    expect(text).toEqual(testData.twoPhones[i].name);
                }
            });
        });

        it('should filter when a value is put into the search field', function() {
            loadHtml('/phonecat-mobile/index.html#phonelist', function(testwin) {
                addXhrMock(testwin, 'phones/phones.json', true, testData.twoPhones);
            });
            waitsForAsync();
            runs(function() {
                var page = getCurrentPage();
                var $ = testframe().$;
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(testData.twoPhones.length);
                var filterText = page.find('.search');
                expect(filterText.length).toEqual(1);
                filterText.val('wi-fi');
                filterText.trigger('change');
            });
            waitsForAsync();
            runs(function() {
                var page = getCurrentPage();
                var $ = testframe().$;
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(1);
                var text = $.trim(listEntries.text());
                expect(text).toEqual(testData.twoPhones[0].name);
            });
        });

        it('should page with a pagesize of 10', function() {
            loadHtml('/phonecat-mobile/index.html#phonelist', function(testwin) {
                addXhrMock(testwin, 'phones/phones.json', true, testData.manyPhones);
            });
            waitsForAsync();
            runs(function() {
                var page = getCurrentPage();
                var $ = testframe().$;
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(10);
                var loadNextButton = page.find('.loadNext');
                expect(loadNextButton.length).toEqual(1);
                loadNextButton.trigger('vclick');
            });
            waitsForAsync();
            runs(function() {
                var page = getCurrentPage();
                var $ = testframe().$;
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(testData.manyPhones.length);
                var loadNextButton = page.find('.loadNext');
                expect(loadNextButton.length).toEqual(0);

            });
        });

        it('should navigate to detail page when a phone is clicked', function() {
            loadHtml('/phonecat-mobile/index.html#phonelist', function(testwin) {
                addXhrMock(testwin, 'phones/phones.json', true, testData.onePhone);
                addXhrMock(testwin, 'phones/motorola-xoom-with-wi-fi.json', true, testData.onePhoneDetail);
            });
            runs(function() {
                var page = getCurrentPage();
                var $ = testframe().$;
                var listEntries = page.find('li.phone a');
                var entry = $(listEntries[0]);
                entry.trigger('vclick');
            });
            waitsForAsync();
            runs(function() {
                var page = getCurrentPage();
                var $ = testframe().$;
                expect(page.attr('id')).toEqual('phonedetail');
                var text = $.trim(page.find('h1').text());
                expect(text).toEqual(testData.onePhone[0].name);
            });


        });
    });


});
