(function() {
    angular
        .module('AssortmentApp')
        .run(["$route", "$rootScope", "$location", "$log", "$templateCache", "authentication_service", "$timeout",
            function($route, $rootScope, $location, $log, $templateCache, authentication_service, $timeout) {

        		console.log("in app run js");
                // register listener to watch route changes
                $rootScope.$on("$routeChangeStart", function(event, next, current) {

                    // Handling Cache issue
                    if (typeof(current) !== 'undefined') {
                        $templateCache.remove(current.templateUrl);
                    }

                    // Handling default redirection on page refresh
                    if ($rootScope.user && $rootScope.user.hasOwnProperty('userName')) {
                        if (next.$$route && next.$$route.templateUrl == "templates/login.html") {
                            // Stop redirection to login as session is still valid
                            $location.path(localStorage.getItem("location"));
                        }

                        if (next.$$route && next.$$route.templateUrl !== "templates/login.html") {
                            var locationHash = next.$$route.originalPath;
                            var params = next.params;
                            if (locationHash) {
                                localStorage.setItem("location", locationHash);
                                localStorage.setItem("params", JSON.stringify(params));
                            }
                            // Event to set the selected tab
                            $rootScope.$broadcast('do-tab-selection');
                        }
                    }
                });

                $rootScope.$on('$locationChangeStart', function(event, next, current) {
                    $log.info("location changing to: " + next);
                });

                $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
                    //     $rootScope.hideLoading();
                });
            }
        ]);
})();