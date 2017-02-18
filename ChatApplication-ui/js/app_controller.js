(function() {
    angular
        .module("WebChatApp")
        .controller('WebChatAppCtrl', ['$scope', '$rootScope', '$location', 'network_service', '$log', '$http', '$timeout',
            function($scope, $RS, $location, network_service, $log, $http, $timeout) {
                var _this = this;
                $RS.user={};

                $scope.init = function() {
                    // _this.getUser();
                    // $scope.$watch('isLoading', function(curr, prev) {
                    //     console.log("isLoading Count : " + curr);
                    // });
                    console.log("app controller")

                };

                this.getUser = function() {
                    // $RS.user = {};
                    // network_service.GET({
                    //     url: 'user',
                    //     silent: true
                    // }).then(function(response) {
                    //     if (response.status === 200) {
                    //         $scope.setUserData(response.data);
                    //     } else if (response.status === 401) {
                    //         $RS.isAuthenticated = false;
                    //         localStorage.setItem('location', '');
                    //         var path = $location.path();
                    //         if (!(path.indexOf('login') !== -1 || path.indexOf('signUp') !== -1 || path.indexOf('error') !== -1)) {
                    //             // set path to login
                    //             window.location.href = "#login";
                    //         }
                    //     }
                    // });
                };

                $scope.setUserData = function(user) {
                    // $timeout(function() {
                    //     $RS.user = user;
                    //     $RS.user.roles = $scope.toObject($RS.user.roles);
                    //     $scope.getNavBarLabel();
                    //     $RS.$broadcast('user');
                    // }, 50);
                };

                

                
                $scope.init();
            }
        ]);
})();