(function() {
    angular
        .module('WebChatApp')
        .factory('EP', ['$location', function($location) {
            return {
                getAPIEndpoint: function() {
                    if ($location.host().indexOf("localhost") > -1) {

                        // return "http://localhost:8080/WebChatApplication/";
                        // return "http://localhost:8080/WebChatApplication-0.0.1-SNAPSHOT/";
                        return "http://54.191.242.154:8080/WebChatApplication-0.0.1-SNAPSHOT/";
                    }
                    return $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/WebChatApplication-0.0.1-SNAPSHOT/";
                }
            }
        }]);
})();