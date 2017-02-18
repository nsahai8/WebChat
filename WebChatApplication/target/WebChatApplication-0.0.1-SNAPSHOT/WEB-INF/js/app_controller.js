    (function() {
    angular
        .module("WebChatApp")
        .controller('WebChatAppCtrl', ['$scope', '$rootScope', '$location', 'network_service', '$log', '$http', '$timeout',
            function($scope, $RS, $location, network_service, $log, $http, $timeout) {
                var _this = this;
                $scope.isLoading = 0;


                $scope.data = {};

                $scope.popUpMessageDetails = {};
                $scope.popUpMessageDetails.typeOfMessage = {};
                $scope.popUpMessageDetails.message = {};
                $scope.popUpMessageDetails.tittle = {};
                $scope.popUpMessageDetails.statusCode = {};
                $RS.isAuthenticated = false;

                

                $scope.init = function() {
                	console.log("in app controller");
                    //_this.getUser();
                    // $scope.$watch('isLoading', function(curr, prev) {
                    //     console.log("isLoading Count : " + curr);
                    // });

                };

                this.getUser = function() {
                    $RS.user = {};
                    network_service.GET({
                        url: 'user',
                        silent: true
                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.setUserData(response.data);
                        } else if (response.status === 401) {
                            $RS.isAuthenticated = false;
                            localStorage.setItem('location', '');
                            var path = $location.path();
                            if (!(path.indexOf('login') !== -1 || path.indexOf('signUp') !== -1 || path.indexOf('error') !== -1)) {
                                // set path to login
                                window.location.href = "#login";
                            }
                        }
                    });
                };

                $scope.setUserData = function(user) {
                    $timeout(function() {
                        $RS.user = user;
                        $RS.user.roles = $scope.toObject($RS.user.roles);
                        $scope.getNavBarLabel();
                        $RS.$broadcast('user');
                    }, 50);
                };

                

                $scope.logoutUser = function() {
                    network_service.POST({
                        url: 'logout',
                    }).then(function(response) {
                        if (response.status === 200) {
                            $RS.isAuthenticated = false;
                            $RS.user = {};
                            localStorage.setItem("location", "");
                            window.location.href = "#login";
                        }
                    });
                };

                $RS.showLoading = function() {
                    $("#preloaderdiv").css('top', window.pageYOffset + "px");
                    $scope.isLoading = $scope.isLoading + 1;
                    $("body", "html").css('overflow', 'hidden');
                };

                $RS.hideLoading = function() {
                    $scope.isLoading = ($scope.isLoading === 0) ? 0 : ($scope.isLoading - 1);
                    if ($scope.isLoading === 0)
                        $("body", "html").css('overflow', 'auto');
                };

                $scope.init();
            }
        ]);
})();