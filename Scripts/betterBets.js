(function () {
    "use strict";

    function betterBetsCommon() {

        function getWebUrl(endpoint) {
            return "http://localhost:58949/" + endpoint;
        }

        return {
            getWebUrl: getWebUrl
        };
    }

    betterBetsCommon.$inject = [];

    angular.module('betterBets', [
                'sky',
                'ui.bootstrap',
                'ui.router',
                'betterBets.myBets',
                'betterBets.newBet',
                'betterBets.signIn',
                'betterBets.signUp'
    ])
    .factory('betterBetsCommon', betterBetsCommon);
}());