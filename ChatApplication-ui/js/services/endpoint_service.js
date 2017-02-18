(function() {
    angular
        .module('WebChatApp')
        .factory('EP', ['$location', function($location) {
            return {
                getAPIEndpoint: function() {
                    if ($location.host().indexOf("localhost") > -1) {

                        // return "http://localhost:8080/assortment-api/";

                        //Gaurav
                        // return "http://10.20.58.125:7080/assortment-api/";

                        //Bhandari
                        // return "http://10.20.79.124:8081/AssortmentAPI/";

                        //Production
                        return "http://localhost:8080/WebChatApplication/";
                    }
                    return $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/WebChatApplication/";
                }
            }
        }]);
})();