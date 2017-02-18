(function() {
    angular
        .module("WebChatApp")
        .controller("loginCtrl", ['$scope', 'network_service', '$rootScope', '$http','$location','$routeParams',
            function($scope, network_service, $RS, $http,$location,$routeParams) {
            
                $scope.isError = false;

                $scope.loginUser = function() {

                    network_service.GET({
                         url: 'login',
                         params:{
                                  email:$scope.email
                                 }
                         }).then(function(response) {
                         if (response.status === 200) {
                            console.log(response.data);

                             if(response.data === true){
                                $routeParams.user = $scope.email;
                                $RS.user = $scope.email;
                                
                                $location.path("chatRoom/");
                             }else{
                                $scope.isError = true;
                             }
                         }
                     });
                };


            }
        ]);
}());