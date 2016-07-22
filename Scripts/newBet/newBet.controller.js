(function () {
    "use strict";

    function newBetCtrl($http, betterBetsCommon) {
    	var self = this;

    	function init() {
    		self.description = "asdf";
    		self.expiration = null;
    		self.charity = null;
    		self.amount = null;
    		self.winCondition = null;
    	}

    	function createBet() {
    		$http({
    			method: 'GET',
    			url: betterBetsCommon("Organizations")
    		}).then(function successCallback(response) {
    			return response.data;
    		}, function errorCallback(response) {
    			var temp = "do nothing";
    		});
    	}

    	init();

    }

    newBetCtrl.$inject = ['$http', 'betterBetsCommon'];

    angular.module('betterBets.newBet')
        .controller('newBetController', newBetCtrl);

}());