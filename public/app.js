angular.module('chatt', [])
    .factory('messageSocket', function(){
        return {
            onNewMessage: function(callback){
                var socket = io.connect('/');
                socket.on('newMessage', callback);
            }
        };
    })
    .controller('MessagesController', function($scope, messageSocket, $http){
        $scope.messages = [];
        messageSocket.onNewMessage(function(msg){
            $scope.$apply(function(){
                $scope.messages.push(msg);
            });
        });
        
        $scope.sendMessage = function(){
            $http.post('/', {timestamp: new Date(), name: $scope.username, message: $scope.message});
            $scope.message = '';
        };
    });