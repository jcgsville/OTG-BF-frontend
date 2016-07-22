(function () {
    "use strict";
    function flipClass(id1){
	    if ($("." + id1).hasClass('visibleHeader')){
	        $("."+ id1).addClass('hiddenHeader').removeClass('visibleHeader');
	    }
	    else{
	        $("."+ id1).addClass('visibleHeader').removeClass('hiddenHeader');
	    }
	}

    function signInCtrl($http, $state, betterBetsCommon) {
    	var self = this;

    	flipClass("better-bets-header");

    	self.username = null;
    	self.password = null;

    	self.signIn = function () {
    		$state.go("myBets");
    		// $http({
    		// 	method: "POST",
    		// 	url: betterBetsCommon.getWebUrl("api/signIn"),
    		// 	data: {
    		// 		username: self.username,
    		// 		password: self.password
    		// 	},
    		// 	headers: {
    		// 		'Content-Type': 'application/x-www-form-urlencoded'
    		// 	}
    		// }).then(function successCallback(response) {
    		// 	flipClass("better-bets-header");
    		// 	localStorage.setItem("betterBetsUserId", response.data.UserId);
    		// 	$state.go("myBets");
    		// 	return response.data;
    		// }, function errorCallback(response) {
    		// 	return null;
    		// });
    	}
    }

    signInCtrl.$inject = ['$http', '$state', 'betterBetsCommon'];

    angular.module('betterBets.signIn')
        .controller('signInController', signInCtrl);

}());