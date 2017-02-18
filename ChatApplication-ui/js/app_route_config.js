(function() {
    angular
        .module("WebChatApp")
        .config(["$httpProvider", "$routeProvider", function($httpProvider, $routeProvider) {
            /*$httpProvider.defaults.withCredentials = true;
            $httpProvider.interceptors.push('http_request');
            // $httpProvider.interceptors.push('http_request_error');
            $httpProvider.interceptors.push('http_response');
            $httpProvider.interceptors.push('http_response_error');*/

            $routeProvider
                .when('/', {
                    templateUrl: 'templates/example.html',
                    controller: 'loginCtrl'
                })
                .when('/chatRoom', {
                    templateUrl: 'templates/chatRoom.html',
                    controller: 'chatRoomCtrl'
                })
                .when('/errorPage', {
                    templateUrl: 'templates/errorPage.html'
                })
                .otherwise({
                    redirectTo: '/errorPage'
                });
        }]);
})();