define(function() {
    var ajaxSpy = jasmine.createSpy();
    var updateViewSpy = jasmine.createSpy();

    define('$updateView', function() {
        return updateViewSpy;
    });

    define('$ajax', function() {
        return ajaxSpy;
    });

    require({context: 'ocxhrSpec'}, ['js/ocxhr'], function(ocxhr) {
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
