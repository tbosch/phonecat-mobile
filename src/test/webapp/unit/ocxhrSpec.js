define(['lib/jasmine', 'lib/jquery', 'lib/jqm-ng', 'app/ocxhr'], function(jasmine, $, jqmng, ocxhr) {
    describe('ocxhr', function() {
        var ajaxSpy, updateViewSpy;
        beforeEach(function() {
            ajaxSpy = spyOn($, 'ajax');
            updateViewSpy = spyOn(jqmng, 'updateView');
        });
        it('should call jquery.ajax', function() {
            var jqueryRes = $.Deferred();
            ajaxSpy.andReturn(jqueryRes);
            var testOptions = {};
            var res = ocxhr.xhr('testurl', testOptions);
            expect(ajaxSpy).toHaveBeenCalledWith('testurl', testOptions);
            expect(res).toBe(jqueryRes);
        });

        it('should call updateView', function() {
            var jqueryRes = $.Deferred();
            ajaxSpy.andReturn(jqueryRes);
            ocxhr.xhr('testurl');
            expect(updateViewSpy).not.toHaveBeenCalled();
            jqueryRes.resolve();
            expect(updateViewSpy).toHaveBeenCalled();
        });
    });
});
