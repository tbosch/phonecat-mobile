angular.service('phoneService', function(xhr) {
    function phones() {
        return xhr('phones/phones.json', {dataType:"json"});
    }

    return {
        phones: phones
    }

}, {$inject: ['ocxhr']});