angular.module('mainApp').controller('myappsCtrl', function ($scope, $state, $mdDialog, $window, $http, $uploader, notifications) {

    $scope.baseUrl = "http://" + window.location.hostname;
    $scope.selectedProduct = {};

    $http.get($scope.baseUrl + "/apps/")
        .success(function (data) {
            console.log(data);
            $scope.allApps = data;
        }).error(function () {
            console.log(data);
            $scope.showProgress = false;
        });

    $scope.viewMyApp = function (product) {

        $scope.myRating = {};
        $scope.myRating.stars = 0;

        console.log($scope.baseUrl + "/apis/marketplace/getAppByKey/" + product.ApplicationID);

        $http.get("/apis/marketplace/getAppByKey/" + product.ApplicationID)
            .success(function (data) {
                console.log(data);
                $scope.selectedProduct = data;

                $('.bxslider').bxSlider({
                    auto: true,
                    speed: 800
                });

            }).error(function (data) {
                console.log(data);
                //$scope.showProgress = false;
            });

        location.href = "#/myapps/myApp?id=" + product.ApplicationID;
    }

    $scope.closeMyApp = function () {
        var boxOne = document.getElementsByClassName('selected_product_card');
        // angular.element(boxOne).css('background-color', 'orange');
        angular.element(boxOne).addClass('scaleDown');
        setTimeout(function () {
            location.href = '#/myapps/display';
        }, 400);
    }


})
