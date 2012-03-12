define(['phonesTestData', 'ui/testhelper'], function(testData) {

    function visitPhoneListPage(phones, phone) {
        loadHtml('/phonecat-mobile/index.html#phonelist', function(testwin) {
            mockPhonesService(testwin, phones, phone);
        });
    }

    describe('phonelist', function() {
        it('should show expected number of phones in a list', function() {
            visitPhoneListPage(testData.twoPhones);
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonelist");
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(testData.twoPhones.length);
            });
        });

        it('should show the names of the phones in a list', function() {
            visitPhoneListPage(testData.twoPhones);
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonelist");
                var listEntries = page.find('li.phone');
                for (var i = 0; i < listEntries.length; i++) {
                    var li = $(listEntries[i]);
                    var text = $.trim(li.text());
                    expect(text).toEqual(testData.twoPhones[listEntries.length - i - 1].name);
                }
            });
        });

        it('should sort by name when the sort buttons are clicked', function() {
            visitPhoneListPage(testData.twoPhones);
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonelist");
                var sortButtons = page.find('.sortUp');
                expect(sortButtons.length).toEqual(1);
                sortButtons.trigger('vclick');
            });
            waitsForAsync();
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonelist");
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
                var $ = testwindow().$;
                var page = $("#phonelist");
                var listEntries = page.find('li.phone');
                for (var i = 0; i < listEntries.length; i++) {
                    var li = $(listEntries[i]);
                    var text = $.trim(li.text());
                    expect(text).toEqual(testData.twoPhones[i].name);
                }
            });
        });

        it('should filter when a value is put into the search field', function() {
            visitPhoneListPage(testData.twoPhones);
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonelist");
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(testData.twoPhones.length);
                var filterText = page.find('.search');
                expect(filterText.length).toEqual(1);
                filterText.val('wi-fi');
                filterText.trigger('change');
            });
            waitsForAsync();
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonelist");
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(1);
                var text = $.trim(listEntries.text());
                expect(text).toEqual(testData.twoPhones[0].name);
            });
        });

        it('should page with a pagesize of 10', function() {
            visitPhoneListPage(testData.manyPhones);
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonelist");
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(10);
                var loadNextButton = page.find('.loadNext');
                expect(loadNextButton.length).toEqual(1);
                loadNextButton.trigger('vclick');
            });
            waitsForAsync();
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonelist");
                var listEntries = page.find('li.phone');
                expect(listEntries.length).toEqual(testData.manyPhones.length);
                var loadNextButton = page.find('.loadNext');
                expect(loadNextButton.length).toEqual(0);

            });
        });

        it('should navigate to detail page when a phone is clicked', function() {
            visitPhoneListPage(testData.onePhone, testData.onePhoneDetail);
            runs(function() {
                var $ = testwindow().$;
                var page = $("#phonelist");
                var listEntries = page.find('li.phone a');
                var entry = $(listEntries[0]);
                entry.trigger('click');
            });
            waitsForAsync();
            runs(function() {
                var $ = testwindow().$;
                expect($.mobile.activePage.attr('id')).toEqual('phonedetail');
                var page = $("#phonedetail");
                var text = $.trim(page.find('h1').text());
                expect(text).toEqual(testData.onePhone[0].name);
            });


        });
    });


});
