angular.module('mainApp').config(function ($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================

    //        .state('', {
    //        url: '/',
    //        templateUrl: 'partials/market.html',
    //        parent: 'launcher.markerplace'
    //    })

        .state('launcher.marketplace.home', {
        url: '/home',
        templateUrl: 'home.html',
        //parent: 'launcher.marketplace'
    })

    .state('market.categories', {
        url: '/categories',
        templateUrl: 'categories.html'
    })

    .state('market.toprated', {
        url: '/toprated',
        templateUrl: 'partials/toprated.html'
    })

    .state('market.new_releases', {
        url: '/new_releases',
        templateUrl: 'partials/new_releases.html'
    })

    .state('market.product', {
        url: '/product?id',
        templateUrl: 'product.html',
        controller: 'viewProductCtrl'
    })

    .state('myapps', {
        url: '/myapps',
        templateUrl: 'myapps.html',
        controller: 'myappsCtrl'
    })

    .state('myapps.display', {
        url: '/display',
        templateUrl: 'myAppsDisplay.html'
    })

    .state('myapps.myApp', {
        url: '/myApp?id',
        templateUrl: 'partials/myApp.html'
    })

})
