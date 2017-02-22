(function() {
    angular
        .module("WebChatApp")
        .controller("chatRoomCtrl", ['$scope', 'network_service', '$rootScope', '$http', '$location', '$routeParams', 'Pubnub','$timeout',
            function($scope, network_service, $RS, $http, $location, $routeParams, Pubnub,$timeout) {

                $scope.channel = 'niki.ai';
                $scope.userName = $RS.user;
                $scope.numberOfCoversation = 0;
                $scope.allUsers = [];
                $scope.chats = [];

                $scope.isPrivateStarted = false;
                $scope.isGroupChat = false;
                $scope.currentConversation = [];


                $scope.startChat = function() {
                    if ($scope.numberOfCoversation === 0) {
                        $scope.numberOfCoversation = 1;
                    } else {

                    }
                    reset();
                };

                var reset = function() {
                    $scope.isPrivateStarted = false;
                    $scope.chats = [];
                }

                $scope.startPrivateChat = function(user) {
                    Pubnub.unsubscribe({
                        channels: [$scope.channel]
                    });
                    $scope.chats = [];

                    if ($scope.userName > user.emailId) {
                        $scope.channel = user.emailId + $scope.userName;
                    } else {
                        $scope.channel = $scope.userName + user.emailId;
                    }

                    Pubnub.subscribe({
                        channels: [$scope.channel]
                    });

                    $scope.isPrivateStarted = true;
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
                    });
                    $scope.animateScroll();
                }

                $scope.animateScroll = function() {
                    
                    $timeout(function() {
                        $('#chatBox').animate({
                            scrollTop: 300
                        }, 'slow');
                    }, 0);
                }

                $scope.removeChat = function() {
                    $scope.numberOfCoversation = 0;
                    $scope.receiver = null;
                    Pubnub.unsubscribe({
                        channels: [$scope.channel]
                    });
                }

                $scope.chooseChat = function(id) {
                    $scope.isPrivateStarted = false;
                    $scope.message = null;
                    if (id === 'private') {
                        $scope.isGroupChat = false;
                        $scope.currentConversation = [];
                        return;
                    }
                    $scope.isGroupChat = true;
                    $scope.getAllGroups();
                }

                $scope.getAllGroups = function() {
                    network_service.GET({
                        url: 'getAllGroupNames',
                        params: {
                            member: $scope.userName
                        }

                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.groupList = response.data;
                        }
                    })
                }

                $scope.startGroupChat = function(groupName) {
                    Pubnub.unsubscribe({
                        channels: [$scope.channel]
                    });

                    if ($scope.channel != 'niki.ai') {
                        $scope.channel = 'niki.ai';
                    }

                    Pubnub.subscribe({
                        channels: [$scope.channel]
                    });



                    $scope.isPrivateStarted = true;
                    network_service.POST({
                        url: 'getAllGroupByName',
                        data: {
                            name: groupName
                        },
                        formPOST: true
                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.groupName = groupName;
                            if (response.data.messageUserList != null) {
                                $scope.currentConversation = response.data.messageUserList;
                            }
                        } else {
                            $scope.currentConversation = [];
                        }
                    });
                    $scope.animateScroll();
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
                            $scope.animateScroll();
                        }
                    });

                };

                $scope.sendMessageInGroup = function(sendMessage) {
                    if (!sendMessage || sendMessage === '') {
                        return;
                    }
                    var params = {
                        message: sendMessage,
                        sender: $scope.userName,
                        receiver: 'group'
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
                        url: 'saveGroupMessage',
                        params: {
                            'groupName': $scope.groupName,
                            'message': sendMessage,
                            'sender': $scope.userName
                        }
                    }).then(function(response) {
                        $scope.message = null;
                        $scope.currentConversation.push(params);
                        $scope.animateScroll();
                    })
                }

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







                };

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
                            $scope.$apply();
                            $scope.animateScroll();
                        }

                    }
                });

                init();


            }
        ]);
}());