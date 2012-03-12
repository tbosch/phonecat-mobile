/*
 * Helper library to prevent the auto initialization of jquery.
 * Needed for unit tests.
 */
window.mobileinit = function() {
    $.extend($.mobile, {
        gradeA: function() {
            return false;
        },
        pageLoading: function() {
        }
    });
};
