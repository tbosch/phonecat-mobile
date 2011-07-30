define(['lib/jasmine', 'lib/jquery'], function(jasmine, $) {
    var ajaxSpy = jasmine.createSpy();
    var updateViewSpy = jasmine.createSpy();

    define('lib/jqm-ng', function() {
        return {
            updateView: updateViewSpy
        };
    });

    define('lib/jquery', function() {
        return {
            ajax: ajaxSpy
        };
    });

    require({context: 'ocxhrSpec'}, ['js/ocxhr', 'lib/jquery'], function(ocxhr) {
        describe('ocxhr', function() {
            beforeEach(function() {
                ajaxSpy.reset();
                updateViewSpy.reset();
            });
            it('should call jquery.ajax', function() {
                var jqueryRes = $.Deferred();
                ajaxSpy.andReturn(jqueryRes);
                var testOptions = {};
                var res = ocxhr('testurl', testOptions);
                expect(ajaxSpy).toHaveBeenCalledWith('testurl', testOptions);
                expect(res).toBe(jqueryRes);
            });

            it('should call updateView', function() {
                var jqueryRes = $.Deferred();
                ajaxSpy.andReturn(jqueryRes);
                ocxhr('testurl');
                expect(updateViewSpy).not.toHaveBeenCalled();
                jqueryRes.resolve();
                expect(updateViewSpy).toHaveBeenCalled();
            });
        });
    });
});
