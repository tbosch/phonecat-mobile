
define('jquery-mobile-noinit', ['lib/global!lib/impl/jquery.mobile.noinit:lib/jquery']);

define('lib/jquery-mobile', ['lib/global!lib/impl/jquery.mobile-1.0b1-oc2:lib/jquery,jquery-mobile-noinit'], function(libs) {
    // We want to return that what the jquery mobile module returns.
    return libs[2];
});

require([
    "lib/jasmine-html",
    "lib/jqm-ng",
    "unit/ocxhrSpec",
    "unit/phoneServiceSpec",
    "unit/PhoneListCtrlSpec",
    "unit/PhoneDetailCtrlSpec"
]);


