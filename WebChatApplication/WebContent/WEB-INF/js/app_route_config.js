(function() {
    angular
        .module("WebChatApp")
        .config(["$httpProvider", "$routeProvider", function($httpProvider, $routeProvider) {
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.interceptors.push('http_request');
            // $httpProvider.interceptors.push('http_request_error');
            $httpProvider.interceptors.push('http_response');
            $httpProvider.interceptors.push('http_response_error');

            $routeProvider
                .when('/', {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl'
                })
                .when('/login', {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl',
                    resolve: {
                        "authentication": function(authentication_service) {
                            return authentication_service.isAuthenticated();
                        }
                    }
                })
                .when('/search/diversity', {
                    templateUrl: 'templates/search/diversity.html',
                    controller: 'diversityCtrl',
                    reloadOnSearch: false
                })
                .otherwise({
                    redirectTo: '/errorPage'
                });
        }]);
})();