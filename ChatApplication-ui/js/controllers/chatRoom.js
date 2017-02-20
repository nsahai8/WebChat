(function() {
    angular
        .module("WebChatApp")
        .controller("chatRoomCtrl", ['$scope', 'network_service', '$rootScope', '$http', '$location', '$routeParams',
            function($scope, network_service, $RS, $http, $location, $routeParams) {

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

                    $scope.isPrivate = true;
                    $scope.chats.push(user);
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
                    Pubnub.ngUnsubscribe({channel:$scope.channel});
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
                    /*PUBNUB.publish({
                        channel: $scope.channel,
                        message: {
                            content: sendMessage,
                            sender_uuid: $scope.uuid,
                            date: new Date()
                        },
                        callback: function(m) {
                            console.log(m);
                            console.log("message Sent");
                        }
                    });*/
/*
                    Pubnub.ngPublish({
                        channel: $scope.channel,
                        message: sendMessage
                    });
*/

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

                $scope.splitString = function(input, splitChar, splitIndex) {
                    // do some bounds checking here to ensure it has that index
                    return input.split(splitChar)[splitIndex];
                }

                var init = function() {

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
                        //console.log(response.data.length);
                        $scope.allUsers = response.data;
                    });
                    $scope.uuid = _.random(100).toString();
                    /*var PUBNUB_demo = Pubnub.init({
                        publish_key: 'pub-c-1fc67093-3d16-4e80-964a-1378a6b76c38',
                        subscribe_key: 'sub-c-6e73ec4a-f5f4-11e6-ac91-02ee2ddab7fe',
                        uuid: $scope.uuid
                    });*/

                    //receive messages

                    /*
                                        // Subscribing to the ‘messages-channel’ and trigering the message callback
                                        PUBNUB.subscribe({
                                            channel: $scope.channel,
                                            // triggerEvents: ['callback'],
                                            withPresence: true,
                                            triggerEvents: ['message', 'presence', 'status'],
                                            callback: function(message) {
                                                console.log(message);
                                            },
                                            error: function(err) { console.log("Error in Sending Message: " + err); }
                                        });*/

                    /* // Listening to the callbacks
                     $RS.$on(PUBNUB.getMessageEventNameFor($scope.channel), function(ngEvent, m) {
                         $scope.$apply(function() {
                             // $scope.messages.push(m)
                             console.log(m);
                         });
                     });*/

                    // $RS.$on(PUBNUB.getEventNameFor('publish', 'callback'),
                    //     function(ngEvent, payload) {
                    //         $scope.$apply(function() {
                    //             console.log("here-----");
                    //         });
                    //     });
                    // $RS.$on(PUBNUB.getPresenceEventNameFor($scope.selectedChannel), function(ngEvent, pnEvent, envelope, channel) {
                    //     // apply presence event (join|leave) on users list
                    //     handlePresenceEvent(pnEvent);
                    // });
                    /*$rootScope.$on(Pubnub.getMessageEventNameFor($scope.selectedChannel), function(ngEvent, envelope) {
                        $scope.$apply(function() {
                            // add message to the messages list
                            $scope.chatMessages.unshift(envelope.message);
                        });
                    });*/

                    /*// A function to display a nice uniq robot avatar 
                    $scope.avatarUrl = function(uuid) {
                        return 'http://robohash.org/' + uuid + '?set=set2&bgset=bg2&size=70x70';
                    };*/

                    // Pubnub.ngSubscribe({ channel: $scope.channel })
                    // $RS.$on(Pubnub.ngMsgEv(theChannel), function(event, payload) {
                    //     // payload contains message, channel, env...
                    //     console.log('got a message event:', payload);
                    // })
                };


                function publish() {

                    pubnub = new PUBNUB({
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