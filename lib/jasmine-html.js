define(['lib/global!lib/impl/jasmine-html:lib/jasmine,lib/jquery'], function() {
    $(function() {
        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        jasmine.getEnv().execute();
    });
});