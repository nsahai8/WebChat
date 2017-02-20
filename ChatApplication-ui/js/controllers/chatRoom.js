(function() {
    angular
        .module("WebChatApp")
        .controller("chatRoomCtrl", ['$scope', 'network_service', '$rootScope', '$http', '$location', '$routeParams', 'Pubnub',
            function($scope, network_service, $RS, $http, $location, $routeParams, Pubnub) {

                $scope.channel = 'niki.ai';
                $scope.userName = $RS.user;
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
                    $scope.chats = [];
                }

                $scope.startPrivateChat = function(user) {
                    $scope.chats = [];

                    

                    if ($scope.userName > user.emailId) {
                        $scope.channel = user.emailId + $scope.userName;
                    } else {
                        $scope.channel = $scope.userName + user.emailId;
                    }

                    Pubnub.subscribe({
                        channels: [$scope.channel]
                    });

                    $scope.isPrivate = true;
                    // $scope.chats.push(user);
                    $scope.receiver = user;
                    //retrieve prev messages
                    var data = {
                        sender: $scope.userName,
                        receiver: user.emailId
                    }
                    network_service.POST({
                        url: 'getAllMessageBetweenUsers',
                        data: data,
                        formPOST: true
                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.chats = response.data;
                            $scope.currentConversation = response.data;

                        }
                    })
                }

                $scope.removeChat = function() {
                    $scope.numberOfCoversation = 0;
                    $scope.receiver = null;
                    Pubnub.unsubscribe({
                        channels: [$scope.channel]
                    });
                }

                $scope.chooseChat = function(id) {
                    if (id === 'private') {
                        $scope.isPrivate = false;
                        $scope.message = null;
                        $scope.currentConversation = [];
                    }
                }

                $scope.sendMessage = function(sendMessage, sendTo) {
                    if (!sendMessage || sendMessage === '') {
                        return;
                    }

                    var params = {
                        message: sendMessage,
                        sender: $scope.userName,
                        receiver: sendTo.emailId
                    };


                    Pubnub.publish({
                            message: params,
                            channel: $scope.channel
                        },
                        function(status, response) {
                            if (status.error) {
                                // handle error
                                console.log("Error occured: " + status)
                            } else {
                                console.log("message Published w/ timetoken", response.timetoken)
                            }
                        }
                    );
                    network_service.GET({
                        url: 'saveMessage',
                        params: params

                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.message = null;
                            //pushing message in senders window
                            $scope.currentConversation.push(params);
                        }
                    });

                };

                $scope.splitString = function(input, splitChar, splitIndex) {
                    //if splitChar is not in input
                    if (input.indexOf(splitChar) == -1) {
                        return input;
                    }
                    return input.split(splitChar)[splitIndex];
                }

                var init = function() {

                    // if not able to get current user
                    var flag = 0;
                    for (var key in $scope.userName) {
                        if (hasOwnProperty.call($scope.userName, key)) {
                            flag = 1;
                        }
                    }
                    if (flag === 0) {
                        $location.path("login/");
                    }

                    network_service.POST({
                        url: 'getAllContacts',
                        data: {
                            sender: $scope.userName
                        },
                        formPOST: true

                    }).then(function(response) {
                        $scope.allUsers = response.data;
                    });


                    Pubnub.init({
                        subscribeKey: "sub-c-6e73ec4a-f5f4-11e6-ac91-02ee2ddab7fe",
                        publishKey: "pub-c-1fc67093-3d16-4e80-964a-1378a6b76c38",
                        ssl: true
                    });


                    // Subscribe to a channel
                    Pubnub.addListener({
                        status: function(statusEvent) {
                            if (statusEvent.category === "PNUnknownCategory") {
                                var newState = {
                                    new: 'error'
                                };
                                Pubnub.setState({
                                        state: newState
                                    },
                                    function(status) {
                                        console.log(statusEvent.errorData.message)
                                    }
                                );
                            }
                        },
                        message: function(message) {
                            if (message.message.sender != $scope.userName) {
                                $scope.currentConversation.push(message.message);
                            }

                        }
                    })




                };

                init();


            }
        ]);
}());