(function () {
    "use strict";

    function betterBetsConfig($httpProvider, $stateProvider, $urlRouterProvider, $compileProvider, bbViewKeeperConfig) {

        //initialize default get
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        //disable ajax request caching
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        // set the view keeper to not leave room for Omnibar when scrolling
        bbViewKeeperConfig.hasOmnibar = false;

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('myBets', {
                url: '/myBets',
                templateUrl: 'Partials/myBets.html',
                controller: 'myBetsController as myBetsCtrl'
            })
            .state('newBet', {
                url: '/newBet',
                templateUrl: 'Partials/newBet.html',
                controller: 'newBetController as newBetCtrl'
            })
            .state('signIn', {
                url: '/signIn',
                templateUrl: 'Partials/signIn.html',
                controller: 'signInController as signInCtrl'
            })
            .state('signUp', {
                url: '/signUp',
                templateUrl: 'Partials/signUp.html',
                controller: 'signUpController as signUpCtrl'
            });
        
        // $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        // $httpProvider.defaults.headers.put = {};
        // $httpProvider.defaults.headers.patch = {};
    }

    betterBetsConfig.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$compileProvider', 'bbViewKeeperConfig'];

    function betterBetsRun($state, $rootScope, $location, $window, bbData, bbWait) {
        var isWaiting = false;
        
        // for setting the active state of nav items
        $rootScope.$state = $state;

        $rootScope.$on("bbBeginWait", function (e, opts) {
            e.stopPropagation();
            if (!isWaiting) {
                isWaiting = true;
                bbWait.beginPageWait(opts);
            }
        });

        $rootScope.$on("bbEndWait", function (e, opts) {
            e.stopPropagation();
            if (isWaiting) {
                isWaiting = false;
                bbWait.endPageWait(opts);
            }
        });
    }
     
    betterBetsRun.$inject = ['$state', '$rootScope', '$location', '$window', 'bbData', 'bbWait'];

    angular.module('betterBets')
        .config(betterBetsConfig)
        .run(betterBetsRun);
})();
