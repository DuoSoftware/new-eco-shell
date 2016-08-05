angular.module('mainApp').controller('searchCtrl', function ($scope, $mdDialog, $http) {
    console.log("start of searchCtrl");

    $scope.baseUrl = "";
    $scope.allApps = [];

    $scope.cancel = function () {
        $mdDialog.cancel();
    };


    $scope.goUp = function () {
        //angular.element('.searchContainer').scrollTo(0,0);
        $('#searchContainer').scrollTop(0);
        document.querySelector("#serach").focus();
        console.log("hit");
    }

    $scope.searchApps = function (keyword) {

        $scope.linearProgressShow = true;
        console.log(keyword);
        $scope.allApps = [];

        $http.get("/apis/marketplace/globSearch/" + keyword)
            .success(function (data) {
                console.log(data);
                data.forEach(function (item) {
                    if (item) { //If there is an app
                        if (!item.iconUrl) {
                            item.iconUrl = "img/standard.png"; //add a image url if it is not present
                        }
                        item.price = parseFloat(item.price); //convert price to a float

                        if (isNaN(item.price) == false && item.price > 0) //if price is a number and more than zero
                        {
                            item.Paid = "Paid"; //add Paid attribute is for sorting purpose
                        } else if (item.price == "Free" || item.price == 0) {
                            item.Paid = "Free"; //add Paid attribute is for sorting purpose
                        }

                        $scope.allApps.push(item);
                    }
                })
                console.log($scope.allApps);
                $scope.linearProgressShow = false;

            }).error(function (data) {
                console.log(data);
                $scope.linearProgressShow = false;
            });

    }

    $scope.viewProduct = function (product) {
        $mdDialog.hide(product);
    }

})
