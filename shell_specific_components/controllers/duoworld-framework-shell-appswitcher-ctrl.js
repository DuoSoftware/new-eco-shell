angular.module('mambatiFrameworkShell').controller('duoworld-framework-shell-appswitcher-ctrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {


    $scope.switchApp = function (app) {
        $mdDialog.hide(app);
    };

    $scope.selectedIndex = 0;

    $scope.itemClickHandler = function (item) {
        console.log('Item ' + item.title + ' was clicked');
    };
    $scope.close = function () {
        $mdDialog.cancel();
    };

}]);
