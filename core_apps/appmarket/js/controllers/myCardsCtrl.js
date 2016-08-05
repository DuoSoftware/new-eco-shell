angular.module('mainApp').controller('myCardsCtrl', function ($scope, $rootScope, $mdDialog, $charge, account, app, notifications, $mdMedia) {

    $scope.disablePayBtn = false;

    $scope.account = account; // get users account which contains the cards
    $scope.appDetails = app;

    for (i = 0, len = $scope.account.AccountCards.length; i < len; ++i) {
        //console.log($scope.cards.AccountCards[i]);
        if ($scope.account.AccountCards[i].CardType == "Master" || $scope.account.AccountCards[i].CardType == "Master Card") {
            $scope.account.AccountCards[i].cardImage = "img/master_s.png";
        } else if ($scope.account.AccountCards[i].CardType == "Visa") {
            $scope.account.AccountCards[i].cardImage = "img/visa_s.png";
        } else if ($scope.account.AccountCards[i].CardType == "Amex" || $scope.account.AccountCards[i].CardType == "American Express") {
            $scope.account.AccountCards[i].cardImage = "img/amex_s.png";
        }
    }

    $scope.cancel = function () {
        $mdDialog.hide();
    }

    $scope.newCard = function (ev) {
        $mdDialog.hide({
            purchase: false,
            event: ev,
            account: account,
            app: app
        });
    }

    $scope.selectCard = function (index, account) {
        $scope.selectedAccount = account;

        angular.element('.cards').css('background', 'transparent');
        angular.element('#card' + index).css('background', '#bccdb8'); //highlight the selected card

    }

    $scope.editCard = function (ev, card) {
        $mdDialog.show({
                controller: 'addCardCtrl',
                templateUrl: 'partials/newCard.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                locals: {
                    cardObject: card,
                    account: $scope.account
                }
            })
            .then(function (answer) {
                if (answer) //show my cards if user edit the card only
                {
                    $mdDialog.show({
                        controller: "myCardsCtrl",
                        templateUrl: 'partials/myCards.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        locals: {
                            account: answer,
                            app: app
                        }
                    });
                }
            });

    }

    $scope.showAgreement = function (ev) {
        $mdDialog.show({
                controller: 'agreementCtrl',
                templateUrl: 'partials/agreement.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function (answer) { //show myCards after user closes agreement
                $mdDialog.show({
                    controller: "myCardsCtrl",
                    templateUrl: 'partials/myCards.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        account: account,
                        app: app
                    }
                });
            });
    }

    $scope.submit = function () {
        if ($scope.agree === true && $scope.selectedAccount) {
            $scope.disablePayBtn = true;
            $rootScope.showGlobalProgress = true;

            var paystrip = {
                "AccountId": account.AccountId,
                "Cards": $scope.selectedAccount,
                "Items": [{
                    "ItemRefID": app.id,
                    "ItemType": "App",
                    "Description": app.description,
                    "UnitPrice": parseFloat(app.price),
                    "UOM": "Unit",
                    "Qty": 1,
                    "Subtotal": parseFloat(app.price),
                    "Discount": 0,
                    "Tax": 0,
                    "TotalPrice": parseFloat(app.price),
                    "TaxDetails": ""
    			}]
            }
            console.log(paystrip);


            $charge.payment().pay(paystrip).success(function (data) { //make payment
                console.log(data);
                if (data.Error === true) {
                    notifications.alertDialog("Payment Error", data.Message);
                } else {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

                    $mdDialog.show({
                        controller: "successPageCtrl",
                        templateUrl: 'partials/successPage.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen,
                        locals: {
                            successObject: "data",
                            app: app
                        }
                    });

                    $scope.$watch(function () {
                        return $mdMedia('xs') || $mdMedia('sm');
                    }, function (wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                    });
                    if (window.parent.dwShellController.refreshApps)
                        window.parent.dwShellController.refreshApps();
                }
                $scope.disablePayBtn = false;
                $rootScope.showGlobalProgress = false;

            }).error(function (data) {
                $scope.disablePayBtn = false;
                $rootScope.showGlobalProgress = false;
                notifications.alertDialog("Payment Error", "There was an error in payment");
            });
        } else {
            notifications.toast("Plese select a card and agree to the terms", "error", 4000);
        }

    }
});

angular.module('mainApp').controller('agreementCtrl', function ($mdDialog, $scope) {
    $scope.closeAgreement = function () {
        $mdDialog.hide();
    }

});

//Hide the Account Numbers in show all Accounts
angular.module('mainApp').filter('hideNumbers', function () {
    return function (input) {
        return input.replace(/.(?=.{4})/g, 'x');
    };
});
