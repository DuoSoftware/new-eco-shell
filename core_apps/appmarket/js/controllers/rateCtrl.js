angular.module('mainApp').controller('rateCtrl', function ($scope, $mdDialog, ratingObject, $auth, $http, notifications) {
    $scope.ratingObject = ratingObject;
    $scope.ratingObject.title = ratingObject.title;
    $scope.ratingObject.description = ratingObject.description;

    $scope.cancel = function () {
        $mdDialog.hide();
    }

    $scope.submit = function () {

        var req = {
            method: 'POST',

            url: "/apis/marketplace/addRating",

            headers: {
                'Content-Type': 'application/json'
                    // 'SecurityKey' : $auth.getSecurityToken()
            },

            data: $scope.ratingObject

        };
        console.log(req);

        //$scope.allRatings.push($scope.ratingObject);

        $http(req).then(function (data) {
                //comment was submitted
            },
            function (data) {
                notifications.toast("Your comment could not be submitted, Please try again", "error");

            });
        notifications.toast("Thanks for giving your comments", "success");
        $mdDialog.hide($scope.ratingObject);

    }


})
