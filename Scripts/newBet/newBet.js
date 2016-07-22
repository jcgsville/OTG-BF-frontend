(function () {
    "use strict";

    function newBetFactory($http) {

    	function loadCharityOptions() {
    		// $http({
    		// 	method: 'POST',
    		// 	url: 'https://api.backand.com/1/query/data/startSession?parameters=%7B%22email%22:%22jim.mouer@blackbaud.com%22,%22password%22:%22hunter2%22%7D',
    		// 	headers: {}
    		// }).then(function successCallback(response) {
    		// 	var temp = 
    		// }, function errorCallback(response) {

    		// });
    		return [
    		]
    	}



    }

    newBetFactory.$inject = ['$http']

    angular.module('betterBets.newBet', [])
        .factory('newBet', newBetFactory);
}());