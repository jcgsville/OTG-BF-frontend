(function () {
    "use strict";

    function newBetCtrl() {
    	this.expiration = null;
    }

    newBetCtrl.$inject = [];

    angular.module('betterBets.newBet')
        .controller('newBetController', newBetCtrl);

}());