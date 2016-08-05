//duoworld-framework-shell-launcher-controller.js
(function () {
    var duoWorldFrameworkShellLauncherCtrl = function ($scope, $state, $rootScope, $presence, $auth, $apps, $helpers, $ocLazyLoad) {
        console.log('This is the launcher controller');
        $scope.childApplicationClose = function () {
            $state.go('dock');
        };
        $scope.childApplicationMinimise = function () {
            $state.go('dock');
        };
    }
    duoWorldFrameworkShellLauncherCtrl.$inject = ['$scope', '$state', '$rootScope', '$presence', '$auth', '$apps', '$helpers', '$ocLazyLoad'];
    angular.module('mambatiFrameworkShell').controller('duoworld-framework-shell-launcher-ctrl', duoWorldFrameworkShellLauncherCtrl);
})();