define(["js/ocxhr"], function(xhr) {

    function phones() {
        return xhr('phones/phones.json', {dataType:"json"});
    }

    function phone(id) {
        return xhr('phones/' + id + '.json', {dataType:"json"});
    }

    return {
        phones: phones,
        phone: phone
    }
});