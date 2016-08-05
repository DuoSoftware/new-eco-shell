angular.module('mainApp').controller('viewProductCtrl', function ($scope, $rootScope, $state, $mdDialog, $window, $http, $charge, notifications, $objectstore, $auth, $stateParams) {

    //Configuration for bxslider
    setTimeout(function () {
        $('.bxslider').bxSlider({
            auto: true,
            speed: 800
        });
    }, 100);
    //$auth.checkSession();

    $scope.id = $stateParams.id;

    $scope.buttonText = "";
    var price = "";

    $scope.initialize = function (app) {
        console.log(app);

        price = parseFloat(app.price);

        if (price !== 0) {
            $scope.buttonText = "$" + price + " Buy";
        } else {
            $scope.buttonText = "Install";
        }

        console.log("http://" + window.location.hostname + "/apps/" + $scope.id + "?meta=desc");

        $http.get("http://" + window.location.hostname + "/apps/" + $scope.id + "?meta=desc")
            .success(function (data) {
                console.log(data);
                if (data.appKey) {
                    $scope.buttonText = "Uninstall";
                }
            }).error(function (data) {
                console.log(data);
                //$scope.showProgress = false;
            });

    }

    $scope.rateApp = function (rate, app, ev) {
        //console.log(rate, app.appkey);
        var rating = {};
        rating.appkey = app.id;
        rating.userid = $scope.authObject.UserID;
        rating.stars = rate;
        rating.imageurl = $scope.profilePicture;
        rating.name = $scope.authObject.Name;

        $mdDialog.show({
            controller: 'rateCtrl',
            templateUrl: 'rate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                ratingObject: rating,
                appObject: app
            }
        }).then(function (response) {
            if (response) {
                $scope.allRatings.forEach(function (item) {
                    if (item.userid == response.userid) {
                        $scope.allRatings.splice(item, 1); //should replace
                    }
                })

                $scope.allRatings.push(response);

                $scope.myRating.title = response.title;
                $scope.myRating.description = response.description;
            }
        });
    }

    $scope.editRating = function (rate, app, ev) {


        var rating = {};
        rating.appkey = app.id;
        rating.userid = $scope.authObject.UserID;
        rating.stars = rate.stars;
        rating.title = rate.title;
        rating.description = rate.description;
        rating.imageurl = $scope.profilePicture;
        rating.name = $scope.authObject.Name;


        $mdDialog.show({
            controller: 'rateCtrl',
            templateUrl: 'partials/rate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                ratingObject: rating
            }
        }).then(function (response) {
            if (response) {
                for (i = 0; i < $scope.allRatings.length; i++) {
                    if ($scope.allRatings[i].userid == $scope.authObject.UserID) {
                        $scope.allRatings.splice(i, 1);
                    }
                }
                $scope.allRatings.push(rating);
            }
        });

    }

    $scope.deleteComment = function (ev, comment) {
        for (i = 0; i < $scope.allRatings.length; i++) {
            if ($scope.allRatings[i].userid == $scope.authObject.UserID) {
                $scope.allRatings.splice(i, 1);
            }
        }

        $scope.myRating = {};

        notifications.toast("Comment Deleted", "success");

        var req = {
            method: 'POST',

            url: "/apis/marketplace/deleteRating",

            headers: {
                'Content-Type': 'application/json'
                    // 'SecurityKey' : $auth.getSecurityToken()
            },

            data: comment

        };

        $http(req).then(function (data) {
                //comment was submitted
                console.log(data);
            },
            function (data) {
                notifications.toast("Your comment could not be deleted, Please try again", "error");

            });
    }

    var newCard = function (ev, acc, app) {
        $mdDialog.show({
            controller: "addCardCtrl",
            templateUrl: 'partials/newCard.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            locals: {
                cardObject: "",
                account: acc
            }
        }).then(function (response) {
            if (response)
                showCards(ev, response, app);
        });
    }

    var showCards = function (ev, acc, app) {
        $mdDialog.show({
            controller: "myCardsCtrl",
            templateUrl: 'partials/myCards.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            locals: {
                account: acc,
                app: app
            }
        }).then(function (response) {
            if (response.purchase === false) {
                newCard(response.event, response.account, response.app);
            }
        });
    }

    $scope.download = function (app, ev) {

        if (app.price != 0) {
            $rootScope.showGlobalProgress = true;
            notifications.toast("Checking for cards, please wait", "success");
            $charge.payment().getAccounts().success(function (data) {
                $rootScope.showGlobalProgress = false;
                if (Array.isArray(data) && data.length > 0)
                    showCards(ev, data[0], app);
                else
                    newCard(ev, null, app);
            }).error(function (data) {
                console.log(data);
            })


        } else {

            $http({
                method: 'GET',
                url: "/apis/marketplace/install/" + app.id
                    //url:"http://duoworld.com/apps/" + app.id + "?install=" + window.location.hostname
            }).success(function (data) {
                console.log(data);

                var confirm = $mdDialog.confirm()
                    .title('Install')
                    .content('You have successfully installed the ' + app.name + '!')
                    .targetEvent(ev)
                    .ok('Ok')
                $mdDialog.show(confirm).then(function () {
                    location.href = '#/market/home';
                });

                if (window.parent.dwShellController.refreshApps)
                    window.parent.dwShellController.refreshApps();
            }).error(function (data) {
                notifications.alertDialog("Installation Error", "There was an error installing this application, Please try again later.");
            })

        } //Free app installation

    }

    $scope.uninstall = function (app, ev) {
        console.log("/apps/" + app.id + "?uninstall=" + $auth.getUserName());

        $http({
            method: 'GET',
            url: "/apps/" + app.id + "?uninstall=" + $auth.getUserName()
        }).success(function (data) {
            console.log(data);
            notifications.toast("This app was successfully deleted", "success");
            location.href = '#/market/home';
            if (window.parent.dwShellController.refreshApps)
                window.parent.dwShellController.refreshApps();
        }).error(function (data) {
            notifications.toast("There was an error deleting this app, Please try again", "error");
        })
    }

})
