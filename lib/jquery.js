define('lib/jquery', function() {
    if (typeof window !== 'undefined') {
        return window.$;
    }
});
