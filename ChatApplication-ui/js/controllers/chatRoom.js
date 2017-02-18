(function() {
    angular
        .module("WebChatApp")
        .controller("chatRoomCtrl", ['$scope', 'network_service', '$rootScope', '$http', '$location', '$routeParams',
            function($scope, network_service, $RS, $http, $location, $routeParams) {

                $scope.userName= $RS.user;
                $scope.numberOfCoversation = 0;
                $scope.allUsers = [];
                $scope.chats = [];

                $scope.isPrivate = false;
                $scope.currentConversation = [];


                $scope.startChat = function() {
                    if ($scope.numberOfCoversation === 0) {
                        $scope.numberOfCoversation = 1;
                    } else {

                    }
                    reset();
                };

                var reset = function() {
                    $scope.isPrivate = false;
                }

                $scope.startPrivateChat = function(user) {
                    $scope.isPrivate = true;
                    $scope.chats.push(user);
                    $scope.receiver = user;
                    //retrieve prev messages
                    var data = {
                        sender : $scope.userName,
                        receiver : user.emailId
                    }
                    network_service.POST({
                        url:'getAllMessageBetweenUsers',
                        data:data
                    }).then(function(response){
                        if(response.status === 200){
                            console.log(response.data);
                        }
                    })
                }

                $scope.removeChat = function() {
                    $scope.numberOfCoversation = 0;
                    $scope.receiver = null;
                }

                $scope.chooseChat = function(id) {
                    if (id === 'private') {
                        $scope.isPrivate = false;
                        $scope.message = null;
                        $scope.currentConversation = [];
                    }
                }

                $scope.sendMessage = function(sendMessage, sendTo) {

                    var params = {
                        message: sendMessage,
                        sender: $scope.userName,
                        receiver: sendTo.emailId
                    };
                    network_service.GET({
                        url: 'saveMessage',
                        params: params

                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.message = null;
                            $scope.currentConversation.push(params);
                        }
                    })
                };

                var init = function() {
                    // console.log($routeParams.user);
                    // if ($scope.numberOfCoversation === 0) {
                    //     $scope.allUsers.push({
                    //         email: "abc@gmail.com",
                    //         name: "abc"
                    //     });
                    //     $scope.allUsers.push({
                    //         email: "abc@gmail.com",
                    //         name: "abc1"
                    //     });
                    //     $scope.allUsers.push({
                    //         email: "abc@gmail.com",
                    //         name: "abc2"
                    //     });
                    //     $scope.allUsers.push({
                    //         email: "abc@gmail.com",
                    //         name: "abc3"
                    //     });
                    // }
                    network_service.POST({
                        url: 'getAllContacts',

                    }).then(function(response) {
                        console.log(response.data.length);
                        $scope.allUsers = response.data;
                    });
                };

                function publish() {

                    pubnub = new PubNub({
                        publishKey: 'pub-c-1fc67093-3d16-4e80-964a-1378a6b76c38',
                        subscribeKey: 'sub-c-6e73ec4a-f5f4-11e6-ac91-02ee2ddab7fe'
                    })

                    function publishSampleMessage() {
                        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
                        var publishConfig = {
                            channel: "hello_world",
                            message: "Hello from PubNub Docs!"
                        }
                        pubnub.publish(publishConfig, function(status, response) {
                            console.log(status, response);
                        })
                    }

                    pubnub.addListener({
                        status: function(statusEvent) {
                            if (statusEvent.category === "PNConnectedCategory") {
                                publishSampleMessage();
                            }
                        },
                        message: function(message) {
                            console.log("New Message!!", message);
                        },
                        presence: function(presenceEvent) {
                            // handle presence
                        }
                    })
                    console.log("Subscribing..");
                    pubnub.subscribe({
                        channels: ['hello_world']
                    });
                };

                init();


            }
        ]);
}());