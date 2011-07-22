describe('ocxhr', function() {
    it('should call jquery.ajax', function() {
        var jqueryRes = $.Deferred();
        var ajaxSpy = spyOn($, 'ajax').andReturn(jqueryRes);
        var updateViewSpy = jasmine.createSpy();
        var ocxhr = angular.service('ocxhr')(updateViewSpy);
        var testOptions = {};
        var res = ocxhr('testurl', testOptions);
        expect(ajaxSpy).toHaveBeenCalledWith('testurl', testOptions);
        expect(res).toBe(jqueryRes);
    });

    it('should call updateView', function() {
        var jqueryRes = $.Deferred();
        var ajaxSpy = spyOn($, 'ajax').andReturn(jqueryRes);
        var updateViewSpy = jasmine.createSpy();
        var ocxhr = angular.service('ocxhr')(updateViewSpy);
        ocxhr('testurl');
        expect(updateViewSpy).not.toHaveBeenCalled();
        jqueryRes.resolve();
        expect(updateViewSpy).toHaveBeenCalled();
    });

});