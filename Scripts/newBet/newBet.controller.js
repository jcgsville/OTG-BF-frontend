(function () {
    "use strict";

    function newBetCtrl($scope, $http, betterBetsCommon) {
    	var self = this;

    	function init() {
    		self.description = "asdf";
    		self.expiration = null;
    		self.charity = null;
    		self.amount = null;
    		self.winCondition = null;
    	}

    	self.createBet = function() {
            $state.go('myBets');
    		// return $http({
    		// 	method: 'POST',
    		// 	url: betterBetsCommon.getWebUrl("api/PostChallenge"),
      //           data: {
      //               UserID: localStorage.getItem('betterBetsUserId'),
      //               OrganizationID: 1,
      //               Condition: self.winCondition,
      //               Challenge: self.description,
      //               Amount: self.amount,
      //               Expiration: self.expiration
      //           }
    		// }).then(function successCallback(response) {
    		// 	return response.data;
    		// }, function errorCallback(response) {
    		// 	var temp = "do nothing";
    		// 	return null;
    		// });
    	}

    	init();

    }

    newBetCtrl.$inject = ['$scope', '$http', 'betterBetsCommon'];

    angular.module('betterBets.newBet')
        .controller('newBetController', newBetCtrl);

}());