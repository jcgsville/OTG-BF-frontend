(function () {
    "use strict";

    function signUpCtrl($http, betterBetsCommon) {
    	var self = this;

    	this.username = null;
    	this.email = null;
    	this.password = null;

    	this.signUp = function() {
    		$state.go("myBets");
    		// $http({
    		// 	method: 'POST',
    		// 	url: betterBetsCommon.getWebUrl('api/signUp'),
    		// 	data: {
    		// 		Name: this.username,
    		// 		Email: this.email,
    		// 		Password: this.password,
    		// 		Image: "abc"
    		// 	}
    		// }).then(function successCallback(response) {
    		// 	localStorage.setItem("betterBetsUserId", response.data.UserId);
    		// 	$state.go("myBets");
    		// 	return response.data;
    		// }, function errorCallback(response) {
    		// 	return null;
    		// });
    	}
    }

    signUpCtrl.$inject = ['$http', 'betterBetsCommon'];

    angular.module('betterBets.signUp')
        .controller('signUpController', signUpCtrl);

}());