//duoworld-framework-shell-launcher-customapps-controller.js
(function () {
    var duoworldFrameworkShellLauncherCustomappsCtrl = function ($scope, $state, $stateParams, $rootScope, $presence, $auth, $apps, $helpers, $timeout, $mdDialog, $ocLazyLoad) {
        console.log('hello from custom app controller !'); //this should only execute once !
        $scope.defaultClassView = true;
        $scope.routedAppId = $stateParams.childAppID;
        $scope.routedAppName = $stateParams.childAppName;
        $rootScope.shellRoutedAppName = $scope.routedAppName;
        $scope.routedAppIconUri = $rootScope.opendAppIconUrl;
        console.log($scope.routedAppName);
        $scope.routedAppPosition = $rootScope.openedAppPosition;
        var renderElement = "idRenderDiv";
        //$("#" + renderElement).empty();
        $apps.onAppOpened(function (e, data) {
            $scope.runningApp = data;
        });
        $apps.onAppClosed(function (e, data) {
            if (!data.instance.isChild()) {
                $window.history.back();
            }
        });
        $apps.execute($scope, renderElement, $scope.routedAppId, function (message) {
            // alert(message);
            console.log(message);
        });
        var dwChildAppContainer = angular.element('.customeAppContainer');
        $scope.childApplicationClose = function () {
            var mainAppContainer = angular.element('.md-child-application-container');
            $rootScope.removeFromRunningApp(window.location.hash);
            mainAppContainer.css({
                'transform': 'scale(0)',
                'opacity': '0',
                'transform-origin': 'center bottom',
            });
            $timeout(function () {
                $state.go('dock');
            }, 50);
        };
        $scope.childApplicationMinimise = function () {
            $rootScope.addToRunningApp($scope.routedAppName, $scope.routedAppIconUri);
            $state.go('dock');
        };
        $scope.keepTitleBar = true;
        $scope.childApplicationTitleBarpin = function () {
            $scope.keepTitleBar = !$scope.keepTitleBar;
        };
    };
    duoworldFrameworkShellLauncherCustomappsCtrl.$inject = ['$scope', '$state', '$stateParams', '$rootScope', '$presence', '$auth', '$apps', '$helpers', '$timeout', '$mdDialog', '$ocLazyLoad'];
    angular.module('mambatiFrameworkShell').controller('duoworld-framework-shell-launcher-customapps-ctrl', duoworldFrameworkShellLauncherCustomappsCtrl);
})();
