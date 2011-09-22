define(['lib/jasmine', 'lib/jquery', 'require', 'app/ocxhr'], function(jasmine, $, require) {
    describe('ocxhr', function() {
        var ocxhr, ajaxSpy, updateViewSpy;
        beforeEach(function() {
            ajaxSpy = jasmine.createSpy();
            updateViewSpy = jasmine.createSpy();
            var ocxhrFactory = require.factories['app/ocxhr'];
            ocxhr = ocxhrFactory({updateView: updateViewSpy}, {ajax: ajaxSpy});
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
