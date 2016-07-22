(function () {
    "use strict";
    function betterBetsController() {
    	function doNothing() {
    		var temp = "nothing";
    	}
    }

    betterBetsController.$inject = [];

    angular.module('betterBets')
        .controller('betterBetsCtrl', betterBetsController);
})();
