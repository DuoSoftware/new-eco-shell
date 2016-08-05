angular.module('mainApp').controller('successPageCtrl', ['$scope', '$mdDialog', 'successObject', 'app', function ($scope, $mdDialog, successObject, app) {
    console.log(successObject);
    $scope.installedApp = app;
    $scope.status = "";
    $scope.Message = "";

    function getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        var monthNames = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        };

        var monthName = monthNames[mm];

        if (mm < 10) {
            mm = '0' + mm
        }



        today = monthName + ' ' + dd + ', ' + yyyy;
        $scope.TranDate = today;
    }
    getDate();


    if (successObject.hasOwnProperty("Error")) {
        $scope.status = "Error";
        //	$scope.Message = successObject.Message;
    } else {
        $scope.result = successObject;

        //successObject.TranDate = successObject.TranDate.slice(0, 10);
        //	successObject.Total = successObject.Total * -1;


        $scope.status = "Success";
    }


    $scope.ok = function () {
        $mdDialog.cancel();
        location.href = '#/market/home';
    };

}]);
