define(["app/ocxhr"], function(xhr) {

    function phones() {
        return xhr.xhr('phones/phones.json', {dataType:"json"});
    }

    function phone(id) {
        return xhr.xhr('phones/' + id + '.json', {dataType:"json"});
    }

    return {
        phones: phones,
        phone: phone
    }
});