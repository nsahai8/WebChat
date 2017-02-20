(function() {
    angular
        .module("WebChatApp")
        .config(["$httpProvider", "$routeProvider", function($httpProvider, $routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/loginPage.html',
                    controller: 'loginCtrl'
                })
                .when('/login', {
                    templateUrl: 'templates/loginPage.html',
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